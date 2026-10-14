import { Project } from '../interfaces';

export const PROJECT_DATA: readonly Project[] = [
  {
    slug: 'koacher',
    name: 'Koacher',
    image: {
      src: '/images/projects/koacher.webp',
      alt: 'Aperçu de l’application Koacher',
      width: 1418,
      height: 1081,
    },
    category: 'Projet personnel',
    accent: '#91d6c3',
    summary: 'Une PWA pour organiser ses programmes de musculation et suivre ses séances.',
    goal: 'Accompagner les séances, conserver un historique et rendre le suivi disponible même sans connexion.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PWA', 'Supabase'],
    live: 'https://koacher.party/',
  },
];
