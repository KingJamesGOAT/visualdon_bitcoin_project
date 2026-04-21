class MapChart {
    constructor(containerId, geoData, tooltipElement) {
        this.containerId = containerId;
        this.geoData = geoData;
        this.tooltip = tooltipElement;
        this.map = null;
        this.isRendered = false;
        this.revealed = false;
        this.spinning = true;
        this.animationFrameId = null;

        // GeoJSON uses "United States of America", our data uses "United States"
        this.geoNameMap = { "United States": "United States of America" };
        this.reverseNameMap = { "United States of America": "United States" };

        document.getElementById(this.containerId).innerHTML = '';

        // Build the toggle button
        this.btn = document.createElement('button');
        const lang = window.app?.currentLang || 'en';
        const t = window.i18n ? window.i18n[lang] : { leaderboardTitle: 'Sovereign Holdings' };
        this.btn.textContent = t.leaderboardTitle || 'Sovereign Holdings';
        this.btn.className = 'sovereignBtn';
        this.btn.addEventListener('click', () => this._onButtonClick());
    }

    init() {
        if (this.map) return;

        this.map = new maplibregl.Map({
            container: this.containerId,
            style: {
                version: 8,
                sources: {
                    esri: {
                        type:  'raster',
                        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
                        tileSize: 256
                    }
                },
                layers: [{ id: 'basemap', type: 'raster', source: 'esri' }]
            },
            center: [0, 20],
            zoom: 1.5,
            minZoom: 1,
            maxZoom: 15
        });

        this.map.on('style.load', () => {
            this.map.setProjection({ type: 'globe' });
        });

        document.getElementById(this.containerId).appendChild(this.btn);

        // Stop spinning if user interacts
        this.map.on('dragstart', () => { this.spinning = false; });
        this.map.on('zoomstart', () => { this.spinning = false; });

        // Gentle auto-rotation
        let lng = 0;
        this.spinGlobe = () => {
            if (!this.spinning) return;
            lng += 0.08;
            if (lng > 180) lng -= 360;
            this.map.setCenter([lng, 20]);
            this.animationFrameId = requestAnimationFrame(this.spinGlobe);
        };

        this.map.on('load', async () => {
            try {
                const res  = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
                const geojson = await res.json();

                this.map.addSource('countries', { type: 'geojson', data: geojson });

                // Layer 1: faint world borders for reference
                this.map.addLayer({
                    id:     'world-borders',
                    type:   'line',
                    source: 'countries',
                    paint:  { 'line-color': '#ffffff', 'line-width': 0.3, 'line-opacity': 0.15 }
                });

                // Layer 2: red fill for BTC countries — hidden until reveal
                this.map.addLayer({
                    id:     'btc-fill',
                    type:   'fill',
                    source: 'countries',
                    filter: ['boolean', false],   // hide everything initially
                    paint:  { 'fill-color': '#ef4444', 'fill-opacity': 0.45 }
                });

                // Layer 3: thick glowing red border for BTC countries — hidden until reveal
                this.map.addLayer({
                    id:     'btc-border',
                    type:   'line',
                    source: 'countries',
                    filter: ['boolean', false],   // hide everything initially
                    paint:  { 'line-color': '#ff2222', 'line-width': 3, 'line-opacity': 1 }
                });

                // Hover tooltip (only works after reveal)
                this.map.on('mousemove', 'btc-fill', (e) => {
                    if (!this.revealed || !e.features.length) return;
                    const geoName  = e.features[0].properties.name;
                    const ourName  = this.reverseNameMap[geoName] || geoName;
                    const entry    = this.geoData.find(d => d.country === ourName);
                    if (!entry) return;

                    const lang = window.app?.currentLang || 'en';
                    const t    = window.i18n[lang];
                    const translatedCountry = t['country_' + entry.country.replace(/\s+/g, '')] || entry.country;
                    const translatedDetails = t['mapDetails_' + entry.country.replace(/\s+/g, '')] || entry.details;

                    this.map.getCanvas().style.cursor = 'pointer';
                    this.tooltip
                        .html(`
                            <div class="tooltipHeader">🏛 ${translatedCountry}</div>
                            <div class="tooltipRow">
                                <span class="tooltipLabel">${t.tooltipReservesMap || 'Reserves:'}</span>
                                <span style="font-weight:700;color:#ef4444">${entry.btc.toLocaleString()} BTC</span>
                            </div>
                            <div style="margin-top:6px;color:#94a3b8;font-size:12px;line-height:1.5">${translatedDetails}</div>
                        `)
                        .style('opacity', 1)
                        .style('left',  (e.originalEvent.pageX + 15) + 'px')
                        .style('top',   (e.originalEvent.pageY - 15) + 'px');
                });

                this.map.on('mouseleave', 'btc-fill', () => {
                    this.map.getCanvas().style.cursor = '';
                    this.tooltip.style('opacity', 0);
                });

                // Fly to country on click
                this.map.on('click', 'btc-fill', (e) => {
                    if (!this.revealed || !e.features.length) return;
                    const geoName  = e.features[0].properties.name;
                    const ourName  = this.reverseNameMap[geoName] || geoName;
                    const entry    = this.geoData.find(d => d.country === ourName);
                    if (!entry) return;

                    this.map.flyTo({ center: [entry.lon, entry.lat], zoom: 4.5, duration: 1800 });
                });

                this.isRendered = true;
                if (!this.revealed) this.spinGlobe();

            } catch (err) {
                console.error('GeoJSON load failed:', err);
            }
        });
    }

    async render() {
        // Ensure leaderboard is built at least once
        const lb = document.getElementById('countryLeaderboard');
        if (lb && !lb.innerHTML) {
            this.generateLeaderboard();
        }

        // Show button right away
        this.btn.style.display = 'block';

        if (this.isRendered) {
            // Coming back to this step — restore state
            if (this.revealed) {
                if (lb) lb.classList.add('isVisible');
            }
            return;
        }

        this.init(); // Fallback in case not called, though app.js calls it early
    }

    _onButtonClick() {
        if (this.revealed) return;
        this.revealed = true;
        this.btn.classList.add('revealedState');

        if (!this.isRendered) {
            // GeoJSON still loading — wait until it's ready then reveal
            const wait = setInterval(() => {
                if (this.isRendered) {
                    clearInterval(wait);
                    this._applyReveal();
                }
            }, 200);
        } else {
            this._applyReveal();
        }
    }

    _applyReveal() {
        try {
            // Stop spinning
            this.spinning = false;
            cancelAnimationFrame(this.animationFrameId);

            // Build the list of GeoJSON names for the 6 BTC countries
            const btcNames = this.geoData
                .filter(d => d.btc > 0)
                .map(d => this.geoNameMap[d.country] || d.country);

            // Apply the filter — this is what makes them visible
            const showFilter = ['in', 'name'].concat(btcNames);
            this.map.setFilter('btc-fill',   showFilter);
            this.map.setFilter('btc-border', showFilter);

            // Sweep camera
            this.map.flyTo({ center: [-20, 35], zoom: 2.0, duration: 2500 });
        } catch (e) {
            console.error("Map reveal error:", e);
        }

        // Reveal leaderboard immediately
        const lb = document.getElementById('countryLeaderboard');
        if (lb) lb.classList.add('isVisible');
    }

    updateLanguage() {
        const lang = window.app?.currentLang || 'en';
        const t    = window.i18n ? window.i18n[lang] : { leaderboardTitle: 'Sovereign Holdings' };
        if (this.btn) {
            this.btn.textContent = t.leaderboardTitle || 'Sovereign Holdings';
        }
        this.generateLeaderboard();
    }

    generateLeaderboard() {
        const container = document.getElementById('countryLeaderboard');
        if (!container) return;
        container.innerHTML = '';

        const lang = window.app?.currentLang || 'en';
        const t    = window.i18n[lang];

        container.insertAdjacentHTML('beforeend', `
            <div class="leaderboardColumns" style="margin-top: 0.5rem;">
                <span>${t.leaderboardRank    || 'Rank'}</span>
                <span>${t.leaderboardCountry || 'Country'}</span>
                <span>${t.leaderboardHoldings|| 'Holdings (BTC)'}</span>
            </div>
        `);

        [...this.geoData]
            .sort((a, b) => b.btc - a.btc)
            .filter(d => d.btc > 0)
            .forEach((d, i) => {
                const translatedCountry = t['country_' + d.country.replace(/\s+/g, '')] || d.country;
                const row = document.createElement('div');
                row.className = 'leaderboardRow';
                row.innerHTML = `
                    <span class="leaderboardRank">#${i + 1}</span>
                    <span class="leaderboardName">${translatedCountry}</span>
                    <span class="leaderboardBtc">${d.btc.toLocaleString()}</span>
                `;
                row.addEventListener('click', () => {
                    if (this.map && this.revealed) {
                        this.map.flyTo({ center: [d.lon, d.lat], zoom: 4.5, duration: 1800 });
                    }
                });
                container.appendChild(row);
            });

        container.addEventListener('wheel', (e) => {
            e.stopPropagation();
            container.scrollTop += e.deltaY;
            e.preventDefault();
        }, { passive: false });
    }
}
