# Projet VisualDon

Une application web narrative et interactive explorant la centralisation institutionnelle du marche Bitcoin, developpee avec D3 et Leaflet pour le cours de VisualDon.

## L Equipe

- Auteurs : Nabil Mohamed Hagos et steve benjamin.

## Methodologie et sources des donnees

Afin de garantir l ethique et la parfaite transparence de notre visualisation, les donnees historiques decrivant l evolution du reseau proviennent exclusivement de sources fiables et reconnues comme Glassnode et CoinMetrics.
Ces donnees brutes ont ensuite ete nettoyees et agregees via des scripts de preparation rigoureux. Le but de ces manipulations etait d extraire uniquement les proportions exactes de possession entre les entites particulieres (Retail) et les entites institutionnelles. Cette approche repond a notre souci de transparence et d ethique des donnees en evitant toute generation aleatoire.
Enfin, les donnees cartographiques exploitent un format ouvert et standardise, puisqu elles utilisent le format ouvert GeoJSON de Natural Earth.

## Objectif Principal

Developper une application web narrative et interactive utilisant strictement du code HTML pur, du CSS natif et JavaScript. Le theme central est la centralisation institutionnelle du marche des cryptomonnaies. Le design visuel doit imperativement utiliser un fond sombre et une interface epuree inspirant la finance moderne.

## Architecture de l Application

L application est divisee en deux parties majeures :

1. Une section narrative basee sur IntersectionObserver.
2. Un grand tableau de bord interactif presentant plusieurs visualisations de donnees interconnectees (D3 Bubbles, Leaflet Map geoJSON, D3 Area Chart).

## Exigences Techniques et Librairies

- Utilisation de la version sept de la librairie d analyse de donnees (D3) pour toutes les manipulations vectorielles, les echelles, les axes et les transitions.
- Utilisation de Leaflet et de la methode L.geoJSON() pour l implementation de la carte choroplethe interactive avec un ficher distant.
- Organisation du code en differents modules JavaScript distincts pour chaque composant graphique afin de faciliter le versionnage de notre travail.
- Utilisation de IntersectionObserver pour deceler la position du lecteur et declencher les changements visuels selon la narration globale.
