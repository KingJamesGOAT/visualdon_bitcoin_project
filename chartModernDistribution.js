class ChartModernDistribution {
    constructor(containerSelector, snapshotData, globalTooltip) {
        this.containerSelector = containerSelector;
        this.snapshotData = snapshotData;
        this.container = d3.select(containerSelector);
        this.tooltip = globalTooltip;
        
        this.margin = {top: 50, right: 50, bottom: 80, left: 100};
        this.svg = null;
        this.isRendered = false;
        this.currentMode = 'bar'; // 'bar' or 'donut'

        this.updateDimensions();
        
        window.addEventListener('resize', () => {
            this.updateDimensions();
            if (this.isRendered) {
                this.container.selectAll("svg").remove();
                this.isRendered = false;
                if (document.querySelector(this.containerSelector).classList.contains('isActive')) {
                    this.init();
                    if(this.currentMode === 'bar') this.render(true);
                    else this.transformToDonut(true);
                }
            }
        });
    }

    updateDimensions() {
        this.width = window.innerWidth * 0.75;
        this.height = window.innerHeight * 0.6;
        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;
        this.radius = Math.min(this.innerWidth, this.innerHeight) / 2;
    }

    init() {
        this.wrapper = this.container.append('div')
            .style('display', 'flex').style('justify-content', 'center').style('align-items', 'center')
            .style('height', '100%').style('width', '100%');

        // Main SVG grouped to allow easy translation for donut chart center vs bar chart top-left
        this.svg = this.wrapper.append('svg').attr('width', this.width).attr('height', this.height);
        this.chartGroup = this.svg.append('g').attr('transform', `translate(${this.margin.left},${this.margin.top})`);
            
        this.xScale = d3.scaleBand().domain(this.snapshotData.map(d => d.category)).range([0, this.innerWidth]).padding(0.4);
        const maxHoldings = d3.max(this.snapshotData, d => d.holdings);
        this.yScale = d3.scaleLinear().domain([0, maxHoldings * 1.1]).range([this.innerHeight, 0]);

        this.xAxis = d3.axisBottom(this.xScale);
        this.yAxis = d3.axisLeft(this.yScale).ticks(6).tickFormat(d => (d / 1000000).toFixed(1) + "M");

        this.xAxisGroup = this.chartGroup.append('g').attr('class', 'axisLine x-axis').attr('transform', `translate(0,${this.innerHeight})`);
        this.xAxisGroup.call(this.xAxis).selectAll('text').attr('class', 'axisText').attr('transform', 'rotate(-15)').style('text-anchor', 'end').attr('dx', '-0.8em').attr('dy', '0.15em');
            
        this.yAxisGroup = this.chartGroup.append('g').attr('class', 'axisLine y-axis');
        this.yAxisGroup.call(this.yAxis).selectAll('text').attr('class', 'axisText');
            
        this.yAxisLabel = this.chartGroup.append('text').attr('transform', 'rotate(-90)').attr('x', -this.innerHeight / 2)
            .attr('y', -70).attr('text-anchor', 'middle').attr('class', 'axisText').style('font-weight', 'bold').text('Total Holdings (BTC)');
            
        // Setup Donut Generators
        this.pie = d3.pie().value(d => d.holdings).sort(null);
        this.arc = d3.arc().innerRadius(this.radius * 0.65).outerRadius(this.radius).cornerRadius(4);
    }

    render(instant = false) {
        if (!this.svg) this.init();
        if (this.isRendered && this.currentMode === 'bar' && !instant) return;
        this.currentMode = 'bar';

        // Show Bar axes
        this.xAxisGroup.transition().duration(800).style('opacity', 1);
        this.yAxisGroup.transition().duration(800).style('opacity', 1);
        this.yAxisLabel.transition().duration(800).style('opacity', 1);
        
        // Reset transform
        this.chartGroup.transition().duration(1000).attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        const duration = instant ? 0 : 1200; 
        
        const paths = this.chartGroup.selectAll('.distributionElement').data(this.snapshotData, d => d.id);
            
        const enterPaths = paths.enter().append('path').attr('class', 'distributionElement')
            .style('fill', d => d.color)
            .on('mouseover', (event, d) => this.handleHover(event, d))
            .on('mousemove', (event) => this.tooltip.style('left', (event.pageX + 20) + 'px').style('top', (event.pageY - 20) + 'px'))
            .on('mouseout', () => this.handleOut());
            
        // Calculate rectangular path data
        const rectPath = (d) => {
            const x = this.xScale(d.category);
            const w = this.xScale.bandwidth();
            const y = this.yScale(d.holdings);
            const h = this.innerHeight - y;
            // Draw a rectangle as a path: M x,y L x+w,y L x+w,y+h L x,y+h Z
            return `M ${x},${y} L ${x+w},${y} L ${x+w},${y+h} L ${x},${y+h} Z`;
        };
        
        // Flattened bottom rect for initial entrance
        const flatPath = (d) => {
            const x = this.xScale(d.category);
            const w = this.xScale.bandwidth();
            return `M ${x},${this.innerHeight} L ${x+w},${this.innerHeight} L ${x+w},${this.innerHeight} L ${x},${this.innerHeight} Z`;
        };

        enterPaths.attr('d', flatPath)
            .merge(paths)
            .transition()
            .duration(duration)
            .ease(d3.easeCubicInOut)
            .attr('d', rectPath);

        this.isRendered = true;
    }

    transformToDonut(instant = false) {
        this.currentMode = 'donut';
        
        document.getElementById('btnTransformDonut').style.display = 'none';
        document.getElementById('btnTransformBar').style.display = 'inline-block';
        
        // Hide Bar axes
        this.xAxisGroup.transition().duration(800).style('opacity', 0);
        this.yAxisGroup.transition().duration(800).style('opacity', 0);
        this.yAxisLabel.transition().duration(800).style('opacity', 0);
        
        // Center the group for pie chart coordinates
        this.chartGroup.transition().duration(1200)
            .attr('transform', `translate(${this.width/2},${this.height/2})`);
            
        const pieData = this.pie(this.snapshotData);
        
        // Re-bind to pie data format
        const paths = this.chartGroup.selectAll('.distributionElement').data(pieData, d => d.data.id);
        
        paths.transition()
            .duration(1500) // Complex morph
            .ease(d3.easeCubicInOut)
            .attrTween("d", d => {
                const i = d3.interpolate(
                    // Current path state (bar) approximated or let it morph messily.
                    // A true rigorous path morph between rect and arc requires flubber, 
                    // but d3 can tween numeric path commands reasonably if we just transition straight to arc
                    d.path || this.arc(d),
                    this.arc(d)
                );
                return function(t) { return i(t); };
            });
    }

    transformToBar() {
        document.getElementById('btnTransformDonut').style.display = 'inline-block';
        document.getElementById('btnTransformBar').style.display = 'none';
        this.render(); // Let render logic handle morph back to Rect Paths
    }

    handleHover(event, d) {
        const item = d.data || d; // Handle both direct data (bar) and pie wrapper (donut)
        
        this.chartGroup.selectAll('.distributionElement').style('opacity', 0.2);
        d3.select(event.currentTarget).style('opacity', 1);

        const pct = ((item.holdings / 21000000) * 100).toFixed(2);

        const html = `
            <div class="tooltipHeader" style="color:${item.color}">${item.category}</div>
            <div class="tooltipRow"><span class="tooltipLabel">Holdings:</span> <span>${item.holdings.toLocaleString()} BTC</span></div>
            <div class="tooltipRow"><span class="tooltipLabel">Max Supply %:</span> <span>${pct}%</span></div>
            <div style="margin-top:8px; font-size:11px; color:#cbd5e1; font-style:italic">Live Snapshot Verification</div>
        `;
        this.tooltip.html(html).style('opacity', 1);
    }

    handleOut() {
        this.chartGroup.selectAll('.distributionElement').style('opacity', 0.9);
        this.tooltip.style('opacity', 0);
    }
}
