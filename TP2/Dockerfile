# Utiliser l'image officielle Node.js comme base
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code
COPY . .

# Exposer le port 3000 (assurez-vous que votre API écoute bien sur ce port)
EXPOSE 3000

# Commande de lancement de l'API
CMD ["npm", "start"]
