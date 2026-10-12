import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECT_DATA } from './shared/data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'realisations/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECT_DATA.map((project) => ({ slug: project.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
