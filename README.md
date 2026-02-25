# Prompt Maitre : Application Interactive VisualDon

## Objectif Principal
Developper une application web narrative et interactive utilisant strictement du code HTML pur, du CSS natif et JavaScript. Le theme central est la centralisation institutionnelle du marche des cryptomonnaies. Le design visuel doit imperativement utiliser un fond sombre et une interface tres epuree inspirant la finance moderne.

## Architecture de l Application
L application est divisee en deux parties majeures :
1. Une section narrative Scrollytelling basee sur l API Intersection Observer.
2. Un grand tableau de bord interactif presentant cinq visualisations de donnees interconnectees.

## Exigences Techniques et Librairies
* Utiliser la version sept de la librairie d analyse de donnees pour toutes les manipulations vectorielles, les echelles, les axes et les transitions.
* Utiliser Leaflet pour l implementation de la carte interactive.
* Organiser le code en differents modules JavaScript distincts pour chaque composant graphique afin de faciliter le versionnage sur GitHub.
* Preparer un fichier local de donnees mock avec des informations coherentes pour amorcer l interface.

## Structure du Fichier de Donnees Initial
Generer un objet JSON contenant :
* Un tableau chronologique s etalant sur la derniere decennie illustrant la repartition des volumes entre particuliers, entreprises, et gouvernements.
* Un registre des dix plus grandes entites mondiales avec leur nom, type, volume detenu et pays d origine.
* Un objet de type GeoJSON simplifie localisant les pays cibles possedant de grandes reserves nationales.

## Detail des Cinq Visualisations a Programmer

### 1. Carte Geographique Web (Leaflet et GeoJSON)
* Centrer la carte sur une vue mondiale globale.
* Utiliser un fond de carte sombre adapte a la lecture de donnees financieres.
* Superposer les donnees GeoJSON pour dessiner des cercles proportionnels aux reserves de chaque entite etatique. 
* Ajouter des infobulles descriptives declenchees au clic de la souris.

### 2. Graphique en Aires Empilees (Visualisation Chronologique)
* Montrer l evolution historique de la possession des actifs de maniere superposee.
* Mettre en place une echelle temporelle pour l axe des abscisses et une echelle lineaire pour l axe des ordonnees.
* Ajouter une ligne verticale interactive qui suit la position du curseur pour afficher les valeurs exactes a une date precise.

### 3. Graphique a Bulles des Grandes Entites (Simulation de force)
* Representer chaque grande entreprise ou fonds institutionnel par un cercle individuel.
* Utiliser une simulation physique pour eviter le chevauchement des bulles a l ecran.
* La taille et le rayon de chaque bulle doivent correspondre strictement a la valeur totale du portefeuille de l entite.

### 4. Graphique en Barres Comparatif
* Comparer l accumulation de volume annee par annee.
* Animer l apparition des barres visuelles de bas en haut avec une transition fluide lors de l entree de l element dans la zone visible du navigateur.

### 5. Diagramme Circulaire de Repartition Actuelle
* Afficher la photographie exacte du marche a la date d aujourd hui.
* Coder une interactivite au survol modifiant l opacite des autres portions visuelles pour mettre en valeur la section actuellement survolee.

## Directives Ethiques et Accessibilite
* Respecter scrupuleusement les bonnes pratiques de visualisation enseignees : l axe des ordonnees des graphiques en barres doit imperativement commencer a zero pour eviter de fausser l appreciation visuelle des proportions.
* Garantir un contraste de couleurs eleve pour assurer une parfaite lisibilite des textes sur le fond sombre de l application.