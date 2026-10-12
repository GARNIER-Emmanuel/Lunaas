import { Project } from '../interfaces';

export const PROJECT_DATA: readonly Project[] = [
  {
    slug: 'portfolio-2026',
    name: 'Portfolio 2026',
    category: 'Projet personnel',
    label: 'Vitrine professionnelle',
    accent: '#b6a4ff',
    summary: 'Un portfolio bilingue pour présenter un parcours, des compétences et des projets.',
    context:
      'Un projet personnel de présentation professionnelle, conçu pour permettre aux recruteurs de découvrir un parcours et des réalisations.',
    goal: 'Organiser les informations, faciliter leur consultation et proposer une expérience cohérente en français et en anglais.',
    solution:
      'Une application Angular avec des contenus typés, des composants autonomes et une présentation responsive des expériences et des projets.',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Angular Material', 'i18n'],
    repo: 'https://github.com/GARNIER-Emmanuel/Portfolio_2026_Angular',
  },
  {
    slug: 'koacher',
    name: 'Koacher',
    category: 'Projet personnel',
    label: 'Application web progressive',
    accent: '#91d6c3',
    summary: 'Une PWA pour organiser ses programmes de musculation et suivre ses séances.',
    context:
      'Un projet personnel autour du suivi de musculation et de la consultation des programmes sur mobile.',
    goal: 'Accompagner les séances, conserver un historique et rendre le suivi disponible même sans connexion.',
    solution:
      'Une application web progressive avec programmes personnalisables, séances guidées, suivi des progrès et synchronisation des données via Supabase.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PWA', 'Supabase'],
    live: 'https://koacher.party/',
  },
  {
    slug: 'supbro',
    name: 'SupBro',
    category: 'Projet personnel',
    label: 'Projet d’apprentissage full-stack',
    accent: '#e8c48c',
    summary: 'Un projet Angular et Spring Boot pour apprendre les tests de bout en bout.',
    context:
      'Un projet d’apprentissage consacré à une fonctionnalité simple de création et de consultation d’amis.',
    goal: 'Comprendre le fonctionnement d’une application complète et vérifier ses parcours avec des tests automatisés.',
    solution:
      'Un frontend Angular, une API Spring Boot, une base PostgreSQL gérée avec Flyway et des tests unitaires, d’intégration et de bout en bout.',
    technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Selenium'],
    repo: 'https://github.com/GARNIER-Emmanuel/SupBro',
  },
];
