class AppManager {
    constructor() {
        this.currentStep = -1;
        this.data = null;
        this.liveApiData = null; // Storing CoinGecko Treasury Data
        this.currentLang = 'en'; // Initialisation de la langue par defaut
        
        // Chart instances
        this.cypherpunkChart = null;
        this.institutionalChart = null;
        this.globalMap = null;
        this.timelineChart = null;
        this.distributionChart = null;

        this.init();
    }

    async init() {
        try {
            // Recuperation des donnees locales depuis data.json
            const response = await fetch('data.json');
            this.data = await response.json();
            
            // Convertir les chaines de dates en objets Date pour la timeline historique
            if (this.data.timeline) {
                this.data.timeline.forEach(d => {
                    d.date = new Date(d.date);
                });
            }
            
            // 2. Fetch Live CoinGecko API Data
            await this.fetchLiveTreasuryData();
            
            // 3. Setup Vis
            this.initializeCharts();
            this.setupScrollObserver();
            this.setupLanguageSwitcher();
            
            // Trigger first step
            this.handleStepActivation(0);
        } catch (error) {
            console.error("Initialization error:", error);
        }
    }

    async fetchLiveTreasuryData() {
        try {
            console.log("Fetching live data from CoinGecko API...");
            const res = await fetch('https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin');
            const json = await res.json();
            if (json && json.companies) {
                this.liveApiData = json.companies;
            }
        } catch(e) {
            console.error("CoinGecko API failed. Falling back.", e);
            // Fallback mock if API strict rate limited
            this.liveApiData = [
                { name: "MicroStrategy", total_holdings: 214246 },
                { name: "Tesla", total_holdings: 9720 },
                { name: "Coinbase Global", total_holdings: 9480 },
                { name: "Marathon Digital Holdings", total_holdings: 16930 }
            ];
        }
    }
    
    // La fonction de generation de donnees aleatoires a ete supprimee pour des raisons d ethique
    // Les donnees proviennent d un ensemble json massif et realiste

    setupLanguageSwitcher() {
        const btn = document.getElementById('langSwitchBtn');
        if (!btn) return;
        
        btn.addEventListener('click', () => {
            this.switchLanguage();
        });
        
        // Initialisation du texte par defaut au cas ou
        this.updateDOMTexts();
    }

    switchLanguage() {
        // 1. Basculer la propriete
        this.currentLang = this.currentLang === 'en' ? 'fr' : 'en';
        
        // 2. Mettre a jour le bouton (affiche la langue opposee)
        const btn = document.getElementById('langSwitchBtn');
        if (btn) {
            btn.textContent = this.currentLang === 'en' ? 'FR' : 'EN';
        }
        
        // 3. Parcourir et injecter les nouveaux textes via l attribut data-i18n
        this.updateDOMTexts();
        
        // 4. Mettre a jour les graphiques (legendes et labels internes si necessaire)
        this.updateChartsLanguage();
    }

