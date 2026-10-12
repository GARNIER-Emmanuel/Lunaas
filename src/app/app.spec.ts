import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders the homepage inside the shared layout', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Création de sites internet à Bordeaux',
    );
    expect(compiled.querySelector('header')).not.toBeNull();
    expect(compiled.querySelector('footer')).not.toBeNull();
  });

  it('provides an email contact and a working approach link', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-hero a.button-primary')?.getAttribute('href')).toBe(
      'mailto:manu.boidun@gmail.com',
    );
    const approachLink = compiled.querySelector<HTMLAnchorElement>('app-hero a.button-secondary');
    expect(approachLink).not.toBeNull();
    approachLink!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/#approche');
    expect(compiled.querySelector('#approche')).not.toBeNull();
  });

  it('shows indicative prices and prepares a quote for the selected offer', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = [...compiled.querySelectorAll('app-offer-card')];
    expect(cards).toHaveLength(3);
    const prices = cards.map((card) =>
      card.querySelector('.offer-price strong')?.textContent?.replace(/\s/g, ''),
    );
    expect(prices).toEqual(['490€', '990€', '1790€']);

    for (const card of cards) {
      expect(card.querySelector('.offer-price > span')?.textContent).toContain('À partir de');
      const link = card.querySelector<HTMLAnchorElement>('.quote-link')!;
      const url = new URL(link.href);
      expect(url.protocol).toBe('mailto:');
      expect(url.pathname).toBe('manu.boidun@gmail.com');
      expect(url.searchParams.get('subject')).toBe(
        `Demande de devis — ${card.querySelector('h3')?.textContent}`,
      );
    }
    expect(cards[2].querySelector('h4')?.textContent).toContain('Prestations possibles, sur devis');
  });

  it('navigates from the header to the offers section', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const offersLink = compiled.querySelector<HTMLAnchorElement>('header a[href="/#offres"]');
    expect(offersLink).not.toBeNull();
    offersLink!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/#offres');
    expect(compiled.querySelector('#offres')).not.toBeNull();
  });

  it('handles an unknown route and lets the visitor return home', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/page-inexistante');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Page introuvable');

    const returnLink = compiled.querySelector<HTMLAnchorElement>('app-notfound a');
    expect(returnLink).not.toBeNull();
    returnLink!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/');
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Création de sites internet à Bordeaux',
    );
  });
});
