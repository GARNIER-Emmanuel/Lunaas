import { TestBed } from '@angular/core/testing';
import { MotionService } from './motion-service';

const animation = vi.hoisted(() => {
  const media = { add: vi.fn(), revert: vi.fn() };
  return {
    media,
    matchMedia: vi.fn(() => media),
    registerPlugin: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    refresh: vi.fn(),
  };
});
vi.mock('gsap', () => ({ gsap: animation }));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { refresh: animation.refresh } }));

describe('Optional page motion', () => {
  let root: HTMLElement;
  let service: MotionService;

  beforeEach(() => {
    vi.clearAllMocks();
    animation.media.add.mockImplementation((_query: string, setup: () => void) => {
      setup();
      return animation.media;
    });
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false })),
    );
    root = document.createElement('section');
    root.innerHTML = '<h2 data-motion>Un contenu toujours présent</h2><div data-parallax></div>';
    document.body.append(root);
    service = TestBed.inject(MotionService);
  });

  afterEach(() => {
    root.remove();
    vi.unstubAllGlobals();
  });

  it('keeps the page static when reduced motion is requested', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: true })),
    );
    const dispose = await service.enhance(root, () => false);
    dispose();
    expect(animation.registerPlugin).not.toHaveBeenCalled();
    expect(animation.matchMedia).not.toHaveBeenCalled();
    expect(root.querySelector('h2')?.style.transform).toBe('');
  });

  it('does not enhance a route destroyed while the libraries load', async () => {
    let cancelled = false;
    const pending = service.enhance(root, () => cancelled);
    cancelled = true;
    const dispose = await pending;
    dispose();
    expect(animation.matchMedia).not.toHaveBeenCalled();
  });

  it('does not create scroll triggers for a detached page', async () => {
    root.remove();
    await service.enhance(root, () => false);
    expect(animation.matchMedia).not.toHaveBeenCalled();
  });

  it('scopes animation to the current page and provides its cleanup', async () => {
    const outside = document.createElement('h2');
    outside.setAttribute('data-motion', '');
    document.body.append(outside);
    try {
      const dispose = await service.enhance(root, () => false);
      expect(animation.matchMedia).toHaveBeenCalledWith(root);
      expect(animation.from).toHaveBeenCalledTimes(1);
      expect(animation.from.mock.calls[0][0]).toBe(root.querySelector('h2'));
      expect(animation.fromTo.mock.calls[0][0]).toBe(root.querySelector('[data-parallax]'));
      dispose();
      expect(animation.media.revert).toHaveBeenCalledOnce();
    } finally {
      outside.remove();
    }
  });

  it('reverts a failed setup without blocking access to the text', async () => {
    animation.media.add.mockImplementationOnce(() => {
      throw new Error('Animation setup unavailable');
    });
    const dispose = await service.enhance(root, () => false);
    dispose();
    expect(animation.media.revert).toHaveBeenCalledOnce();
    expect(root.querySelector('h2')?.textContent).toBe('Un contenu toujours présent');
    expect(root.querySelector('h2')?.style.visibility).toBe('');
  });

  it('slides only opted-in sections as a group and preserves other vertical entrances', async () => {
    root.innerHTML = `
      <h2 id="ordinary" data-motion>Entrée habituelle</h2>
      <section data-reveal="left"><div class="page-container">
        <h2 data-motion>Maintenance</h2><article data-motion>Carte</article>
      </div></section>
      <section data-reveal="right"><div class="page-container">
        <h2 data-motion>Méthode</h2>
      </div></section>`;
    const dispose = await service.enhance(root, () => false);
    const left = root.querySelector('[data-reveal="left"] .page-container');
    const right = root.querySelector('[data-reveal="right"] .page-container');
    expect(animation.from).toHaveBeenCalledTimes(3);
    expect(animation.from).toHaveBeenCalledWith(
      root.querySelector('#ordinary'),
      expect.objectContaining({ y: 40, duration: 0.9, clearProps: 'transform' }),
    );
    for (const [content, direction] of [
      [left, -1],
      [right, 1],
    ] as const) {
      const vars = animation.from.mock.calls.find(([element]) => element === content)?.[1] as {
        x: () => number;
      };
      expect(Math.sign(vars.x())).toBe(direction);
      expect(animation.from).toHaveBeenCalledWith(
        content,
        expect.objectContaining({
          opacity: 0,
          clearProps: 'transform,opacity',
          scrollTrigger: expect.objectContaining({ trigger: content?.parentElement, once: true }),
        }),
      );
      vi.stubGlobal('innerWidth', 360);
      expect(Math.abs(vars.x())).toBeLessThan(50);
    }
    dispose();
    expect(animation.media.revert).toHaveBeenCalledOnce();
  });
});
