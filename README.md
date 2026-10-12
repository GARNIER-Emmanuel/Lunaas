# 🚀 Lunaas — Création de sites internet à Bordeaux

Bienvenue sur le dépôt de Lunaas !

Ce projet est la vitrine de mon activité de développement web freelance. Il présente mes prestations, ma démarche et une sélection de projets personnels, avec une architecture **Angular** structurée et une identité visuelle sobre inspirée de l’espace.

**Une seule landing page, avec un seul formulaire de contact.** La page est prérendue et les demandes sont transmises via Web3Forms avec la configuration de contact existante. La réception réelle des messages, les informations administratives et les conditions de publication restent à vérifier avant le lancement commercial.

---

## 🛠️ Stack Technique

- **Framework** : Angular 22.1.x & TypeScript 6.0.x.
  - Composants **Standalone**, `OnPush`, Signals et Control Flow natif.
  - Mode strict TypeScript et vérification stricte des templates.
  - Navigation par ancres entre les sections de la landing page.
- **Styling** : Tailwind CSS v4.
  - Fond blanc, texte sombre et accents violets, avec header noir, hero sombre et appel à l’action lavande. Tokens CSS partagés et Manrope variable hébergée localement.
  - Essai typographique sur cette branche : Caacupe One pour les titres et Story Script pour les accents du hero et du contact, chargées depuis Google Fonts. Manrope reste utilisée pour les paragraphes et la navigation.
  - Hero sobre : la souris révèle une photo de fond grâce à un masque CSS.
  - La section de contact révèle une image de Mars sur son fond lavande. Versions AVIF/WebP en 1920 et 960 px, chargement différé et dimensions explicites.
  - Révélation désactivée sur écran tactile et avec les préférences de mouvement réduit.
  - GSAP et ScrollTrigger chargés à la demande pour les entrées des titres et des blocs. Parallaxe décorative limitée à l’ordinateur, scroll natif et nettoyage au changement de page.
- **Rendu** : génération statique Angular avec hydratation.
  - Le HTML est généré au build ; Angular gère ensuite les interactions dans le navigateur.
  - Le dossier à héberger est `dist/lunaas/browser/`, sans serveur Node permanent.
- **Tests** : Vitest & jsdom, avec contrôles supplémentaires du HTML produit.
- **Hébergement envisagé** : Cloudflare Pages avec le domaine cible `lunaas.site`. Aucun déploiement public ni changement DNS n’a été effectué.

---

## ✨ Fonctionnalités

- **Accueil** : hero, approche, expertises, projet mis en avant, méthode, présentation, offres, FAQ et appel à l’action.
- **Prestations** : trois offres à partir de 490 €, 990 € et 1 790 €, avec périmètres, exclusions et devis selon le besoin.
- **Réalisations** : Koacher est actuellement le seul projet actif. Sa présentation reste dans la landing page et ses liens ouvrent le projet en ligne.
  - Une illustration de son fonctionnement accompagne la présentation ; elle est identifiée comme telle.
- **Contact** : un seul formulaire Signal Forms dans la section `#contact`, avec nom, prénom, e-mail, projet, budget facultatif et message. Tous les boutons « Parlons de votre projet » conduisent à ce formulaire. Envoi Web3Forms, validation accessible, champ anti-spam et blocage des doubles soumissions.
  - La confirmation suit une réponse positive du service. Une erreur conserve la saisie et propose de réessayer ou d’écrire directement par e-mail.
- **Navigation** : menu mobile, fermeture avec Échap et retour du focus, footer et liens vers les sections. Les anciennes adresses reviennent à la landing dans Angular.
- **SEO** : titre et description de la landing, canonical à la racine, Open Graph, image de partage, données structurées `WebSite`, sitemap avec une seule URL et robots.txt.
- **Informations légales** : mentions légales et confidentialité consultables dans des fenêtres sur la landing, sans page supplémentaire. Les contenus restent des versions de travail à finaliser.
- **Secours statique** : `404.html` contient la même landing ; aucune vue séparée « Page introuvable ».

---

## 🧩 Architecture & Données

