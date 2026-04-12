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
            .style('opacity', 1)
            .style('transform', 'scale(1)')
            .style('position', 'absolute')
            .style('top', '0')
            .style('left', '0');
            
        this.isRendered = true;
        this.currentWidth = null;
        this.currentHeight = null;
    }

    render() {
        if (!this.svg) this.init();
        if (this.isRendered && this.currentWidth === this.width && this.currentHeight === this.height) return;
        
        this.currentWidth = this.width;
        this.currentHeight = this.height;

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

        // Update positions for tiles
        enterTiles.merge(tiles)
            .transition('layout').duration(800).ease(d3.easeCubicOut)
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('width', d => Math.max(0, d.x1 - d.x0))
            .attr('height', d => Math.max(0, d.y1 - d.y0));

        // Create a central group for labels to ensure they are drawn on top of rects
        let labelGroup = this.svg.select('.treemap-label-group');
        if (labelGroup.empty()) {
            labelGroup = this.svg.append('g')
                .attr('class', 'treemap-label-group')
                .attr('transform', `translate(${padX}, ${padY})`)
                .style('pointer-events', 'none'); // Allow clicks/hovers to pass through to rects
        } else {
            labelGroup.attr('transform', `translate(${padX}, ${padY})`);
        }

        // Bind data to labels
        const labels = labelGroup.selectAll('.treemap-label')
            .data(root.leaves(), d => d.data.name);

        labels.exit().remove();
        
        const enterLabels = labels.enter()
            .append('g')
            .attr('class', 'treemap-label')
            .style('opacity', 0); // Start hidden for animation

        // Add Name text
        enterLabels.append('text')
            .attr('class', 'label-name')
            .attr('text-anchor', 'middle')
            .style('fill', '#0f172a')
            .style('font-weight', '900');

        // Add Value text
        enterLabels.append('text')
            .attr('class', 'label-value')
            .attr('text-anchor', 'middle')
            .style('fill', '#334155')
            .style('font-weight', '600');

        // Update positions and handle visibility based on available space
        const allLabels = enterLabels.merge(labels);
        
        // Check fit to enforce strictly no overflow
        allLabels.select('.label-name')
            .text(d => {
                const width = d.x1 - d.x0;
                const height = d.y1 - d.y0;
                // If box is too short for both fields, omit the title entirely
                if (height < 35) return ''; 
                
                const fontSize = Math.min(16, height / 4);
                const approxCharW = fontSize * 0.65;
                const maxChars = Math.floor((width - 8) / approxCharW);
                
                // If width is tiny, omit title completely (leave space for value)
                if (maxChars < 4) return ''; 
                if (d.data.name.length > maxChars) {
                    return d.data.name.substring(0, maxChars - 1) + '…';
                }
                return d.data.name;
            });
            
        allLabels.select('.label-value')
            .text(d => {
                const width = d.x1 - d.x0;
                const height = d.y1 - d.y0;
                if (height < 15 || width < 20) return ''; // Completely invisible
                
                const fontSize = Math.min(12, height / 6);
                const approxCharW = fontSize * 0.65;
                const fullText = `${d.data.value.toLocaleString()} BTC`;
                const numText = d.data.value.toLocaleString();
                const shortVal = (d.data.value / 1000).toFixed(0) + 'k';
                
                const maxChars = Math.floor((width - 8) / approxCharW);
                
                if (fullText.length <= maxChars) return fullText;
                if (numText.length <= maxChars) return numText;
                if (shortVal.length <= maxChars) return shortVal;
                return ''; // Not enough space for even abbreviated value
            });

        // Trigger animations
        
        // Remove prior transitions completely by separating the chain. 
        // D3 .transition() blocks overlap if not carefully chained or uniquely named.
        allLabels.interrupt('layout');
        allLabels.select('.label-name').interrupt('layout');
        allLabels.select('.label-value').interrupt('layout');

        allLabels.transition('layout').duration(800).ease(d3.easeCubicOut)
            .attr('transform', d => `translate(${d.x0 + (d.x1 - d.x0) / 2},${d.y0 + (d.y1 - d.y0) / 2})`)
            .style('opacity', 1);
            
        // Adjust font sizes based on rectangle height dynamically
        allLabels.select('.label-name')
            .transition('layout').duration(800).ease(d3.easeCubicOut)
            .style('font-size', d => Math.min(16, (d.y1 - d.y0) / 4) + 'px')
            .attr('dy', d => Math.min(16, (d.y1 - d.y0) / 4) * -0.2); // Shift up slightly
            
        allLabels.select('.label-value')
            .transition('layout').duration(800).ease(d3.easeCubicOut)
            .style('font-size', d => Math.min(12, (d.y1 - d.y0) / 6) + 'px')
            .attr('dy', d => {
                const height = d.y1 - d.y0;
                if (height < 35) return 4; // Shift up since name is absent
                return Math.min(16, height / 4) * 1.2; // Position below name
            });
    }

    handleMouseOver(event, d) {
        d3.select(event.currentTarget).transition().duration(200).style('fill', '#fde68a').style('stroke-width', '2px');
        
        // Dim others
        this.svg.selectAll('.treemap-tile').filter(function() { return this !== event.currentTarget; }).style('opacity', 0.4);
        
        const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
        const t = window.i18n[lang];
        
        // Try to find a specific description, fallback to generic
        // Replacing spaces with nothing to match keys like corp_MicroStrategy or corp_Hut8
        const cleanName = d.name.replace(/\s+/g, '');
        const descKey = `corp_${cleanName}`;
        const description = t[descKey] || t['corp_Generic'];

        const html = `
            <div class="tooltipHeader">${d.name}</div>
            <p style="font-size: 0.85rem; margin: 8px 0; color: #94a3b8; line-height: 1.3;">${description}</p>
            <div class="tooltipRow" style="margin-top: 10px;"><span class="tooltipLabel">${t.tooltipType}</span> <span>${t.tooltipPublicTreasury}</span></div>
            <div class="tooltipRow"><span class="tooltipLabel">${t.tooltipTotalHoldings}</span> <span style="font-weight:700; color:#f59e0b;">${d.value.toLocaleString()} BTC</span></div>
            <div class="tooltipRow"><span class="tooltipLabel">${t.tooltipSupplyShare}</span> <span>${d.percentOfTotal}%</span></div>
        `;
        this.tooltip.html(html).style('opacity', 1);
    }

    handleMouseMove(event) {
        // Prevent tooltip from going off the right side
        const tooltipNode = this.tooltip.node();
        let tooltipWidth = 250; // approximate default width
        if (tooltipNode) {
            tooltipWidth = tooltipNode.getBoundingClientRect().width;
        }
        
        // Default position
        let leftPos = event.pageX + 20;
        let topPos = event.pageY + 20;
        
        // If it goes off the right edge, flip it to the left side of the cursor
        if (leftPos + tooltipWidth > window.innerWidth) {
            leftPos = event.pageX - tooltipWidth - 20;
        }

        // It is less likely to go off bottom, but just in case, lift it slightly
        const tooltipHeight = tooltipNode ? tooltipNode.getBoundingClientRect().height : 150;
        if (topPos + tooltipHeight > window.innerHeight + window.scrollY) {
            topPos = event.pageY - tooltipHeight - 20;
        }

        this.tooltip.style('left', leftPos + 'px').style('top', topPos + 'px');
    }

    handleMouseOut(event) {
        d3.select(event.currentTarget).transition().duration(400).style('fill', '#f59e0b').style('stroke-width', '1px');
        this.svg.selectAll('.treemap-tile').style('opacity', 0.85);
        this.tooltip.style('opacity', 0);
    }
}
