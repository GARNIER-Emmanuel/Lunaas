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
  role: 'Développeur web full-stack',
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
      'Les forfaits de lancement sont de 800 € pour une page commerciale jusqu’à six sections et de 1 400 € pour un site vitrine de trois pages commerciales. Les périmètres sont précisés au devis ; les pages et fonctionnalités supplémentaires ainsi que les projets sur mesure sont chiffrés séparément après cadrage. Domaine, hébergement et maintenance ne sont pas inclus dans ces forfaits.',
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
      'Non, le nom de domaine et l’hébergement sont séparés du forfait de création. Leur fournisseur, leurs coûts et les éventuels abonnements sont définis au cadrage et précisés au devis.',
  },
  {
    question: 'Qui prépare les textes et les photos ?',
    answer:
      'Vous fournissez les textes, les photos, le logo et vos préférences de couleurs. Je vous accompagne dans leur préparation et leur reformulation ; la rédaction complète des contenus est une prestation distincte. Les pages de mentions légales et de confidentialité sont intégrées à partir de textes fournis ou validés par vos soins ; leur rédaction juridique n’est pas incluse.',
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
