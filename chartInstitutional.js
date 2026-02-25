class ChartInstitutional {
    // Hijacks Cypherpunk chart's SVG/Force engine for smooth transition
    constructor(cypherpunkInstance, liveApiData, globalTooltip) {
        this.base = cypherpunkInstance;
        this.corporateData = liveApiData.slice(0, 15); // Top 15 companies from CoinGecko
        this.tooltip = globalTooltip;
    }

    renderConsolidated() {
        if (this.base.isConsolidated) return;
        this.base.isConsolidated = true;

        // V3 Rule: The circle area must strictly map to their holdings (sqrt scale)
        const maxCorpVal = d3.max(this.corporateData, d => d.total_holdings || d.value);
        const radiusScale = d3.scaleSqrt()
            .domain([0, maxCorpVal])
            .range([0, 150]); // Massive radius

        const totalSupply = 21000000;

        // Introduce corporate nodes from API
        this.corporateData.forEach((cn, i) => {
            const holding = cn.total_holdings || cn.value;
            const pct = ((holding / totalSupply) * 100).toFixed(4);
            const r = radiusScale(holding) || 10;
            
            if (!this.base.nodes.find(n => n.id === cn.name)) {
                this.base.nodes.push({
                    id: cn.name,
                    name: cn.name,
                    type: 'corporate',
                    value: holding,
                    percentOfTotal: pct,
                    radius: r,
                    x: this.base.width / 2 + (Math.random() - 0.5) * 400,
                    y: this.base.height / 2 + (Math.random() - 0.5) * 400,
                    targetGroup: i 
                });
                
                // Add text label directly over circle
                this.base.svg.append('text')
                    .attr('class', 'corpLabel')
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .style('fill', '#0f172a')
                    .style('font-weight', '900')
                    .style('font-size', Math.max(10, r/4) + 'px')
                    .style('pointer-events', 'none')
                    .style('opacity', 0)
                    .datum(this.base.nodes[this.base.nodes.length-1])
                    .text(cn.name);
            }
        });

        const numCorps = this.corporateData.length;
        let cIndex = 0;
        this.base.nodes.forEach(n => {
            if (n.type === 'retail') {
                n.targetGroup = cIndex;
                cIndex = (cIndex + 1) % numCorps;
            }
        });

        this.base.updateNodes();

        // Custom force to cluster retail around corporate nodes mimicking suction
        const isolate = (alpha) => {
            for (let i = 0, n = this.base.nodes.length, node; i < n; ++i) {
                node = this.base.nodes[i];
                if (node.type === 'retail') {
                    const target = this.base.nodes.find(tn => tn.type === 'corporate' && tn.targetGroup === node.targetGroup);
                    if (target) {
                        node.vx -= (node.x - target.x) * alpha * 0.15;
                        node.vy -= (node.y - target.y) * alpha * 0.15;
                    }
                }
            }
        };

        // Override tick to move labels
        this.base.simulation.on('tick', () => {
            this.base.ticked(); // original tick function positions circles
            
            this.base.svg.selectAll('.corpLabel')
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });

        // Aggressive physics transition - Tighter pack this time 
        this.base.simulation
            .nodes(this.base.nodes)
            .force('charge', d3.forceManyBody().strength(d => d.type === 'corporate' ? 4 : -1))
            .force('collide', d3.forceCollide().radius(d => d.radius + 2).iterations(5))
            .force('x', d3.forceX(this.base.width / 2).strength(0.1))
            .force('y', d3.forceY(this.base.height / 2).strength(0.1))
            .force('cluster', isolate)
            .alpha(1)
            .restart();
            
        // Fade in labels
        this.base.svg.selectAll('.corpLabel')
            .transition().delay(1000).duration(2000)
            .style('opacity', 0.85);
            
        // Visual transition: Fade out retail nodes slowly over >800ms
        this.base.nodeElements.filter(d => d.type === 'retail')
            .transition()
            .delay(Math.random() * 800)
            .duration(2000)
            .style('opacity', 0)
            .on('end', function() { d3.select(this).remove(); });
            
        setTimeout(() => {
            if (this.base.isConsolidated) {
                this.base.nodes = this.base.nodes.filter(n => n.type === 'corporate');
                this.base.updateNodes();
                // Settle phase with slight expansion 
                this.base.simulation.force('charge', d3.forceManyBody().strength(-15)).alpha(0.2).restart();
            }
        }, 3000);
    }
}
