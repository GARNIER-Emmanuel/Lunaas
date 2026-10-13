import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../../../app.routes';
import { SITE_DATA } from '../../../../shared/data';

describe('Contact form', () => {
  const transport = vi.fn();
  beforeEach(() => {
    transport.mockReset();
    vi.stubGlobal('fetch', transport);
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });
  afterEach(() => vi.unstubAllGlobals());

  async function page(url = '/') {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    await harness.fixture.whenStable();
    return harness;
  }
  function enter(root: HTMLElement, id: string, value: string) {
    const control = root.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      `#${id}`,
    )!;
    control.value = value;
    control.dispatchEvent(new Event('input', { bubbles: true }));
    if (control.tagName === 'SELECT') control.dispatchEvent(new Event('change', { bubbles: true }));
  }
  async function fill(harness: RouterTestingHarness, prefix = 'cta-contact') {
    const root = harness.routeNativeElement!;
    enter(root, `${prefix}-name`, 'Élodie Durand');
    enter(root, `${prefix}-email`, 'elodie@example.com');
    enter(root, `${prefix}-project`, 'landing-page');
    enter(root, `${prefix}-message`, 'Un site pour mon atelier & mes créations.');
    await harness.fixture.whenStable();
    harness.detectChanges();
    return root;
  }
  function submit(root: HTMLElement) {
    root
      .querySelector('form')!
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  it('accepts an unnamed enquiry with only email and message and keeps budget optional', async () => {
    transport.mockResolvedValue(new Response(JSON.stringify({ success: true })));
    const harness = await page();
    const root = harness.routeNativeElement!;
    expect(root.querySelector<HTMLDetailsElement>('.extra-details')!.open).toBe(false);
    expect(root.querySelector('#cta-contact-firstname')).toBeNull();
    enter(root, 'cta-contact-email', 'atelier@example.com');
    enter(root, 'cta-contact-message', 'Je souhaite discuter de mon projet.');
    await harness.fixture.whenStable();
    submit(root);
    await harness.fixture.whenStable();
    expect(transport).toHaveBeenCalledOnce();
    const payload = JSON.parse(String(transport.mock.calls[0][1].body));
    expect(payload).not.toHaveProperty('name');
    expect(payload.project).toBe('Demande générale');
  });

  it('reveals a budget error when additional details were closed and preserves the draft', async () => {
    const harness = await page();
    const root = await fill(harness);
    enter(root, 'cta-contact-budget', 'x'.repeat(101));
    await harness.fixture.whenStable();
    submit(root);
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(root.querySelector<HTMLDetailsElement>('.extra-details')!.open).toBe(true);
    expect(root.querySelector('#cta-contact-budget-errors')?.textContent).toContain(
      '100 caractères',
    );
    expect(root.querySelector<HTMLInputElement>('#cta-contact-name')!.value).toBe('Élodie Durand');
    expect(transport).not.toHaveBeenCalled();
  });

  it('selects each offer without losing the draft and allows manual or repeated choices', async () => {
    const harness = await page();
    const root = await fill(harness);
    enter(root, 'cta-contact-budget', '1 500 € maximum');
    await harness.fixture.whenStable();

    for (const offerId of ['landing-page', 'site-vitrine', 'site-dynamique']) {
      const link = root
        .querySelector<HTMLAnchorElement>(`#offer-${offerId}`)!
        .closest('app-offer-card')!
        .querySelector<HTMLAnchorElement>('.quote-link')!;
      expect(link.getAttribute('href')).toBe('#contact');
      link.click();
      await harness.fixture.whenStable();
      harness.detectChanges();
      expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe(offerId);
      expect(root.querySelector<HTMLInputElement>('#cta-contact-email')!.value).toBe(
        'elodie@example.com',
      );
      expect(root.querySelector<HTMLInputElement>('#cta-contact-budget')!.value).toBe(
        '1 500 € maximum',
      );
      expect(root.querySelector<HTMLTextAreaElement>('#cta-contact-message')!.value).toContain(
        'mes créations',
      );
    }

    enter(root, 'cta-contact-project', 'autre');
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe('autre');
    root
      .querySelector('#offer-site-dynamique')!
      .closest('app-offer-card')!
      .querySelector<HTMLAnchorElement>('.quote-link')!
      .click();
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe(
      'site-dynamique',
    );
    expect(transport).not.toHaveBeenCalled();
  });

  it.each([
    ['maintenance-essentiel', 'Maintenance — Essentiel'],
    ['maintenance-suivi', 'Maintenance — Suivi'],
  ])('selects and sends %s without losing the draft or subscribing automatically', async (planId, label) => {
    transport.mockResolvedValue(new Response(JSON.stringify({ success: true })));
    const harness = await page();
    const root = await fill(harness);
    enter(root, 'cta-contact-budget', 'À discuter');
    await harness.fixture.whenStable();
    const link = root.querySelector<HTMLAnchorElement>(
      `article[aria-labelledby="${planId}-title"] .maintenance-contact`,
    )!;
    expect(link.getAttribute('href')).toBe('#contact');
    link.click();
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe(planId);
    expect(root.querySelector<HTMLTextAreaElement>('#cta-contact-message')!.value).toBe(
      'Un site pour mon atelier & mes créations.',
    );
    expect(root.querySelector<HTMLInputElement>('#cta-contact-budget')!.value).toBe('À discuter');
    expect(transport).not.toHaveBeenCalled();

    enter(root, 'cta-contact-project', 'autre');
    await harness.fixture.whenStable();
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true, cancelable: true }));
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe('autre');
    link.click();
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe(planId);

    submit(root);
    await harness.fixture.whenStable();
    expect(transport).toHaveBeenCalledOnce();
    const payload = JSON.parse(String(transport.mock.calls[0][1].body));
    expect(payload.project).toBe(label);
    expect(payload.subject).toBe(`Demande de contact — ${label} | ${SITE_DATA.name}`);
    expect(payload.budget).toBe('À discuter');
    expect(payload.message).toBe('Un site pour mon atelier & mes créations.');
  });

  it('offers help without assigning an offer or a budget', async () => {
    const harness = await page();
    const root = harness.routeNativeElement!;
    const link = root.querySelector<HTMLAnchorElement>('.offer-help')!;
    expect(link.getAttribute('href')).toBe('#contact');
    link.click();
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe('');
    expect(root.querySelector<HTMLInputElement>('#cta-contact-budget')!.value).toBe('');
    expect(root.querySelector('#contact')?.getAttribute('tabindex')).toBe('-1');
    expect(transport).not.toHaveBeenCalled();
  });

  it('preserves the draft while reading either legal page and returning to the offers', async () => {
    const harness = await page();
    await fill(harness);
    for (const url of ['/confidentialite', '/mentions-legales']) {
      await harness.navigateByUrl(url);
      await harness.fixture.whenStable();
      expect(harness.routeNativeElement!.querySelector('form')).toBeNull();
      await harness.navigateByUrl('/#offres');
      await harness.fixture.whenStable();
      const root = harness.routeNativeElement!;
      expect(root.querySelector<HTMLInputElement>('#cta-contact-email')!.value).toBe(
        'elodie@example.com',
      );
      expect(root.querySelector<HTMLTextAreaElement>('#cta-contact-message')!.value).toContain(
        'mes créations',
      );
      expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe(
        'landing-page',
      );
    }
    expect(transport).not.toHaveBeenCalled();
  });

  it('does not change the draft when opening an offer link in another tab', async () => {
    const harness = await page();
    const root = await fill(harness);
    root
      .querySelector('#offer-site-vitrine')!
      .closest('app-offer-card')!
      .querySelector<HTMLAnchorElement>('.quote-link')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true, cancelable: true }));
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe(
      'landing-page',
    );
    expect(transport).not.toHaveBeenCalled();
  });

  it('rejects invalid input without sending a request', async () => {
    const harness = await page();
    const root = harness.routeNativeElement!;
    enter(root, 'cta-contact-email', 'invalide');
    submit(root);
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(root.textContent).toContain('Vérifiez les champs');
    expect(transport).not.toHaveBeenCalled();
  });

  it('shows success and resets the fields only after the provider confirms delivery', async () => {
    transport.mockResolvedValue(new Response(JSON.stringify({ success: true })));
    const harness = await page();
    const root = await fill(harness);
    submit(root);
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(transport).toHaveBeenCalledOnce();
    expect(root.querySelector('[role="status"]')?.textContent).toContain(
      'Votre message a été envoyé',
    );
    expect(root.querySelector<HTMLInputElement>('#cta-contact-name')?.value).toBe('');
    expect(root.querySelector<HTMLTextAreaElement>('#cta-contact-message')?.value).toBe('');
    expect(root.querySelector('form a[href^="mailto:"]')).toBeNull();
    await harness.navigateByUrl('/confidentialite');
    await harness.navigateByUrl('/#contact');
    await harness.fixture.whenStable();
    expect(
      harness.routeNativeElement!.querySelector<HTMLTextAreaElement>('#cta-contact-message')!.value,
    ).toBe('');
  });

  it('preserves the message after a failure and allows a retry', async () => {
    transport
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: false })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: true })));
    const harness = await page();
    const root = await fill(harness);
    submit(root);
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(root.querySelector('[role="alert"]')?.textContent).toContain('L’envoi n’a pas abouti');
    expect(root.querySelector<HTMLTextAreaElement>('#cta-contact-message')?.value).toContain(
      'mes créations',
    );
    expect(root.querySelector('form a[href^="mailto:"]')).toBeNull();
    root.querySelector<HTMLButtonElement>('.form-feedback button')!.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(transport).toHaveBeenCalledTimes(2);
    expect(root.querySelector('[role="status"]')?.textContent).toContain('envoyé');
  });

  it('blocks duplicate submissions and disables the fields while sending', async () => {
    let complete!: (response: Response) => void;
    transport.mockReturnValue(
      new Promise<Response>((resolve) => {
        complete = resolve;
      }),
    );
    const harness = await page();
    const root = await fill(harness);
    submit(root);
    submit(root);
    await vi.waitFor(() => expect(transport).toHaveBeenCalledOnce());
    harness.detectChanges();
    expect(root.querySelector<HTMLButtonElement>('form button')?.disabled).toBe(true);
    expect(root.querySelector<HTMLFieldSetElement>('form fieldset')?.disabled).toBe(true);
    root
      .querySelector('#offer-site-vitrine')!
      .closest('app-offer-card')!
      .querySelector<HTMLAnchorElement>('.quote-link')!
      .click();
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLSelectElement>('#cta-contact-project')!.value).toBe(
      'landing-page',
    );
    complete(new Response(JSON.stringify({ success: true })));
    await vi.waitFor(() => {
      harness.detectChanges();
      expect(root.querySelector<HTMLButtonElement>('form button')?.disabled).toBe(false);
    });
  });

  it('provides exactly one sending form in the homepage section', async () => {
    transport.mockResolvedValue(new Response(JSON.stringify({ success: true })));
    const harness = await page('/');
    const root = await fill(harness);
    expect(root.querySelectorAll('form')).toHaveLength(1);
    expect(root.querySelector('app-contact-cta label[for="cta-contact-email"]')).not.toBeNull();
    submit(root);
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(transport).toHaveBeenCalledOnce();
    expect(root.querySelector('app-contact-cta [role="status"]')?.textContent).toContain('envoyé');
  });

  it('accepts a data-rights request with only an email and a message', async () => {
    transport.mockResolvedValue(new Response(JSON.stringify({ success: true })));
    const harness = await page();
    const root = harness.routeNativeElement!;
    enter(root, 'cta-contact-email', 'visiteur@example.com');
    enter(root, 'cta-contact-project', 'donnees-personnelles');
    enter(root, 'cta-contact-message', 'Je souhaite supprimer mon précédent message.');
    await harness.fixture.whenStable();
    submit(root);
    await harness.fixture.whenStable();
    expect(transport).toHaveBeenCalledOnce();
    const payload = JSON.parse(String(transport.mock.calls[0][1].body));
    expect(payload.project).toBe('Mes données personnelles');
    expect(payload.subject).toContain('Demande de contact');
    expect(payload).not.toHaveProperty('name');
  });

  it('allows a general request without a subject but rejects an unknown subject', async () => {
    transport.mockResolvedValue(new Response(JSON.stringify({ success: true })));
    const harness = await page();
    const root = harness.routeNativeElement!;
    enter(root, 'cta-contact-email', 'visiteur@example.com');
    enter(root, 'cta-contact-message', 'Une question sur vos prestations.');
    const select = root.querySelector<HTMLSelectElement>('#cta-contact-project')!;
    const option = document.createElement('option');
    option.value = 'inconnu';
    select.append(option);
    enter(root, 'cta-contact-project', 'inconnu');
    await harness.fixture.whenStable();
    submit(root);
    await harness.fixture.whenStable();
    expect(transport).not.toHaveBeenCalled();
    enter(root, 'cta-contact-project', '');
    await harness.fixture.whenStable();
    submit(root);
    await harness.fixture.whenStable();
    expect(transport).toHaveBeenCalledOnce();
    expect(JSON.parse(String(transport.mock.calls[0][1].body)).project).toBe('Demande générale');
  });

  it('blocks a filled honeypot without a network request', async () => {
    const harness = await page();
    const root = await fill(harness);
    const trap = root.querySelector<HTMLInputElement>('.honeypot')!;
    trap.checked = true;
    trap.dispatchEvent(new Event('input', { bubbles: true }));
    trap.dispatchEvent(new Event('change', { bubbles: true }));
    await harness.fixture.whenStable();
    submit(root);
    await harness.fixture.whenStable();
    expect(transport).not.toHaveBeenCalled();
  });
});
