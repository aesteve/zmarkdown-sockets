zmarkdown-sockets
=================

Serveur de websockets pour previsualiser la conversion zmarkdown html

# Lancer le serveur en local

Récupérer l'archive de ce repo et la décompresser à l'endroit de son choix.

S'y positionner en ligne de commande puis exécuter :

`gradlew runMod`

Une fois le message `Succeeded in deploying module` affiché dans la console, aller à l'URL `http://localhost:8000/`

# Créer un zip pour le lancer directement avec Vert.x (sans wrapper)

- Installer Vert.x (cf doc Vert.x)

- Exécuter la commande `gradlew modZip`

- Puis aller chercher le fichier .zip dans le sous-répertoire "build/libs" et copiez/collez le où bon vous semble

- Copier/Coller le fichier conf.json (et l'ajuster si besoin) dans le même répertoire que le zip

- Puis exécuter simplement : `vertx runzip $nomDuZipCréé -conf conf.json`

# Importer le projet dans Eclipse

Exécuter la commande :

`gradlew eclipse`

Qui va créer la totalité des fichiers nécessaires à Eclipse
