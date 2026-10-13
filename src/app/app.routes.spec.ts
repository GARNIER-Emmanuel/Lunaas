import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('Landing routes', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it('redirects every former page to the landing and its unique form', async () => {
    const harness = await RouterTestingHarness.create();
    for (const path of ['/services', '/realisations', '/realisations/koacher', '/a-propos', '/contact', '/404']) {
      await harness.navigateByUrl(path);
      expect(TestBed.inject(Router).url).toBe('/');
      expect(harness.routeNativeElement?.querySelectorAll('form')).toHaveLength(1);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Création de sites internet à Bordeaux');
    }
  });

  it('renders only the two requested legal pages outside the landing', async () => {
    const harness = await RouterTestingHarness.create();
    for (const [path, heading] of [
      ['/mentions-legales', 'Mentions légales'],
      ['/confidentialite', 'Confidentialité'],
    ]) {
      await harness.navigateByUrl(path);
      expect(TestBed.inject(Router).url).toBe(path);
      expect(harness.routeNativeElement?.querySelectorAll('h1')).toHaveLength(1);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(heading);
      expect(harness.routeNativeElement?.querySelector('form, dialog')).toBeNull();
      expect(harness.routeNativeElement?.querySelector('a[href="/"]')).not.toBeNull();
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
