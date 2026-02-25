class ChartModernDistribution {
    constructor(containerSelector, data) {
        this.containerSelector = containerSelector;
        this.snapshotData = data.snapshot;
        this.container = d3.select(containerSelector);
        
        this.margin = {top: 50, right: 50, bottom: 80, left: 100};
        this.svg = null;
        this.isRendered = false;
        this.tooltip = d3.select('#interactionTooltip');

        this.updateDimensions();
        
        window.addEventListener('resize', () => {
            this.updateDimensions();
            if (this.isRendered) {
                this.container.selectAll("svg").remove();
                this.isRendered = false;
                if (document.querySelector(this.containerSelector).classList.contains('isActive')) {
                    this.init();
                    this.render(true);
                }
            }
        });
    }

    updateDimensions() {
        this.width = window.innerWidth * 0.75;
        this.height = window.innerHeight * 0.6;
        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;
    }

    init() {
        this.wrapper = this.container.append('div')
            .style('display', 'flex')
            .style('justify-content', 'center')
            .style('align-items', 'center')
            .style('height', '100%')
            .style('width', '100%');

        this.svg = this.wrapper.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
            
        // X scale for categories
        this.xScale = d3.scaleBand()
            .domain(this.snapshotData.map(d => d.category))
            .range([0, this.innerWidth])
            .padding(0.3);
            
        // Y scale strictly starting at 0 per ethics rule
        const maxHoldings = d3.max(this.snapshotData, d => d.holdings);
        this.yScale = d3.scaleLinear()
            .domain([0, maxHoldings * 1.1]) // Add 10% headroom
            .range([this.innerHeight, 0]);

        const xAxis = d3.axisBottom(this.xScale);
        const yAxis = d3.axisLeft(this.yScale).ticks(6).tickFormat(d => (d / 1000000).toFixed(1) + "M");

        this.svg.append('g')
            .attr('class', 'axisLine')
            .attr('transform', `translate(0,${this.innerHeight})`)
            .call(xAxis)
            .selectAll('text')
            .attr('class', 'axisText')
            .attr('transform', 'rotate(-15)')
            .style('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '0.15em');
            
        this.svg.append('g')
            .attr('class', 'axisLine')
            .call(yAxis)
            .selectAll('text').attr('class', 'axisText');
            
        this.svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -this.innerHeight / 2)
            .attr('y', -60)
            .attr('text-anchor', 'middle')
            .attr('class', 'axisText')
            .style('font-weight', 'bold')
            .text('Total Holdings (BTC)');
    }

    render(instant = false) {
        if (!this.svg) this.init();
        if (this.isRendered && !instant) return;

        const duration = instant ? 0 : 1200; // >=800ms
        
        const bars = this.svg.selectAll('.barChartRect')
            .data(this.snapshotData);
            
        const enterBars = bars.enter()
            .append('rect')
            .attr('class', 'barChartRect')
            .attr('x', d => this.xScale(d.category))
            .attr('width', this.xScale.bandwidth())
            // Start from bottom (height 0) for animation
            .attr('y', this.innerHeight)
            .attr('height', 0)
            // Interactive Hover Opacity Adjustments
            .on('mouseover', (event, d) => {
                // Dim other bars
                this.svg.selectAll('.barChartRect').style('opacity', 0.3);
                d3.select(event.currentTarget).style('opacity', 1);

                this.tooltip.style('opacity', 1)
                    .html(`<strong>${d.category}</strong><br/>${d.holdings.toLocaleString()} BTC`)
                    .style('left', (event.pageX + 15) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mousemove', (event) => {
                this.tooltip
                    .style('left', (event.pageX + 15) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                // Restore all bars
                this.svg.selectAll('.barChartRect').style('opacity', 1);
                this.tooltip.style('opacity', 0);
            });
            
        enterBars.merge(bars)
            .transition()
            .duration(duration)
            .ease(d3.easeCubicOut)
            // Grow up to data value
            .attr('y', d => this.yScale(d.holdings))
            .attr('height', d => this.innerHeight - this.yScale(d.holdings));

        this.isRendered = true;
    }
}
