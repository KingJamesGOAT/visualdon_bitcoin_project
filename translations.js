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
        catLost: "Perdus / Inactifs (>10ans)",

        // The Trustless Ledger
        blockchainTitle: "Le Registre Sans Confiance",
        blockchainText: "Imaginez un monumental registre public flottant dans le cyberespace accessible a tous mais controle par personne. C'est le registre decentralise au coeur du protocole blockchain. Au lieu qu'une banque traditionnelle ne s'appuie sur des bases de donnees internes secretes pour verifier qui possede quoi, le reseau s'appuie sur des milliers d'ordinateurs independants qui verifient chaque transaction simultanement. Lorsqu'un transfert a lieu, l'ensemble du reseau doit s'accorder mathematiquement sur sa validite avant qu'elle ne soit scellee de facon permanente dans un bloc de donnees transparent. Cet elegant consensus cryptographique elimine completement le besoin d'intermediaires corporatifs, depouillant les banques de leur monopole historique sur la verite financiere.",
        blockchainQuestion: "Mais comment cela fonctionne-t-il reellement sans banque traditionnelle ?",
        blockchainCallout: "La blockchain n'est pas simplement une base de donnees c'est un moteur de verite mathematique incorruptible qui fonctionne sans interruption et sans aucune autorite centralisee.",
        q2: "Qui controle reellement tout cela ?",
        a2: "Personne. Le protocole est completement decentralise et resistant a la censure d'Etat ou a tout point de defaillance unique.",
        q3: "Les registres financiers peuvent-ils etre alteres ?",
        a3: "Impossible. Une fois qu'un bloc est scelle cryptographiquement, le modifier requerrait une quantite d'energie computationnelle incommensurable.",
        q4: "Qu'est-ce qui donne sa valeur a l'actif ?",
        a4: "La rarete algorithmique absolue. L'offre est mathematiquement verrouillee, la rendant totalement immune a l'impression fiduciaire des banques centrales.",
        q5: "Tout le monde peut-il voir mes transactions ?",
        a5: "C'est un registre public totalement transparent mais pseudonyme. La verite financiere est verifiable par quiconque possede un simple ordinateur.",

        // The Digital Gold Rush
        goldTitle: "La Ruee vers l'Or Numerique",
        goldText: "Le choc des valeurs entre l'or physique et la monnaie programmatique definit l'ere financiere moderne. Ces deux ressources partagent le principe fondamental d'une rarete extreme et necessitent d'immenses depenses d'energie pour etre minees. Cependant, l'or physique est lourd couteux a transporter et pratiquement impossible a auditer sans fondre les lingots. En contraste frappant, l'or numerique peut etre projete a travers la planete a la vitesse de la lumiere et son offre globale totale peut etre verifiee cryptographiquement par quiconque possede un simple ordinateur portable. Alors que les banques centrales continuent d'imprimer des quantites infinies de monnaie fiduciaire, les mathematiques impenetrables et la portabilite sans effort de ce nouveau standard numerique offrent un sanctuaire superieur pour la preservation de la richesse.",
        goldQuote: "AUDIT.PHYSIQUE(ECHEC) VERIFICATION.NUMERIQUE(SUCCES) RESEAU.SECURISE",
        goldQ1: "L'or physique n'est-il pas plus sur qu'un code numerique ?",
        goldA1: "L'or est lourd et incroyablement couteux a transporter ou a auditer. L'or numerique circule a la vitesse de la lumiere et peut etre audite par tous.",
        goldQ2: "Le gouvernement ne peut-il pas simplement le saisir ?",
        goldA2: "Contrairement aux lingots qui peuvent etre confisques, les reseaux cryptographiques sont securises par des mathematiques, compliquant severement la saisie physique.",
        goldQ3: "Qu'en est-il de sa consommation massive d'energie ?",
        goldA3: "L'energie consommee securise le registre financier, tout comme les equipements d'excavation et les fonderies securisent l'extraction de l'or physique.",
        goldQ4: "Mais ce n'est adosse a rien de physique !",
        goldA4: "C'est adosse au reseau informatique le plus sur de l'histoire, regi par un consensus cryptographique immuable plutot que par des promesses politiques.",
        goldQ5: "Va-t-il finir par remplacer completement l'or ?",
        goldA5: "Il agit fondamentalement comme un 'Or 2.0', un sanctuaire superieur pour la preservation de la richesse optimise pour la telemetrie de l'ere numerique."
    }
};

// Rendons i18n globalement accessible
if (typeof exports !== 'undefined') {
    module.exports = { i18n };
} else {
    window.i18n = i18n;
}
