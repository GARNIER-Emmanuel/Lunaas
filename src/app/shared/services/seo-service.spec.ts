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

  it('keeps former pages on the landing canonical after their redirect', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/mentions-legales');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://lunaas.site/');
    await harness.navigateByUrl('/404');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://lunaas.site/');
    await harness.navigateByUrl('/');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('index, follow');
  });
});
