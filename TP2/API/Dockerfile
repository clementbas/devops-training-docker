# Utiliser l'image officielle Node.js comme base
FROM node:18

# Défini le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copie tout le reste du code
COPY . .

RUN npx prisma generate

# Expose le port 3000
EXPOSE 3000

# Commande de lancement de l'API
CMD ["node", "server.js"]
