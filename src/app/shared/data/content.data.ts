import { ContentItem, FaqItem, Profile } from '../interfaces';
export const PROCESS_DATA: readonly ContentItem[] = [
  {
    id: 'echanger',
    title: 'Comprendre votre besoin',
    description:
      'Nous parlons de votre activité, de vos visiteurs et de ce que vous attendez du site.',
  },
  {
    id: 'cadrer',
    title: 'Définir le bon périmètre',
    description:
      'Les pages, les fonctionnalités et les contenus nécessaires sont précisés dans un devis adapté au projet.',
  },
  {
    id: 'construire',
    title: 'Concevoir et développer',
    description:
      'Le design et le développement avancent à partir du besoin défini, avec des échanges pour affiner le résultat.',
  },
  {
    id: 'livrer',
    title: 'Vérifier et mettre en ligne',
    description:
      'Nous vérifions les parcours et le rendu sur les différents écrans avant la mise en ligne prévue au devis.',
  },
];
export const PROFILE_DATA: Profile = {
  name: 'Emmanuel Garnier Boidun',
  role: 'Développeur web full-stack à Bordeaux',
  introduction:
    'Diplômé Bac+5, je développe des interfaces web et des applications avec Angular, Java et Spring Boot. Avec Lunaas, je mets ces compétences au service d’une présence en ligne claire et adaptée à votre activité.',
  skills: [
    'Angular',
    'TypeScript',
    'HTML & CSS',
    'Java',
    'Spring Boot',
    'API REST',
    'Tests logiciels',
    'Déploiement web',
  ],
};
export const FAQ_DATA: readonly FaqItem[] = [
  {
    question: 'Combien coûte la création d’un site internet ?',
    answer:
      'Les prix de départ sont de 490 € pour une landing page, 990 € pour un site vitrine multipage et 1 790 € pour un site dynamique. Ils sont indicatifs : le tarif final est précisé dans un devis selon les pages, les fonctionnalités et les contenus nécessaires.',
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
    question: 'Puis-je demander des modifications ?',
    answer:
      'Les offres landing page et site vitrine prévoient deux séries de retouches. Leur périmètre est défini au devis. Les demandes supplémentaires ou les changements importants sont discutés et chiffrés séparément.',
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
