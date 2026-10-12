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
    path: 'contact',
    loadComponent: () => import('./views/contact/contact').then((m) => m.Contact),
    title: 'Contact et demande de devis | Lunaas',
  },
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import('./views/mentions-legales/mentions-legales').then((m) => m.MentionsLegales),
    title: 'Mentions légales | Lunaas',
    data: { noindex: true },
  },
  {
    path: 'confidentialite',
    loadComponent: () =>
      import('./views/confidentialite/confidentialite').then((m) => m.Confidentialite),
    title: 'Confidentialité | Lunaas',
    data: { noindex: true },
  },
  {
    path: 'services',
    loadComponent: () => import('./views/services/services').then((m) => m.ServicePage),
    title: 'Création de sites web et tarifs | Lunaas',
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./views/a-propos/a-propos').then((m) => m.APropos),
    title: 'Développeur web indépendant à Bordeaux | Lunaas',
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
