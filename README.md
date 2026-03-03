# Visualisation de la Centralisation Institutionnelle du Bitcoin

> Projet realise par Nabil Mohamed Hagos et Steve Benjamin dans le cadre du cours de visualisation de donnees.

**Vision et Thematique**
Ce projet a pour ambition d explorer l univers des cryptomonnaies, un domaine que nous etudions depuis plusieurs annees. L un de nous gerant deja un site web dedie a l investissement et a la gestion de fortune, cet interet personnel nous oriente naturellement vers l analyse de ces donnees financieres complexes.

Nous allons nous concentrer specifiquement sur le Bitcoin. En tant que premiere monnaie numerique historique, notre objectif sera de devoiler et de visualiser l influence ecrasante des grandes entreprises et des Etats. Ce documentaire web interactif aura pour but de permettre aux personnes non initiees de comprendre tres rapidement la repartition reelle des richesses grace a des elements visuels clairs et accessibles.

## Contexte des donnees

Les informations qui nourriront cette visualisation proviendront de trois sources principales. Les statistiques macroeconomiques et l historique des portefeuilles seront extraits de Glassnode et CoinMetrics, tandis que les coordonnees cartographiques mondiales seront issues de Natural Earth.

Ces donnees feront l objet d une etude critique de notre part. Nous mettrons en lumiere un biais majeur inherent a ces sources. Les plateformes analytiques ne pouvant identifier formellement que les portefeuilles publiquement declares, une immense quantite d institutions operant de maniere anonyme sera de facto sous representee. Par ailleurs, les millions d utilisateurs particuliers etant amalgames dans une masse statistique globale, nous veillerons a souligner cette invisibilisation des acteurs individuels au profit des grands volumes financiers.

## Description de la structure

L integralite des donnees sera compilee, nettoyee et unifiee dans un fichier local unique au format JSON. Ce choix architectural garantira la stabilite de l application et figera les statistiques historiques pour notre analyse.

Ce fichier s organisera autour de trois grands axes :
1. Des valeurs temporelles stockees sous forme de chaines de caracteres puis converties en objets Date Javascript pour generer la chronologie historique.
2. Des valeurs numeriques quantitatives illustrant les pourcentages exacts de possession repartis entre les portefeuilles particuliers et les acteurs institutionnels.
3. Des donnees spatiales au format GeoJSON contenant les coordonnees geometriques multipolygonales necessaires au trace precis des frontieres souveraines.

## But et intention narrative

L approche adoptee sera resolument explicative. Plutot que de proposer une simple exploration libre, l application guidera le lecteur a travers un parcours predefini et structure.

L histoire que nous allons raconter illustrera un basculement ideologique majeur. Elle demontrera comment une technologie creee par des activistes pour echapper au systeme bancaire traditionnel a ete progressivement absorbee par la haute finance. Le regard porte sur ces statistiques se voudra critique. Les visualisations successives auront pour fonction de mettre en evidence la fracture grandissante de la repartition des richesses numeriques et la disparition graduelle de l utilisateur individuel face a l accumulation corporative.

## References et inspirations

Pour mener a bien ce recit interactif, le ton visuel sombre, le minimalisme et l utilisation de couleurs de contraste s inspireront directement des infographies financieres developpees par Bloomberg et le Financial Times.

La structure narrative de l application reposera sur un defilement vertical pilotant l animation des graphiques et l apparition du texte. Cette methode, profondement inspiree par les essais visuels du studio The Pudding, nous permettra de fragmenter une quantite massive d informations statistiques complexes en une succession d etapes fluides et digestes.
