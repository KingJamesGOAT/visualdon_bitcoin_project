class ChartInstitutional {
    // Independent D3 Treemap engine for the Institutional chart layer
    constructor(containerSelector, liveApiData, globalTooltip) {
        this.containerSelector = containerSelector;
        this.container = d3.select(containerSelector);
        this.corporateData = liveApiData.slice(0, 15); // Top 15 companies from CoinGecko
        this.tooltip = globalTooltip;
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.svg = null;
        this.isRendered = false;

        window.addEventListener('resize', () => {
            if (!document.querySelector(this.containerSelector).classList.contains('isActive')) return;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            if (this.svg) {
                this.svg.attr('width', this.width).attr('height', this.height);
                this.render(); // Re-compute layout on resize
            }
        });
    }

    init() {
        // Clear anything existing just in case
        this.container.selectAll("svg").remove();
        
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('opacity', 0) // Hide initially for animation from app.js
            .style('transform', 'scale(0.8)'); // Initial scale for morph illusion
            
        this.isRendered = true;
    }

    render() {
        if (!this.svg) this.init();

        const totalSupply = 21000000;
        
        // Prepare hierarchical data for d3.treemap
        const treemapData = {
            name: "root",
            children: this.corporateData.map(cn => ({
                name: cn.name,
                value: cn.total_holdings || cn.value,
                percentOfTotal: (((cn.total_holdings || cn.value) / totalSupply) * 100).toFixed(4)
            }))
        };

        const hierarchy = d3.hierarchy(treemapData)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        // Center the treemap in the screen with some padding
        const padX = this.width * 0.1;
        const padY = this.height * 0.1;

        const treemapLayout = d3.treemap()
            .size([this.width - 2 * padX, this.height - 2 * padY])
            .paddingInner(4) // Clean modern spacing
            .paddingOuter(0)
            .round(true);

        const root = treemapLayout(hierarchy);

        // Create a central group to hold the blocks
        let mainGroup = this.svg.select('.treemap-group');
        if (mainGroup.empty()) {
            mainGroup = this.svg.append('g')
                .attr('class', 'treemap-group')
                .attr('transform', `translate(${padX}, ${padY})`);
        } else {
            mainGroup.attr('transform', `translate(${padX}, ${padY})`);
        }

        // Bind data to tiles
        const tiles = mainGroup.selectAll('.treemap-tile')
            .data(root.leaves(), d => d.data.name);

        tiles.exit().remove();

        const enterTiles = tiles.enter()
            .append('rect')
            .attr('class', 'treemap-tile')
            .style('fill', '#f59e0b') // Corporate amber color
            .style('stroke', '#ffffff')
            .style('stroke-width', '1px')
            .style('opacity', 0.85)
            .style('cursor', 'pointer')
            .on('mouseover', (event, d) => this.handleMouseOver(event, d.data))
            .on('mousemove', (event) => this.handleMouseMove(event))
            .on('mouseout', (event, d) => this.handleMouseOut(event));

        // Update positions (both enter and update)
        enterTiles.merge(tiles)
            .transition().duration(800).ease(d3.easeCubicOut)
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0);
    }

    handleMouseOver(event, d) {
        d3.select(event.currentTarget).transition().duration(200).style('fill', '#fde68a').style('stroke-width', '2px');
        
        // Dim others
        this.svg.selectAll('.treemap-tile').filter(function() { return this !== event.currentTarget; }).style('opacity', 0.4);
        
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

    handleMouseOut(event) {
        d3.select(event.currentTarget).transition().duration(400).style('fill', '#f59e0b').style('stroke-width', '1px');
        this.svg.selectAll('.treemap-tile').style('opacity', 0.85);
        this.tooltip.style('opacity', 0);
    }
}
