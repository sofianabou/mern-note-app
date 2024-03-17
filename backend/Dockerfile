# Utilisation d'une image de node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de l'application
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel le serveur écoute
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["npm", "start"]
