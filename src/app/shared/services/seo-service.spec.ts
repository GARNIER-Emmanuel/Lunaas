import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Meta } from '@angular/platform-browser';
import { routes } from '../../app.routes';
import { SeoService } from './seo-service';

describe('Page metadata', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    TestBed.inject(SeoService);
  });

  it('updates canonical and description without keeping quote query parameters', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/contact?offre=site-vitrine');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://lunaas.site/contact');
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toContain('demande de devis');
    await harness.navigateByUrl('/services');
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toContain('prix de départ');
  });

  it('keeps legal drafts and missing pages out of indexing', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/mentions-legales');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex, follow');
    await harness.navigateByUrl('/404');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex, follow');
    await harness.navigateByUrl('/');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('index, follow');
  });
});
