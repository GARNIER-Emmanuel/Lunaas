import { Offer } from '../interfaces';

export const OFFER_DATA: readonly Offer[] = [
  {
    id: 'landing-page',
    name: 'Landing page',
    description: 'Une page claire pour présenter votre activité et faciliter la prise de contact.',
    startingPrice: 490,
    flexible: false,
    features: [
      'Une page avec plusieurs sections',
      'Design responsive',
      'Présentation de votre activité et de vos prestations',
      'Appels à l’action et formulaire de contact',
      'Optimisation SEO de base',
      'Mise en ligne',
      'Deux séries de retouches',
    ],
    exclusions: [
      'Backend personnalisé et base de données',
      'E-commerce et fonctionnalités complexes',
      'Rédaction complète des contenus',
    ],
    scopeNote: 'Pour une présence web simple, avec un objectif bien défini.',
  },
  {
    id: 'site-vitrine',
    name: 'Site vitrine multipage',
    description:
      'Un site complet pour présenter votre entreprise, vos services et vos réalisations.',
    startingPrice: 990,
    flexible: false,
    features: [
      'Trois à six pages',
      'Design responsive personnalisé',
      'Navigation et présentation des services',
      'Formulaire de contact',
      'Optimisation SEO des pages',
      'Mise en ligne',
      'Deux séries de retouches',
    ],
    exclusions: ['Fonctionnalités métier complexes', 'E-commerce', 'Espace administrateur avancé'],
    scopeNote: 'Pour développer votre présence en ligne avec plusieurs pages dédiées.',
  },
  {
    id: 'site-dynamique',
    name: 'Site web dynamique',
    description:
      'Un site qui répond à des besoins spécifiques, avec un périmètre défini sur devis.',
    startingPrice: 1790,
    flexible: true,
    features: [
      'Site multipage',
      'Fonctionnalités interactives',
      'Formulaires avancés',
      'Intégration d’API',
      'Backend et gestion de données simples si nécessaires',
      'Déploiement',
      'Tests essentiels',
    ],
    exclusions: [
      'Fonctionnalités complexes chiffrées séparément',
      'Authentification, administration et base de données non incluses systématiquement',
    ],
    scopeNote:
      'Les fonctionnalités ci-dessous sont des possibilités, à confirmer selon votre besoin.',
  },
];
