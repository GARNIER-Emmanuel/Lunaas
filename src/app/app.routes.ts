import { Routes } from '@angular/router';
import { Homepage } from './views/homepage/homepage';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Homepage,
    title: 'Création de sites internet à Bordeaux | Lunaas',
  },
  {
    path: '404',
    loadComponent: () => import('./views/notfound/notfound').then(m => m.Notfound),
    title: 'Page introuvable | Lunaas',
  },
  {
    path: '**',
    loadComponent: () => import('./views/notfound/notfound').then(m => m.Notfound),
    title: 'Page introuvable | Lunaas',
  },
];
