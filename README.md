## Demo

https://thankful-sweater.surge.sh/

## Scripts

`npm start` : lancement de l'app en mode développement

`npm test` : exécution des tests

`num run test:coverage` : tests et couverture. Un seuil global de couverture a été fixé arbitrairement à 80% pour chaque métrique

`npm run validate` : exécute séquentiellement le linter `&&` les tests `&&` le build 

`npm run cy:run` et `npm run cy:open` : l'installation est symbolique... pas encore de tests `e2e` 

## Structure du projet

### Arborescence

```
.
├── assets
│   ├── font
│   └── images
├── components      /* atomic design architecture */
│   ├── atoms
│   ├── molecules
│   ├── organisms
│   ├── pages
│   └── templates
├── constants       /* global constants */
├── test            /* test helpers */
└── utils           /* global helpers */
```

### Méthode

Approche [Atomic design](https://atomicdesign.bradfrost.com/)

Avec cette méthode, les composants sont bien organisés et accessibles. Ca fonctionne pas mal sur les "petits" projets, mais pas encore expérimenté sur un projet complexe.

Remarques : dans la partie `pages`, je n'ai pas poussé très loin la composition "atomique" de `Product`, comparativement à `Home` 

## Gestion des styles

Les styles sont gérés avec `styled-components`.

Pour la lisibilité, ils ont été regroupés dans des objets littéraux au sein des composants, mais ils gagneraient à être définis séparémment pour faciliter les mécanismes d'héritage entre `styled-components`.

Il y a une gestion basique des mécanismes responsives. 

Pour le choix de la librairie, j'ai hésité avec `tailwind css` et ses classes définies *inline*. Les règles sont plus faciles à écrire/maintenir mais moins lisibles.

## Etat de l'app

- `redux` pour les données UI 
- `react-query` pour les données serveur 

### Redux

La gestion du panier est minimaliste, suffisant j'espère pour illustrer une utilisation basique via le panier + les tests qui vont avec

### React Query

Permet de gérer :

- la récupération des données
- leur associer un état `idle`, `loading`, `success`, `error`
- la mise à jour et la mise en cache des données


## Tests

- tests statiques : `eslint`
- test unitaires et d'intégration : `react-testing-library`

## Améliorations possibles

- tests e2e
- pas mal de possibilités avec `dummyjson`... si j'avais un peu plus de temps, je me serais sans doute lancé sur la recherche de produit, l'authentification/inscription
- tests à compléter, notamment `index`, `Home` et `App`.
- si c'était un POC, je me serais peut-être lancé sur une persistence des données via un service worker (msw) ou localstorage
- score lighthouse accessibilité et performances, surtout sur mobile