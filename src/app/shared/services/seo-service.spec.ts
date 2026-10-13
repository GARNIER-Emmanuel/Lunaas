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

  it('keeps the landing canonical independent of query parameters and section fragments', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/?offre=site-vitrine#contact');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://lunaas.site/');
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toContain('parlons de votre projet');
    await harness.navigateByUrl('/#offres');
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toContain('sites dynamiques');
  });

  it('gives legal pages their own canonical and metadata without queries or fragments', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/mentions-legales?source=footer#mentions-legales-title');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://lunaas.site/mentions-legales');
    expect(document.title).toBe('Mentions légales | Lunaas');
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toContain('éditeur');
    await harness.navigateByUrl('/confidentialite');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://lunaas.site/confidentialite');
    expect(document.title).toBe('Confidentialité | Lunaas');
    expect(TestBed.inject(Meta).getTag('property="og:url"')?.content).toBe('https://lunaas.site/confidentialite');
    await harness.navigateByUrl('/404');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://lunaas.site/');
    await harness.navigateByUrl('/');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('index, follow');
  });
});
