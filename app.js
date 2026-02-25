class AppManager {
    constructor() {
        this.currentStep = -1;
        this.data = null;
        this.liveApiData = null; // Storing CoinGecko Treasury Data
        
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
            // 1. Fetch Local Data
            const response = await fetch('data.json');
            this.data = await response.json();
            
            // 1.5 Generate deep dense mock dataset for timeline
            this.generateDenseTimelineData();
            
            // 2. Fetch Live CoinGecko API Data
            await this.fetchLiveTreasuryData();
            
            // 3. Setup Vis
            this.initializeCharts();
            this.setupScrollObserver();
            
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
    
    generateDenseTimelineData() {
        // Generates hundreds of data points for a smooth timeline
        const timeline = [];
        let currentVol = 100; // 100% Retail start
        const startDate = new Date(2010, 0, 1).getTime();
        const endDate = new Date(2024, 0, 1).getTime();
        const steps = 150; // Dense points
        const stepTime = (endDate - startDate) / steps;
        
        for (let i = 0; i <= steps; i++) {
            const date = new Date(startDate + stepTime * i);
            
            // Non-linear s-curve drop for retail ownership
            const progress = i / steps;
            const drop = Math.pow(progress, 1.5) * 85; 
            const retail = Math.max(10, 100 - drop + (Math.random() * 2 - 1)); // add jitter
            const inst = 100 - retail;
            
            timeline.push({
                date: date,
                retail: +retail.toFixed(2),
                institutional: +inst.toFixed(2)
            });
        }
        this.data.timeline = timeline;
    }

    initializeCharts() {
        const tooltip = d3.select('#globalTooltip');
        
        if (typeof ChartCypherpunk !== 'undefined') {
            this.cypherpunkChart = new ChartCypherpunk('#cypherpunkContainer', tooltip);
            this.cypherpunkChart.init();
        }
        if (typeof ChartInstitutional !== 'undefined' && this.cypherpunkChart) {
            // Institutional uses live data!
            this.institutionalChart = new ChartInstitutional(this.cypherpunkChart, this.liveApiData, tooltip);
        }
        if (typeof ChartGlobal !== 'undefined') {
            this.globalMap = new ChartGlobal('mapContainer', this.data.geoMap, tooltip);
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
    }

    setupScrollObserver() {
        const stepBlocks = document.querySelectorAll('.stepBlock');
        
        // V3 Rule: Threshold exactly 0.6 so transitions only happen when significantly centered
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
                    }
                }
            });
        }, observerOptions);

        stepBlocks.forEach(block => observer.observe(block));
    }

    toggleLayer(layerId) {
        document.querySelectorAll('.vizLayer').forEach(layer => {
            layer.classList.remove('isActive');
        });
        const activeLayer = document.getElementById(layerId);
        if (activeLayer) activeLayer.classList.add('isActive');
    }

    handleStepActivation(stepIndex) {
        d3.select('#globalTooltip').style('opacity', 0);

        switch (stepIndex) {
            case 0:
                this.toggleLayer('cypherpunkContainer');
                if (this.cypherpunkChart) this.cypherpunkChart.renderScattered();
                break;
            case 1:
                this.toggleLayer('cypherpunkContainer');
                if (this.institutionalChart) this.institutionalChart.renderConsolidated();
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
