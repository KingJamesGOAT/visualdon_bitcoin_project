class ChartTimeline {
    constructor(containerSelector, timelineData, globalTooltip) {
        this.containerSelector = containerSelector;
        this.timelineData = timelineData;
        this.container = d3.select(containerSelector);
        this.tooltip = globalTooltip;
        
        this.margin = {top: 50, right: 50, bottom: 80, left: 80};
        this.svg = null;
        this.isRendered = false;

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
            
        // Setup gradients
        const defs = this.svg.append('defs');
        
        const gradR = defs.append('linearGradient').attr('id', 'gradientRetail').attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
        gradR.append('stop').attr('offset', '0%').style('stop-color', '#38bdf8').style('stop-opacity', 0.8);
        gradR.append('stop').attr('offset', '100%').style('stop-color', '#38bdf8').style('stop-opacity', 0.2);
        
        const gradI = defs.append('linearGradient').attr('id', 'gradientInst').attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
        gradI.append('stop').attr('offset', '0%').style('stop-color', '#f59e0b').style('stop-opacity', 0.8);
        gradI.append('stop').attr('offset', '100%').style('stop-color', '#f59e0b').style('stop-opacity', 0.2);

        this.xScale = d3.scaleTime()
            .domain(d3.extent(this.timelineData, d => d.date))
            .range([0, this.innerWidth]);
            
        this.yScale = d3.scaleLinear()
            .domain([0, 100]) // Y MUST strictly start at zero 
            .range([this.innerHeight, 0]);
            
        this.stack = d3.stack().keys(['retail', 'institutional']);
        this.stackedData = this.stack(this.timelineData);

        const xAxis = d3.axisBottom(this.xScale).ticks(d3.timeYear.every(2));
        const yAxis = d3.axisLeft(this.yScale).tickFormat(d => d + "%");

        this.svg.append('g').attr('class', 'axisLine x-axis').attr('transform', `translate(0,${this.innerHeight})`).call(xAxis)
            .selectAll('text').attr('class', 'axisText');
        this.svg.append('g').attr('class', 'axisLine y-axis').call(yAxis)
            .selectAll('text').attr('class', 'axisText');
            
        // Interactive Bisector Line setup
        this.bisectorLine = this.svg.append('line')
            .attr('class', 'bisectorLine')
            .attr('y1', 0)
            .attr('y2', this.innerHeight)
            .style('opacity', 0);
            
        this.overlay = this.svg.append('rect')
            .attr('width', this.innerWidth)
            .attr('height', this.innerHeight)
            .style('fill', 'transparent')
            .style('pointer-events', 'all');
    }

    render(instant = false) {
        if (!this.svg) this.init();
        if (this.isRendered && !instant) return;
        
        const areaGenerator = d3.area()
            .x(d => this.xScale(d.data.date))
            .y0(d => this.yScale(d[0]))
            .y1(d => this.yScale(d[1]))
            .curve(d3.curveMonotoneX);

        const areas = this.svg.selectAll('.layer').data(this.stackedData);
        const duration = instant ? 0 : 1800; // Complex transition via 1.8s
        
        const enterAreas = areas.enter()
            .append('path')
            .attr('class', (d, i) => i === 0 ? 'layer areaRetail' : 'layer areaInst')
            .attr('d', d3.area()
                .x(d => this.xScale(d.data.date))
                .y0(this.yScale(0))
                .y1(this.yScale(0))
                .curve(d3.curveMonotoneX)
            );
            
        enterAreas.merge(areas)
            .transition()
            .duration(duration)
            .ease(d3.easeCubicOut)
            .attr('d', areaGenerator);
            
        // Setup Interactions
        const bisectDate = d3.bisector(d => d.date).left;
        
        this.overlay.on('mousemove', (event) => {
            const x0 = this.xScale.invert(d3.pointer(event)[0]);
            const i = bisectDate(this.timelineData, x0, 1);
            const d0 = this.timelineData[i - 1];
            const d1 = this.timelineData[i];
            
            let d = d0;
            if (d0 && d1) {
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            } else if (!d0) d = d1;
            else d = d0;
            
            if (!d) return;
            
            const px = this.xScale(d.date);
            
            this.bisectorLine
                .attr('x1', px)
                .attr('x2', px)
                .style('opacity', 1);
                
            const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
            
            // Format labels directly since this graphic doesn't have explicit categories in i18n, but we could use generic "Retail" and "Institutional" words if we want.
            const retailWord = lang === 'fr' ? 'Volume Particuliers' : 'Retail Volume';
            const instWord = lang === 'fr' ? 'Volume Institutionnel' : 'Institutional Volume';
            const dataExtractedWord = lang === 'fr' ? 'Point de donnee extrait' : 'Data Point Extracted';
            
            // For the date we can format it according to the selected language
            const locale = lang === 'fr' ? 'fr-FR' : 'en-US';

            const html = `
                <div class="tooltipHeader">${d.date.toLocaleDateString(locale, {year: 'numeric', month: 'short'})}</div>
                <div class="tooltipRow"><span class="tooltipLabel" style="color:#38bdf8">${retailWord}:</span> <span>${d.retail}%</span></div>
                <div class="tooltipRow"><span class="tooltipLabel" style="color:#f59e0b">${instWord}:</span> <span>${d.institutional}%</span></div>
                <div class="tooltipRow"><span class="tooltipLabel" style="font-size:10px; padding-top:4px">${dataExtractedWord}</span></div>
            `;
                
            this.tooltip.html(html).style('opacity', 1)
                .style('left', (event.pageX + 20) + 'px')
                .style('top', (event.pageY - 20) + 'px');
        });
        
        this.overlay.on('mouseout', () => {
            this.bisectorLine.style('opacity', 0);
            this.tooltip.style('opacity', 0);
        });

        this.isRendered = true;
    }
}
