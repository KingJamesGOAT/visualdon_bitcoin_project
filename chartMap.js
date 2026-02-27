class MapChart {
    constructor(containerId, geoData, tooltipElement) {
        this.containerId = containerId;
        this.geoData = geoData; // Donnees contenant les reserves exactes
        this.map = null;
        this.tooltip = tooltipElement;
        this.isRendered = false;
        this.geoJsonLayer = null;
        
        // Suppression du contenu precedent
        document.getElementById(this.containerId).innerHTML = '';
    }

    init() {
        this.map = L.map(this.containerId, {
            center: [30, 0],
            zoom: 2,
            minZoom: 2,
            maxBounds: [[-90, -180], [90, 180]],
            maxBoundsViscosity: 1.0,
            worldCopyJump: false,
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: false,
            doubleClickZoom: false
        });

        // Tuile de base sombre
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(this.map);
    }

    async render() {
        if (this.isRendered) return;
        
        try {
            // Requete fetch vers CDN public pour les frontieres mondiales au format GeoJSON
            const response = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
            const worldGeoJson = await response.json();
            
            // Echelle de couleurs proportionnelle aux reserves exactes
            const maxBtc = d3.max(this.geoData, d => d.btc);
            const colorScale = d3.scaleSequential(d3.interpolateReds)
                .domain([0, maxBtc]);

            // Fonction de style dynamique
            const getCountryStyle = (feature) => {
                // Correspondance avec les donnees
                const countryName = feature.properties.ADMIN || feature.properties.name || feature.properties.name_en;
                // Ajustement specifique pour USA et UK car les noms GeoJSON peuvent varier
                let dataMatchName = countryName;
                if (countryName === "United States of America") dataMatchName = "United States";
                
                const countryData = this.geoData.find(d => d.country === dataMatchName || d.id === feature.id);
                
                if (countryData && countryData.btc > 0) {
                    return {
                        fillColor: colorScale(countryData.btc),
                        weight: 1,
                        opacity: 1,
                        color: '#333333',
                        fillOpacity: 0.8
                    };
                }
                
                // Style neutre et discret pour les autres pays sans reserves
                return {
                    fillColor: '#1a1a1a',
                    weight: 1,
                    opacity: 0.5,
                    color: '#333333',
                    fillOpacity: 0.2
                };
            };
            
            // Interaction native par feature
            const onEachFeatureInteraction = (feature, layer) => {
                const countryName = feature.properties.ADMIN || feature.properties.name || feature.properties.name_en;
                let dataMatchName = countryName;
                if (countryName === "United States of America") dataMatchName = "United States";
                
                const countryData = this.geoData.find(d => d.country === dataMatchName || d.id === feature.id);
                
                if (countryData && countryData.btc > 0) {
                    const exactVolumeText = countryData.btc.toLocaleString();
                    
                    layer.on('mouseover', (event) => {
                        const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
                        const t = window.i18n[lang];
                        
                        const popupContent = `
                            <div class="tooltipHeader">${t.tooltipSovereignState}: ${countryData.country}</div>
                            <div class="tooltipRow"><span class="tooltipLabel">${t.tooltipReserves}:</span> <span style="font-weight:700; color:#ef4444">${exactVolumeText} BTC</span></div>
                            <div style="color:#cbd5e1; padding: 5px 0 0 0; font-size: 12px; line-height: 1.3;">${countryData.details}</div>
                        `;
                        
                        this.tooltip.html(popupContent).style('opacity', 1);
                        layer.setStyle({ fillOpacity: 1, weight: 2, color: '#ef4444' });
                    });
                    
                    layer.on('mousemove', (event) => {
                        this.tooltip.style('left', (event.originalEvent.pageX + 15) + 'px')
                                    .style('top', (event.originalEvent.pageY - 15) + 'px');
                    });
                    
                    layer.on('mouseout', (event) => {
                        this.tooltip.style('opacity', 0);
                        layer.setStyle({ fillOpacity: 0.8, weight: 1, color: '#333333' });
                    });
                }
            };

            // Utilisation native de L geoJSON() pour afficher la carte choroplethe
            this.geoJsonLayer = L.geoJSON(worldGeoJson, {
                style: getCountryStyle,
                onEachFeature: onEachFeatureInteraction
            }).addTo(this.map);
            
            this.generateLeaderboard();
            
            this.isRendered = true;
        } catch (error) {
            console.error('Erreur lors du chargement du fichier externe :', error);
        }
    }
    
    generateLeaderboard() {
        const container = document.getElementById('countryLeaderboard');
        if (!container) return;
        
        // Clear previous content
        container.innerHTML = '';
        
        const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
        const t = window.i18n[lang];
        
        // Header
        const headerHtml = `
            <div class="leaderboardHeader">
                <span class="leaderboardTitle" data-i18n="leaderboardTitle">${t.leaderboardTitle || "Sovereign Holdings"}</span>
            </div>
            <div class="leaderboardColumns">
                <span data-i18n="leaderboardRank">Rank</span>
                <span data-i18n="leaderboardCountry">Country</span>
                <span data-i18n="leaderboardHoldings">Holdings (BTC)</span>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', headerHtml);
        
        // Sort data descending by absolute BTC size
        const sortedData = [...this.geoData].sort((a, b) => b.btc - a.btc);
        
        // Rows
        sortedData.forEach((d, index) => {
            if (d.btc > 0) {
                const row = document.createElement('div');
                row.className = 'leaderboardRow';
                
                row.innerHTML = `
                    <span class="leaderboardRank">#${index + 1}</span>
                    <span class="leaderboardName">${d.country}</span>
                    <span class="leaderboardBtc">${d.btc.toLocaleString()}</span>
                `;
                
                // Click interaction: fly map
                row.addEventListener('click', () => {
                   if (this.map) {
                       this.map.flyTo([d.lat, d.lon], 4, {
                           duration: 1.5,
                           easeLinearity: 0.25
                       });
                   }
                });
                
                container.appendChild(row);
            }
        });
        
        // Prevent scroll propagation to isolate scrolling within the leaderboard
        container.addEventListener('wheel', (e) => {
            e.stopPropagation(); // Stops the event from reaching the document body.
            // Also need to manually scroll the container so it doesn't freeze
            container.scrollTop += e.deltaY;
            e.preventDefault(); // Stop standard behavior which causes page snap scrolling
        }, { passive: false });
    }
}
