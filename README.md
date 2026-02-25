# visualdon_bitcoin_project

A scrollytelling data visualization project exploring the institutional centralization of Bitcoin. Built with D3.js and Leaflet for the VisualDon course.

## Objectif Principal

Developper une application web narrative et interactive utilisant strictement du code HTML pur, du CSS natif et JavaScript. Le theme central est la centralisation institutionnelle du marche des cryptomonnaies. Le design visuel doit imperativement utiliser un fond sombre et une interface tres epuree inspirant la finance moderne.

## Architecture de l Application

L application est divisee en deux parties majeures :

1. Une section narrative Scrollytelling basee sur l API Intersection Observer.
2. Un grand tableau de bord interactif presentant plusieurs visualisations de donnees interconnectees (D3 Bubbles, Leaflet Map, D3 Area Chart).

## Exigences Techniques et Librairies

- Utiliser la version sept de la librairie d analyse de donnees (D3) pour toutes les manipulations vectorielles, les echelles, les axes et les transitions.
- Utiliser Leaflet pour l implementation de la carte interactive.
- Organiser le code en differents modules JavaScript distincts pour chaque composant graphique afin de faciliter le versionnage sur GitHub.
- Utiliser IntersectionObserver pour déclencher les changements visuels selon le récit.

## Visualisations

1. Graphique à bulles (Nodes) : Représentation force-directed de la multitude de petits noeuds cypherpunks se consolidant en larges pools institutionnelles.
2. Carte Leaflet Géographique : Pointage des accumulations au niveau étatique (USA, Chine, etc.).
3. Graphique en aire : Évolution temporelle de la part de l'accumulation "Retail" vs "Institutionnel".
