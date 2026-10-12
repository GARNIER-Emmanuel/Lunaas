import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';

describe('Contact form', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  async function page(url = '/contact') {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    return harness;
  }
  function enter(root: HTMLElement, id: string, value: string) {
    const control = root.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      `#${id}`,
    )!;
    control.value = value;
    control.dispatchEvent(
      new Event(control.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }),
    );
  }

  it('preselects the offer coming from a quote link', async () => {
    const harness = await page('/contact?offre=site-vitrine');
    expect(
      harness.routeNativeElement?.querySelector<HTMLSelectElement>('#contact-project')?.value,
    ).toBe('site-vitrine');
  });

  it('rejects invalid input without preparing an email', async () => {
    const harness = await page();
    const root = harness.routeNativeElement!;
    enter(root, 'contact-email', 'invalide');
    root
      .querySelector('form')!
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(root.textContent).toContain('Vérifiez les champs');
    expect(root.querySelector('form a[href^="mailto:"]')).toBeNull();
  });

  it('prepares an encoded draft and clears it when the fields change', async () => {
    const harness = await page('/contact?offre=landing-page');
    const root = harness.routeNativeElement!;
    enter(root, 'contact-name', 'Élodie');
    enter(root, 'contact-email', 'elodie@example.com');
    enter(root, 'contact-message', 'Un site pour mon atelier & mes créations.');
    await harness.fixture.whenStable();
    harness.detectChanges();
    root
      .querySelector('form')!
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    harness.detectChanges();
    const draft = root.querySelector<HTMLAnchorElement>('form a[href^="mailto:"]');
    expect(draft).not.toBeNull();
    const url = new URL(draft!.href);
    expect(url.searchParams.get('subject')).toContain('Landing page');
    expect(url.searchParams.get('body')).toContain('Un site pour mon atelier & mes créations.');
    expect(root.textContent).toContain('Aucune demande n’a encore été envoyée');
    enter(root, 'contact-message', 'Un autre besoin');
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(root.querySelector('form a[href^="mailto:"]')).toBeNull();
  });
});
