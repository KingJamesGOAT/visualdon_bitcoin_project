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
        titleCypherpunk: "1. The Cypherpunk Genesis",
        quoteCypherpunk: "\"I've been working on a new electronic cash system that's fully peer to peer, with no trusted third party.\" <br> Satoshi Nakamoto, 2008",
        descCypherpunk1: "The genesis of the decentralized revolution began in the shadow of the 2008 financial collapse. Early cryptographers and cypherpunks sought to forge a peer to peer electronic cash system fundamentally resistant to state censorship and central banking corruption. This initial network was sustained by an anarchic collective of ideological purists and visionary coders.",
        metricCypherpunk: "Hover over the nodes to explore simulated early wallet addresses from 2009 to 2012.",
        descCypherpunk2: "In this primordial era, no single entity commanded enough absolute supply to unilaterally dictate market dynamics. The distribution represented a true lattice of independent nodes, each driven by a profound conviction in mathematical truth over fiat authority.",

        // Section 2: Institutional
        interlude1Title: "The Death of Innocence",
        interlude1Callout: "The transition from a decentralized cypherpunk experiment to a corporate treasury asset irrevocably altered the fundamental network telemetry.",
        interlude1Text: "What began as an anarchic attempt to bypass the traditional banking sector slowly morphed into the very structure it sought to replace. As the market capitalization swelled into the hundreds of billions, the scattered frontier developers were replaced by suits, boardroom risk assessments, and publicly traded balance sheets. The original vision was rooted in the ashes of the 2008 financial crisis, a silent protest against infinite fiat money printing.",
        interlude1Code: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",

        chapterCard1: "The Corporate Awakening",
        titleInstitutional: "2. Institutional Accumulation (Live Data)",
        descInstitutional1: "As the protocol matured and proved its resilience, the inescapable gravity of traditional finance began to exert its pull. Multinational corporations and publicly traded entities recognized the asset not merely as an experiment, but as an apex store of value and a robust hedge against systemic macroeconomic instability. The pure peer to peer network fragmented.",
        metricInstitutional1: "The nodes below are visualizing live data directly from the CoinGecko Public Treasury API.",
        metricInstitutional2: "Hover over the massive bubbles to reveal the exact reserves of entities like MicroStrategy and Tesla. Notice how the chaotic retail web is swallowed by gravitational massive corporate pools whose area maps strictly to their total reserves.",

        // Quiz
        quizQuestion: "Which sovereign nation holds the most known Bitcoin reserves?",
        quizElSalvador: "El Salvador",
        quizChina: "China",
        quizUnitedStates: "United States",
        quizUnitedKingdom: "United Kingdom",
        quizFeedbackCorrect: "Correct. The United States holds the largest known reserve, primarily from law enforcement seizures.",
        quizFeedbackWrong: "Incorrect. Try again.",

        // Chapter Card 2
        chapterCard2: "The Sovereign Escalation",

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
        descMap1: "The financial arms race has now escalated to the geopolitical stage. Sovereign states, recognizing the absolute strategic imperative of digital scarcity, have quietly begun accumulating massive reserves. This sovereign accumulation occurs through both aggressive law enforcement seizures and structural national adoption mandates, creating a new coordinate system of economic power.",
        quoteMap: "\"Sovereign treasuries now utilize sophisticated strategies to acquire massive reserves, transforming digital assets into state instruments.\"",
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
        descTimeline1: "To fully comprehend this paradigm shift, one must analyze the prolonged historical trajectory. The data reveals a dramatic transition as capital consolidated. The once scattered wealth of the retail pioneers progressively migrated into the treasuries of institutional whales and corporate conglomerates.",
        metricTimeline1: "Move your cursor across the chart. The interactive bisector will follow your movement, extracting precise chronological volume metrics.",
        descTimeline2: "This relentless compression demonstrates the inevitable concentration of capital within strictly finite supply systems. The foundational ideology of decentralization now contends with the overwhelming financial firepower of institutional accumulation.",

        // Section 5: Distribution
        interlude2Title: "Absolute Algorithmic Scarcity",
        interlude2Callout: "The protocol enforces a hard cap of 21,000,000 coins. This absolute scarcity triggers an unprecedented supply shock as global entities compete for a mathematically finite resource.",
        interlude2Text: "Unlike gold, which can be continuously mined from the earth or even extracted from asteroids, or fiat currencies which can be printed infinitely by central banks, this system is governed by rigid, unalterable mathematics. Every single decimal is accounted for. As early adopters hold onto their massive initial reserves, and institutional treasuries relentlessly acquire the remaining liquid supply, new entrants are forced to fight over an increasingly microscopic fraction of the total pie.",
        interlude2Code: "if (total_supply >= 21000000.0) {\n    return HALT_ISSUANCE;\n}",

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
        titleCypherpunk: "1. La Genese Cypherpunk",
        quoteCypherpunk: "\"J'ai travaille sur un nouveau systeme de paiement electronique entierement pair a pair, sans tiers de confiance.\" <br> Satoshi Nakamoto, 2008",
        descCypherpunk1: "La genese de la revolution decentralisee a debute dans l'ombre de l'effondrement financier de 2008. Les premiers cryptographes et cypherpunks ont cherche a forger un systeme d'argent electronique pair a pair, fondamentalement resistant a la censure d'Etat et a la corruption des banques centrales. Ce reseau initial etait soutenu par un collectif anarchique de puristes ideologiques et de codeurs visionnaires.",
        metricCypherpunk: "Survolez les noeuds pour explorer des adresses de portefeuilles simulees de la periode 2009 a 2012.",
        descCypherpunk2: "A cette epoque primordiale, aucune entite ne commandait suffisamment d'offre absolue pour dicter unilateralement la dynamique du marche. La distribution representait un veritable maillage de noeuds independants, chacun guide par une conviction profonde envers la verite mathematique plutot qu'envers l'autorite fiduciaire.",

        // Section 2: Institutional
        interlude1Title: "La Fin de l'Innocence",
        interlude1Callout: "La transition d'une experience cypherpunk decentralisee vers un actif de tresorerie corporatif a irrevocablement altere la telemetrie fondamentale du reseau.",
        interlude1Text: "Ce qui avait commence comme une tentative anarchique de contourner le secteur bancaire traditionnel s'est lentement transforme en la structure meme qu'il cherchait a remplacer. Alors que la capitalisation boursiere a atteint des centaines de milliards, les developpeurs pionniers eparpilles ont ete remplaces par des cadres, des evaluations des risques en conseil d'administration et des bilans d'entreprises cotees en bourse. La vision originale etait ancree dans les cendres de la crise financiere de 2008, une protestation silencieuse contre l'impression monetaire scripturale infinie.",
        interlude1Code: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",

        chapterCard1: "L'Eveil Corporatif",
        titleInstitutional: "2. Accumulation Institutionnelle (Donnees en Direct)",
        descInstitutional1: "Alors que le protocole a muri et prouve sa resilience, la gravite ineluctable de la finance traditionnelle a commence a exercer son attraction. Les multinationales et les entites cotees en bourse ont reconnu cet actif non plus seulement comme une experience, mais comme une reserve de valeur supreme et une protection robuste contre l'instabilite macroeconomique systemique. Le pur reseau pair a pair s'est fragmente.",
        metricInstitutional1: "Les noeuds ci-dessous visualisent des donnees en direct directement importees de l'API CoinGecko Public Treasury.",
        metricInstitutional2: "Survolez les bulles massives pour reveler les reserves institutionnelles exactes d'entites telles que MicroStrategy et Tesla. Observez comment le reseau chaotique de detail (retail) est englouti par d'immenses pools gravitationnels d'entreprises dont la surface symbolise strictement leurs reserves totales.",

        // Quiz
        quizQuestion: "Quelle nation souveraine detient les plus grandes reserves connues de Bitcoin ?",
        quizElSalvador: "Le Salvador",
        quizChina: "La Chine",
        quizUnitedStates: "Les Etats Unis",
        quizUnitedKingdom: "Le Royaume Uni",
        quizFeedbackCorrect: "Correct. Les Etats Unis detiennent la plus grande reserve connue, principalement issue de saisies.",
        quizFeedbackWrong: "Incorrect. Essayez encore.",

        // Chapter Card 2
        chapterCard2: "L'Escalade Souveraine",

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
        descMap1: "La course aux armements financiers a desormais atteint le theatre geopolitique. Les Etats souverains, reconnaissant l'imperatif strategique absolu de la rarete numerique, ont discretement commence a accumuler des reserves massives. Cette accumulation souveraine se produit a la fois via des saisies agressives ordonnees par la justice et des mandats d'adoption nationale structurelle, creant ainsi un nouveau systeme de coordonnees de la puissance economique.",
        quoteMap: "\"Les tresoreries souveraines utilisent desormais des strategies sophistiquees pour acquerir des reserves massives, transformant cet actif en instrument d'Etat.\"",
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
        descTimeline1: "Pour reellement comprendre ce changement paradigmatique, il faut analyser la trajectoire historique prolongee. Les donnees revelent une transition dramatique au fur et a mesure que le capital s'est consolide. La richesse autrefois eparpillee des pionniers s'est progressivement deplacee vers les tresoreries des baleines institutionnelles et des conglomerats d'entreprises.",
        metricTimeline1: "Deplacez votre curseur a travers le graphique. La ligne intersecante interactive suivra votre mouvement, extrayant avec precision les metriques chronologiques de volume.",
        descTimeline2: "Cette compression implacable demontre la concentration inevitable du capital au sein des systemes a offre strictement limitee. L'ideologie fondatrice de la decentralisation doit desormais composer avec la puissance de feu ecrasante de l'accumulation institutionnelle.",

        // Section 5: Distribution
        interlude2Title: "La Rarete Algorithmique Absolue",
        interlude2Callout: "Le protocole impose une limite absolue de 21 000 000 de pieces. Cette rarete intrinseque provoque un choc d'offre sans precedent alors que les entites mondiales rivalisent pour une ressource mathematiquement finie.",
        interlude2Text: "Contrairement a l'or, qui peut etre continuellement extrait de la terre ou meme d'asteroides, ou aux monnaies fiduciaires qui peuvent etre imprimees a l'infini par les banques centrales, ce systeme est regi par des mathematiques rigides et inalterables. Chaque infime decimale est comptabilisee. Alors que les premiers adoptants conservent leurs massives reserves initiales et que les tresoreries institutionnelles acquierent implacablement l'offre liquide restante, les nouveaux entrants sont forces de se battre pour une fraction de plus en plus microscopique du total.",
        interlude2Code: "if (total_supply >= 21000000.0) {\n    return HALT_ISSUANCE;\n}",

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
