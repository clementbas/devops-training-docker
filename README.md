# devops-training-docker

[![forthebadge](https://forthebadge.com/images/badges/uses-brains.svg)](https://forthebadge.com)

## Docker run only

### Executer un serveur web
3.a - Récupérer l'image sur le docker hub (httpd or nginx) : 

    docker pull httpd

3.b - Utiliser une commande pour vérifier que vous disposez bien l'image en local :

    docker images

3.c - Créer un fichier dans votre repo local ./html/index.html qui contient "Hello World !" :

    -  mkdir html
    -  echo "Hello World !" > ./html/index.html

3.d - Démarrer un nouveau container et servir la page html créée précédemment à l'aide d'une référence absolue :

    docker run -d -p 80:80 -v ${PWD}/html:/usr/local/apache2/htdocs:ro httpd

3.e - Supprimer le container :
                            
    -  docker stop container_name
    -  docker rm container_name

3.f - Relancer le même container sans l'option -v puis utilisez la commande cp pour servir votre fichier (docker cp ARGS) :

    -  docker run -d -p 80:80 httpd
    -  docker cp ./html/index.html container_name:/usr/local/apache2/htdocs
                                                                                                                          
## Dockerfile

### Builder une image

4.a - A l'aide d'un Dockerfile, créer une image qui permet d'exécuter un serveur web (apache, nginx) :

  1. créer le fichier :

    New-Item -ItemType File -Name Dockerfile

  2. ouvrir le fichier :

    # Ouvre le fichier dans VSCode
    code Dockerfile

  3. Ajouter les instructions dans le Dockerfile :

    # Étape 1 : Utiliser une image de base
    FROM httpd:latest

    # Étape 2 : Copier les fichiers locaux dans l'image
    COPY ./html/ /usr/local/apache2/htdocs/

4.b - Executer cette nouvelle image de manière à servir ./html/index.html :

  1. construire l'image Docker :

    docker build -t my-apache-image .

  2. vérifier si l'image existe :

    docker images

  3. éxécuter un container avec cette image :

    docker run -d -p 80:80 --name my-apache-container my-apache-image

4.c - Quelles différences observez-vous entre les questions 3. et 4., trouvez les avantages & inconvénients de chaque procédure (mount volume VS copy) :

| Aspect | Procédure 3 (mount volume) | Procédure 4 (copy avec Dockerfile) |
|:--------------:|:-------------:|:--------------:|
| Création d'image | Pas d'image personnalisée, utilisation directe de l'image existante (httpd). | Crée une image personnalisée à partir d’un Dockerfile. |
| Complexité | Simple à mettre en place pour un développement rapide. | Nécessite de comprendre et d’écrire un Dockerfile, ainsi que de construire une image. |
