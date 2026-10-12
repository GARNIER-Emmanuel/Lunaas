# Lunaas — Instructions de contribution

## Lire avant d'intervenir

Le dossier `docs/` contient la documentation locale et reste hors de Git. Ne jamais le versionner, le forcer avec `git add -f` ou retirer sa règle du `.gitignore`. Les liens ci-dessous sont destinés au travail dans le checkout local.

- [Sommaire du projet](docs/README.md).
- [Architecture et données](docs/02-architecture-et-donnees.md).
- [Direction artistique](docs/DA.md) et [exigences de qualité](docs/03-seo-et-qualite.md).

Ces documents décrivent le travail prévu. Ne pas annoncer leurs fonctionnalités comme déjà implémentées.

## Périmètre

Site vitrine Angular pour la création de sites web freelance à Bordeaux, en français au lancement. Pas de backend Spring Boot, CMS, store global ou base de données sans besoin nouveau explicite. Pas d'offres d'automatisation ou d'agents IA. Ne pas inventer de clients, avis, résultats ou informations légales.

## Architecture et organisation du code

- Pages et sections spécifiques dans `src/app/views/`.
- Composants partagés dans `src/app/components/`.
- Modèles dans `src/app/shared/interfaces/*.interface.ts`.
- Contenus publics typés dans `src/app/shared/data/*.data.ts`.
- Réexports via les `index.ts` des données et interfaces.
- Intégrations dans `src/app/shared/services/`, services `providedIn: 'root'` et injection par `inject()`.
- Pas de déplacement vers une architecture `features/core` ni de migration vers React.
- Créer uniquement les fichiers utiles à l'étape en cours.

## Conventions Angular

- Standalone et `ChangeDetectionStrategy.OnPush`. Ne pas ajouter `standalone: true`.
- Fichiers séparés `.ts`, `.html`, `.css`. Cette règle prime sur une préférence générique pour les templates inline.
- Signals pour l'état local, `computed()` pour les dérivations, `input()` et `output()` pour les échanges.
- Ne pas muter les constantes partagées ; transformations pures, `set()` ou `update()` pour l'état.
- Contrôle de flux natif et identifiants stables pour `track`.
- Bindings `class` et `style` plutôt que `ngClass` et `ngStyle` ; bindings hôte dans `host` plutôt que `@HostBinding` ou `@HostListener`.
- Types précis, pas de `any` ; utiliser `unknown` quand nécessaire. Conserver `strict: true` et `strictTemplates: true` dans `tsconfig.json` et corriger les erreurs plutôt que désactiver ces vérifications.
- Lazy loading des pages secondaires lorsque pertinent, sans transformer chaque section en route.
- Signal Forms pour le contact : modèle typé, validation, service distinct et retours accessibles.
- `NgOptimizedImage` pour les images statiques pertinentes, dimensions et texte alternatif.

## Style, rendu et dépendances

- Tailwind CSS v4 et identité visuelle Lunaas.
- GSAP et ScrollTrigger pour les effets avancés demandés : initialisation navigateur, nettoyage et respect de `prefers-reduced-motion`.
- Ajouter des dépendances, l'internationalisation ou une configuration d'hébergement uniquement selon les besoins du projet.
- Conserver la sortie statique prérendue (`outputMode: "static"`) et les routes publiques en `RenderMode.Prerender`. `src/main.server.ts` sert au build et ne constitue pas un serveur à déployer. Les fichiers à héberger sont dans `dist/lunaas/browser/`.
- Protéger les API navigateur pendant le rendu serveur et l'hydratation. Le contenu reste visible sans animation.
- Aucun secret dans le code, les données, le dépôt ou les variables compilées côté navigateur. Utiliser une configuration de contact propre au projet.

## Commandes

```bash
npm ci
npm start
npm run build
npm test -- --watch=false
npm run watch
```

Node compatible avec Angular CLI installé : `^22.22.3 || ^24.15.0 || >=26.0.0`. Checkout analysé avec Node 24.18.1 et npm 11.16.0.

## Méthode et vérifications

- Vérifier l'état Git et préserver les changements existants avant toute édition.
- Pour une demande d'analyse ou de documentation, ne pas développer l'application.
- Avancer par étapes vérifiables ; indiquer décisions, limites et informations manquantes.
- Tester les comportements critiques modifiés ; vérifier le build après une modification du code ou du rendu.
- Vérifier les liens locaux après une réorganisation documentaire.
- Distinguer préparation du dépôt, fonctionnement local et validation en production.
- Ne pas effectuer de commit, push, achat, changement DNS ou publication sans demande explicite.

## Graphify

Lorsque l'utilisateur tape `/graphify`, lire et appliquer le skill Graphify installé avant toute autre action. Ne pas générer de graphe simplement pour une modification documentaire.
