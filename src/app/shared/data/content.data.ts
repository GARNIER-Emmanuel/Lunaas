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
    id: 'maintenance-faq',
    question: 'Proposez-vous une maintenance ?',
    answer:
      'Oui, deux abonnements facultatifs sont proposés après la mise en ligne : Essentiel à 39 €/mois pour la surveillance et les contrôles mensuels, et Suivi à 79 €/mois avec jusqu’à 30 minutes de modifications simples, un bilan de fréquentation et un suivi basique de la visibilité dans Google. Aucun abonnement n’est inclus par défaut dans la création. La souscription passe par un échange et un accord distinct ; envoyer le formulaire ne souscrit aucun abonnement.',
  },
  {
    question: 'Puis-je résilier et conserver mon site ?',
    answer:
      'Oui. Les abonnements sont sans engagement de durée. Vous pouvez résilier à tout moment ; l’arrêt prend effet à la fin de la période payée. Vous conservez votre site conformément au contrat de création.',
  },
  {
    question: 'Quelles modifications sont comprises dans Suivi ?',
    answer:
      'Jusqu’à 30 minutes par mois pour des modifications simples de textes, d’images ou de coordonnées. Les minutes non utilisées ne sont pas reportables. Les nouvelles pages, fonctionnalités et refontes font l’objet d’un devis. Le suivi basique de Google consiste à consulter la visibilité du site dans les résultats disponibles ; il ne garantit aucun positionnement.',
  },
  {
    question: 'Que se passe-t-il si un incident dépasse le forfait ?',
    answer:
      'Le diagnostic d’incident inclus dans les deux abonnements est limité à 15 minutes par mois. Les interventions hors forfait sont proposées à 70 €/heure après votre validation. Les contrôles mensuels, le diagnostic et les 30 minutes de modifications de l’offre Suivi sont des prestations distinctes. Les défauts relevant des obligations de livraison initiales restent traités indépendamment de l’abonnement. Aucun délai de résolution ni disponibilité à 100 % n’est garanti.',
  },
  {
    question: 'Ces abonnements conviennent-ils aux applications complexes ?',
    answer:
      'Les applications web complexes nécessitent une maintenance sur devis, adaptée à leurs fonctionnalités et à leur infrastructure.',
  },
];
