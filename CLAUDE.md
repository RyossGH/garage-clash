# Garage Clash — contexte pour Claude Code

Jeu web de cartes à collectionner de voitures, en français. Prototype statique : tout est dans `index.html` (CSS + JS inline), les images dans `img/`. Pas de build, pas de dépendances.

## Lancer / tester
- `python -m http.server 8000` puis http://localhost:8000
- Mode dev dans le jeu : Ctrl+Shift+G ou `#god` dans l'URL

## Modèle de données (dans index.html)
- `RAW` : une ligne par voiture `[clé, marque, modèle, année, ch, vmax, 0-100, poids, silhouette, pays, anecdote, {evo, mega, tuner}]`
  - `evo` : génération suivante du MÊME modèle (lignée, simple info, max 4 par série, puis nouvelle série)
  - `mega` : clé de la version préparée (carte ♛ Prépa) ; les lignes avec `tuner` sont ces versions préparées
- `EXT` : extensions (une seule : PV1 « Première Vitesse »)
- `CARS` : cartes générées = voiture × version `v` :
  `s` non holo, `h` holo (● C et ◆ AR), `r` ★ Rare (toujours holo), `f` ★★ Full Art, `a` ★★★ Alt (voiture en action), `p` ♛ Prépa
  - la rareté de base `br` (C / AR / R) est calculée par puissance dans l'extension
  - `f`, `a`, `p` sont des secrètes, numérotées au-delà du total
- `PHOTO`, `PHOTO_FA`, `PHOTO_ALT` : crédits Wikimedia `[fichier, auteur, licence]` — à tenir à jour avec `img/`
- Booster (`PV1`, `rollBooster`) : 10 cartes = 6 non holo, 3 holo (emplacements 7-9, peuvent être remplacés par une secrète selon `hs`), 1 ★
- Sauvegarde : localStorage, clé `SKEY` (incrémenter si la liste des cartes change)

## Règles du projet
- Aucun nom de rareté sur les cartes, seulement les symboles ● ◆ ★ ★★ ★★★ ♛
- Pas de dos de carte ; ouverture = pile de cartes qu'on swipe, inclinaison à la souris
- On ne fait pas évoluer les cartes ; les lignées sont informatives
- Achats de gemmes simulés (bandeau « MODE TEST ») : ne pas brancher de vrai paiement sans serveur
- Photos : uniquement des images libres de Wikimedia Commons, avec crédit auteur + licence

## À faire / décisions ouvertes
- Économie : les jetons (duels, quiz, boutique) permettent d'acheter des boosters sans limite, ce qui contourne les gemmes
- Serveur : comptes, sauvegarde en ligne, anti-triche, puis vrai paiement
- Chiffres et anecdotes des voitures : approximatifs, à revérifier avant lancement public
