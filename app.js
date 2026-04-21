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
            this.setupProgressBar();
            this.setupKnowledgeCheck();
            // Trigger first step as -1 (Intro article without graphics)
            this.handleStepActivation(-1);
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
        
        // Re-render map leaderboard text and button
        if (this.globalMap) {
             this.globalMap.updateLanguage();
        }
        
        // Update cypherpunk legend text
        if (this.cypherpunkChart && this.cypherpunkChart.svg) {
            const currentLang = window.app && window.app.currentLang ? window.app.currentLang : 'en';
            const legendTitle = currentLang === 'fr' ? 'Fonds Est. (BTC)' : 'Est. Holding (BTC)';
            this.cypherpunkChart.svg.select('.bubble-legend text').text(legendTitle);
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
            
            // Transform handlers for final chart
            document.getElementById('btnTransformStacked').addEventListener('click', () => {
                if (this.distributionChart) this.distributionChart.transformToStacked();
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

    setupProgressBar() {
        const progressBar = document.getElementById('readingProgressBar');
        if (!progressBar) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupKnowledgeCheck() {
        const buttons = document.querySelectorAll('.quizButton');
        const feedback = document.getElementById('quizFeedback');
        if (buttons.length === 0 || !feedback) return;
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const answer = e.target.getAttribute('data-answer');
                const lang = this.currentLang;
                const t = window.i18n[lang];
                
                // Clear previous states
                buttons.forEach(b => {
                    b.classList.remove('isCorrect', 'isWrong', 'shake');
                });
                feedback.className = 'quizFeedback'; // reset specific classes
                
                if (answer === 'unitedStates') {
                    e.target.classList.add('isCorrect');
                    feedback.textContent = t.quizFeedbackCorrect || "Correct!";
                    feedback.classList.add('textSuccess');
                    
                    // Auto scroll to next step after a short delay
                    setTimeout(() => {
                        const targetElement = document.querySelector('.stepBlock[data-step="3"]');
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }, 1200);
                    
                } else {
                    e.target.classList.add('isWrong', 'shake');
                    feedback.textContent = t.quizFeedbackWrong || "Incorrect.";
                    
                    setTimeout(() => {
                        e.target.classList.remove('shake');
                    }, 500);
                }
            });
        });
    }

    setupScrollObserver() {
        const stepBlocks = document.querySelectorAll('.stepBlock');
        
        // Reduced threshold to 0.4 from 0.6 to prevent needing to scroll "twice" 
        // to officially trigger the next container as 'active'.
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4 
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
        
        // Hide zoom hint globally when not on cypherpunk layer
        if (layerId !== 'cypherpunkContainer') {
            const hint = document.getElementById('zoomHint');
            if (hint) hint.style.opacity = '0';
        }
    }

    handleStepActivation(stepIndex) {
        d3.select('#globalTooltip').style('opacity', 0);

        if (stepIndex === 4) {
            document.body.classList.add('is-map-page');
        } else {
            document.body.classList.remove('is-map-page');
        }

        switch (stepIndex) {
            case -1:
                this.toggleLayer('none');
                
                // Explicitly clear cypherpunk inline styles set in case 0
                const cypherLayerHideIntro = document.getElementById('cypherpunkContainer');
                if (cypherLayerHideIntro) {
                    cypherLayerHideIntro.style.opacity = "0";
                    cypherLayerHideIntro.style.pointerEvents = "none";
                    if (this.cypherpunkChart && this.cypherpunkChart.simulation) {
                         this.cypherpunkChart.simulation.stop();
                    }
                }
                
                const dateElIntro = document.getElementById('floatingDate');
                if (dateElIntro) dateElIntro.classList.remove('isVisible');
                break;
                
            case 0:
                // When 0 is active: Instantly clear Treemap, show Cypherpunk
                if (this.institutionalChart) {
                    d3.select('#institutionalContainer').selectAll('svg').remove(); 
                    this.institutionalChart.isRendered = false;
                }
                
                this.toggleLayer('cypherpunkContainer');
                
                // Show floating date
                const dateEl = document.getElementById('floatingDate');
                if (dateEl) dateEl.classList.add('isVisible');
                
                // Hide Map Leaderboard
                const lb0 = document.getElementById('countryLeaderboard');
                if (lb0) lb0.classList.remove('isVisible');
                
                // Reanimate cypherpunk bubbles implicitly
                if (this.cypherpunkChart) {
                    const cypherLayer = document.getElementById('cypherpunkContainer');
                    if (cypherLayer) {
                        cypherLayer.style.opacity = "1";
                        cypherLayer.style.pointerEvents = "auto";
                    }
                    if (this.cypherpunkChart.simulation) {
                         this.cypherpunkChart.simulation.alpha(0.3).restart();
                    }
                }
                break;
                
            case 1:
                // Interlude 1: The Death of Innocence
                // Pure black background - fade out all visualizations
                this.toggleLayer('none');
                
                // Explicitly clear cypherpunk inline styles set in case 0
                const cypherLayerInterlude1 = document.getElementById('cypherpunkContainer');
                if (cypherLayerInterlude1) {
                    cypherLayerInterlude1.style.opacity = "0";
                    cypherLayerInterlude1.style.pointerEvents = "none";
                }
                
                // Hide floating date 
                const dateEl1 = document.getElementById('floatingDate');
                if (dateEl1) dateEl1.classList.remove('isVisible');
                break;

            case 2:
                // Institutional Accumulation
                const cypherLayerHide = document.getElementById('cypherpunkContainer');
                if (cypherLayerHide) {
                    cypherLayerHide.style.pointerEvents = "none";
                    cypherLayerHide.style.opacity = "0";
                    if (this.cypherpunkChart && this.cypherpunkChart.simulation) {
                         this.cypherpunkChart.simulation.stop();
                    }
                }
                
                const dateEl2 = document.getElementById('floatingDate');
                if (dateEl2) dateEl2.classList.remove('isVisible');
                
                const lb1 = document.getElementById('countryLeaderboard');
                if (lb1) lb1.classList.remove('isVisible');
                
                this.toggleLayer('institutionalContainer');
                
                if (this.institutionalChart && !this.institutionalChart.isRendered) {
                    this.institutionalChart.init();
                    this.institutionalChart.render();
                }
                break;
                
            case 3:
                // Standalone Quiz Step
                this.toggleLayer('institutionalContainer'); // Keep background
                break;
                
            case 4:
                // Map of Power
                this.toggleLayer('mapContainer');
                if (this.globalMap) {
                    setTimeout(() => { if (this.globalMap.map) this.globalMap.map.resize(); }, 800);
                    this.globalMap.render();
                }
                const lb2 = document.getElementById('countryLeaderboard');
                if (lb2 && this.globalMap && this.globalMap.revealed) {
                    lb2.classList.add('isVisible');
                } else if (lb2) {
                    lb2.classList.remove('isVisible');
                }
                break;
                
            case 5:
                // Wealth Gap Timeline
                this.toggleLayer('timelineContainer');
                if (this.timelineChart) this.timelineChart.render();
                
                const lb3 = document.getElementById('countryLeaderboard');
                if (lb3) lb3.classList.remove('isVisible');
                break;
                
            case 6:
                // Interlude 2: Algorithmic Scarcity
                // Pure black background - fade out all visualizations
                this.toggleLayer('none');
                
                // Hide Map Leaderboard just in case
                const lb_interlude2 = document.getElementById('countryLeaderboard');
                if (lb_interlude2) lb_interlude2.classList.remove('isVisible');
                break;

            case 7:
                // Modern Distribution
                this.toggleLayer('distributionContainer');
                if (this.distributionChart) this.distributionChart.render();
                
                const lb4 = document.getElementById('countryLeaderboard');
                if (lb4) lb4.classList.remove('isVisible');
                break;
                
            case 8:
                // End Article (Digital Gold Rush)
                this.toggleLayer('none');
                const lb5 = document.getElementById('countryLeaderboard');
                if (lb5) lb5.classList.remove('isVisible');
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppManager();
    
    // Zen Mode Toggle Logic
    const zenBtn = document.getElementById('zenModeToggle');
    const zenArrowLeft = document.getElementById('zenArrowLeft');
    const zenArrowRight = document.getElementById('zenArrowRight');
    
    if (zenBtn) {
        zenBtn.addEventListener('click', () => {
            const isZen = document.body.classList.toggle('zen-mode');
            if (isZen) {
                zenArrowLeft.style.display = 'none';
                zenArrowRight.style.display = 'block';
            } else {
                zenArrowLeft.style.display = 'block';
                zenArrowRight.style.display = 'none';
            }
        });
    }
});
