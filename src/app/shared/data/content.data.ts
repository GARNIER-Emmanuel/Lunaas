import { ContentItem, FaqItem, Profile } from '../interfaces';
import { LEGAL_BUSINESS_DATA } from './legal-business.data';
export const PROCESS_DATA: readonly ContentItem[] = [
  {
    id: 'echanger',
    title: 'Comprendre',
    description: 'Votre activité, vos visiteurs et l’objectif du site.',
  },
  {
    id: 'cadrer',
    title: 'Cadrer',
    description: 'Les contenus, les fonctionnalités, le devis et le calendrier.',
  },
  {
    id: 'construire',
    title: 'Concevoir et développer',
    description: 'Le design et la réalisation d’un site adapté aux différents écrans.',
  },
  {
    id: 'livrer',
    title: 'Vérifier et livrer',
    description: 'Les contrôles et la mise en ligne prévus dans le devis.',
  },
];
export const PROFILE_DATA: Profile = {
  name: LEGAL_BUSINESS_DATA.displayName,
  role: 'Développeur web full-stack à Bordeaux',
  introduction:
    'Je vous accompagne dans la création de votre site, du premier échange à la mise en ligne. Mon rôle : comprendre votre activité, donner une forme à vos idées et construire une présence en ligne claire pour vos visiteurs.',
  skills: [
    'Angular',
    'TypeScript',
    'Tailwind CSS',
    'Java',
    'Spring Boot',
    'React',
    'Next.js',
    'PostgreSQL',
    'MySQL',
  ],
};
export const FAQ_DATA: readonly FaqItem[] = [
  {
    question: 'Combien coûte la création d’un site internet ?',
    answer:
      'Les prix de départ sont de 690 € pour une landing page et 1 490 € pour un site vitrine multipage ; les projets sur mesure sont chiffrés sur devis après cadrage. Ils sont indicatifs : le tarif final est précisé dans un devis selon les pages, les fonctionnalités et les contenus nécessaires.',
  },
  {
    question: 'Combien de temps faut-il pour créer un site ?',
    answer:
      'Le délai dépend du périmètre et de la disponibilité des contenus. Un calendrier est défini après un premier échange ; aucun délai unique n’est annoncé pour tous les projets.',
  },
  {
    question: 'Le site fonctionnera-t-il sur mobile ?',
    answer:
      'Oui, le design responsive est prévu dans les offres. Le site est conçu pour s’adapter aux écrans mobiles, aux tablettes et aux ordinateurs.',
  },
  {
    question: 'Le nom de domaine et l’hébergement sont-ils inclus ?',
    answer:
      'Les besoins de domaine et d’hébergement sont étudiés au cadrage. Leur fournisseur, leurs coûts et les éventuels abonnements sont précisés au devis ; ils ne sont pas présentés comme automatiquement inclus dans le prix de départ.',
  },
  {
    question: 'Qui prépare les textes et les photos ?',
    answer:
      'Vous fournissez les textes, les photos et vos préférences de couleurs. Je vous accompagne si besoin dans leur préparation ; l’aide à la rédaction est incluse.',
  },
  {
    question: 'Puis-je demander des modifications ?',
    answer:
      'Deux séries de retouches sont incluses, dans le périmètre défini au devis. Les demandes supplémentaires et les changements de périmètre font l’objet d’un devis.',
  },
  {
    question: 'Pourrai-je faire évoluer mon site ?',
    answer:
      'Le site est organisé pour permettre des mises à jour de contenus et de nouvelles pages. Les fonctionnalités supplémentaires sont étudiées selon les besoins et le socle technique du projet.',
  },
  {
    question: 'Proposez-vous une maintenance ?',
    answer:
      'Les besoins de maintenance peuvent être étudiés ensemble. Le périmètre, les modalités et le coût restent à définir dans une proposition dédiée ; aucun abonnement n’est inclus par défaut.',
  },
];