- `src/app/views/homepage/` : landing page et ses sections, dont la méthode, la FAQ et le contact.
- `src/app/views/homepage/contact-cta/contact-form/` : formulaire propre à la section de contact, avec ses tests.
- `src/app/components/` : cartes génériques, header, footer et fenêtres d’information du site.
- `src/app/shared/interfaces/` : modèles TypeScript.
- `src/app/shared/data/` : contenus publics centralisés.
- `src/app/shared/services/` : envoi du contact, animations et gestion des métadonnées.
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

## 🗺️ Une seule page

| URL | Usage |
| --- | --- |
| `/` | Landing complète |
| `/#approche` | Démarche de création |
| `/#realisations` | Présentation des projets |
| `/#a-propos` | Présentation du développeur |
| `/#offres` | Prestations et tarifs |
| `/#contact` | Formulaire principal |

Ces adresses désignent des sections de la même page. Les vues secondaires et leurs formulaires ont été supprimés. Le design et l’ordre des sections sont conservés.

---

## 🚀 Préparer la mise en ligne

- Commande de build : `npm run build`.
- Dossier de sortie : `dist/lunaas/browser/`.
- `404.html`, sitemap et robots.txt sont produits automatiquement.
- `_headers` contient les en-têtes de livraison pour Cloudflare Pages.
- `lunaas.site` est l’URL canonique cible. Si le domaine change, mettre à jour `site.data.ts` ; le sitemap reprend automatiquement l’URL générée.

Le fichier `404.html` contient la landing et permet à Angular de ramener un chemin inconnu à la racine. La prévisualisation conserve un statut HTTP 404 pour ces chemins. Le comportement sur l’hébergement reste à vérifier après déploiement. Voir la [documentation Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/).

### Éléments à confirmer avant publication

- Identité légale, statut, immatriculation, coordonnées professionnelles et informations de l’hébergeur.
- Informations définitives relatives au traitement des demandes et à leur conservation.
- Droits d’utilisation du visuel de fond et validation des contenus publics.
- Réception réelle des messages Web3Forms, disponibilité du service et éventuelles restrictions de domaine de la configuration existante.
- Domaine, DNS, HTTPS et comportement des routes sur l’hébergement.
- Contrôle visuel mobile et desktop, audit Lighthouse et mesures de performances représentatives.

Les exigences légales varient selon le statut réel ; les documents de travail renvoient à [Service Public Entreprendre](https://entreprendre.service-public.gouv.fr/vosdroits/F31228) et à la [CNIL](https://www.cnil.fr/fr/exemples-de-formulaire-de-collecte-de-donnees-caractere-personnel). Aucune conformité juridique ni validation en production n’est déclarée sur la seule base des tests locaux.

---

_Lunaas — Donnez une autre dimension à votre présence en ligne._

## 🎨 Variante visuelle à comparer

La branche `design/lunaweb-inspiration` propose une autre composition, inspirée de l’organisation et du rythme du site [LunaWeb](https://www.lunaweb.fr/). Les textes sont rédigés pour Lunaas et son activité indépendante.

- L’approche et les expertises introduisent le projet avant les tarifs.
- Koacher occupe une présentation plus large, accompagnée d’une illustration identifiée comme telle.
- Les titres, les espaces et les alternances de fonds donnent un rythme distinct aux sections.
- Les animations déplacent les éléments sans masquer les textes. Elles respectent les préférences de mouvement réduit et sont supprimées à la destruction des pages.

Cette variante reste sur sa branche de comparaison. `main` conserve la version précédente.

Pour la voir localement, lancer `npm start` sur cette branche. Après arrêt du serveur, `git switch main` puis `npm start` permet de revoir la version de base ; `git switch design/lunaweb-inspiration` permet de revenir à cette proposition.

La vérification technique couvre la navigation vers les sections, le formulaire unique, ses erreurs et les contrôles de la landing statique. Les tests d’envoi simulent les réponses du service ; ils n’envoient pas de vrais messages. Le rendu, le rythme des animations et la réception réelle restent à valider dans un navigateur sur mobile et ordinateur.

La configuration de contact est centralisée dans `src/app/shared/data/contact.data.ts`. La clé Web3Forms est une [clé publique de routage](https://docs.web3forms.com/getting-started/faq) ; modifier seulement l’adresse affichée ne change pas le destinataire associé à cette clé.
