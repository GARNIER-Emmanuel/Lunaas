import { Offer } from '../interfaces';

export const OFFER_DATA: readonly Offer[] = [
  {
    id: 'landing-page',
    halo: 'moon',
    name: 'Landing page',
    startingPrice: 800,
    format: '1 page',
    description: 'Pour présenter votre activité ou une offre sur une seule page.',
    flexible: false,
    features: [
      'Design personnalisé, adapté aux mobiles',
      'Formulaire de contact',
      'Bases du référencement et mise en ligne',
    ],
    details: [
      'Une page, sections et contenus convenus au devis.',
      'Intégration des textes et images que vous fournissez.',
      'Liens utiles et vérifications avant la mise en ligne.',
    ],
    exclusions: [
      'Vente en ligne et espace administrateur non inclus.',
      'Rédaction complète des contenus et rédaction juridique non incluses.',
    ],
  },
  {
    id: 'site-vitrine',
    halo: 'mars',
    name: 'Site vitrine multipage',
    startingPrice: 1400,
    format: 'Base de 3 pages',
    description: 'Pour détailler votre entreprise, vos services et vos réalisations.',
    flexible: false,
    features: [
      'Design personnalisé, adapté aux mobiles',
      'Formulaire de contact',
      'Bases du référencement et mise en ligne',
    ],
    details: [
      'Une base de trois pages, à préciser ensemble.',
      'Navigation entre les pages.',
      'Intégration des textes et images que vous fournissez.',
      'Vérifications avant la mise en ligne.',
    ],
    exclusions: [
      'Vente en ligne et espace administrateur non inclus.',
      'Pages supplémentaires et rédaction complète à chiffrer séparément.',
      'Rédaction juridique non incluse.',
    ],
  },
  {
    id: 'site-dynamique',
    halo: 'sun',
    name: 'Un besoin particulier ?',
    format: 'Un périmètre à définir',
    description: 'Pour un projet qui demande un format ou des fonctionnalités spécifiques.',
    startingPrice: null,
    flexible: true,
    features: [
      'Échange sur votre besoin',
      'Étude de faisabilité',
      'Devis avant tout démarrage',
    ],
    details: [
      'Proposition d’un périmètre adapté à vos besoins et priorités.',
      'Faisabilité technique et périmètre validés avant tout engagement.',
    ],
    exclusions: [
      'Les prestations et les livrables sont confirmés après étude de votre demande.',
      'Seuls les éléments convenus au devis font partie du projet.',
    ],
  },
];
