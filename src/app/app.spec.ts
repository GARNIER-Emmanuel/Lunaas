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
      '/contact',
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
      expect(url.pathname).toBe('/contact');
      expect(url.searchParams.get('offre')).toBeTruthy();
    }
    expect(cards[2].querySelector('h4')?.textContent).toContain('Prestations possibles, sur devis');
  });

  it('navigates from the header to the services page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const offersLink = compiled.querySelector<HTMLAnchorElement>('header a[href="/services"]');
    expect(offersLink).not.toBeNull();
    offersLink!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/services');
    expect(compiled.querySelectorAll('app-offer-card')).toHaveLength(3);
  });

  it('opens the menu and closes it with Escape, returning keyboard focus', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
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
