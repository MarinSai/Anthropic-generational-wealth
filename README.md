# Anthropic : la richesse des fondateurs et employés comparée au PIB des pays

Graphique du Grand Continent (20 novembre 2026). `index.html` (FR), `es.html`, `it.html`.

## Méthode (estimation maison)

- **Cofondateurs** : actions détenues par les sept cofondateurs selon le S-1/A du 10 novembre 2026 (1 697 109 240 actions au 30 septembre), moins les 23,6 millions d'actions cédées lors de l'introduction en bourse, au cours de clôture du 19 novembre (97,17 $) : 162,6 Md$.
- **Employés** : 1,77 milliard d'options, nettes du prix d'exercice moyen de 2,91 $, et 1,07 milliard d'actions gratuites (RSU), y compris non acquises : 270,8 Md$. Actions détenues en propre exclues ; options d'anciens salariés incluses.
- **Total** : 433,4 Md$.
- **Pays** : PIB 2026 en dollars courants, FMI, World Economic Outlook d'octobre 2026 (série NGDPD), membres de l'ONU uniquement. Les 57 plus petites économies totalisent 423,5 Md$ ; la 58e (Botswana) ferait dépasser le total. Sans prévision 2026 du FMI : Afghanistan, Corée du Nord, Cuba, Érythrée, Liban, Monaco, Sénégal, Syrie.

Données : `sources/pib_fmi_2026_cumul.csv`, `sources/src/pays57.json`.

## Compilation

```
cd sources && npm install && npm run build
```
Sorties : `dist-fr/`, `dist-es/`, `dist-it/` (Svelte 4, Vite, vite-plugin-singlefile).

## Simulateur

`simulateur/index.html` (FR), `simulateur/es.html`, `simulateur/it.html` : un curseur additionne le PIB 2026 des plus petites économies (membres de l'ONU couverts par le FMI), de la plus petite à la plus grande, jusqu'à la valeur des parts des fondateurs et employés (433,4 Md$), des sept cofondateurs (162,6), des employés (270,8) ou d'un cofondateur en moyenne (23,2). Réponses : 57, 42, 49 et 19 pays. Sources dans `simulateur/sources/` (`npm install && npm run build`).
