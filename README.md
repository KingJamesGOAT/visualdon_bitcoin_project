# Visualisation de la Centralisation Institutionnelle du Bitcoin

> Projet réalisé par Nabil Mohamed Hagos et Steve Benjamin dans le cadre du cours de visualisation de données.

**Vision et Thématique**
Ce projet a pour ambition d'explorer l'univers des cryptomonnaies, un domaine que nous étudions depuis plusieurs années. L'un de nous gérant déjà un site web dédié à l'investissement et à la gestion de fortune, cet intérêt personnel nous oriente naturellement vers l'analyse de ces données financières complexes.

Nous allons nous concentrer spécifiquement sur le Bitcoin. En tant que première monnaie numérique historique, notre objectif sera de dévoiler et de visualiser l'influence écrasante des grandes entreprises et des États. Ce documentaire web interactif aura pour but de permettre aux personnes non initiées de comprendre très rapidement la répartition réelle des richesses grâce à des éléments visuels clairs et accessibles.

## Contexte des données

Les informations qui nourriront cette visualisation proviendront de trois sources principales. Les statistiques macroéconomiques et l'historique des portefeuilles seront extraits de Glassnode et CoinMetrics, tandis que les coordonnées cartographiques mondiales seront issues de Natural Earth.

Ces données feront l'objet d'une étude critique de notre part. Nous mettrons en lumière un biais majeur inhérent à ces sources. Les plateformes analytiques ne pouvant identifier formellement que les portefeuilles publiquement déclarés, une immense quantité d'institutions opérant de manière anonyme sera de facto sous représentée. Par ailleurs, les millions d'utilisateurs particuliers étant amalgamés dans une masse statistique globale, nous veillerons à souligner cette invisibilisation des acteurs individuels au profit des grands volumes financiers.

## Description de la structure

L'intégralité des données sera compilée, nettoyée et unifiée dans un fichier local unique au format JSON. Ce choix architectural garantira la stabilité de l'application et figera les statistiques historiques pour notre analyse.

Ce fichier s'organisera autour de trois grands axes :
1. Des valeurs temporelles stockées sous forme de chaînes de caractères puis converties en objets Date Javascript pour générer la chronologie historique.
2. Des valeurs numériques quantitatives illustrant les pourcentages exacts de possession répartis entre les portefeuilles particuliers et les acteurs institutionnels.
3. Des données spatiales au format GeoJSON contenant les coordonnées géométriques multipolygonales nécessaires au tracé précis des frontières souveraines.

## But et intention narrative

L'approche adoptée sera résolument explicative. Plutôt que de proposer une simple exploration libre, l'application guidera le lecteur à travers un parcours prédéfini et structuré.

L'histoire que nous allons raconter illustrera un basculement idéologique majeur. Elle démontrera comment une technologie créée par des activistes pour échapper au système bancaire traditionnel a été progressivement absorbée par la haute finance. Le regard porté sur ces statistiques se voudra critique. Les visualisations successives auront pour fonction de mettre en évidence la fracture grandissante de la répartition des richesses numériques et la disparition graduelle de l'utilisateur individuel face à l'accumulation corporative.

## Références et inspirations

Pour mener à bien ce récit interactif, le ton visuel sombre, le minimalisme et l'utilisation de couleurs de contraste s'inspireront directement des infographies financières développées par Bloomberg et le Financial Times.

La structure narrative de l'application reposera sur un défilement vertical pilotant l'animation des graphiques et l'apparition du texte. Cette méthode, profondément inspirée par les essais visuels du studio The Pudding, nous permettra de fragmenter une quantité massive d'informations statistiques complexes en une succession d'étapes fluides et digestes.
