import { ActivatedRouteSnapshot, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { PROJECT_DATA } from './shared/data';
import { Homepage } from './views/homepage/homepage';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Homepage,
    title: 'Création de sites internet à Bordeaux | Lunaas',
  },
  {
    path: 'realisations',
    loadComponent: () => import('./views/realisations/realisations').then((m) => m.Realisations),
    title: 'Réalisations et projets personnels | Lunaas',
  },
  {
    path: 'realisations/:slug',
    loadComponent: () =>
      import('./views/realisations/project-detail/project-detail').then((m) => m.ProjectDetail),
    resolve: {
      project: (route: ActivatedRouteSnapshot) =>
        PROJECT_DATA.find((p) => p.slug === route.paramMap.get('slug')) ??
        new RedirectCommand(inject(Router).parseUrl('/404')),
    },
    title: (route: ActivatedRouteSnapshot) =>
      `${PROJECT_DATA.find((p) => p.slug === route.paramMap.get('slug'))?.name ?? 'Projet'} | Lunaas`,
  },
  {
    path: '404',
    loadComponent: () => import('./views/notfound/notfound').then((m) => m.Notfound),
    title: 'Page introuvable | Lunaas',
  },
  {
    path: '**',
    loadComponent: () => import('./views/notfound/notfound').then((m) => m.Notfound),
    title: 'Page introuvable | Lunaas',
  },
];
