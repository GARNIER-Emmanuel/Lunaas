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
      '#contact',
    );
    const approachLink = compiled.querySelector<HTMLAnchorElement>('app-hero a.button-secondary');
    expect(approachLink).not.toBeNull();
    expect(approachLink!.getAttribute('href')).toBe('#approche');
    expect(compiled.querySelector('#approche')).not.toBeNull();
  });

  it('shows indicative prices and offers a project choice in the inline contact form', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = [...compiled.querySelectorAll('app-offer-card')];
    expect(cards).toHaveLength(3);
    for (const [id, expectedPrice] of [
      ['landing-page', '490€'],
      ['site-vitrine', '990€'],
      ['site-dynamique', '1790€'],
    ]) {
      const card = compiled.querySelector(`#offer-${id}`)?.closest('app-offer-card');
      expect(card?.querySelector('.offer-price strong')?.textContent?.replace(/\s/g, '')).toBe(
        expectedPrice,
      );
    }

    for (const card of cards) {
      expect(card.querySelector('.offer-price > span')?.textContent).toContain('À partir de');
    }
    const projectChoice = compiled.querySelector<HTMLSelectElement>('#cta-contact-project');
    expect(projectChoice).not.toBeNull();
    expect([...projectChoice!.options].map((option) => option.value).sort()).toEqual([
      '',
      'autre',
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
    const offersLink = compiled.querySelector<HTMLAnchorElement>('header a[href="#offres"]');
    expect(offersLink).not.toBeNull();
    const toggle = compiled.querySelector<HTMLButtonElement>('.menu-toggle')!;
    toggle.click();
    await fixture.whenStable();
    offersLink!.addEventListener('click', (event) => event.preventDefault());
    offersLink!.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(router.url).toBe('/');
    expect(compiled.querySelector('#offres')).not.toBeNull();
    expect(compiled.querySelectorAll('app-offer-card')).toHaveLength(3);
  });

  it('keeps every internal link on the landing with one contact form', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('form')).toHaveLength(1);
    expect(root.querySelector('#contact app-contact-form')).not.toBeNull();
    for (const link of root.querySelectorAll<HTMLAnchorElement>('a[href]')) {
      const href = link.getAttribute('href')!;
      if (/^(https?:|mailto:)/.test(href)) continue;
      expect(href.startsWith('#')).toBe(true);
      expect(root.querySelector(href)).not.toBeNull();
      if (link.textContent?.includes('Parlons')) expect(href).toBe('#contact');
    }
  });

  it('opens privacy information from the form without changing page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const dialog = root.querySelector<HTMLDialogElement>('#confidentialite')!;
    dialog.showModal = vi.fn();
    const link = root.querySelector<HTMLAnchorElement>('app-contact-form a[href="#confidentialite"]')!;
    link.click();
    await fixture.whenStable();
    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(router.url).toBe('/');
    expect(dialog.getAttribute('aria-labelledby')).toBe('confidentialite-title');
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
