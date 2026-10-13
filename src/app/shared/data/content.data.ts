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
    question: 'Combien de temps faut-il pour créer un site ?',
    answer:
      'Le délai dépend du périmètre et de la disponibilité des contenus. Un calendrier est défini après un premier échange ; aucun délai unique n’est annoncé pour tous les projets.',
  },
  {
    question: 'Qui prépare les textes et les photos ?',
    answer:
      'Vous fournissez les textes, les photos, le logo et vos préférences de couleurs. Je vous accompagne dans leur préparation et leur reformulation ; la rédaction complète des contenus est une prestation distincte. Les pages de mentions légales et de confidentialité sont intégrées à partir de textes fournis ou validés par vos soins ; leur rédaction juridique n’est pas incluse.',
  },
  {
    question: 'Comment prenez-vous en compte la protection des données ?',
    answer:
      'Selon les fonctionnalités convenues, je prévois les mesures techniques adaptées, comme des formulaires limités aux informations utiles et un choix de consentement pour les statistiques lorsque nécessaire. J’intègre les textes légaux et de confidentialité fournis ou validés par vos soins ; leur rédaction juridique n’est pas incluse. La conformité dépend aussi des services choisis et de vos pratiques de gestion des données : le site livré ne constitue pas une certification RGPD.',
  },
  {
    question: 'Puis-je gérer mon site après sa création ?',
    answer:
      'La modification autonome des contenus dépend des outils prévus au devis : les forfaits de création n’incluent pas d’espace administrateur par défaut. Si vous souhaitez modifier vous-même les textes ou les images, nous définissons cette possibilité avant le démarrage. Les statistiques de base peuvent être configurées et accessibles sans abonnement ; leur analyse mensuelle fait partie de Suivi.',
  },
  {
    question: 'Que faire si je souhaite modifier mon site après la mise en ligne ?',
    answer:
      'Vous pouvez demander des modifications ponctuelles sur devis ou utiliser le temps de modifications simples prévu dans Suivi. Le temps consacré comprend les vérifications et la publication ; il est compté séparément du diagnostic d’incident, et les minutes de modifications non utilisées ne sont pas reportables. Les nouvelles pages, fonctionnalités et refontes sont étudiées et chiffrées séparément avant votre accord.',
  },
  {
    question: 'Qui gère le domaine, l’hébergement et leur renouvellement ?',
    answer:
      'Le domaine et l’hébergement sont souscrits sur vos propres comptes, avec mon accompagnement pour leur création et leur configuration. Vous gérez leurs renouvellements et leur paiement auprès du fournisseur ; le renouvellement automatique, les échéances et les coûts dépendent du service choisi et sont à vérifier dans votre compte. Vous conservez votre site conformément au contrat de création et la maîtrise de vos comptes après la livraison ou la résiliation de la maintenance.',
  },
  {
    id: 'maintenance-faq',
    question: 'Comment fonctionne l’assistance après la livraison ?',
    answer:
      'Un abonnement commence à la date convenue, après accord et réception du premier paiement ; envoyer le formulaire ne souscrit aucun abonnement. Les demandes se font par e-mail, les jours ouvrés : l’accusé de réception est prévu sous deux jours ouvrés pour Essentiel et un jour ouvré pour Suivi, sans délai de résolution garanti. Toute intervention hors forfait est proposée après votre validation, sans correction illimitée ni garantie de disponibilité à 100 % ; le suivi de Google ne garantit aucun positionnement. Les défauts relevant des obligations de livraison initiales restent traités indépendamment de l’abonnement.',
  },
];
