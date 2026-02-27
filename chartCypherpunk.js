class ChartCypherpunk {
    constructor(containerSelector, globalTooltip) {
        this.containerSelector = containerSelector;
        this.container = d3.select(containerSelector);
        this.tooltip = globalTooltip;
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.nodeElements = null;
        
        this.isConsolidated = false;
        
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            if (this.svg) {
                this.svg.attr('width', this.width).attr('height', this.height);
                // Also update the zoom rect
                this.svg.select('.zoom-overlay').attr('width', this.width).attr('height', this.height);
                if (this.simulation && !this.isConsolidated) {
                    this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
                    this.simulation.alpha(0.3).restart();
                }
            }
        });
    }

    generateMockWallet() {
        const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        let addr = '1';
        for (let i = 0; i < 33; i++) addr += chars[Math.floor(Math.random() * chars.length)];
        return addr;
    }

    randomDate() {
        const start = new Date(2009, 0, 3).getTime();
        const end = new Date(2012, 11, 31).getTime();
        return new Date(start + Math.random() * (end - start)).toLocaleDateString();
    }

    generateRetailNodes() {
        // Reduced node count slightly to allow for larger maximum sizes without totally choking physics
        const numRetailNodes = 300; 
        const generated = [];
        
        // Generate realistic-ish pareto distribution for bitcoin holdings
        // Many small wallets, a few whales
        for (let i = 0; i < numRetailNodes; i++) {
            // Give them a random value biased heavily towards 0-10, but allowing up to ~5000 occasionally
            const randVal = Math.pow(Math.random(), 4) * 1000 + (Math.random() * 5); 
            
            generated.push({
                id: `node-${i}`,
                type: 'retail',
                value: randVal,
                address: this.generateMockWallet(),
                firstSeen: this.randomDate(),
                x: this.width / 2 + (Math.random() - 0.5) * 500, // Spread out start position
                y: this.height / 2 + (Math.random() - 0.5) * 500,
                vx: 0,
                vy: 0
            });
        }
        
        // Find max to create a dynamic square root scale
        const maxVal = d3.max(generated, d => d.value);
        // Map [0, maxVal] to a visual radius range [3px, 50px]
        const radiusScale = d3.scaleSqrt()
            .domain([0, maxVal])
            .range([3, 50]);
            
        // Apply the scale
        generated.forEach(d => {
            d.radius = radiusScale(d.value);
        });
        
        return generated;
    }

    init() {
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
            
        // Task 3: Setup strict Ctrl-driven zoom
        this.zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            // Reduce zoom speed multiplier to make zooming much more gradual
            .wheelDelta((event) => -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.0005))
            .filter((event) => {
                // Return true if it's not a wheel event, meaning panning is always allowed
                if (event.type !== 'wheel') return true;
                // If it IS a wheel event, strictly require Ctrl or Cmd key
                return event.ctrlKey || event.metaKey;
            })
            .on('zoom', (event) => {
                // Apply transform to inner group
                this.zoomGroup.attr('transform', event.transform);
            });

        // Overlay to catch zoom events
        this.svg.append('rect')
            .attr('class', 'zoom-overlay')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .on('mouseover', () => {
                // Show hint on hover
                const hint = document.getElementById('zoomHint');
                if (hint) {
                    const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
                    hint.textContent = i18n[lang].zoomHint;
                    hint.style.opacity = '1';
                }
            })
            .on('mouseout', () => {
                // Hide hint
                const hint = document.getElementById('zoomHint');
                if(hint) hint.style.opacity = '0';
            });
            
        this.svg.call(this.zoom);

        // Native event listener to block Chrome/browser from zooming the entire page
        this.svg.node().addEventListener('wheel', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        }, { passive: false });

        // Task 1: Inner group holds nodes (replaces direct svg append)
        this.zoomGroup = this.svg.append('g').attr('class', 'cypherpunk-zoom-group');

        // Dense network: At least 300
        this.nodes = this.generateRetailNodes();
        
        // Task 2: Adjust forces to spread nodes apart significantly
        this.simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(-15))
            .force('collide', d3.forceCollide().radius(d => d.radius + 10).iterations(4))
            .force('x', d3.forceX(this.width / 2).strength(0.06))
            .force('y', d3.forceY(this.height / 2).strength(0.06))
            .on('tick', () => this.ticked());

        this.updateNodes();
    }

    ticked() {
        if (!this.nodeElements) return;
        this.nodeElements.attr('cx', d => d.x).attr('cy', d => d.y);
    }

    renderScattered() {
        if (this.isConsolidated) {
            // Remove corporate nodes
            this.nodes = this.nodes.filter(n => n.type !== 'corporate');
            this.zoomGroup.selectAll('.corpLabel').remove();
            
            // Re-generate retail nodes if they were completely destroyed by Institutional timeout
            if (this.nodes.length === 0) {
                this.nodes = this.generateRetailNodes();
            }

            this.updateNodes();
            
            // Reset opacities just in case
            this.zoomGroup.selectAll('.nodeRetail').style('opacity', 0.7);

            this.simulation.nodes(this.nodes)
                .force('x', d3.forceX(this.width / 2).strength(0.06))
                .force('y', d3.forceY(this.height / 2).strength(0.06))
                .force('charge', d3.forceManyBody().strength(-15))
                .force('collide', d3.forceCollide().radius(d => d.radius + 10).iterations(4))
                .force('cluster', null)
                .alpha(1).restart();
            this.isConsolidated = false;
        } else {
            this.simulation.alpha(0.3).restart();
        }
    }

    updateNodes() {
        this.nodeElements = this.zoomGroup.selectAll('.node')
            .data(this.nodes, d => d.id);
            
        this.nodeElements.exit()
            .transition().duration(800)
            .attr('r', 0).remove();
        
        const enterNodes = this.nodeElements.enter().append('circle')
            .attr('class', d => d.type === 'retail' ? 'node nodeRetail' : 'node nodeCorporate')
            .attr('r', d => d.type === 'corporate' ? 0 : d.radius) 
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .on('mouseover', (event, d) => this.handleMouseOver(event, d))
            .on('mousemove', (event) => this.handleMouseMove(event))
            .on('mouseout', (event, d) => this.handleMouseOut(event, d))
            .on('click', (event, d) => {
                const el = d3.select(event.currentTarget);
                const currentRadius = parseFloat(el.attr('r'));
                el.transition().duration(100).attr('r', currentRadius * 1.3)
                  .transition().duration(400).attr('r', currentRadius);
            });
            
        // Transition > 800ms
        enterNodes.filter(d => d.type === 'corporate')
            .transition().duration(1500).ease(d3.easeCubicOut)
            .attr('r', d => d.radius);

        this.nodeElements = enterNodes.merge(this.nodeElements);
    }

    handleMouseOver(event, d) {
        const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
        if (d.type === 'retail') {
            d3.select(event.currentTarget).transition().duration(300).attr('r', d.radius * 2.5).style('fill', '#ffffff');
            const html = `
                <div class="tooltipHeader">Cypherpunk Node Active</div>
                <div class="tooltipRow"><span class="tooltipLabel">Wallet:</span> <span>${d.address.substring(0,8)}...</span></div>
                <div class="tooltipRow"><span class="tooltipLabel">First Seen:</span> <span>${d.firstSeen}</span></div>
                <div class="tooltipRow"><span class="tooltipLabel">Est. Holding:</span> <span>${d.value.toFixed(2)} BTC</span></div>
            `;
            this.tooltip.html(html).style('opacity', 1);
        } else {
            // Corporate handled in Institutional chart overrides or here
            d3.select(event.currentTarget).transition().duration(300).style('stroke-width', '4px').style('fill', '#fde68a');
            // Dim others
            this.zoomGroup.selectAll('.nodeCorporate').filter(n => n.id !== d.id).style('opacity', 0.2);
            this.zoomGroup.selectAll('.nodeRetail').style('opacity', 0.1);
            
            const html = `
                <div class="tooltipHeader">${d.name}</div>
                <div class="tooltipRow"><span class="tooltipLabel">Type:</span> <span>Public Treasury</span></div>
                <div class="tooltipRow"><span class="tooltipLabel">Total Holdings:</span> <span>${d.value.toLocaleString()} BTC</span></div>
                <div class="tooltipRow"><span class="tooltipLabel">Supply Share:</span> <span>${d.percentOfTotal}%</span></div>
            `;
            this.tooltip.html(html).style('opacity', 1);
        }
    }

    handleMouseMove(event) {
        this.tooltip.style('left', (event.pageX + 20) + 'px').style('top', (event.pageY - 20) + 'px');
    }

    handleMouseOut(event, d) {
        if (d.type === 'retail') {
            d3.select(event.currentTarget).transition().duration(500).attr('r', d.radius).style('fill', '#38bdf8');
        } else {
            d3.select(event.currentTarget).transition().duration(500).style('stroke-width', '1.5px').style('fill', '#f59e0b');
            this.zoomGroup.selectAll('.nodeCorporate').style('opacity', 0.85);
            this.zoomGroup.selectAll('.nodeRetail').style('opacity', 0.7);
        }
        this.tooltip.style('opacity', 0);
    }
}
