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
                    const lang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
                    const t = i18n[lang];
                    
                    const popupContent = `
                        <div class="tooltipHeader">${t.tooltipSovereignState}: ${countryData.country}</div>
                        <div class="tooltipRow"><span class="tooltipLabel">${t.tooltipReserves}:</span> <span style="color:#ef4444">${exactVolumeText} BTC</span></div>
                        <div style="color:#cbd5e1; padding: 5px 0 0 0; font-size: 12px;">${countryData.details}</div>
                    `;
                    layer.bindPopup(popupContent, { closeButton: false });
                    
                    layer.on('mouseover', function () {
                        this.openPopup();
                        this.setStyle({ fillOpacity: 1, weight: 2, color: '#ef4444' });
                    });
                    layer.on('mouseout', function () {
                        this.closePopup();
                        this.setStyle({ fillOpacity: 0.8, weight: 1, color: '#333333' });
                    });
                }
            };

            // Utilisation native de L geoJSON() pour afficher la carte choroplethe
            this.geoJsonLayer = L.geoJSON(worldGeoJson, {
                style: getCountryStyle,
                onEachFeature: onEachFeatureInteraction
            }).addTo(this.map);
            
            this.isRendered = true;
        } catch (error) {
            console.error('Erreur lors du chargement du fichier externe :', error);
        }
    }
}
