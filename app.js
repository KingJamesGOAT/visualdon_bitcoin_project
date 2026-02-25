class AppManager {
    constructor() {
        this.currentStep = -1;
        this.data = null;
        
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
            const response = await fetch('data.json');
            this.data = await response.json();
            this.initializeCharts();
            this.setupScrollObserver();
            // Trigger first step
            this.handleStepActivation(0);
        } catch (error) {
            console.error("Failed to load data or init app:", error);
        }
    }

    initializeCharts() {
        if (typeof ChartCypherpunk !== 'undefined') {
            this.cypherpunkChart = new ChartCypherpunk('#cypherpunkContainer', this.data);
            this.cypherpunkChart.init();
        }
        if (typeof ChartInstitutional !== 'undefined' && this.cypherpunkChart) {
            // Institutional chart shares the SVG/Simulation of Cypherpunk for smooth transition
            this.institutionalChart = new ChartInstitutional(this.cypherpunkChart, this.data);
        }
        if (typeof ChartGlobal !== 'undefined') {
            this.globalMap = new ChartGlobal('mapContainer', this.data);
            this.globalMap.init();
        }
        if (typeof ChartTimeline !== 'undefined') {
            this.timelineChart = new ChartTimeline('#timelineContainer', this.data);
            this.timelineChart.init();
        }
        if (typeof ChartModernDistribution !== 'undefined') {
            this.distributionChart = new ChartModernDistribution('#distributionContainer', this.data);
            this.distributionChart.init();
        }
    }

    setupScrollObserver() {
        const stepBlocks = document.querySelectorAll('.stepBlock');
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
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
        // Hide tooltip globally on step change
        d3.select('#interactionTooltip').style('opacity', 0);

        switch (stepIndex) {
            case 0:
                // Step 1: Cypherpunk
                this.toggleLayer('cypherpunkContainer');
                if (this.cypherpunkChart) this.cypherpunkChart.renderScattered();
                break;
            case 1:
                // Step 2: Institutional (Re-uses cypherpunk container!)
                this.toggleLayer('cypherpunkContainer');
                if (this.institutionalChart) this.institutionalChart.renderConsolidated();
                break;
            case 2:
                // Step 3: Global Map
                this.toggleLayer('mapContainer');
                if (this.globalMap) {
                    // Timeout to let CSS display block kick in before Leaflet calcs size
                    setTimeout(() => this.globalMap.map.invalidateSize(), 500);
                    this.globalMap.render();
                }
                break;
            case 3:
                // Step 4: Timeline Area Chart
                this.toggleLayer('timelineContainer');
                if (this.timelineChart) this.timelineChart.render();
                break;
            case 4:
                // Step 5: Modern Distribution Bar Chart
                this.toggleLayer('distributionContainer');
                if (this.distributionChart) this.distributionChart.render();
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppManager();
});
