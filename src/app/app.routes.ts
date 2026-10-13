import { Routes } from '@angular/router';
import { Homepage } from './views/homepage/homepage';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Homepage,
    title: 'Création de sites internet à Bordeaux | Lunaas',
    data: {
      description:
        'Lunaas conçoit des sites internet à Bordeaux : landing pages, sites vitrines et sites dynamiques. Découvrez les offres et parlons de votre projet.',
    },
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./views/legal-notice/legal-notice').then((module) => module.LegalNotice),
    title: 'Mentions légales | Lunaas',
    data: {
      description: 'Informations sur l’éditeur du site Lunaas, ses coordonnées et les mentions légales de son activité.',
    },
  },
  {
    path: 'confidentialite',
    loadComponent: () => import('./views/privacy/privacy').then((module) => module.Privacy),
    title: 'Confidentialité | Lunaas',
    data: {
      description: 'Découvrez comment Lunaas traite les données transmises par son formulaire de contact et comment exercer vos droits.',
    },
  },
  { path: '**', redirectTo: '' },
];
