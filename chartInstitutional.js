class ChartInstitutional {
    // This chart hijacks the Cypherpunk chart's SVG and simulation
    constructor(cypherpunkInstance, data) {
        this.base = cypherpunkInstance;
        this.corporateData = data.entities;
    }

    renderConsolidated() {
        if (this.base.isConsolidated) return;
        this.base.isConsolidated = true;

        // Radius scaling: use d3.scaleSqrt to accurately map value to area, per instructions!
        const maxCorpVal = d3.max(this.corporateData, d => d.value);
        const radiusScale = d3.scaleSqrt()
            .domain([0, maxCorpVal])
            .range([0, 100]); // Max radius 100px

        // Introduce corporate nodes
        this.corporateData.forEach((cn, i) => {
            if (!this.base.nodes.find(n => n.id === cn.id)) {
                this.base.nodes.push({
                    id: cn.id,
                    name: cn.name,
                    type: 'corporate',
                    value: cn.value,
                    radius: radiusScale(cn.value),
                    x: this.base.width / 2 + (Math.random() - 0.5) * 200,
                    y: this.base.height / 2 + (Math.random() - 0.5) * 200,
                    targetGroup: i 
                });
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

        // Custom force to cluster retail around corporate nodes
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

        this.base.simulation
            .nodes(this.base.nodes)
            .force('charge', d3.forceManyBody().strength(d => d.type === 'corporate' ? -300 : -1))
            .force('collide', d3.forceCollide().radius(d => d.radius + 2).iterations(4))
            .force('x', d3.forceX(this.base.width / 2).strength(d => d.type === 'corporate' ? 0.05 : 0))
            .force('y', d3.forceY(this.base.height / 2).strength(d => d.type === 'corporate' ? 0.05 : 0))
            .force('cluster', isolate)
            .alpha(1)
            .restart();
            
        // Visual transition: Fade out retail nodes slowly (> 800ms)
        this.base.nodeElements.filter(d => d.type === 'retail')
            .transition()
            .delay(Math.random() * 800)
            .duration(1500)
            .style('opacity', 0)
            .on('end', function() { d3.select(this).remove(); });
            
        // Clean up internal data after transition
        setTimeout(() => {
            if (this.base.isConsolidated) {
                this.base.nodes = this.base.nodes.filter(n => n.type === 'corporate');
                this.base.updateNodes();
                this.base.simulation.alpha(0.1).restart();
            }
        }, 2500);
    }
}
