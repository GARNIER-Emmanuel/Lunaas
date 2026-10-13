import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { LEGAL_BUSINESS_DATA } from './shared/data';

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

  it('keeps the approved section order, nested experience and a single four-step method', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-hero a.button-primary')?.getAttribute('href')).toBe(
      '#contact',
    );
    const approachLink = compiled.querySelector<HTMLAnchorElement>('app-hero a.button-secondary');
    expect(approachLink).not.toBeNull();
    expect(approachLink!.getAttribute('href')).toBe('#approche');
    const approach = compiled.querySelector('#approche');
    expect(compiled.querySelectorAll('#approche')).toHaveLength(1);
    expect(
      [...compiled.querySelector('app-homepage')!.children].map((element) =>
        element.tagName.toLowerCase(),
      ),
    ).toEqual([
      'app-hero',
      'app-projects',
      'app-services',
      'app-process-section',
      'app-about',
      'app-faq',
      'app-contact-cta',
    ]);
    expect(compiled.querySelector('#a-propos #confiance')).not.toBeNull();
    expect(compiled.querySelector('app-skills-marquee')).toBeNull();
    expect(
      [...compiled.querySelectorAll('#site-navigation a')].map((link) => link.textContent?.trim()),
    ).toEqual(['Réalisations', 'Tarifs', 'Méthode', 'Contact']);
    expect(approach?.querySelectorAll('ol > li')).toHaveLength(4);
    expect(compiled.querySelector('#methode')?.contains(approach)).toBe(true);
  });

  it('keeps personal contact details in legal information and the main contact in the form', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const contactLinks = [...root.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]')];
    expect(contactLinks).toHaveLength(0);
    expect(root.querySelector('dialog')).toBeNull();
    expect(root.textContent).not.toContain(LEGAL_BUSINESS_DATA.contactEmail);
    expect(root.textContent).not.toContain(LEGAL_BUSINESS_DATA.contactPhone);
    expect(root.textContent).not.toContain(LEGAL_BUSINESS_DATA.postalAddress);
    expect(root.querySelector('#contact form')).not.toBeNull();
    expect(root.querySelector('#about-title')?.textContent).toContain(
      LEGAL_BUSINESS_DATA.displayName,
    );
    expect(root.querySelector('footer a[href="/#contact"]')).not.toBeNull();
  });

  it('does not present unconfirmed creation steps or tax status as completed', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/mentions-legales');
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const status = root.querySelector('.registration-status')?.textContent?.replace(/\s+/g, ' ');
    expect(status).toContain('La signature, la transmission et la validation');
    expect(status).toContain('ne sont pas confirmées');
    expect(root.querySelector('#mentions-legales')?.textContent).toContain(
      'application non confirmée',
    );
    expect(root.querySelector('a[href^="mailto:"]')?.textContent).toContain(
      LEGAL_BUSINESS_DATA.contactEmail,
    );
    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(root.querySelector('.pricing-note')?.textContent).not.toContain('a été déclarée');
  });

  it('shows indicative prices and offers a project choice in the inline contact form', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = [...compiled.querySelectorAll('app-offer-card')];
    expect(cards).toHaveLength(3);
    for (const [id, expectedPrice] of [
      ['landing-page', '690€'],
      ['site-vitrine', '1490€'],
      ['site-dynamique', 'Surdevis'],
    ]) {
      const card = compiled.querySelector(`#offer-${id}`)?.closest('app-offer-card');
      expect(card?.querySelector('.offer-price strong')?.textContent?.replace(/\s/g, '')).toBe(
        expectedPrice,
      );
    }

    expect(cards[2].textContent).toContain('Projet sur mesure');
    expect(cards[2].textContent).not.toMatch(/2[\s\u00a0\u202f]?990/);
    expect(compiled.textContent).not.toContain('2 990');
    const projectChoice = compiled.querySelector<HTMLSelectElement>('#cta-contact-project');
    expect(projectChoice).not.toBeNull();
    expect([...projectChoice!.options].map((option) => option.value).sort()).toEqual([
      '',
      'autre',
      'donnees-personnelles',
      'landing-page',
      'site-dynamique',
      'site-vitrine',
    ]);
    const dynamicOffer = compiled.querySelector('#offer-site-dynamique')?.closest('app-offer-card');
    expect(dynamicOffer?.querySelector('h4')?.textContent).toContain(
      'Prestations possibles, sur devis',
    );
  });

  it('links the menu to landing sections and closes it after choosing one', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const offersLink = compiled.querySelector<HTMLAnchorElement>('header a[href="/#offres"]');
    expect(offersLink).not.toBeNull();
    const toggle = compiled.querySelector<HTMLButtonElement>('.menu-toggle')!;
    toggle.click();
    await fixture.whenStable();
    offersLink!.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(router.url).toBe('/#offres');
    expect(offersLink!.getAttribute('aria-current')).toBe('location');
    expect(compiled.querySelector('#offres')).not.toBeNull();
    expect(compiled.querySelectorAll('app-offer-card')).toHaveLength(3);
  });

  it('keeps the landing sections and contact inline with links to the two legal pages', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('form')).toHaveLength(1);
    expect(root.querySelector('#contact app-contact-form')).not.toBeNull();
    for (const link of root.querySelectorAll<HTMLAnchorElement>('a[href]')) {
      const href = link.getAttribute('href')!;
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const url = new URL(href, 'https://lunaas.site/');
      if (url.pathname === '/') {
        if (url.hash) expect(root.querySelector(url.hash)).not.toBeNull();
      } else {
        expect(['/mentions-legales', '/confidentialite']).toContain(url.pathname);
      }
      if (link.textContent?.includes('Parlons')) expect(url.hash).toBe('#contact');
    }
  });

  it('navigates from the form to privacy and back to a landing section through the header', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const link = root.querySelector<HTMLAnchorElement>(
      'app-contact-form a[href="/confidentialite"]',
    )!;
    link.click();
    await fixture.whenStable();
    expect(router.url).toBe('/confidentialite');
    expect(root.querySelector('h1')?.textContent).toContain('Confidentialité');
    expect(root.querySelector('form, dialog')).toBeNull();
    expect(root.querySelector('header [aria-current="location"]')).toBeNull();
    root.querySelector<HTMLAnchorElement>('header a[href="/#offres"]')!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/#offres');
    expect(root.querySelector('#offres')).not.toBeNull();
    expect(root.querySelector('header a[href="/#offres"]')?.getAttribute('aria-current')).toBe(
      'location',
    );
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

  it('returns an unknown route to the only landing page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/page-inexistante');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(router.url).toBe('/');
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Création de sites internet à Bordeaux',
    );
  });
});
