class BubblesChart {
    constructor(containerSelector, data) {
        this.containerSelector = containerSelector;
        this.container = d3.select(containerSelector);
        
        // Data containing the target corporate nodes
        this.corporateNodes = data.nodes;
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.nodeElements = null;
        
        this.isConsolidated = false;
        
        // Handle resize
        window.addEventListener('resize', () => {
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
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Generate hundreds of small retail nodes
        const numRetailNodes = 300;
        for (let i = 0; i < numRetailNodes; i++) {
            this.nodes.push({
                id: `retail-${i}`,
                type: 'retail',
                radius: Math.random() * 3 + 2, // Small radius 2-5
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: 0,
                vy: 0
            });
        }
        
        // Prepare simulation but don't start forcefully yet
        this.simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(-2))
            .force('collide', d3.forceCollide().radius(d => d.radius + 1).iterations(2))
            .force('x', d3.forceX(this.width / 2).strength(0.05))
            .force('y', d3.forceY(this.height / 2).strength(0.05))
            .on('tick', () => this.ticked());

        // Draw initial nodes
        this.nodeElements = this.svg.selectAll('.node')
            .data(this.nodes, d => d.id)
            .enter().append('circle')
            .attr('class', 'node retailNode')
            .attr('r', d => d.radius)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    }

    ticked() {
        if (!this.nodeElements) return;
        this.nodeElements
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    }

    renderScattered() {
        if (this.isConsolidated) {
            // Revert to scattered state
            // Remove corporate nodes, add back retail
            
            // For simplicity in this demo, if reversing we explode the big nodes back out
            // Let's reset the data array to just retail nodes
            this.nodes = this.nodes.filter(n => n.type === 'retail');
            
            // Rebind and update
            this.updateNodes();
            
            // Change forces to scatter
            this.simulation
                .nodes(this.nodes)
                .force('x', d3.forceX(this.width / 2).strength(0.05))
                .force('y', d3.forceY(this.height / 2).strength(0.05))
                .force('charge', d3.forceManyBody().strength(-2))
                .force('collide', d3.forceCollide().radius(d => d.radius + 1).iterations(2))
                .alpha(0.8)
                .restart();
                
            this.isConsolidated = false;
        } else {
            // First time render, just gently move them
            this.simulation.alpha(0.3).restart();
        }
    }

    renderConsolidated() {
        if (this.isConsolidated) return;
        this.isConsolidated = true;

        // Introduce corporate nodes
        // Calculate total area of retail to distribute
        
        // We add the corporate nodes into the simulation
        this.corporateNodes.forEach((cn, i) => {
            // Position them roughly in the center
            this.nodes.push({
                id: cn.id,
                type: 'corporate',
                radius: Math.sqrt(cn.value) / 4, // Scale down value to radius
                x: this.width / 2 + (Math.random() - 0.5) * 100,
                y: this.height / 2 + (Math.random() - 0.5) * 100,
                targetGroup: i // used for clustering
            });
        });

        // "Assign" retail nodes to corporate ones for merging effect
        const numCorps = this.corporateNodes.length;
        let cIndex = 0;
        this.nodes.forEach(n => {
            if (n.type === 'retail') {
                n.targetGroup = cIndex;
                cIndex = (cIndex + 1) % numCorps;
            }
        });

        this.updateNodes();

        // Update forces to pull them into dense clusters, then "consume" them visually
        
        // Custom force to cluster by targetGroup
        const isolate = (alpha) => {
            for (let i = 0, n = this.nodes.length, node; i < n; ++i) {
                node = this.nodes[i];
                if (node.type === 'retail') {
                    // Find target corporate node
                    const target = this.nodes.find(tn => tn.type === 'corporate' && tn.targetGroup === node.targetGroup);
                    if (target) {
                        node.vx -= (node.x - target.x) * alpha * 0.1;
                        node.vy -= (node.y - target.y) * alpha * 0.1;
                    }
                }
            }
        };

        this.simulation
            .nodes(this.nodes)
            .force('charge', d3.forceManyBody().strength(d => d.type === 'corporate' ? -200 : -1))
            .force('collide', d3.forceCollide().radius(d => d.radius + 2).iterations(4))
            .force('x', d3.forceX(this.width / 2).strength(d => d.type === 'corporate' ? 0.05 : 0))
            .force('y', d3.forceY(this.height / 2).strength(d => d.type === 'corporate' ? 0.05 : 0))
            .force('cluster', isolate)
            .alpha(1)
            .restart();
            
        // Visual transition: scale up corporate nodes over time (mimic accumulation)
        this.nodeElements.filter(d => d.type === 'corporate')
            .attr('r', 0)
            .transition()
            .duration(2000) // Minimum 800ms per instructions
            .ease(d3.easeCubicOut)
            .attr('r', d => d.radius);
            
        // Fade out retail nodes as they get close
        this.nodeElements.filter(d => d.type === 'retail')
            .transition()
            .delay(Math.random() * 1000)
            .duration(1500)
            .style('opacity', 0)
            .on('end', function() { d3.select(this).remove(); });
            
        // Clean up data array after transition roughly ends
        setTimeout(() => {
            if (this.isConsolidated) {
                this.nodes = this.nodes.filter(n => n.type === 'corporate');
                this.updateNodes();
                this.simulation.alpha(0.1).restart();
            }
        }, 2500);
    }
    
    updateNodes() {
        this.nodeElements = this.svg.selectAll('.node')
            .data(this.nodes, d => d.id);
            
        this.nodeElements.exit().remove();
        
        const enterNodes = this.nodeElements.enter().append('circle')
            .attr('class', d => d.type === 'retail' ? 'node retailNode' : 'node corporateNode')
            .attr('r', d => d.radius)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
            
        this.nodeElements = enterNodes.merge(this.nodeElements);
    }
}