    updateDOMTexts() {
        const dict = i18n[this.currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                // Pour supporter les balises HTML dans certaines traductions (comme les citations)
                if (key === 'quoteCypherpunk') {
                     el.innerHTML = dict[key];
                } else {
                     el.textContent = dict[key];
                }
            }
        });
    }

    updateChartsLanguage() {
        // Reload graphic distributions to force label updates
        // The D3 transitions will handle changes smoothly
        if (this.currentStep === 4 && this.distributionChart) {
            this.distributionChart.render();
        }
    }

    initializeCharts() {
        const tooltip = d3.select('#globalTooltip');
        
        if (typeof ChartCypherpunk !== 'undefined') {
            this.cypherpunkChart = new ChartCypherpunk('#cypherpunkContainer', tooltip);
            this.cypherpunkChart.init();
        }
        if (typeof ChartInstitutional !== 'undefined') {
            // Institutional stands alone now
            this.institutionalChart = new ChartInstitutional('#institutionalContainer', this.liveApiData, tooltip);
        }
        if (typeof MapChart !== 'undefined') {
            this.globalMap = new MapChart('mapContainer', this.data.geoMap, tooltip);
            this.globalMap.init();
        }
        if (typeof ChartTimeline !== 'undefined') {
            this.timelineChart = new ChartTimeline('#timelineContainer', this.data.timeline, tooltip);
            this.timelineChart.init();
        }
        if (typeof ChartModernDistribution !== 'undefined') {
            this.distributionChart = new ChartModernDistribution('#distributionContainer', this.data.snapshot, tooltip);
            this.distributionChart.init();
            
            // Set up transformation triggers
            document.getElementById('btnTransformDonut').addEventListener('click', () => {
                this.distributionChart.transformToDonut();
            });
            document.getElementById('btnTransformBar').addEventListener('click', () => {
                this.distributionChart.transformToBar();
            });
        }
        
        // Setup TOC clicks
        document.querySelectorAll('.tocItem').forEach(item => {
            item.addEventListener('click', (e) => {
                const targetStep = e.currentTarget.getAttribute('data-target');
                const targetElement = document.querySelector(`.stepBlock[data-step="${targetStep}"]`);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupScrollObserver() {
        const stepBlocks = document.querySelectorAll('.stepBlock');
        
        // V3 Rule
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepIndex = parseInt(entry.target.getAttribute('data-step'));
                    
                    stepBlocks.forEach(block => block.classList.remove('isActive'));
                    entry.target.classList.add('isActive');

                    if (stepIndex !== this.currentStep) {
                        this.currentStep = stepIndex;
                        this.handleStepActivation(stepIndex);
                        
                        // Update TOC Highlight
                        document.querySelectorAll('.tocItem').forEach(item => item.classList.remove('isActive'));
                        const activeToc = document.querySelector(`.tocItem[data-target="${stepIndex}"]`);
                        if (activeToc) activeToc.classList.add('isActive');
                    }
                }
            });
        }, observerOptions);

        stepBlocks.forEach(block => observer.observe(block));
    }

    toggleLayer(layerId) {
        document.querySelectorAll('.vizLayer').forEach(layer => {
            if (layer.id !== layerId) {
                layer.classList.remove('isActive');
            }
        });
        const activeLayer = document.getElementById(layerId);
        if (activeLayer && !activeLayer.classList.contains('isActive')) {
            activeLayer.classList.add('isActive');
        }
    }

    handleStepActivation(stepIndex) {
        d3.select('#globalTooltip').style('opacity', 0);

        switch (stepIndex) {
            case 0:
                // When 0 is active: Settle cypherpunk
                if (this.institutionalChart) {
                    if (this.institutionalChart.simulation) this.institutionalChart.simulation.stop();
                    d3.select('#institutionalContainer').selectAll('svg').remove(); // Wipe canvas clean
                    this.institutionalChart.isRendered = false;
                }
                
                this.toggleLayer('cypherpunkContainer');
                
                // Show floating date
                const dateEl = document.getElementById('floatingDate');
                if (dateEl) dateEl.classList.add('isVisible');
                
                // Restart cypherpunk softly
                if (this.cypherpunkChart) {
                    this.cypherpunkChart.renderScattered();
                }
                break;
                
            case 1:
                // When 1 is active: Freeze Cypherpunk, Fade it out, Start Institutional
                if (this.cypherpunkChart && this.cypherpunkChart.simulation) {
                    this.cypherpunkChart.simulation.stop();
                }
                
                // Keep cypherpunk conceptually "underneath" but fade it
                const cypherLayer = document.getElementById('cypherpunkContainer');
                if (cypherLayer) {
                    cypherLayer.style.opacity = "0";
                    cypherLayer.style.pointerEvents = "none";
                }
                
                // Hide floating date
                const dateEl2 = document.getElementById('floatingDate');
                if (dateEl2) dateEl2.classList.remove('isVisible');
                
                this.toggleLayer('institutionalContainer');
                
                if (this.institutionalChart && !this.institutionalChart.isRendered) {
                    this.institutionalChart.init();
                    this.institutionalChart.render();
                }
                break;
            case 2:
                this.toggleLayer('mapContainer');
                if (this.globalMap) {
                    setTimeout(() => this.globalMap.map.invalidateSize(), 800);
                    this.globalMap.render();
                }
                break;
            case 3:
                this.toggleLayer('timelineContainer');
                if (this.timelineChart) this.timelineChart.render();
                break;
            case 4:
                this.toggleLayer('distributionContainer');
                if (this.distributionChart) this.distributionChart.render();
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppManager();
});
