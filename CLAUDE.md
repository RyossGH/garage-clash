# Garage Clash — contexte pour Claude Code

Jeu web de cartes à collectionner de voitures, en français. Prototype statique : tout est dans `index.html` (CSS + JS inline), les images dans `img/`. Pas de build, pas de dépendances.

## Lancer / tester
- `python -m http.server 8000` puis http://localhost:8000
- Mode dev dans le jeu : Ctrl+Shift+G ou `#god` dans l'URL
- En ligne : GitHub Pages (branche `main`, racine)

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
  - god pack (`gp`, 0,1 %) : 5 ★, 3 ★★, 2 ★★★ toutes différentes (`godCards`) ; forçable en mode dev
- Cadres et tranches teintés très légèrement selon la version (`var-*`, `e-*`) : la pile est alignée et on aperçoit la tranche des cartes suivantes en inclinant le paquet. Ne pas mettre de `filter` sur `.stack3d` (ça aplatit la 3D)
- Sauvegarde : localStorage, clé `SKEY` (incrémenter si la liste des cartes change)
- Duel : 5 terrains tirés parmi `TERRAINS` (circuit, autobahn, départ arrêté, pluie, rallye, neige, ville, course de côte). Score d'une voiture sur un terrain = `terrainScore(c,T)` (poids des stats `w` + bonus/malus `bonus`, ex. intégrale sur la neige). Transmission et énergie : `DRIVE_A`, `DRIVE_R` (le reste = traction), `ENERGY`. Niveaux d'IA dans `DIFF` (off = niveau des voitures, build = équipe adaptée aux terrains, smart = bonne voiture jouée). Toute nouvelle voiture doit être ajoutée à `DRIVE_A`/`DRIVE_R`/`ENERGY` si besoin.
- Limites du jour (`daily()`, remise à zéro à minuit heure locale) : quiz `QUIZ_MAX` = 5 questions ; duels : 1re victoire = 1 booster gratuit, 2e = jetons du niveau (`DIFF.rw.win`), 3e = la moitié, ensuite rien (XP seulement)
- Expérience (`S.xp`, `addXP`, `lvlOf`, `TITLES`) et `BADGES` : purement décoratifs, profil ouvert depuis la pastille ⭐ du HUD (`openProfile`)
- Sons : synthétisés en WebAudio (`sfx`), vibrations via `buzz()`, coupables avec le bouton haut-parleur (`S.sound`)
- Hors-ligne : `sw.js` (page en réseau d'abord, images en cache d'abord, préchargement envoyé par la page). Changer `VERSION` dans `sw.js` si une image existante est remplacée par une autre du même nom.

## Règles du projet
- Aucun nom de rareté sur les cartes, seulement les symboles ● ◆ ★ ★★ ★★★ ♛
- Aucun indice de rareté pendant l'ouverture (pas de lueur, tremblement ni grondement) : seuls les bords des cartes, visibles en inclinant le paquet, peuvent « spoiler »
- Zoom du navigateur bloqué partout ; zoom plein écran d'une carte : inclinaison immédiate (pas d'appui maintenu)
- Pas de dos de carte ; ouverture = pile de cartes qu'on swipe, inclinaison à la souris
- On ne fait pas évoluer les cartes ; les lignées sont informatives
- Achats de gemmes simulés (bandeau « MODE TEST ») : ne pas brancher de vrai paiement sans serveur
- Photos : uniquement des images libres de Wikimedia Commons, avec crédit auteur + licence

## À faire / décisions ouvertes
- Valeur des cartes (`COTE`, `DUP`, `COTE_MAX` = 70) : revente d'un doublon 2-3 🪙 pour les courantes, jusqu'à 70 🪙 de cote pour les ♛
- Économie : quiz et duels sont plafonnés par jour ; la boutique (ventes aux clients) rapporte encore des jetons sans limite
- Serveur : comptes, sauvegarde en ligne, anti-triche, puis vrai paiement
- Chiffres et anecdotes des voitures : approximatifs, à revérifier avant lancement public
