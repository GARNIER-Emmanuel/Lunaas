# 🚀 Lunaas — Création de sites internet à Bordeaux

Bienvenue sur le dépôt de Lunaas !

Ce projet est la vitrine de mon activité de développement web freelance. Il présente mes prestations, ma démarche et une sélection de projets personnels, avec une architecture **Angular** structurée et une identité visuelle sobre inspirée de l’espace.

**La version locale est implémentée et vérifiée.** Les pages publiques sont prérendues. Le contact prépare un e-mail depuis le navigateur ; l’envoi direct par un fournisseur de formulaire n’est pas configuré. Les informations administratives et les conditions de publication restent à finaliser avant le lancement commercial.

---

## 🛠️ Stack Technique

- **Framework** : Angular 22.1.x & TypeScript 6.0.x.
  - Composants **Standalone**, `OnPush`, Signals et Control Flow natif.
  - Mode strict TypeScript et vérification stricte des templates.
  - Pages secondaires chargées à la demande avec Angular Router.
- **Styling** : Tailwind CSS v4.
  - Fond blanc, texte sombre et accents violets, avec header noir, hero sombre et appel à l’action lavande. Tokens CSS partagés et Manrope variable hébergée localement.
  - Hero sobre : la souris révèle une photo de fond grâce à un masque CSS.
  - Effet désactivé sur écran tactile et avec les préférences de mouvement réduit. GSAP reste installé pour d’éventuels besoins futurs.
- **Rendu** : génération statique Angular avec hydratation.
  - Le HTML est généré au build ; Angular gère ensuite les interactions dans le navigateur.
  - Le dossier à héberger est `dist/lunaas/browser/`, sans serveur Node permanent.
- **Tests** : Vitest & jsdom, avec contrôles supplémentaires du HTML produit.
- **Hébergement envisagé** : Cloudflare Pages avec le domaine cible `lunaas.site`. Aucun déploiement public ni changement DNS n’a été effectué.

---

## ✨ Fonctionnalités

- **Accueil** : hero, offres, bénéfices, réalisation, méthode de travail, présentation, FAQ et appel à l’action.
- **Prestations** : trois offres à partir de 490 €, 990 € et 1 790 €, avec périmètres, exclusions et devis selon le besoin.
- **Réalisations** : Koacher est actuellement le seul projet actif. Les fiches sont générées à partir des données et clairement identifiées comme projets personnels.
- **Contact** : formulaire Signal Forms, validation accessible, préselection de l’offre et préparation d’un brouillon e-mail. Aucun message n’est annoncé comme envoyé automatiquement.
- **Navigation** : menu mobile, fermeture avec Échap et retour du focus, footer et liens vers toutes les pages.
- **SEO** : titres et descriptions par page, canonical, Open Graph, image de partage, données structurées `WebSite`, sitemap et robots.txt.
- **Pages légales** : versions de travail explicitement incomplètes et en `noindex`, avec les informations réelles à fournir.
- **404** : route Angular de secours et fichier `404.html` pour l’hébergement statique.

---

## 🧩 Architecture & Données

- `src/app/views/` : pages et sections propres à une page.
- `src/app/components/` : éléments réutilisables, dont les cartes d’offre, les projets, la FAQ et le menu.
- `src/app/shared/interfaces/` : modèles TypeScript.
- `src/app/shared/data/` : contenus publics centralisés.
- `src/app/shared/services/` : préparation du contact et gestion des métadonnées.
- `scripts/` : finalisation, contrôle et prévisualisation du build statique.

Les données vont du **modèle typé au fichier de contenu, puis au composant et au template**. Le site ne nécessite ni CMS ni base de données au lancement. Une modification de contenu nécessite un nouveau build et un nouveau déploiement.

### Modifier les contenus

