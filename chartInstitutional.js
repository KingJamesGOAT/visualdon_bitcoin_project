class ChartInstitutional {
    // Independent physics engine for the Institutional chart layer
    constructor(containerSelector, liveApiData, globalTooltip) {
        this.containerSelector = containerSelector;
        this.container = d3.select(containerSelector);
        this.corporateData = liveApiData.slice(0, 15); // Top 15 companies from CoinGecko
        this.tooltip = globalTooltip;
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.nodeElements = null;
        this.isRendered = false;

        window.addEventListener('resize', () => {
            if (!document.querySelector(this.containerSelector).classList.contains('isActive')) return;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            if (this.svg) {
                this.svg.attr('width', this.width).attr('height', this.height);
                if (this.simulation) {
                    this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
                    this.simulation.alpha(0.3).restart();
                }
            }
        });
    }

    init() {
        // Clear anything existing just in case
        this.container.selectAll("svg").remove();
        
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
            
        this.isRendered = true;
    }

    render() {
        if (!this.svg) this.init();

        // V3 Rule: The circle area must strictly map to their holdings (sqrt scale)
        const maxCorpVal = d3.max(this.corporateData, d => d.total_holdings || d.value);
        const radiusScale = d3.scaleSqrt()
            .domain([0, maxCorpVal])
            .range([0, 150]); // Massive radius

        const totalSupply = 21000000;
        
        // Reset nodes for clean entry
        this.nodes = [];

        // Introduce corporate nodes from API
        this.corporateData.forEach((cn, i) => {
            const holding = cn.total_holdings || cn.value;
            const pct = ((holding / totalSupply) * 100).toFixed(4);
            const r = radiusScale(holding) || 10;
            
            this.nodes.push({
                id: cn.name,
                name: cn.name,
                type: 'corporate',
                value: holding,
                percentOfTotal: pct,
                radius: r,
                // Start them slightly scattered but near center for dramatic entrance
                x: this.width / 2 + (Math.random() - 0.5) * 400,
                y: this.height / 2 + (Math.random() - 0.5) * 400
            });
        });

        this.updateNodes();

        // New Independent Simulation
        this.simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(-15))
            .force('collide', d3.forceCollide().radius(d => d.radius + 2).iterations(5))
            .force('x', d3.forceX(this.width / 2).strength(0.08))
            .force('y', d3.forceY(this.height / 2).strength(0.08))
            .on('tick', () => {
                this.nodeElements
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);
                    
                this.svg.selectAll('.corpLabel')
                    .attr('x', d => d.x)
                    .attr('y', d => d.y);
            });
            
        // Labels fade in slightly delayed for dramatic effect
        this.svg.selectAll('.corpLabel')
            .transition().delay(800).duration(2000)
            .style('opacity', 0.85);
    }

    updateNodes() {
        this.nodeElements = this.svg.selectAll('.nodeCorporate')
            .data(this.nodes, d => d.id);
            
        this.nodeElements.exit()
            .transition().duration(800)
            .attr('r', 0).remove();
        
        const enterNodes = this.nodeElements.enter().append('circle')
            .attr('class', 'nodeCorporate')
            .attr('r', 0) 
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .on('mouseover', (event, d) => this.handleMouseOver(event, d))
            .on('mousemove', (event) => this.handleMouseMove(event))
            .on('mouseout', (event, d) => this.handleMouseOut(event, d));
            
        // Add text labels bound to the entered nodes
        const enterLabels = this.svg.selectAll('.corpLabel')
            .data(this.nodes, d => d.id)
            .enter().append('text')
            .attr('class', 'corpLabel')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('fill', '#0f172a')
            .style('font-weight', '900')
            .style('font-size', d => Math.max(10, d.radius/4) + 'px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .text(d => d.name);
            
        // Transition size growth
        enterNodes
            .transition().duration(1500).ease(d3.easeCubicOut)
            .attr('r', d => d.radius);

        this.nodeElements = enterNodes.merge(this.nodeElements);
    }

    handleMouseOver(event, d) {
        d3.select(event.currentTarget).transition().duration(300).style('stroke-width', '4px').style('fill', '#fde68a');
        
        // Dim others
        this.svg.selectAll('.nodeCorporate').filter(n => n.id !== d.id).style('opacity', 0.2);
        
        const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
        const typeStr = lang === 'fr' ? 'Tresorerie Publique' : 'Public Treasury';
        const holdingsStr = lang === 'fr' ? 'Reserves Totales:' : 'Total Holdings:';
        const shareStr = lang === 'fr' ? 'Part de l\'Offre:' : 'Supply Share:';

        const html = `
            <div class="tooltipHeader">${d.name}</div>
            <div class="tooltipRow"><span class="tooltipLabel">Type:</span> <span>${typeStr}</span></div>
            <div class="tooltipRow"><span class="tooltipLabel">${holdingsStr}</span> <span>${d.value.toLocaleString()} BTC</span></div>
            <div class="tooltipRow"><span class="tooltipLabel">${shareStr}</span> <span>${d.percentOfTotal}%</span></div>
        `;
        this.tooltip.html(html).style('opacity', 1);
    }

    handleMouseMove(event) {
        this.tooltip.style('left', (event.pageX + 20) + 'px').style('top', (event.pageY - 20) + 'px');
    }

    handleMouseOut(event, d) {
        d3.select(event.currentTarget).transition().duration(500).style('stroke-width', '1.5px').style('fill', '#f59e0b');
        this.svg.selectAll('.nodeCorporate').style('opacity', 0.85);
        this.tooltip.style('opacity', 0);
    }
}
