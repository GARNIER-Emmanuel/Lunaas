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
  - Caacupe One pour les titres et Story Script pour les accents du hero et du contact, hébergées localement avec leurs licences SIL OFL. Manrope reste utilisée pour les paragraphes et la navigation, également en local.
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
- **Réalisations** : Koacher est présenté comme projet personnel dans la landing page. Son lien ouvre directement l’application.
  - Une illustration de son fonctionnement accompagne la présentation ; elle est identifiée comme telle.
- **Contact** : un seul formulaire Signal Forms dans la section `#contact`. E-mail et message sont nécessaires ; nom, prénom, sujet et budget sont facultatifs. Le sujet « Mes données personnelles » permet une demande de droits sans renseignement commercial. Tous les boutons « Parlons de votre projet » conduisent à ce formulaire. Envoi Web3Forms, validation accessible, champ anti-spam et blocage des doubles soumissions.
  - La confirmation suit une réponse positive du service. Une erreur conserve la saisie et propose un bouton pour réessayer.
  - Le nom du développeur figure dans la présentation. E-mail, téléphone et adresse postale restent dans les informations légales ; les sections commerciales utilisent le formulaire. Bordeaux reste la zone de prestation présentée.
- **Navigation** : menu mobile, fermeture avec Échap et retour du focus, footer et liens vers les sections. Les anciennes adresses reviennent à la landing dans Angular.
- **SEO** : titre et description de la landing, canonical à la racine, Open Graph, image de partage, données structurées `WebSite`, sitemap avec une seule URL et robots.txt.
- **Informations légales** : mentions légales et confidentialité consultables dans des fenêtres sur la landing, sans page supplémentaire, et affichées dans le document si JavaScript est désactivé. `legal-business.data.ts` contient uniquement l’identité, les coordonnées nécessaires et les choix envisagés du projet. Le document de synthèse ne confirme ni la signature, ni la transmission, ni la validation de la création. Aucun SIREN/SIRET, date de dépôt ou régime fiscal définitif n’est inventé ou annoncé. L’hébergeur effectif et les mentions d’immatriculation applicables restent à compléter. La confidentialité décrit les finalités, les bases légales proposées, les droits, le recours à la CNIL et les traitements de Web3Forms. Les durées de conservation et les contrats des prestataires restent à finaliser ; aucune conformité complète n’est déclarée.
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
| Marque, domaine et accroche      | `src/app/shared/data/site.data.ts`       |
| Identité et déclarations légales | `src/app/shared/data/legal-business.data.ts` |
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

- Situation réelle de la création et identifiants attribués, régime de TVA applicable et identité complète de l’hébergeur effectif.
- Conservation des demandes, destinataires et garanties des prestataires du formulaire et de la messagerie.
- Prix et frais définitifs ; conditions contractuelles et médiateur si les offres sont ouvertes aux consommateurs.
- Droits d’utilisation des photographies de fond ou remplacement par des visuels autorisés.
- Livraison technique : HTTPS, domaine canonique, navigation et réception réelle d’un message du formulaire.

Les contrôles visuels, les mesures de performance et l’évaluation de l’assujettissement aux règles d’accessibilité restent à faire. Aucun score Lighthouse arbitraire ni document RGAA non justifié n’est imposé comme condition juridique de publication.

Les exigences légales varient selon le statut réel ; les documents de travail renvoient à [Service Public Entreprendre](https://entreprendre.service-public.gouv.fr/vosdroits/F31228) et à la [CNIL](https://www.cnil.fr/fr/exemples-de-formulaire-de-collecte-de-donnees-caractere-personnel). Aucune conformité juridique ni validation en production n’est déclarée sur la seule base des tests locaux.

---

_Lunaas — Donnez une autre dimension à votre présence en ligne._

## 🎨 Direction visuelle retenue

La composition retenue s’inspire de l’organisation et du rythme du site [LunaWeb](https://www.lunaweb.fr/). Les textes sont rédigés pour Lunaas et son activité indépendante.

- L’approche et les expertises introduisent le projet avant les tarifs.
- Les projets occupent une présentation large, accompagnée d’illustrations identifiées comme telles.
- Les titres, les espaces et les alternances de fonds donnent un rythme distinct aux sections.
- Les animations déplacent les éléments sans masquer les textes. Elles respectent les préférences de mouvement réduit et sont supprimées à la destruction des pages.

Cette version est validée pour intégration sur `main`. Les prochaines évolutions visuelles sont développées sur des branches dédiées.

La vérification technique couvre la navigation vers les sections, le formulaire unique, ses erreurs et les contrôles de la landing statique. Les tests d’envoi simulent les réponses du service ; ils n’envoient pas de vrais messages. Le rendu, le rythme des animations et la réception réelle restent à valider dans un navigateur sur mobile et ordinateur.

La configuration d’envoi est centralisée dans `src/app/shared/data/contact.data.ts`. La clé Web3Forms est une [clé publique de routage](https://docs.web3forms.com/getting-started/faq) qui oriente les messages vers la messagerie configurée chez le prestataire. Le contact professionnel `contact@lunaas.site` figure dans `legal-business.data.ts` et les fenêtres légales, sans être affiché dans les sections de présentation, le header ou le footer. Le remplacement de l’adresse affichée ne change pas le destinataire de la clé existante : son routage vers la messagerie professionnelle reste à confirmer.
