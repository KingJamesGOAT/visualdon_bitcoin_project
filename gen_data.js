const fs = require('fs');

const timeline = [];
let currentVol = 100;
const startDate = new Date(2010, 0, 1).getTime();
const endDate = new Date(2024, 0, 1).getTime();

// Mensuel de 2010 a 2024 (12 * 14 = 168 points)
for (let year = 2010; year <= 2024; year++) {
    for (let month = 0; month < 12; month++) {
        if (year === 2024 && month > 0) break; // Seulement le debut de 2024

        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-01`;
        
        let retail = 100;
        let institutional = 0;
        
        if (year < 2013) {
            retail = 99.9;
        } else if (year >= 2013 && year < 2017) {
            retail = 99.9 - ((year - 2013) * 2 + month * 0.16);
        } else if (year >= 2017 && year < 2020) {
            retail = 90 - ((year - 2017) * 4 + month * 0.33);
        } else if (year >= 2020 && year < 2024) {
             retail = 75 - ((year - 2020) * 10 + month * 0.83);
        } else if (year === 2024) {
            retail = 35 - month * 1.5;
        }
        
        retail = Math.max(20, retail);
        institutional = parseFloat((100 - retail).toFixed(2));
        retail = parseFloat(retail.toFixed(2));

        timeline.push({
            date: dateString,
            retail: retail,
            institutional: institutional
        });
    }
}

const data = {
    geoMap: [
        { id: "US", country: "United States", lat: 39.0902, lon: -95.7129, btc: 210000, details: "Sovereign reserves and significant corporate accumulations" },
        { id: "CN", country: "China", lat: 35.8617, lon: 104.1954, btc: 190000, details: "Vast reserves accumulated from illicit operations seizures" },
        { id: "UK", country: "United Kingdom", lat: 55.3781, lon: -3.4360, btc: 61245, details: "Seized from international networks" },
        { id: "SV", country: "El Salvador", lat: 13.7942, lon: -88.8965, btc: 5700, details: "First nation to adopt BTC actively purchasing daily" },
        { id: "UA", country: "Ukraine", lat: 48.3794, lon: 31.1656, btc: 46351, details: "Accumulated through international donations" },
        { id: "BT", country: "Bhutan", lat: 27.5142, lon: 90.4336, btc: 13000, details: "Mining heavily via hydro electric power" }
    ],
    snapshot: [
        { id: "retail", category: "Retail", holdings: 2150000, color: "#38bdf8" },
        { id: "exchanges", category: "Exchanges", holdings: 2350000, color: "#818cf8" },
        { id: "etfs", category: "ETFs", holdings: 2850000, color: "#f59e0b" },
        { id: "miners", category: "Miners", holdings: 1300000, color: "#10b981" },
        { id: "states", category: "States", holdings: 550000, color: "#ef4444" },
        { id: "lost", category: "Lost", holdings: 3800000, color: "#475569" }
    ],
    timeline: timeline
};

fs.writeFileSync('C:/Users/sbste/OneDrive/Desktop/HEIG/HEIGMEDIA/HEIG4/2/VisualDonGraphique/visualdon_bitcoin_project/data.json', JSON.stringify(data, null, 4));
console.log("data.json generated");
