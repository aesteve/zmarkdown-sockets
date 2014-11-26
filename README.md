zmarkdown-sockets
=================

Serveur de websockets pour previsualiser la conversion zmarkdown html

# Lancer le serveur en local

R�cup�rer l'archive de ce repo et la d�compresser � l'endroit de son choix.

S'y positionner en ligne de commande puis ex�cuter :

`gradlew runMod`

Une fois le message `Succeeded in deploying module` affich� dans la console, aller � l'URL `http://localhost:8000/`

# Cr�er un zip pour le lancer directement avec Vert.x (sans wrapper)

- Installer Vert.x (cf doc Vert.x)

- Ex�cuter la commande `gradlew modZip`

- Puis aller chercher le fichier .zip dans le sous-r�pertoire "build/libs" et copiez/collez le o� bon vous semble

- Copier/Coller le fichier conf.json (et l'ajuster si besoin) dans le m�me r�pertoire que le zip

- Puis ex�cuter simplement : `vertx runzip $nomDuZipCr�� -conf conf.json`

# Importer le projet dans Eclipse

Ex�cuter la commande :

`gradlew eclipse`

Qui va cr�er la totalit� des fichiers n�cessaires � Eclipse
