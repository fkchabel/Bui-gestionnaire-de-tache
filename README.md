# Application de Gestion de Tâches

Ce projet est une application de gestion de tâches (to-do list) développée avec React.js dans le cadre d'un test technique pour Buicorporation.

## Fonctionnalités

- Ajouter des tâches
- Modifier des tâches existantes
- Supprimer des tâches
- Filtrer les tâches (toutes, complétées, incomplètes)
- Compteur de tâches restantes
- Interface responsive (mobile et desktop)
- Persistance des données (localStorage)

## Technologies utilisées

- React.js
- NEXT Ui, Tailwind CSS, Phosphor-react pour les icones

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/fkchabel/Bui-gestionnaire-de-tache.git
   ```
2. Naviguez dans le répertoire du projet :
   ```
   cd Bui-gestionnaire-de-tache
   ```
3. Installez les dépendances :
   ```
   npm install
   ```

## Lancement de l'application

Pour lancer l'application en mode développement, exécutez :

```
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Structure du projet

App.tsx | Declaration de deux route: "/" pour l'accueil et "/todo" pour la route vers le composant de listing des taches

## Choix techniques

L'utilisation du localStorage pour faire persister les data, meme au rechargement de la page
Typage des donnees

## Auteur

Jean-Boris Chabel | Frontend Developer.
