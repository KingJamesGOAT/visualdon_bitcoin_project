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

        // Leaderboard & Global Tooltips (Dynamic)
        revealMapBtn: "Reveal Sovereign Reserves",
        tooltipClickMarker: "Click marker to zoom location.",
        tooltipSovereignState: "Sovereign State",
        tooltipReserves: "Total Confirmed Reserves",
        tooltipEstReserves: "Est. Reserves",
        leaderboardTitle: "Sovereign Holdings",
        leaderboardRank: "Rank",
        leaderboardCountry: "Country",
        leaderboardHoldings: "Holdings (BTC)",
        
        // Dynamic Chart Tooltips
        tooltipCypherpunkActive: "Cypherpunk Node Active",
        tooltipWallet: "Wallet:",
        tooltipFirstSeen: "First Seen:",
        tooltipEstHolding: "Est. Holding:",
        tooltipType: "Type:",
        tooltipPublicTreasury: "Public Treasury",
        tooltipTotalHoldings: "Total Holdings:",
        tooltipSupplyShare: "Supply Share:",
        tooltipRetailWord: "Retail Volume",
        tooltipInstWord: "Institutional Volume",
        tooltipDataExtractedWord: "Data Point Extracted",
        tooltipLiveVerification: "Live Snapshot Verification",
        tooltipHoldings: "Holdings:",
        tooltipMaxSupply: "Max Supply %:",
        
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
        catLost: "Lost / Unmoved (>10yr)",

        // The Trustless Ledger
        blockchainTitle: "The Trustless Ledger",
        blockchainText: "Imagine a monumental public record book floating in cyberspace accessible to everyone but controlled by no one. This is the decentralized ledger at the core of the blockchain protocol. Instead of a traditional bank relying on secret internal databases to verify who owns what, the network relies on thousands of independent computers verifying every single transaction simultaneously. When a transfer occurs, the entire network must mathematically agree on its validity before it is permanently sealed into a transparent block of data. This elegant cryptographic consensus completely removes the need for corporate intermediaries, stripping banks of their historical monopoly over financial truth.",
        blockchainQuestion: "But how does it actually work without a traditional bank?",
        blockchainCallout: "The blockchain is not merely a database it is an incorruptible mathematical truth engine that operates around the clock without any centralized authority.",
        q2: "Who actually controls all of this?",
        a2: "Nobody. The protocol is completely decentralized and resistant to state censorship or any single point of failure.",
        q3: "Can the financial records be altered?",
        a3: "Impossible. Once a block is sealed cryptographically, altering it would require an unfathomable amount of computational energy.",
        q4: "What gives the asset its value?",
        a4: "Absolute algorithmic scarcity. The supply is mathematically locked, rendering it completely immune to central bank fiat printing.",
        q5: "Can anyone see my transactions?",
        a5: "It is a fully transparent yet pseudonymous public ledger. The financial truth is verifiable by anyone with a basic laptop.",

        // The Digital Gold Rush
        goldTitle: "The Digital Gold Rush",
        goldText: "The clash of values between physical gold and programmatic money has defined the modern financial era. Both resources share a fundamental premise of extreme scarcity and require immense expenditures of energy to mine. However, physical gold is heavy expensive to transport and practically impossible to audit without melting the bars. In stark contrast, digital gold can be beamed across the planet at the speed of light and its entire global supply can be cryptographically verified by anyone with a basic laptop. As central banks continue to print infinite amounts of fiat currency, the impenetrable mathematics and effortless portability of this new digital standard offer a superior sanctuary for wealth preservation.",
        goldQuote: "PHYSICAL.AUDIT(FAIL) DIGITAL.VERIFICATION(SUCCESS) NETWORK.SECURE",
        goldQ1: "Isn't physical gold safer than digital code?",
        goldA1: "Gold is physically heavy and incredibly expensive to transport or audit securely. Digital gold moves at the speed of light and can be audited by anyone.",
        goldQ2: "Can't the government just seize it?",
        goldA2: "Unlike vault bars which can be literally confiscated by executive order, cryptographic networks are secured by mathematics, severely complicating physical seizure.",
        goldQ3: "What about the massive energy consumption?",
        goldA3: "The energy burned secures the absolute financial ledger, just as earth-moving equipment and smelting infrastructure secure physical gold extraction.",
        goldQ4: "But it's not backed by anything physical!",
        goldA4: "It is backed by the largest and most secure computing network in human history, governed by immutable cryptographic consensus rather than political promises.",
        goldQ5: "Will it eventually replace gold entirely?",
        goldA5: "It fundamentally serves as 'Gold 2.0'—a superior sanctuary for wealth preservation optimized for the instant telemetry of the digital age."
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
        titleCypherpunk: "1. La Genèse Cypherpunk",
        quoteCypherpunk: "\"J'ai travaillé sur un nouveau système de paiement électronique entièrement pair à pair, sans tiers de confiance.\" <br> Satoshi Nakamoto, 2008",
        descCypherpunk1: "La genèse de la révolution décentralisée a débuté dans l'ombre de l'effondrement financier de 2008. Les premiers cryptographes et cypherpunks ont cherché à forger un système d'argent électronique pair à pair, fondamentalement résistant à la censure d'État et à la corruption des banques centrales. Ce réseau initial était soutenu par un collectif anarchique de puristes idéologiques et de codeurs visionnaires.",
        metricCypherpunk: "Survolez les noeuds pour explorer des adresses de portefeuilles simulées de la période 2009 à 2012.",
        descCypherpunk2: "À cette époque primordiale, aucune entité ne commandait suffisamment d'offre absolue pour dicter unilatéralement la dynamique du marché. La distribution représentait un véritable maillage de noeuds indépendants, chacun guidé par une conviction profonde envers la vérité mathématique plutôt qu'envers l'autorité fiduciaire.",

        // Section 2: Institutional
        interlude1Title: "La Fin de l'Innocence",
        interlude1Callout: "La transition d'une expérience cypherpunk décentralisée vers un actif de trésorerie corporatif a irrévocablement altéré la télémétrie fondamentale du réseau.",
        interlude1Text: "Ce qui avait commencé comme une tentative anarchique de contourner le secteur bancaire traditionnel s'est lentement transformé en la structure même qu'il cherchait à remplacer. Alors que la capitalisation boursière a atteint des centaines de milliards, les développeurs pionniers éparpillés ont été remplacés par des cadres, des évaluations des risques en conseil d'administration et des bilans d'entreprises cotées en bourse. La vision originale était ancrée dans les cendres de la crise financière de 2008, une protestation silencieuse contre l'impression monétaire scripturale infinie.",
        interlude1Code: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",

        chapterCard1: "L'Éveil Corporatif",
        titleInstitutional: "2. Accumulation Institutionnelle (Données en Direct)",
        descInstitutional1: "Alors que le protocole a mûri et prouvé sa résilience, la gravité inéluctable de la finance traditionnelle a commencé à exercer son attraction. Les multinationales et les entités cotées en bourse ont reconnu cet actif non plus seulement comme une expérience, mais comme une réserve de valeur suprême et une protection robuste contre l'instabilité macroéconomique systémique. Le pur réseau pair à pair s'est fragmenté.",
        metricInstitutional1: "Les noeuds ci-dessous visualisent des données en direct directement importées de l'API CoinGecko Public Treasury.",
        metricInstitutional2: "Survolez les bulles massives pour révéler les réserves institutionnelles exactes d'entités telles que MicroStrategy et Tesla. Observez comment le réseau chaotique de détail (retail) est englouti par d'immenses pools gravitationnels d'entreprises dont la surface symbolise strictement leurs réserves totales.",

        // Quiz
        quizQuestion: "Quelle nation souveraine détient les plus grandes réserves connues de Bitcoin ?",
        quizElSalvador: "Le Salvador",
        quizChina: "La Chine",
        quizUnitedStates: "Les États-Unis",
        quizUnitedKingdom: "Le Royaume-Uni",
        quizFeedbackCorrect: "Correct. Les États-Unis détiennent la plus grande réserve connue, principalement issue de saisies.",
        quizFeedbackWrong: "Incorrect. Essayez encore.",

        // Chapter Card 2
        chapterCard2: "L'Escalade Souveraine",

        // Corporate Descriptions (Treemap Tooltips)
        corp_MicroStrategy: "Pionnier de l'adoption corporative, accumulant agressivement du Bitcoin comme actif de réserve de trésorerie principal.",
        corp_Tesla: "Fabricant majeur de véhicules électriques ayant alloué une part de ses liquidités au Bitcoin en 2021.",
        corp_Coinbase: "L'une des plus grandes plateformes d'échange, détenant d'importantes réserves à des fins opérationnelles et d'investissement.",
        corp_Marathon: "Leader du minage de Bitcoin conservant ses actifs minés plutôt que de les vendre immédiatement.",
        corp_Block: "Société de services financiers et paiements mobiles (ex-Square) focalisée sur la démocratisation de l'accès au Bitcoin.",
        corp_Hut8: "Pionnier nord-américain du minage d'actifs numériques avec une stratégie long terme de conservation ('HODL').",
        corp_Riot: "Entreprise d'infrastructure de minage à grande échelle conservant des parts significatives de sa production.",
        corp_Generic: "Entreprise cotée en bourse allouant une part de sa trésorerie au Bitcoin pour se couvrir contre l'inflation.",

        // Section 3: Map of Power
        titleMap: "3. La Carte du Pouvoir",
        descMap1: "La course aux armements financiers a désormais atteint le théâtre géopolitique. Les États souverains, reconnaissant l'impératif stratégique absolu de la rareté numérique, ont discrètement commencé à accumuler des réserves massives. Cette accumulation souveraine se produit à la fois via des saisies agressives ordonnées par la justice et des mandats d'adoption nationale structurelle, créant ainsi un nouveau système de coordonnées de la puissance économique.",
        quoteMap: "\"Les trésoreries souveraines utilisent désormais des stratégies sophistiquées pour acquérir des réserves massives, transformant cet actif en instrument d'État.\"",
        metricMap: "Survolez les marqueurs pour voir les avoirs gouvernementaux estimés. Cliquez sur un marqueur pour zoomer sur ce territoire souverain.",

        // Leaderboard & Global Tooltips (Dynamic)
        revealMapBtn: "Révéler les Réserves Souveraines",
        tooltipClickMarker: "Cliquez sur le marqueur pour zoomer.",
        tooltipSovereignState: "État Souverain",
        tooltipReserves: "Réserves Totales Confirmées",
        tooltipEstReserves: "Réserves est.",
        leaderboardTitle: "Réserves Souveraines",
        leaderboardRank: "Rang",
        leaderboardCountry: "Pays",
        leaderboardHoldings: "Fonds (BTC)",
        
        // Dynamic Chart Tooltips
        tooltipCypherpunkActive: "Nœud Cypherpunk Actif",
        tooltipWallet: "Portefeuille :",
        tooltipFirstSeen: "Première Apparition :",
        tooltipEstHolding: "Fonds Est. :",
        tooltipType: "Type :",
        tooltipPublicTreasury: "Trésorerie Publique",
        tooltipTotalHoldings: "Réserves Totales :",
        tooltipSupplyShare: "Part de l'Offre :",
        tooltipRetailWord: "Volume Particuliers",
        tooltipInstWord: "Volume Institutionnel",
        tooltipDataExtractedWord: "Point de donnée extrait",
        tooltipLiveVerification: "Vérification en Direct",
        tooltipHoldings: "Avoirs :",
        tooltipMaxSupply: "% de l'Offre Max :",

        // Section 4: Wealth Timeline
        titleTimeline: "4. L'Évolution de l'Écart de Richesse",
        descTimeline1: "Pour réellement comprendre ce changement paradigmatique, il faut analyser la trajectoire historique prolongée. Les données révèlent une transition dramatique au fur et à mesure que le capital s'est consolidé. La richesse autrefois éparpillée des pionniers s'est progressivement déplacée vers les trésoreries des baleines institutionnelles et des conglomérats d'entreprises.",
        metricTimeline1: "Déplacez votre curseur à travers le graphique. La ligne intersécante interactive suivra votre mouvement, extrayant avec précision les métriques chronologiques de volume.",
        descTimeline2: "Cette compression implacable démontre la concentration inévitable du capital au sein des systèmes à offre strictement limitée. L'idéologie fondatrice de la décentralisation doit désormais composer avec la puissance de feu écrasante de l'accumulation institutionnelle.",

        // Section 5: Distribution
        interlude2Title: "La Rareté Algorithmique Absolue",
        interlude2Callout: "Le protocole impose une limite absolue de 21 000 000 de pièces. Cette rareté intrinsèque provoque un choc d'offre sans précédent alors que les entités mondiales rivalisent pour une ressource mathématiquement finie.",
        interlude2Text: "Contrairement à l'or, qui peut être continuellement extrait de la terre ou même d'astéroïdes, ou aux monnaies fiduciaires qui peuvent être imprimées à l'infini par les banques centrales, ce système est régi par des mathématiques rigides et inaltérables. Chaque infime décimale est comptabilisée. Alors que les premiers adoptants conservent leurs massives réserves initiales et que les trésoreries institutionnelles acquièrent implacablement l'offre liquide restante, les nouveaux entrants sont forcés de se battre pour une fraction de plus en plus microscopique du total.",
        interlude2Code: "if (total_supply >= 21000000.0) {\n    return HALT_ISSUANCE;\n}",

        titleDistribution: "5. La Distribution Moderne",
        descDistribution1: "Aujourd'hui, le paysage a été définitivement altéré. Le marché s'apparente désormais à une pyramide financière traditionnelle, subdivisée en multiples niveaux d'immense richesse.",
        descDistribution2: "Conformément à une stricte éthique en matière de visualisation des données, l'axe vertical débute explicitement à zéro pour garantir une perception exacte des disproportions de volume.",
        
        // Controls
        btnTransformStacked: "Voir en Distribution Cumulée",
        btnTransformBar: "Revenir au Diagramme à Barres",
        metricDistribution: "Interagissez directement avec les graphiques. Utilisez le bouton ci-dessus pour observer une transformation structurelle fluide des barres verticales vers un vecteur horizontal unique et cumulé. Tous les éléments conservent leur interactivité au survol.",

        // Distributions Categories
        catRetail: "Particuliers (< 10 BTC)",
        catExchanges: "Échanges Centralisés",
        catETFs: "ETFs & Fonds d'Entreprises",
        catMiners: "Infrastructure de Minage",
        catStates: "États Souverains",
        catLost: "Perdus / Inactifs (>10ans)",

        // The Trustless Ledger
        blockchainTitle: "Le Registre Sans Confiance",
        blockchainText: "Imaginez un monumental registre public flottant dans le cyberespace accessible à tous mais contrôlé par personne. C'est le registre décentralisé au coeur du protocole blockchain. Au lieu qu'une banque traditionnelle ne s'appuie sur des bases de données internes secrètes pour vérifier qui possède quoi, le réseau s'appuie sur des milliers d'ordinateurs indépendants qui vérifient chaque transaction simultanément. Lorsqu'un transfert a lieu, l'ensemble du réseau doit s'accorder mathématiquement sur sa validité avant qu'elle ne soit scellée de façon permanente dans un bloc de données transparent. Cet élégant consensus cryptographique élimine complètement le besoin d'intermédiaires corporatifs, dépouillant les banques de leur monopole historique sur la vérité financière.",
        blockchainQuestion: "Mais comment cela fonctionne-t-il réellement sans banque traditionnelle ?",
        blockchainCallout: "La blockchain n'est pas simplement une base de données c'est un moteur de vérité mathématique incorruptible qui fonctionne sans interruption et sans aucune autorité centralisée.",
        q2: "Qui contrôle réellement tout cela ?",
        a2: "Personne. Le protocole est complètement décentralisé et résistant à la censure d'État ou à tout point de défaillance unique.",
        q3: "Les registres financiers peuvent-ils être altérés ?",
        a3: "Impossible. Une fois qu'un bloc est scellé cryptographiquement, le modifier requerrait une quantité d'énergie computationnelle incommensurable.",
        q4: "Qu'est-ce qui donne sa valeur à l'actif ?",
        a4: "La rareté algorithmique absolue. L'offre est mathématiquement verrouillée, la rendant totalement immune à l'impression fiduciaire des banques centrales.",
        q5: "Tout le monde peut-il voir mes transactions ?",
        a5: "C'est un registre public totalement transparent mais pseudonyme. La vérité financière est vérifiable par quiconque possède un simple ordinateur.",

        // The Digital Gold Rush
        goldTitle: "La Ruée vers l'Or Numérique",
        goldText: "Le choc des valeurs entre l'or physique et la monnaie programmatique définit l'ère financière moderne. Ces deux ressources partagent le principe fondamental d'une rareté extrême et nécessitent d'immenses dépenses d'énergie pour être minées. Cependant, l'or physique est lourd coûteux à transporter et pratiquement impossible à auditer sans fondre les lingots. En contraste frappant, l'or numérique peut être projeté à travers la planète à la vitesse de la lumière et son offre globale totale peut être vérifiée cryptographiquement par quiconque possède un simple ordinateur portable. Alors que les banques centrales continuent d'imprimer des quantités infinies de monnaie fiduciaire, les mathématiques impénétrables et la portabilité sans effort de ce nouveau standard numérique offrent un sanctuaire supérieur pour la préservation de la richesse.",
        goldQuote: "AUDIT.PHYSIQUE(ECHEC) VERIFICATION.NUMERIQUE(SUCCES) RESEAU.SECURISE",
        goldQ1: "L'or physique n'est-il pas plus sûr qu'un code numérique ?",
        goldA1: "L'or est lourd et incroyablement coûteux à transporter ou à auditer. L'or numérique circule à la vitesse de la lumière et peut être audité par tous.",
        goldQ2: "Le gouvernement ne peut-il pas simplement le saisir ?",
        goldA2: "Contrairement aux lingots qui peuvent être confisqués, les réseaux cryptographiques sont sécurisés par des mathématiques, compliquant sévèrement la saisie physique.",
        goldQ3: "Qu'en est-il de sa consommation massive d'énergie ?",
        goldA3: "L'énergie consommée sécurise le registre financier, tout comme les équipements d'excavation et les fonderies sécurisent l'extraction de l'or physique.",
        goldQ4: "Mais ce n'est adossé à rien de physique !",
        goldA4: "C'est adossé au réseau informatique le plus sûr de l'histoire, régi par un consensus cryptographique immuable plutôt que par des promesses politiques.",
        goldQ5: "Va-t-il finir par remplacer complètement l'or ?",
        goldA5: "Il agit fondamentalement comme un 'Or 2.0', un sanctuaire supérieur pour la préservation de la richesse optimisé pour la télémétrie de l'ère numérique."
    }
};

// Rendons i18n globalement accessible
if (typeof exports !== 'undefined') {
    module.exports = { i18n };
} else {
    window.i18n = i18n;
}