| Contenu                          | Fichier                                  |
| -------------------------------- | ---------------------------------------- |
| Nom, e-mail, domaine et accroche | `src/app/shared/data/site.data.ts`       |
| Offres, tarifs et exclusions     | `src/app/shared/data/offer.data.ts`      |
| Réalisations actives             | `src/app/shared/data/project.data.ts`    |
| Méthode, présentation et FAQ     | `src/app/shared/data/content.data.ts`    |
| Navigation                       | `src/app/shared/data/navigation.data.ts` |
| Descriptions SEO                 | `src/app/app.routes.ts`                  |
| Photo du hero                    | `public/images/hero-background.jpg`      |

Les instructions de contribution sont dans [AGENTS.md](AGENTS.md). La documentation de travail dans `docs/` reste strictement locale et ignorée par Git.

---

## 💻 Démarrage en local

### Prérequis

- **Node.js** : `^22.22.3`, `^24.15.0` ou `>=26.0.0` ; version 24 utilisée pour les vérifications.
- **npm** : le projet indique la version `11.16.0`.

```bash
npm ci
npm start
```

Ouvrir `http://localhost:4200/`.

### Vérifier et prévisualiser la livraison

```bash
npm run verify
npm run preview:static
```

`verify` exécute les tests, le build et le contrôle du livrable. La prévisualisation sert les fichiers de production sur `http://localhost:4300/`, avec un statut HTTP 404 pour les chemins inconnus.

Commandes individuelles :

```bash
npm test -- --watch=false
npm run build
npm run check:static
```

La configuration GitHub Actions exécute `npm run verify` après un push ou sur une pull request. Sa présence dans le dépôt ne signifie pas qu’un run distant a déjà été exécuté.

---

## 🗺️ Pages

| URL                     | Usage                                                        |
| ----------------------- | ------------------------------------------------------------ |
| `/`                     | Accueil                                                      |
| `/services`             | Prestations, périmètres, méthode et FAQ                      |
| `/realisations`         | Liste des projets sélectionnés                               |
| `/realisations/koacher` | Présentation de Koacher                                      |
| `/a-propos`             | Présentation du développeur                                  |
| `/contact`              | Préparation d’une demande de devis                           |
| `/mentions-legales`     | Informations légales à finaliser                             |
| `/confidentialite`      | Fonctionnement actuel du contact et informations à compléter |
| `/404`                  | Page introuvable                                             |

Les fiches projet et le sitemap suivent les données actives : retirer un projet du catalogue retire sa fiche du prochain build.

---

## 🚀 Préparer la mise en ligne

- Commande de build : `npm run build`.
- Dossier de sortie : `dist/lunaas/browser/`.
- `404.html`, sitemap et robots.txt sont produits automatiquement.
- `_headers` contient les en-têtes de livraison pour Cloudflare Pages.
- `lunaas.site` est l’URL canonique cible. Si le domaine change, mettre à jour `site.data.ts` ; le sitemap reprend automatiquement l’URL générée.

Le fichier `404.html` permet à Cloudflare Pages de traiter les chemins inconnus sans renvoyer systématiquement l’accueil. Ce comportement reste à vérifier une fois déployé. Voir la [documentation Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/).

### Éléments à confirmer avant publication

- Identité légale, statut, immatriculation, coordonnées professionnelles et informations de l’hébergeur.
- Informations définitives relatives au traitement des demandes et à leur conservation.
- Droits d’utilisation du visuel de fond et validation des contenus publics.
- Fournisseur et réception réelle du formulaire si un envoi direct est souhaité.
- Domaine, DNS, HTTPS et comportement des routes sur l’hébergement.
- Contrôle visuel mobile et desktop, audit Lighthouse et mesures de performances représentatives.

Les exigences légales varient selon le statut réel ; les pages de travail renvoient à [Service Public Entreprendre](https://entreprendre.service-public.gouv.fr/vosdroits/F31228) et à la [CNIL](https://www.cnil.fr/fr/exemples-de-formulaire-de-collecte-de-donnees-caractere-personnel). Aucune conformité juridique ni validation en production n’est déclarée sur la seule base des tests locaux.

---

_Lunaas — Donnez une autre dimension à votre présence en ligne._
