import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('Landing routes', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it('redirects every former page to the landing and its unique form', async () => {
    const harness = await RouterTestingHarness.create();
    for (const path of ['/services', '/realisations', '/realisations/koacher', '/a-propos', '/contact', '/mentions-legales', '/confidentialite', '/404']) {
      await harness.navigateByUrl(path);
      expect(TestBed.inject(Router).url).toBe('/');
      expect(harness.routeNativeElement?.querySelectorAll('form')).toHaveLength(1);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Création de sites internet à Bordeaux');
    }
  });

  it('redirects unknown paths to the landing', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/realisations/projet-inexistant');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Création de sites internet à Bordeaux',
    );
  });
});
