# 🚀 Lunaas - Création de sites internet à Bordeaux

Bienvenue sur le dépôt de Lunaas !

Ce projet est la vitrine de mon activité de développement web freelance. Conçu pour présenter mes prestations et mes réalisations, il s'appuie sur une architecture **Angular** structurée et une identité visuelle inspirée de la Lune et de l'exploration spatiale.

**Le projet est en cours de développement.** L'accueil comporte un header responsive, un hero sobre avec une image révélée au passage du curseur et une présentation de l'approche Lunaas. Les offres, les réalisations, les autres pages et le formulaire de contact restent à développer.

---

## 🛠️ Stack Technique

* **Framework** : Angular 22.1.x & TypeScript 6.0.x.
  * Composants **Standalone** et Angular Router.
  * Architecture prévue autour des **Signals** (`signal`, `computed`, `input()`, `output()`) et du Control Flow natif.
  * Séparation des pages, des composants réutilisables et des contenus typés.
* **Styling** : Tailwind CSS v4.
  * Palette bleu nuit et lavande, tokens CSS partagés et police Manrope variable hébergée localement.
  * Header et hero adaptés au mobile et à l'ordinateur, avec un fond noir et une illustration de fond à choisir.
* **Interactions** : masque circulaire CSS pour révéler l'image de fond autour du curseur.
  * Photo de fond dans `public/images/hero-background.jpg` (1920 × 617), révélée autour du curseur. Le fond occupe toute la largeur ; le contenu conserve ses marges.
  * Effet désactivé sur écran tactile et en mode de mouvement réduit. GSAP & ScrollTrigger restent disponibles pour de futurs besoins.
* **Rendu** : génération statique Angular avec prérendu et hydratation.
  * Le HTML est généré pendant le build ; les interactions restent gérées par Angular dans le navigateur.
  * Fichiers à héberger : `dist/lunaas/browser/`, sans serveur Node permanent.
* **Tests** : Vitest & jsdom.
* **Hébergement envisagé** : Cloudflare Pages, avec le domaine cible `lunaas.site`. Configuration à confirmer.

---

## ✨ Fonctionnalités prévues

- **Hero & Présentation** : expliquer clairement mon activité et inviter à demander un devis.
- **Prestations** : présenter les offres Landing Page, Site vitrine multipage et Site web dynamique, avec leurs prix de départ indicatifs.
- **Réalisations** : valoriser les projets en distinguant missions clients, projets personnels et démonstrations.
- **Méthode de travail** : expliquer les étapes de conception, de développement et de mise en ligne.
- **À propos & FAQ** : présenter mon parcours et répondre aux questions des clients.
- **Contact** : formulaire de devis avec validation, protection anti-spam et confirmation après envoi réel.
- **SEO local** : pages publiques prérendues, métadonnées et contenus adaptés à l'activité à Bordeaux.

---

## 🧩 Architecture & Données

Le code est organisé par responsabilité :

* `src/app/views/` : pages et sections propres à chaque page.
* `src/app/components/` : composants réutilisables.
* `src/app/shared/interfaces/` : modèles TypeScript.
* `src/app/shared/data/` : offres, réalisations et FAQ dans des fichiers typés.
* `src/app/shared/services/` : intégrations externes, notamment le contact.

Les dossiers `views/`, `components/`, `shared/interfaces/` et `shared/data/` sont en place. Le nom, l'accroche et le texte d'accueil sont centralisés dans `shared/data/site.data.ts`, avec leur interface TypeScript. `shared/services/` sera ajouté lors de la première intégration externe. Aucun CMS ni base de données au lancement.

Les conventions de développement sont précisées dans [AGENTS.md](AGENTS.md).

---

## 💻 Démarrage en local

### Prérequis

* **Node.js** : `^22.22.3`, `^24.15.0` ou `>=26.0.0`, selon Angular CLI installé.
* **npm** : le projet indique la version `11.16.0`.

### Installation & lancement

Depuis le dossier du projet :

```bash
npm ci
npm start
```

Ouvrir ensuite `http://localhost:4200/` pour l'accueil, ou `/404` pour la page introuvable. Les URL inconnues affichent également cette page via Angular Router. Les boutons de contact ouvrent un e-mail ; ils ne remplacent pas le futur formulaire.

### Build & tests

```bash
npm run build
npm test -- --watch=false
```

Le build produit le site statique dans `dist/lunaas/browser/`, avec l'accueil et `/404` prérendus. Le comportement HTTP 404 des URL inconnues devra être configuré et vérifié sur l'hébergement retenu. La validation des futures pages métier et du déploiement viendra avec leur implémentation.

---

## 📚 Documentation

La documentation de travail est conservée localement dans `docs/`, hors du dépôt Git.

Les [instructions de contribution](AGENTS.md) précisent les conventions Angular et les règles à suivre avant de modifier le projet.

---

*Lunaas — Donnez une autre dimension à votre présence en ligne.*
