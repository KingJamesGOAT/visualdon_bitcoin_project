const i18n = {
    en: {
        // App Title & TOC
        pageTitle: "Bitcoin: A Structural Analysis of Institutional Centralization",
        tocCypherpunk: "1. Cypherpunk",
        tocInstitutional: "2. Institutional",
        tocMap: "3. Map of Power",
        tocWealthGap: "4. Wealth Gap",
        tocDistribution: "5. Distribution",

        // Section 1: Cypherpunk
        floatingDate: "2009 - 2012",
        zoomHint: "Hold Ctrl & Scroll to Zoom",
        titleCypherpunk: "1. The Cypherpunk Network",
        quoteCypherpunk: "\"I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party.\" <br>— Satoshi Nakamoto, 2008",
        descCypherpunk1: "The genesis era of the Bitcoin protocol was characterized by extreme decentralization. The network was secured by an anarchic collective of early cryptography enthusiasts, gamers, and libertarians mining from personal computers.",
        metricCypherpunk: "Hover over the nodes to explore simulated early wallet addresses from 2009-2012.",
        descCypherpunk2: "During this period, no single entity held enough absolute supply to unilaterally influence market dynamics. It was a true peer-to-peer lattice.",

        // Section 2: Institutional
        titleInstitutional: "2. Institutional Accumulation (Live Data)",
        descInstitutional1: "As the asset matured into a recognized absolute store of value, the dynamic shattered. Major financial players and publicly traded corporations entered.",
        metricInstitutional1: "The nodes below are visualizing live data directly from the CoinGecko Public Treasury API.",
        metricInstitutional2: "Hover over the massive bubbles to reveal the exact reserves of entities like MicroStrategy and Tesla. Notice how the chaotic retail web is swallowed by gravitational massive corporate pools whose area maps strictly to their total reserves.",

        // Corporate Descriptions (Treemap Tooltips)
        corp_MicroStrategy: "A pioneer in corporate adoption, aggressively accumulating Bitcoin as a primary treasury reserve asset.",
        corp_Tesla: "Major electric vehicle manufacturer that allocated a portion of its cash reserves to Bitcoin in 2021.",
        corp_Coinbase: "One of the largest cryptocurrency exchanges, holding significant reserves for operational and investment purposes.",
        corp_Marathon: "A leading Bitcoin mining company holding its mined assets rather than selling immediately.",
        corp_Block: "Financial services and mobile payment company (formerly Square) focused on democratizing Bitcoin access.",
        corp_Hut8: "North American digital asset mining pioneer with a long-term 'HODL' strategy on its mined reserves.",
        corp_Riot: "Large-scale Bitcoin mining infrastructure company holding significant portions of its production.",
        corp_Generic: "A publicly traded company allocating a portion of its treasury to Bitcoin as a hedge against fiat debasement.",

        // Section 3: Map of Power
        titleMap: "3. The Map of Power",
        descMap1: "The financial arms race inevitably escalated to the sovereign tier. While Bitcoin respects no borders, its accumulation heavily favors specific geopolitical coordinates.",
        quoteMap: "\"Sovereign treasuries now utilize sophisticated strategies to acquire massive reserves, often through aggressive seizures or structural national adoption laws.\"",
        metricMap: "Hover markers for estimated government holdings. Click a marker to zoom deep into that sovereign territory.",

        // Tooltips (Dynamic)
        tooltipClickMarker: "Click marker to zoom location.",
        tooltipSovereignState: "Sovereign State",
        tooltipReserves: "Total Confirmed Reserves",
        tooltipEstReserves: "Est. Reserves",
        leaderboardTitle: "Sovereign Holdings",
        leaderboardRank: "Rank",
        leaderboardCountry: "Country",
        leaderboardHoldings: "Holdings (BTC)",
        // Distributions Categories
        catRetail: "Retail (< 10 BTC)",

        // Section 4: Wealth Timeline
        titleTimeline: "4. The Wealth Gap Timeline",
        descTimeline1: "To truly understand the structural shift, we must view the long-term historical trend. This dense dataset tracks the percentage of supply owned by the original \"Retail\" cohorts versus \"Institutional/Whale\" entities over time.",
        metricTimeline1: "Move your cursor across the chart. The interactive bisector will follow your movement, extracting precise chronological volume metrics.",
        descTimeline2: "The rapid narrowing of the blue retail volume showcases the inescapable trajectory of capital concentration in finite-supply systems.",

        // Section 5: Distribution
        titleDistribution: "5. The Modern Distribution",
        descDistribution1: "Today, the landscape is permanently altered. The market resembles a traditional financial pyramid categorized by varying brackets of immense wealth.",
        descDistribution2: "To adhere to strict data visualization ethics, the vertical axis begins explicitly at zero, ensuring accurate perception of volume disparities.",
        // Controls
        btnTransformStacked: "View as Stacked Distribution",
        btnTransformBar: "Revert to Bar Chart",
        metricDistribution: "Interact with the charts directly. Use the button above to observe a smooth structural transformation from vertical bars to a single horizontal stacked vector. All elements maintain hover state interactivity.",

        // Distributions Categories
        catExchanges: "Centralized Exchanges",
        catETFs: "Corporate ETFs & Trusts",
        catMiners: "Mining Infrastructure",
        catStates: "Sovereign States",
        catLost: "Lost / Unmoved (>10yr)"
    },
    fr: {
        // App Title & TOC
        pageTitle: "Bitcoin: Une Analyse Structurelle de la Centralisation Institutionnelle",
        tocCypherpunk: "1. Cypherpunks",
        tocInstitutional: "2. Institutionnels",
        tocMap: "3. Carte du Pouvoir",
        tocWealthGap: "4. Ecart de Richesse",
        tocDistribution: "5. Distribution",

        // Section 1: Cypherpunk
        floatingDate: "2009 - 2012",
        zoomHint: "Maintenez Ctrl & Molette pour Zoomer",
        titleCypherpunk: "1. Le Reseau Cypherpunk",
        quoteCypherpunk: "\"J'ai travaille sur un nouveau systeme de paiement electronique entierement pair-a-pair, sans tiers de confiance.\" <br>— Satoshi Nakamoto, 2008",
        descCypherpunk1: "L'ere de la genese du protocole Bitcoin etait caracterisee par une decentralisation extreme. Le reseau etait securise par un collectif anarchique compose des premiers enthousiastes de la cryptographie, de joueurs et de libertariens minant depuis leurs ordinateurs personnels.",
        metricCypherpunk: "Survolez les noeuds pour explorer des adresses de portefeuilles simulees de la periode 2009-2012.",
        descCypherpunk2: "Au cours de cette periode, aucune entite unique ne detenait une offre absolue suffisante pour influencer unilateralement les dynamiques du marche. Il s'agissait d'un veritable maillage pair-a-pair.",

        // Section 2: Institutional
        titleInstitutional: "2. Accumulation Institutionnelle (Donnees en Direct)",
        descInstitutional1: "A mesure que l'actif a muri pour devenir une reserve de valeur absolue reconnue, la dynamique a ete bouleversee. Les acteurs financiers majeurs et les entreprises cotees en bourse y ont fait leur entree.",
        metricInstitutional1: "Les noeuds ci-dessous visualisent des donnees en direct directement importees de l'API CoinGecko Public Treasury.",
        metricInstitutional2: "Survolez les bulles massives pour reveler les reserves institutionnelles exactes d'entites telles que MicroStrategy et Tesla. Observez comment le reseau chaotique de detail (retail) est englouti par d'immenses pools gravitationnels d'entreprises dont la surface symbolise strictement leurs reserves totales.",

        // Corporate Descriptions (Treemap Tooltips)
        corp_MicroStrategy: "Pionnier de l'adoption corporative, accumulant agressivement du Bitcoin comme actif de reserve de tresorerie principal.",
        corp_Tesla: "Fabricant majeur de vehicules electriques ayant alloue une part de ses liquidites au Bitcoin en 2021.",
        corp_Coinbase: "L'une des plus grandes plateformes d'echange, detenant d'importantes reserves a des fins operationnelles et d'investissement.",
        corp_Marathon: "Leader du minage de Bitcoin conservant ses actifs mines plutot que de les vendre immediatement.",
        corp_Block: "Societe de services financiers et paiements mobiles (ex-Square) focalisee sur la democratisation de l'acces au Bitcoin.",
        corp_Hut8: "Pionnier nord-americain du minage d'actifs numeriques avec une strategie long terme de conservation ('HODL').",
        corp_Riot: "Entreprise d'infrastructure de minage a grande echelle conservant des parts significatives de sa production.",
        corp_Generic: "Entreprise cotee en bourse allouant une part de sa tresorerie au Bitcoin pour se couvrir contre l'inflation.",

        // Section 3: Map of Power
        titleMap: "3. La Carte du Pouvoir",
        descMap1: "La course aux armements financiers s'est inevitablement etendue a l'echelle souveraine. Bien que le Bitcoin ne respecte aucune frontiere, son accumulation favorise lourdement certaines coordonnees geopolitiques specifiques.",
        quoteMap: "\"Les tresoreries souveraines utilisent desormais des strategies sophistiquees pour acquerir des reserves massives, souvent par le biais de saisies agressives ou de lois structurelles d'adoption nationale.\"",
        metricMap: "Survolez les marqueurs pour voir les avoirs gouvernementaux estimes. Cliquez sur un marqueur pour zoomer sur ce territoire souverain.",

        // Tooltips (Dynamic)
        tooltipClickMarker: "Cliquez sur le marqueur pour zoomer.",
        tooltipSovereignState: "Etat Souverain",
        tooltipReserves: "Reserves Totales Confirmees",
        tooltipEstReserves: "Reserves est.",
        leaderboardTitle: "Reserves Souveraines",
        leaderboardRank: "Rang",
        leaderboardCountry: "Pays",
        leaderboardHoldings: "Fonds (BTC)",

        // Section 4: Wealth Timeline
        titleTimeline: "4. L'Evolution de l'Ecart de Richesse",
        descTimeline1: "Pour reellement comprendre ce changement structurel, nous devons analyser la tendance historique sur le long terme. Ce jeu de donnees dense retrace, au fil du temps, le pourcentage de l'offre detenu par les cohortes de details d'origine face aux entites institutionnelles ou 'Baleines'.",
        metricTimeline1: "Deplacez votre curseur a travers le graphique. La ligne intersecante interactive suivra votre mouvement, extrayant avec precision les metriques chronologiques de volume.",
        descTimeline2: "Le retrecissement rapide du volume bleu alloue aux particuliers illustre de facon indeniable la trajectoire implacable de la concentration du capital au sein des systemes a offre finie.",

        // Section 5: Distribution
        titleDistribution: "5. La Distribution Moderne",
        descDistribution1: "Aujourd'hui, le paysage a ete definitivement altere. Le marche s'apparente desormais a une pyramide financiere traditionnelle, subdivisee en multiples niveaux d'immense richesse.",
        descDistribution2: "Conformement a une stricte ethique en matiere de visualisation des donnees, l'axe vertical debute explicitement a zero pour garantir une perception exacte des disproportions de volume.",
        // Controls
        btnTransformStacked: "Voir en Distribution Cumulee",
        btnTransformBar: "Revenir au Diagramme a Barres",
        metricDistribution: "Interagissez directement avec les graphiques. Utilisez le bouton ci-dessus pour observer une transformation structurelle fluide des barres verticales vers un vecteur horizontal unique et cumule. Tous les elements conservent leur interactivite au survol.",

        // Tooltips (Dynamic)
        tooltipClickMarker: "Cliquez sur le marqueur pour zoomer.",
        tooltipSovereignState: "Etat Souverain",
        tooltipReserves: "Reserves",
        tooltipEstReserves: "Reserves est.",
        // Distributions Categories
        catRetail: "Particuliers (< 10 BTC)",
        catExchanges: "Echanges Centralises",
        catETFs: "ETFs & Fonds d'Entreprises",
        catMiners: "Infrastructure de Minage",
        catStates: "Etats Souverains",
        catLost: "Perdus / Inactifs (>10ans)"
    }
};

// Rendons i18n globalement accessible
if (typeof exports !== 'undefined') {
    module.exports = { i18n };
} else {
    window.i18n = i18n;
}
