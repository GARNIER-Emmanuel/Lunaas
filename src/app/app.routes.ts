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
  { path: '**', redirectTo: '' },
];
