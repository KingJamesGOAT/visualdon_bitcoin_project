// Application Entry Point & Scroll Orchestration
const App = {
  currentStep: -1,
  data: null,

  // Components (to be initialized by their respective files)
  bubblesChart: null,
  mapChart: null,
  areaChart: null,

  async init() {
    console.log("Initializing App...");

    // 1. Load Data
    try {
      const response = await fetch("data.json");
      this.data = await response.json();

      // Add a flag to nodes to distinguish them from generated scatter
      this.data.nodes.forEach((n) => (n.isCorporate = true));
    } catch (e) {
      console.error("Error loading data:", e);
    }

    // 2. Initialize Visualizations
    if (typeof BubblesChart !== "undefined") {
      this.bubblesChart = new BubblesChart("#bubblesContainer", this.data);
      this.bubblesChart.init();
    }

    if (typeof MapChart !== "undefined") {
      this.mapChart = new MapChart("mapContainer", this.data);
      this.mapChart.init();
    }

    if (typeof AreaChart !== "undefined") {
      this.areaChart = new AreaChart("#areaContainer", this.data);
      this.areaChart.init();
    }

    // 3. Setup Intersection Observer
    this.setupScrollObserver();

    // Ensure starting state
    this.handleStepActivation(0);
  },

  setupScrollObserver() {
    const stepBlocks = document.querySelectorAll(".stepBlock");

    // Set observer options: trigger when block is around the middle of the screen
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Triggers when roughly centered
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = parseInt(entry.target.getAttribute("data-step"));

          // Update styling for active text
          stepBlocks.forEach((block) => block.classList.remove("is-active"));
          entry.target.classList.add("is-active");

          // If step actually changed, trigger logic
          if (stepIndex !== this.currentStep) {
            this.currentStep = stepIndex;
            this.handleStepActivation(stepIndex);
          }
        }
      });
    }, observerOptions);

    stepBlocks.forEach((block) => {
      observer.observe(block);
    });
  },

  handleStepActivation(stepIndex) {
    console.log(`Activating Step: ${stepIndex}`);

    const bubblesLayer = document.getElementById("bubblesContainer");
    const mapLayer = document.getElementById("mapContainer");
    const areaLayer = document.getElementById("areaContainer");

    switch (stepIndex) {
      case 0:
        // Step 1: Cypherpunk Era (Retail Bubbles)
        bubblesLayer.classList.add("active");
        mapLayer.classList.remove("active");
        areaLayer.classList.remove("active");

        if (this.bubblesChart) this.bubblesChart.renderScattered();
        break;

      case 1:
        // Step 2: Institutional Entry (Merge Bubbles)
        bubblesLayer.classList.add("active");
        mapLayer.classList.remove("active");
        areaLayer.classList.remove("active");

        if (this.bubblesChart) this.bubblesChart.renderConsolidated();
        break;

      case 2:
        // Step 3: Global Accumulation (Leaflet Map)
        bubblesLayer.classList.remove("active");
        mapLayer.classList.add("active");
        areaLayer.classList.remove("active");

        // Map automatically handles its rendering or we trigger it here if needed
        // Leaflet map needs invalidating size if container was hidden
        if (this.mapChart && this.mapChart.map) {
          // Small timeout to allow CSS display/opacity to apply before resize
          setTimeout(() => this.mapChart.map.invalidateSize(), 500);
        }
        break;

      case 3:
        // Step 4: Modern Reality (Area Chart)
        bubblesLayer.classList.remove("active");
        mapLayer.classList.remove("active");
        areaLayer.classList.add("active");

        if (this.areaChart) this.areaChart.render();
        break;
    }
  },
};

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
