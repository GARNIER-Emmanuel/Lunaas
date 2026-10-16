import { Offer } from '../interfaces';

export const OFFER_DATA: readonly Offer[] = [
  {
    id: 'landing-page',
    halo: 'moon',
    name: 'Landing page',
    description: 'Une page claire pour présenter votre activité et faciliter la prise de contact.',
    startingPrice: 800,
    useCase:
      'Vous lancez votre activité ou souhaitez présenter une offre précise. Une seule page rassemble l’essentiel : votre présentation, vos services et un moyen de vous contacter.',
    flexible: false,
    features: [
      'Design personnalisé, adapté aux mobiles',
      'Formulaire de contact et liens utiles',
      'Intégration de vos textes et images',
      'Bases techniques du référencement',
      'Vérifications et mise en ligne',
    ],
    exclusions: [
      'Vente en ligne et espace administrateur non inclus.',
      'Rédaction complète des contenus et rédaction juridique non incluses.',
    ],
    scopeNote: 'Une page, sections et contenus convenus au devis.',
  },
  {
    id: 'site-vitrine',
    halo: 'mars',
    name: 'Site vitrine multipage',
    description:
      'Quelques pages pour présenter votre entreprise, vos services et vos réalisations.',
    startingPrice: 1400,
    useCase:
      'Vous avez plusieurs services à expliquer ou des réalisations à présenter. Des pages distinctes permettent à vos visiteurs de trouver les informations qui les concernent.',
    flexible: false,
    features: [
      'Design personnalisé, adapté aux mobiles',
      'Navigation et formulaire de contact',
      'Intégration de vos textes et images',
      'Bases techniques du référencement',
      'Vérifications et mise en ligne',
    ],
    exclusions: [
      'Vente en ligne et espace administrateur non inclus.',
      'Pages supplémentaires et rédaction complète à chiffrer séparément.',
      'Rédaction juridique non incluse.',
    ],
    scopeNote: 'Une base de trois pages, à préciser ensemble.',
  },
  {
    id: 'site-dynamique',
    halo: 'sun',
    name: 'Un besoin particulier ?',
    description:
      'Votre projet sort de ces deux formats ? Décrivons votre besoin avant de choisir une solution.',
    startingPrice: null,
    flexible: true,
    features: [
      'Échange sur vos besoins et vos priorités',
      'Vérification de la faisabilité technique',
      'Proposition d’un périmètre adapté',
      'Devis avant tout démarrage',
    ],
    exclusions: [
      'Les prestations et les livrables sont confirmés après étude de votre demande.',
      'Seuls les éléments convenus au devis font partie du projet.',
    ],
    scopeNote: 'Faisabilité et périmètre validés avant tout engagement.',
  },
];
