# Garage Clash

Jeu web de cartes à collectionner de voitures (prototype). Extension 1 : « Première Vitesse ».

## Jouer en ligne

https://ryossgh.github.io/garage-clash/ (GitHub Pages, branche `main`). Sur téléphone : ouvrir le lien puis « Ajouter à l'écran d'accueil ».

## Lancer le jeu en local

Le jeu est une page statique. Depuis ce dossier :

```
python -m http.server 8000
```

puis ouvrir http://localhost:8000 (ouvrir `index.html` en double-clic ne suffit pas toujours pour charger les images).

## Contenu

- `index.html` : tout le jeu (HTML, CSS, JavaScript dans un seul fichier)
- `img/` : photos des cartes (`<clé>.webp`, `<clé>_fa.webp` pour les Full Art, `<clé>_alt.webp` pour les Alt)
- `sw.js` : mode hors-ligne (cache de la page et des images)
- `manifest.webmanifest`, `icon*.png`, `icon.svg` : installation sur l'écran d'accueil du téléphone
- `CLAUDE.md` : notes de contexte pour Claude Code

Mode dev : `Ctrl+Shift+G`, ou ajouter `#god` à l'URL.

## Photos et licences

Les photos viennent de Wikimedia Commons, sous licences libres (CC BY, CC BY-SA, CC0, domaine public). L'auteur et la licence de chaque photo sont listés dans le jeu (Académie → Crédits photos) et dans les constantes `PHOTO`, `PHOTO_FA` et `PHOTO_ALT` de `index.html`. Les licences CC BY-SA imposent de conserver ces crédits.

Les achats de gemmes sont simulés : aucun paiement réel.
