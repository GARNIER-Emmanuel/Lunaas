import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';

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
    enter(root, `${prefix}-lastname`, 'Durand');
    enter(root, `${prefix}-firstname`, 'Élodie');
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
    expect(root.querySelector<HTMLInputElement>('#cta-contact-lastname')?.value).toBe('');
    expect(root.querySelector<HTMLTextAreaElement>('#cta-contact-message')?.value).toBe('');
    expect(root.querySelector('form a[href^="mailto:"]')).toBeNull();
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
    expect(root.querySelector('form a[href^="mailto:"]')).not.toBeNull();
    submit(root);
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
