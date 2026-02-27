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
        const numRetailNodes = 350;
        const generated = [];
        for (let i = 0; i < numRetailNodes; i++) {
            generated.push({
                id: `node-${i}`,
                type: 'retail',
                value: Math.random() * 50 + 1,
                radius: Math.random() * 5 + 4, 
                address: this.generateMockWallet(),
                firstSeen: this.randomDate(),
                x: this.width / 2 + (Math.random() - 0.5) * 200,
                y: this.height / 2 + (Math.random() - 0.5) * 200,
                vx: 0,
                vy: 0
            });
        }
        return generated;
    }

    init() {
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
            
        this.svg.append('text')
            .attr('class', 'watermarkTitle')
            .attr('x', this.width / 2)
            .attr('y', this.height / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('fill', '#e2e8f0') 
            .style('opacity', 0.05) 
            .style('font-size', '6vw')
            .style('font-weight', '900')
            .style('pointer-events', 'none')
            .style('letter-spacing', '0.05em')
            .text('2009 - 2012');

        // Dense network: At least 300
        this.nodes = this.generateRetailNodes();
        
        this.simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(-4))
            .force('collide', d3.forceCollide().radius(d => d.radius + 1.5).iterations(3))
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
            this.svg.selectAll('.corpLabel').remove();
            
            // Re-generate retail nodes if they were completely destroyed by Institutional timeout
            if (this.nodes.length === 0) {
                this.nodes = this.generateRetailNodes();
            }

            this.updateNodes();
            
            // Reset opacities just in case
            this.svg.selectAll('.nodeRetail').style('opacity', 0.7);

            this.simulation.nodes(this.nodes)
                .force('x', d3.forceX(this.width / 2).strength(0.06))
                .force('y', d3.forceY(this.height / 2).strength(0.06))
                .force('charge', d3.forceManyBody().strength(-4))
                .force('collide', d3.forceCollide().radius(d => d.radius + 1.5).iterations(3))
                .force('cluster', null)
                .alpha(1).restart();
            this.isConsolidated = false;
        } else {
            this.simulation.alpha(0.3).restart();
        }
    }

    updateNodes() {
        this.nodeElements = this.svg.selectAll('.node')
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
            this.svg.selectAll('.nodeCorporate').filter(n => n.id !== d.id).style('opacity', 0.2);
            this.svg.selectAll('.nodeRetail').style('opacity', 0.1);
            
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
            this.svg.selectAll('.nodeCorporate').style('opacity', 0.85);
            this.svg.selectAll('.nodeRetail').style('opacity', 0.7);
        }
        this.tooltip.style('opacity', 0);
    }
}
