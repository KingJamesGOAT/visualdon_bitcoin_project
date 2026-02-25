class ChartGlobal {
    constructor(containerId, geoData, tooltipElement) {
        this.containerId = containerId;
        this.geoData = geoData;
        this.map = null;
        this.tooltip = tooltipElement;
        this.isRendered = false;
        
        document.getElementById(this.containerId).innerHTML = '';
    }

    init() {
        this.map = L.map(this.containerId, {
            center: [30, -10],
            zoom: 2,
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: false,
            doubleClickZoom: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        L.svg().addTo(this.map);
    }

    render() {
        if (this.isRendered) return;
        
        const svg = d3.select(`#${this.containerId}`).select("svg");
        let g = svg.select("g.leaflet-zoom-hide");
        if (g.empty()) g = svg.append("g").attr("class", "leaflet-zoom-hide");

        const maxBtc = d3.max(this.geoData, d => d.btc);
        const radiusScale = d3.scaleSqrt()
            .domain([0, maxBtc])
            .range([0, 50]); 

        const projectPoint = (lat, lon) => {
            return this.map.latLngToLayerPoint(new L.LatLng(lat, lon));
        };

        const circles = g.selectAll(".geoCircle").data(this.geoData, d => d.id);

        const enterCircles = circles.enter()
            .append("circle")
            .attr("class", "geoCircle leaflet-interactive")
            .attr("cx", d => projectPoint(d.lat, d.lon).x)
            .attr("cy", d => projectPoint(d.lat, d.lon).y)
            .attr("r", 0)
            .on("mouseover", (event, d) => {
                const html = `
                    <div class="tooltipHeader">Sovereign State: ${d.country}</div>
                    <div class="tooltipRow"><span class="tooltipLabel">Est. Reserves:</span> <span style="color:#ef4444">${d.btc.toLocaleString()} BTC</span></div>
                    <div style="margin-top:8px; font-size:12px; color:#cbd5e1; max-width:260px">${d.details}</div>
                    <div style="margin-top:8px; font-size:11px; color:#38bdf8; font-style:italic">Click marker to zoom location.</div>
                `;
                this.tooltip.html(html).style('opacity', 1);
            })
            .on("mousemove", (event) => {
                this.tooltip.style('left', (event.pageX + 20) + 'px').style('top', (event.pageY - 20) + 'px');
            })
            .on("mouseout", () => {
                this.tooltip.style('opacity', 0);
            })
            .on("click", (event, d) => {
                // Feature: Click to zoom to country
                this.map.flyTo([d.lat, d.lon], 5, {
                    animate: true,
                    duration: 1.5 // Fluid 1.5s zoom transition
                });
            });

        enterCircles.merge(circles)
            .attr("cx", d => projectPoint(d.lat, d.lon).x)
            .attr("cy", d => projectPoint(d.lat, d.lon).y)
            .transition().duration(1200) // Minimum 800ms
            .attr("r", d => radiusScale(d.btc));

        // When map moves/zooms via our click handler, SVG needs updating
        this.map.on("move", () => {
            g.selectAll(".geoCircle")
                .attr("cx", d => projectPoint(d.lat, d.lon).x)
                .attr("cy", d => projectPoint(d.lat, d.lon).y);
        });

        this.isRendered = true;
    }
}
