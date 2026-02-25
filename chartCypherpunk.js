class ChartCypherpunk {
    constructor(containerSelector, data) {
        this.containerSelector = containerSelector;
        this.container = d3.select(containerSelector);
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.nodeElements = null;
        
        this.isConsolidated = false;
        this.tooltip = d3.select('#interactionTooltip');
        
        // Handle resize
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

    init() {
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Generate hundreds of small retail nodes
        const numRetailNodes = 400;
        for (let i = 0; i < numRetailNodes; i++) {
            this.nodes.push({
                id: `retail-${i}`,
                type: 'retail',
                value: Math.random() * 50 + 1, // 1 to 51 BTC
                radius: Math.random() * 3 + 2, 
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: 0,
                vy: 0
            });
        }
        
        // Setup initial simulation
        this.simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(-3))
            .force('collide', d3.forceCollide().radius(d => d.radius + 1.5).iterations(2))
            .force('x', d3.forceX(this.width / 2).strength(0.04))
            .force('y', d3.forceY(this.height / 2).strength(0.04))
            .on('tick', () => this.ticked());

        this.updateNodes();
    }

    ticked() {
        if (!this.nodeElements) return;
        this.nodeElements
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    }

    renderScattered() {
        if (this.isConsolidated) {
            // Revert state logic
            this.nodes = this.nodes.filter(n => n.type === 'retail');
            this.updateNodes();
            this.simulation
                .nodes(this.nodes)
                .force('x', d3.forceX(this.width / 2).strength(0.04))
                .force('y', d3.forceY(this.height / 2).strength(0.04))
                .force('charge', d3.forceManyBody().strength(-3))
                .force('collide', d3.forceCollide().radius(d => d.radius + 1.5).iterations(2))
                // Remove cluster/pull forces if any
                .force('cluster', null)
                .alpha(0.8)
                .restart();
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
            .attr('r', d => d.type === 'corporate' ? 0 : d.radius) // start corp at 0 for entrance
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .on('mouseover', (event, d) => {
                this.tooltip.style('opacity', 1)
                    .html(`Type: ${d.type === 'retail' ? 'Cypherpunk/Retail' : d.name}<br/>Holding: ${d.value.toLocaleString(undefined, {maximumFractionDigits:0})} BTC`);
            })
            .on('mousemove', (event) => {
                this.tooltip
                    .style('left', (event.pageX + 15) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                this.tooltip.style('opacity', 0);
            });
            
        // Animate radius if corporate
        enterNodes.filter(d => d.type === 'corporate')
            .transition().duration(1200) // Ensure > 800ms
            .attr('r', d => d.radius);

        this.nodeElements = enterNodes.merge(this.nodeElements);
    }
}
