import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('Project routes', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it('loads each real project and updates when navigating between projects', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/realisations/koacher');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Koacher');
    await harness.navigateByUrl('/realisations/supbro');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('SupBro');
  });

  it('redirects unknown projects to the not-found page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/realisations/projet-inexistant');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Page introuvable',
    );
  });
});
