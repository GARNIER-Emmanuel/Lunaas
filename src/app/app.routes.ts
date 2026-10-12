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
    data: {
      description:
        'Lunaas conçoit des sites internet à Bordeaux : landing pages, sites vitrines et sites dynamiques. Découvrez les offres et parlons de votre projet.',
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./views/contact/contact').then((m) => m.Contact),
    title: 'Contact et demande de devis | Lunaas',
    data: {
      description:
        'Envoyez votre demande de devis pour un site internet à Bordeaux. Précisez votre besoin et contactez directement Lunaas.',
    },
  },
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import('./views/mentions-legales/mentions-legales').then((m) => m.MentionsLegales),
    title: 'Mentions légales | Lunaas',
    data: {
      description:
        'Informations sur l’édition du site Lunaas et informations administratives à finaliser.',
      noindex: true,
    },
  },
  {
    path: 'confidentialite',
    loadComponent: () =>
      import('./views/confidentialite/confidentialite').then((m) => m.Confidentialite),
    title: 'Confidentialité | Lunaas',
    data: {
      description:
        'Comprenez comment les formulaires Lunaas transmettent votre demande via Web3Forms et comment les informations de contact sont utilisées.',
      noindex: true,
    },
  },
  {
    path: 'services',
    loadComponent: () => import('./views/services/services').then((m) => m.ServicePage),
    title: 'Création de sites web et tarifs | Lunaas',
    data: {
      description:
        'Création de landing pages, sites vitrines et sites dynamiques : comparez les prestations et leurs prix de départ indicatifs chez Lunaas.',
    },
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./views/a-propos/a-propos').then((m) => m.APropos),
    title: 'Développeur web indépendant à Bordeaux | Lunaas',
    data: {
      description:
        'Découvrez Emmanuel Garnier Boidun, développeur web full-stack à Bordeaux, et la démarche de création de sites Lunaas.',
    },
  },
  {
    path: 'realisations',
    loadComponent: () => import('./views/realisations/realisations').then((m) => m.Realisations),
    title: 'Réalisations et projets personnels | Lunaas',
    data: {
      description:
        'Explorez des projets personnels de développement web : contexte, objectifs, technologies et solutions mises en place.',
    },
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
    data: {
      description:
        'La page demandée est introuvable. Retrouvez les prestations et réalisations de Lunaas depuis l’accueil.',
      noindex: true,
    },
  },
  {
    path: '**',
    loadComponent: () => import('./views/notfound/notfound').then((m) => m.Notfound),
    title: 'Page introuvable | Lunaas',
  },
];
