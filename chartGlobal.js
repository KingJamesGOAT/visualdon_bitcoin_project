class ChartGlobal {
    constructor(containerId, data) {
        this.containerId = containerId;
        this.geoData = data.geoMap;
        this.map = null;
        this.isRendered = false;
        
        // Ensure container is empty before init (in case of re-runs)
        document.getElementById(this.containerId).innerHTML = '';
    }

    init() {
        this.map = L.map(this.containerId, {
            center: [25, -10], // View showing US and Europe well
            zoom: 2,
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: false,
            doubleClickZoom: false
        });

        // Dark financial theme base map
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
        // Leaflet svg pane creates a <g> automatically sometimes, but let's be safe
        let g = svg.select("g.leaflet-zoom-hide");
        if (g.empty()) g = svg.append("g").attr("class", "leaflet-zoom-hide");

        const maxBtc = d3.max(this.geoData, d => d.btc);
        const radiusScale = d3.scaleSqrt()
            .domain([0, maxBtc])
            .range([0, 45]); 

        const projectPoint = (lat, lon) => {
            return this.map.latLngToLayerPoint(new L.LatLng(lat, lon));
        };

        const circles = g.selectAll(".geoCircle")
            .data(this.geoData, d => d.country);

        // We use D3 for the rendering and transition, Leaflet for the map
        const enterCircles = circles.enter()
            .append("circle")
            .attr("class", "geoCircle")
            // Apply cursor pointer since we will have Leaflet popups effectively through click
            .style("cursor", "pointer")
            .attr("cx", d => projectPoint(d.lat, d.lon).x)
            .attr("cy", d => projectPoint(d.lat, d.lon).y)
            .attr("r", 0);
            
        // We use Leaflet popups attached to invisible circle markers for easier interaction handling
        // over the SVG layer
        this.geoData.forEach(d => {
            const popupContent = `<strong>${d.country}</strong><br/>Reserves: ${d.btc.toLocaleString()} BTC<br/><br/><em>${d.details}</em>`;
            const marker = L.circleMarker([d.lat, d.lon], {
                radius: radiusScale(d.btc),
                color: 'transparent',
                fillColor: 'transparent',
                interactive: true
            }).addTo(this.map);
            marker.bindPopup(popupContent);
        });

        enterCircles.merge(circles)
            .attr("cx", d => projectPoint(d.lat, d.lon).x)
            .attr("cy", d => projectPoint(d.lat, d.lon).y)
            .transition()
            .duration(1200) // Minimum 800ms
            .attr("r", d => radiusScale(d.btc));

        this.map.on("viewreset moveend", () => {
            g.selectAll(".geoCircle")
                .attr("cx", d => projectPoint(d.lat, d.lon).x)
                .attr("cy", d => projectPoint(d.lat, d.lon).y);
        });

        this.isRendered = true;
    }
}
