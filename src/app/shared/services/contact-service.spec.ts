import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact-service';
import { CONTACT_CONFIG } from '../data';
import { ContactForm } from '../interfaces';

describe('Contact delivery', () => {
  const request: ContactForm = {
    name: ' Élodie Durand ',
    email: 'elodie@example.com',
    projectType: 'site-vitrine',
    budget: '',
    message: 'Mon atelier & mes créations.',
    botcheck: false,
  };
  let service: ContactService;
  const transport = vi.fn();

  beforeEach(() => {
    transport.mockReset();
    vi.stubGlobal('fetch', transport);
    service = TestBed.inject(ContactService);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('sends names, reply address and quote context to the existing configured provider', async () => {
    transport.mockResolvedValue(new Response(JSON.stringify({ success: true })));
    await service.sendEmail(request);
    const [url, options] = transport.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(CONTACT_CONFIG.endpoint);
    expect(options.method).toBe('POST');
    const payload = JSON.parse(String(options.body));
    expect(payload.access_key).toBe(CONTACT_CONFIG.accessKey);
    expect(payload).toMatchObject({
      name: 'Élodie Durand',
      email: 'elodie@example.com',
      project: 'Site vitrine multipage',
      budget: 'À préciser',
      message: request.message,
      botcheck: false,
    });
    expect(payload.subject).toContain('Site vitrine multipage');
  });

  it.each([
    [200, { success: false }],
    [400, { success: true }],
    [200, { success: 'true' }],
  ])('does not accept an unconfirmed delivery (%s)', async (status, result) => {
    transport.mockResolvedValue(new Response(JSON.stringify(result), { status }));
    await expect(service.sendEmail(request)).rejects.toThrow('n’a pas confirmé');
  });

  it('rejects a honeypot submission before contacting the provider', async () => {
    await expect(service.sendEmail({ ...request, botcheck: true })).rejects.toThrow();
    expect(transport).not.toHaveBeenCalled();
  });

  it('rejects a network failure', async () => {
    transport.mockRejectedValue(new TypeError('Network unavailable'));
    await expect(service.sendEmail(request)).rejects.toThrow('Network unavailable');
  });

  it('aborts a request that would otherwise keep the form pending', async () => {
    vi.useFakeTimers();
    transport.mockImplementation(
      (_url: string, options: RequestInit) =>
        new Promise((_resolve, reject) => {
          options.signal?.addEventListener(
            'abort',
            () => reject(new DOMException('Aborted', 'AbortError')),
            { once: true },
          );
        }),
    );
    const rejected = expect(service.sendEmail(request)).rejects.toThrow('Aborted');
    await vi.advanceTimersByTimeAsync(15000);
    await rejected;
  });
});
