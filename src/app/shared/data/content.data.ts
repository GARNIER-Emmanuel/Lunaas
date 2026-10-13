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
    question: 'Comment créer un site professionnel avec un petit budget ?',
    answer:
      'Pour démarrer avec un budget maîtrisé, un site d’une page peut suffire à présenter votre activité, vos prestations et vos coordonnées. Le forfait à 800 € couvre une page commerciale jusqu’à six sections. Vous fournissez les textes, les photos et le logo ; nous définissons ensemble les contenus essentiels et le périmètre au devis. Le domaine, l’hébergement, la maintenance et les fonctionnalités supplémentaires sont facturés séparément.',
  },
  {
    question: 'Combien de temps faut-il pour créer un site ?',
    answer:
      'Le délai dépend du périmètre et de la disponibilité des contenus. Un calendrier est défini après un premier échange ; aucun délai unique n’est annoncé pour tous les projets.',
  },
  {
    question: 'Le domaine, l’hébergement et la maintenance sont-ils inclus ?',
    answer:
      `Non, le domaine, l’hébergement et la maintenance sont séparés du forfait de création. Le fournisseur et les coûts du domaine et de l’hébergement sont définis au cadrage et précisés au devis. La maintenance est facultative et fait l’objet d’un accord distinct ; aucun abonnement n’est souscrit par défaut. ${LEGAL_BUSINESS_DATA.clientInfrastructureNote}`,
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
    question: 'Comment souscrire et démarrer un abonnement de maintenance ?',
    answer:
      'La souscription passe par un échange et un accord distinct ; envoyer le formulaire ne souscrit aucun abonnement. L’abonnement commence à la date convenue, après accord et réception du premier paiement. Aucun abonnement n’est inclus par défaut dans la création du site.',
  },
  {
    question: 'Puis-je résilier et conserver mon site ?',
    answer:
      'Oui. Les abonnements sont sans engagement de durée. Vous pouvez résilier par e-mail à tout moment ; l’arrêt prend effet à la fin de la période payée. Vous conservez votre site conformément au contrat de création et la maîtrise de vos comptes de domaine et d’hébergement.',
  },
  {
    question: 'Comment demander une intervention et sous quel délai ?',
    answer:
      'Envoyez votre demande par e-mail à l’adresse professionnelle figurant dans les mentions légales. L’assistance est assurée les jours ouvrés, avec un accusé de réception sous deux jours ouvrés pour Essentiel et un jour ouvré pour Suivi. Ce délai concerne la prise en compte de votre demande ; le délai de résolution dépend de l’incident.',
  },
  {
    question: 'Comment les minutes d’intervention sont-elles comptées ?',
    answer:
      'Le temps réellement consacré à une demande comprend les vérifications et la publication. Le diagnostic d’incident et les modifications de contenu de Suivi sont comptés séparément. Les minutes de modifications non utilisées ne sont pas reportables ; les nouvelles pages, fonctionnalités et refontes font l’objet d’un devis.',
  },
  {
    question: 'Que se passe-t-il si un incident dépasse le forfait ?',
    answer:
      'Une intervention hors forfait est proposée après votre validation, sans correction illimitée ni garantie de disponibilité à 100 %. Les contrôles mensuels, le diagnostic et les modifications de contenu sont des prestations distinctes. Les défauts relevant des obligations de livraison initiales restent traités indépendamment de l’abonnement.',
  },
  {
    question: 'Faut-il un abonnement pour consulter les statistiques de mon site ?',
    answer:
      'Non, les statistiques de base peuvent être configurées et accessibles dès la livraison de votre site, sans abonnement. Suivi apporte leur analyse et un bilan mensuel. Son suivi basique de Google consiste à consulter la visibilité du site dans les résultats disponibles ; il ne garantit aucun positionnement.',
  },
];
