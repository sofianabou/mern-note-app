# Utilisation d'une image de node.js avec Vite
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de l'application
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Commande pour construire l'application
CMD ["npm", "run", "build"]
