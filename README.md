# Lunaas

Site vitrine de mon activité freelance de création de sites web à Bordeaux, pour les artisans, indépendants et petites entreprises.

**[Voir le site → lunaas.site](https://lunaas.site/)**

## Le site

- Présentation des prestations, des abonnements de maintenance et de la méthode de travail.
- Interface adaptée aux mobiles, navigation par sections et FAQ.
- Formulaire de contact via Web3Forms : validation, conservation de la saisie en cas d’erreur et nouvelle tentative.
- Pages de mentions légales et de confidentialité, avec choix de consentement aux statistiques.

## Technologies

Angular 22 · TypeScript · GSAP · Vitest

Mise en page et responsive en CSS personnalisé, avec quelques utilitaires Tailwind CSS 4.

Les trois pages sont prégénérées au build (SSG), puis Angular gère les interactions dans le navigateur. Hébergement sur Cloudflare Pages.

## Démarrage

Prérequis : Node.js 24.15+ et npm 11.

```bash
npm ci
npm start
```

Le site est accessible sur `http://localhost:4200/`.

## Vérification

```bash
npm run verify
```

Exécute les tests, le build de production et les contrôles du HTML généré : métadonnées, liens, ancres, libellés et fichiers référencés. Cette commande est également exécutée par GitHub Actions à chaque push et pull request.

Les tests du formulaire simulent les réponses du prestataire ; la réception réelle des messages se vérifie séparément.

## Déploiement

- Build : `npm run build`.
- Fichiers à héberger : `dist/lunaas/browser/`.
- Prévisualisation du build : `npm run preview:static`, sur `http://localhost:4300/`.

## Organisation

- `src/app/views/` : sections de l’accueil et pages légales.
- `src/app/components/` : composants partagés.
- `src/app/shared/` : contenus, modèles, services et directives.
- `scripts/` : préparation et contrôle du build statique.

Consignes de contribution : [AGENTS.md](AGENTS.md). La documentation de travail dans `docs/` reste locale et hors de Git.
