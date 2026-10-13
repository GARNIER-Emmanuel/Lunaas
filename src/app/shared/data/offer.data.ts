import { Offer } from '../interfaces';

export const OFFER_DATA: readonly Offer[] = [
  {
    id: 'landing-page',
    halo: 'moon',
    name: 'Landing page',
    description: 'Une page claire pour présenter votre activité et faciliter la prise de contact.',
    startingPrice: 800,
    flexible: false,
    features: [
      'Une page, jusqu’à six sections',
      'Design personnalisé, adapté à tous les écrans',
      'Appels à l’action et formulaire de contact',
      'Intégration des contenus et aide à la reformulation',
      'Bases techniques du référencement',
      'Intégration des pages légales fournies ou validées',
      'Deux séries de retouches regroupées',
      'Vérifications, mise en ligne et remise des fichiers',
    ],
    exclusions: [
      'Backend personnalisé et base de données',
      'E-commerce et fonctionnalités complexes',
      'Rédaction complète des contenus',
      'Création des textes juridiques',
    ],
    scopeNote: 'Une page commerciale avec un objectif précis. Contenus fournis par vos soins, avec mon accompagnement.',
  },
  {
    id: 'site-vitrine',
    halo: 'mars',
    name: 'Site vitrine multipage',
    description:
      'Un site complet pour présenter votre entreprise, vos services et vos réalisations.',
    startingPrice: 1400,
    flexible: false,
    features: [
      'Trois pages commerciales convenues au devis',
      'Design personnalisé, adapté à tous les écrans',
      'Navigation et formulaire de contact',
      'Intégration des contenus et aide à la reformulation',
      'Bases techniques du référencement des pages',
      'Intégration des pages légales fournies ou validées',
      'Deux séries de retouches regroupées',
      'Vérifications, mise en ligne et remise des fichiers',
    ],
    exclusions: [
      'Pages commerciales supplémentaires',
      'Backend, base de données et espace administrateur',
      'E-commerce, paiement et réservation en ligne',
      'Rédaction complète des contenus et textes juridiques',
    ],
    scopeNote: 'Par exemple : accueil, prestations et contact. Contenus fournis par vos soins, avec mon accompagnement.',
  },
  {
    id: 'site-dynamique',
    halo: 'sun',
    name: 'Projet sur mesure',
    description:
      'Un site qui répond à des besoins spécifiques, avec un périmètre défini sur devis.',
    startingPrice: null,
    flexible: true,
    features: [
      'Site multipage',
      'Fonctionnalités interactives',
      'Formulaires avancés',
      'Intégration d’API',
      'Backend et gestion de données selon les besoins',
      'Déploiement',
      'Tests adaptés aux fonctionnalités retenues',
    ],
    exclusions: [
      'Fonctionnalités complexes chiffrées séparément',
      'Authentification, administration et base de données non incluses systématiquement',
    ],
    scopeNote:
      'Les fonctionnalités, le backend, les API et la gestion des données dépendent des besoins et du périmètre validé. Les fonctionnalités complexes font l’objet d’un devis personnalisé.',
  },
];
