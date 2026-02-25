class AreaChart {
    constructor(containerSelector, data) {
        this.containerSelector = containerSelector;
        this.areaData = data.areaData;
        this.container = d3.select(containerSelector);
        
        this.margin = {top: 50, right: 50, bottom: 80, left: 80};
        this.updateDimensions();
        
        this.svg = null;
        this.isRendered = false;

        window.addEventListener('resize', () => {
            this.updateDimensions();
            if (this.isRendered) {
                // Remove old SVG and re-render completely to handle resize simply
                this.container.selectAll("svg").remove();
                this.isRendered = false;
                // Only re-render if active
                if (document.querySelector(this.containerSelector).classList.contains('active')) {
                    this.init();
                    this.render(true); // pass true for instant re-render without long anim
                }
            }
        });
    }

    updateDimensions() {
        // Area chart takes up bottom half or so, centered
        this.width = window.innerWidth * 0.8;
        this.height = window.innerHeight * 0.6;
        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;
    }

    init() {
        // Appends to a centered wrapper
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
            
        // Setup scales
        this.xScale = d3.scaleTime()
            .domain(d3.extent(this.areaData, d => new Date(d.year, 0, 1)))
            .range([0, this.innerWidth]);
            
        // Convert to percentage (stacked 100%) or raw. We will use absolute stacked
        // The data is percentages though (retail+inst = 100)
        this.yScale = d3.scaleLinear()
            .domain([0, 100]) // Y MUST strictly start at zero
            .range([this.innerHeight, 0]);
            
        // Stack setup
        this.stack = d3.stack()
            .keys(['retail', 'institutional'])
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);
            
        this.stackedData = this.stack(this.areaData);

        // Axes setup
        const xAxis = d3.axisBottom(this.xScale)
            .ticks(d3.timeYear.every(2))
            .tickFormat(d3.timeFormat('%Y'));
            
        const yAxis = d3.axisLeft(this.yScale)
            .tickFormat(d => d + "%");

        this.svg.append('g')
            .attr('class', 'axisLine x-axis')
            .attr('transform', `translate(0,${this.innerHeight})`)
            .call(xAxis)
            .selectAll('text').attr('class', 'axisText');
            
        this.svg.append('g')
            .attr('class', 'axisLine y-axis')
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
            .text('Network Accumulation Share');
    }

    render(instant = false) {
        if (!this.svg) this.init();
        if (this.isRendered && !instant) return;
        
        // Define Area generator
        const areaGenerator = d3.area()
            .x(d => this.xScale(new Date(d.data.year, 0, 1)))
            .y0(d => this.yScale(d[0]))
            .y1(d => this.yScale(d[1]))
            .curve(d3.curveMonotoneX);

        // Select paths
        const areas = this.svg.selectAll('.layer')
            .data(this.stackedData);

        const duration = instant ? 0 : 1500; // >800ms
        
        const enterAreas = areas.enter()
            .append('path')
            .attr('class', (d, i) => i === 0 ? 'layer areaRetail' : 'layer areaInst')
            // Initial state for animation: flat at bottom
            .attr('d', d3.area()
                .x(d => this.xScale(new Date(d.data.year, 0, 1)))
                .y0(this.yScale(0))
                .y1(this.yScale(0))
                .curve(d3.curveMonotoneX)
            );
            
        const mergedAreas = enterAreas.merge(areas);
            
        mergedAreas.transition()
            .duration(duration)
            .ease(d3.easeCubicOut)
            // Final state
            .attr('d', areaGenerator);
            
        // Legend
        const legend = this.svg.append('g')
            .attr('transform', `translate(${this.innerWidth - 120}, 20)`);
            
        legend.append('rect').attr('x', 0).attr('y', 0).attr('width', 15).attr('height', 15).attr('fill', '#f59e0b');
        legend.append('text').attr('x', 25).attr('y', 12).attr('class', 'axisText').text('Institutional');
        
        legend.append('rect').attr('x', 0).attr('y', 25).attr('width', 15).attr('height', 15).attr('fill', '#3b82f6');
        legend.append('text').attr('x', 25).attr('y', 37).attr('class', 'axisText').text('Retail / Cypherpunk');
        
        // Only animate legend opacity if not instant
        if (!instant && !this.isRendered) {
             legend.style('opacity', 0).transition().delay(duration).duration(500).style('opacity', 1);
        }

        this.isRendered = true;
    }
}
