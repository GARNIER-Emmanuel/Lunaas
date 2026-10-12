import { Project } from '../interfaces';

export const PROJECT_DATA: readonly Project[] = [
  {
    slug: 'koacher',
    name: 'Koacher',
    image: {
      src: '/images/projects/Koacher.png',
      alt: 'Aperçu de l’application Koacher',
      width: 1418,
      height: 1081,
    },
    category: 'Projet personnel',
    label: 'Application web progressive',
    accent: '#91d6c3',
    highlights: ['Programmes personnalisables', 'Séances guidées', 'Suivi des progrès'],
    summary: 'Une PWA pour organiser ses programmes de musculation et suivre ses séances.',
    context:
      'Un projet personnel autour du suivi de musculation et de la consultation des programmes sur mobile.',
    goal: 'Accompagner les séances, conserver un historique et rendre le suivi disponible même sans connexion.',
    solution:
      'Une application web progressive avec programmes personnalisables, séances guidées, suivi des progrès et synchronisation des données via Supabase.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PWA', 'Supabase'],
    live: 'https://koacher.party/',
  },
];
