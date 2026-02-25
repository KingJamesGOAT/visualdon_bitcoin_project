class MapChart {
    constructor(containerId, data) {
        this.containerId = containerId;
        this.mapData = data.mapData;
        this.map = null;
        this.isRendered = false;
    }

    init() {
        // Initialize Leaflet map
        // Centered roughly on the Atlantic to show US/Europe/El Salvador easily
        this.map = L.map(this.containerId, {
            center: [30, 0],
            zoom: 2,
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: false,
            doubleClickZoom: false
        });

        // Use a dark theme tile layer (CartoDB Dark Matter)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(this.map);

        // SVG overlay for D3 to draw on map
        // Leaflet handles adding an SVG pane
        L.svg().addTo(this.map);
    }

    render() {
        // Select the SVG inside Leaflet pane
        const svg = d3.select(`#${this.containerId}`).select("svg");
        const g = svg.select("g");
        
        // Define scale for map bubbles based on BTC holdings
        const maxBtc = d3.max(this.mapData, d => d.btc);
        const radiusScale = d3.scaleSqrt()
            .domain([0, maxBtc])
            .range([0, 40]); // Max radius 40px

        // Function to project lat/lon to pixel coordinates
        const projectPoint = (lat, lon) => {
            const point = this.map.latLngToLayerPoint(new L.LatLng(lat, lon));
            return point;
        };

        // Bind data
        const circles = g.selectAll(".mapCircle")
            .data(this.mapData, d => d.country);

        // Enter
        circles.enter()
            .append("circle")
            .attr("class", "mapCircle")
            .attr("cx", d => projectPoint(d.lat, d.lon).x)
            .attr("cy", d => projectPoint(d.lat, d.lon).y)
            .attr("r", 0) // Start at 0 for animation
            .merge(circles)
            // Update positioning if map moved/resized, though it's static
            .attr("cx", d => projectPoint(d.lat, d.lon).x)
            .attr("cy", d => projectPoint(d.lat, d.lon).y)
            .transition()
            .duration(1200) // At least 800ms
            .attr("r", d => radiusScale(d.btc));
            
        circles.exit()
            .transition()
            .duration(800)
            .attr("r", 0)
            .remove();

        // Ensure update on map move (if we later enable it)
        this.map.on("viewreset moveend", () => {
            g.selectAll(".mapCircle")
                .attr("cx", d => projectPoint(d.lat, d.lon).x)
                .attr("cy", d => projectPoint(d.lat, d.lon).y);
        });
        
        this.isRendered = true;
    }
}
