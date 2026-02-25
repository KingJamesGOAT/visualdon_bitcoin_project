class ChartTimeline {
    constructor(containerSelector, data) {
        this.containerSelector = containerSelector;
        this.timelineData = data.timeline;
        this.container = d3.select(containerSelector);
        
        this.margin = {top: 50, right: 50, bottom: 80, left: 80};
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
            
        this.xScale = d3.scaleTime()
            .domain(d3.extent(this.timelineData, d => new Date(d.year, 0, 1)))
            .range([0, this.innerWidth]);
            
        this.yScale = d3.scaleLinear()
            .domain([0, 100]) // Strictly starting at zero
            .range([this.innerHeight, 0]);
            
        this.stack = d3.stack()
            .keys(['retail', 'institutional']);
            
        this.stackedData = this.stack(this.timelineData);

        const xAxis = d3.axisBottom(this.xScale).ticks(d3.timeYear.every(2)).tickFormat(d3.timeFormat('%Y'));
        const yAxis = d3.axisLeft(this.yScale).tickFormat(d => d + "%");

        this.svg.append('g')
            .attr('class', 'axisLine')
            .attr('transform', `translate(0,${this.innerHeight})`)
            .call(xAxis)
            .selectAll('text').attr('class', 'axisText');
            
        this.svg.append('g')
            .attr('class', 'axisLine')
            .call(yAxis)
            .selectAll('text').attr('class', 'axisText');
            
        // Labels
        this.svg.append('text')
            .attr('x', this.innerWidth / 2)
            .attr('y', this.innerHeight + 40)
            .attr('text-anchor', 'middle')
            .attr('class', 'axisText')
            .style('font-weight', 'bold')
            .text('Year');

        this.svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -this.innerHeight / 2)
            .attr('y', -50)
            .attr('text-anchor', 'middle')
            .attr('class', 'axisText')
            .style('font-weight', 'bold')
            .text('Accumulation Share (%)');
            
        // Interactive Guideline Setup
        this.guideline = this.svg.append('line')
            .attr('class', 'guidelineLine')
            .attr('y1', 0)
            .attr('y2', this.innerHeight)
            .style('opacity', 0);
            
        // Invisible overlay for capturing mouse movements
        this.overlay = this.svg.append('rect')
            .attr('width', this.innerWidth)
            .attr('height', this.innerHeight)
            .style('fill', 'none')
            .style('pointer-events', 'all');
    }

    render(instant = false) {
        if (!this.svg) this.init();
        if (this.isRendered && !instant) return;
        
        const areaGenerator = d3.area()
            .x(d => this.xScale(new Date(d.data.year, 0, 1)))
            .y0(d => this.yScale(d[0]))
            .y1(d => this.yScale(d[1]))
            .curve(d3.curveMonotoneX);

        const areas = this.svg.selectAll('.layer')
            .data(this.stackedData);

        const duration = instant ? 0 : 1200; 
        
        const enterAreas = areas.enter()
            .append('path')
            .attr('class', (d, i) => i === 0 ? 'layer areaRetail' : 'layer areaInst')
            .attr('d', d3.area() // Animate from bottom
                .x(d => this.xScale(new Date(d.data.year, 0, 1)))
                .y0(this.yScale(0))
                .y1(this.yScale(0))
                .curve(d3.curveMonotoneX)
            );
            
        enterAreas.merge(areas)
            .transition()
            .duration(duration)
            .ease(d3.easeCubicOut)
            .attr('d', areaGenerator);
            
        // Interactive Mouse Move Logic
        const bisectDate = d3.bisector(d => new Date(d.year, 0, 1)).left;
        
        this.overlay.on('mousemove', (event) => {
            const x0 = this.xScale.invert(d3.pointer(event)[0]);
            const i = bisectDate(this.timelineData, x0, 1);
            const d0 = this.timelineData[i - 1];
            const d1 = this.timelineData[i];
            
            // Find closest data point
            let d = d0;
            if (d1 && x0 - new Date(d0.year, 0, 1) > new Date(d1.year, 0, 1) - x0) {
                d = d1;
            }
            
            const px = this.xScale(new Date(d.year, 0, 1));
            
            this.guideline
                .attr('x1', px)
                .attr('x2', px)
                .style('opacity', 1);
                
            this.tooltip.style('opacity', 1)
                .html(`<strong>Year: ${d.year}</strong><br/>Retail: ${d.retail}%<br/>Institutional: ${d.institutional}%`)
                .style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        });
        
        this.overlay.on('mouseout', () => {
            this.guideline.style('opacity', 0);
            this.tooltip.style('opacity', 0);
        });

        this.isRendered = true;
    }
}
