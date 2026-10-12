import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { PROJECT_DATA } from './shared/data';

describe('Project routes', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it('loads each selected project', async () => {
    const harness = await RouterTestingHarness.create();
    for (const project of PROJECT_DATA) {
      await harness.navigateByUrl(`/realisations/${project.slug}`);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(project.name);
    }
  });

  it('redirects unknown projects to the not-found page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/realisations/projet-inexistant');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Page introuvable',
    );
  });
});
