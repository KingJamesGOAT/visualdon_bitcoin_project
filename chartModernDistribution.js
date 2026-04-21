class ChartModernDistribution {
    constructor(containerSelector, snapshotData, globalTooltip) {
        this.containerSelector = containerSelector;
        // Sort from smallest to largest
        this.snapshotData = snapshotData.slice().sort((a, b) => a.holdings - b.holdings);
        this.container = d3.select(containerSelector);
        this.tooltip = globalTooltip;
        
        this.margin = {top: 50, right: 50, bottom: 80, left: 100};
        this.svg = null;
        this.isRendered = false;
        this.currentMode = 'bar'; // 'bar' or 'stacked'

        this.updateDimensions();
        
        window.addEventListener('resize', () => {
            this.updateDimensions();
            if (this.isRendered) {
                this.container.selectAll("svg").remove();
                this.isRendered = false;
                if (document.querySelector(this.containerSelector).classList.contains('isActive')) {
                    this.init();
                    if(this.currentMode === 'bar') this.render(true);
                    else this.transformToStacked(true);
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
            .style('display', 'flex').style('justify-content', 'center').style('align-items', 'center')
            .style('height', '100%').style('width', '100%');

        // Main SVG grouped to allow easy translation
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
            
        // Calculate data for horizontal stacked bar immediately
        const totalHoldings = d3.sum(this.snapshotData, d => d.holdings);
        let cumulativeAccumulator = 0;
        
        this.snapshotData.forEach(d => {
            const ratio = d.holdings / totalHoldings;
            // The precise width in pixels when horizontally stacked
            d.stackedWidth = ratio * this.innerWidth;
            // The starting X position when horizontally stacked
            d.cumulativeX = cumulativeAccumulator;
            cumulativeAccumulator += d.stackedWidth;
        });
    }

    render(instant = false) {
        if (!this.svg) this.init();
        if (this.isRendered && this.currentMode === 'bar' && !instant) return;
        this.currentMode = 'bar';

        // Show Bar axes
        this.xAxisGroup.transition().duration(800).style('opacity', 1);
        this.yAxisGroup.transition().duration(800).style('opacity', 1);
        this.yAxisLabel.transition().duration(800).style('opacity', 1);
        
        const duration = instant ? 0 : 1200; 
        
        const rects = this.chartGroup.selectAll('.distributionElement').data(this.snapshotData, d => d.id);
            
        // Task 2: No more d3.pie or paths, reverting to pure standard rects
        const enterRects = rects.enter().append('rect').attr('class', 'distributionElement')
            .style('fill', d => d.color)
            .on('mouseover', (event, d) => this.handleHover(event, d))
            .on('mousemove', (event) => this.tooltip.style('left', (event.pageX + 20) + 'px').style('top', (event.pageY - 20) + 'px'))
            .on('mouseout', () => this.handleOut());
            
        // Starting positioned flat on X axis
        enterRects
            .attr('x', d => this.xScale(d.category))
            .attr('y', this.innerHeight)
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0);

        // Task 4: The Reverse Transition. Or just animating standard initial state
        enterRects.merge(rects)
            .transition()
            .duration(duration)
            .ease(d3.easeCubicInOut)
            .attr('x', d => this.xScale(d.category))
            .attr('y', d => this.yScale(d.holdings))
            .attr('width', this.xScale.bandwidth())
            .attr('height', d => this.innerHeight - this.yScale(d.holdings));

        this.isRendered = true;
    }

    transformToStacked(instant = false) {
        this.currentMode = 'stacked';
        
        const btnStacked = document.getElementById('btnTransformStacked');
        if(btnStacked) btnStacked.style.display = 'none';
        
        const btnBar = document.getElementById('btnTransformBar');
        if(btnBar) btnBar.style.display = 'inline-block';
        
        const duration = instant ? 0 : 1200;
        
        // Hide Bar axes
        // this.xAxisGroup.transition().duration(800).style('opacity', 0);
        // this.yAxisGroup.transition().duration(800).style('opacity', 0);
        // this.yAxisLabel.transition().duration(800).style('opacity', 0);
            
        const rects = this.chartGroup.selectAll('.distributionElement').data(this.snapshotData, d => d.id);
        
        // Task 3: 100% Horizontal Stacked Bar animation
        const stackedHeight = 60; // 60px thick visually pleasing bar
        const centerY = (this.innerHeight / 2) - (stackedHeight / 2);
        
        rects.transition()
            .duration(duration)
            .ease(d3.easeCubicInOut)
            .attr('x', d => d.cumulativeX)
            .attr('y', centerY)
            .attr('width', d => d.stackedWidth)
            .attr('height', stackedHeight);
    }

    transformToBar() {
        const btnStacked = document.getElementById('btnTransformStacked');
        if(btnStacked) btnStacked.style.display = 'inline-block';
        
        const btnBar = document.getElementById('btnTransformBar');
        if(btnBar) btnBar.style.display = 'none';
        
        this.render(); // This triggers the reverse transition back to standard Y-axis bars
    }

    handleHover(event, item) {
        this.chartGroup.selectAll('.distributionElement').style('opacity', 0.2);
        d3.select(event.currentTarget).style('opacity', 1);

        const pct = ((item.holdings / 21000000) * 100).toFixed(2);

        const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
        const t = window.i18n[lang];

        const html = `
            <div class="tooltipHeader" style="color:${item.color}">${item.category}</div>
            <div class="tooltipRow"><span class="tooltipLabel">${t.tooltipHoldings}</span> <span style="font-weight:700">${item.holdings.toLocaleString()} BTC</span></div>
            <div class="tooltipRow"><span class="tooltipLabel">${t.tooltipMaxSupply}</span> <span style="font-weight:700">${pct}%</span></div>
            <div style="margin-top:8px; font-size:11px; color:#cbd5e1; font-style:italic">${t.tooltipLiveVerification}</div>
        `;
        this.tooltip.html(html).style('opacity', 1);
    }

    handleOut() {
        this.chartGroup.selectAll('.distributionElement').style('opacity', 0.9);
        this.tooltip.style('opacity', 0);
    }
}
