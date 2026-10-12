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
});
