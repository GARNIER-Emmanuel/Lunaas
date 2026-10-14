import { mountHeroImageTrail } from './hero-image-trail';

function drawingContext(): CanvasRenderingContext2D {
  return {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    drawImage: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

describe('Hero image trail', () => {
  let root: HTMLElement;
  let canvas: HTMLCanvasElement;
  let media: MediaQueryList;
  let brush: CanvasRenderingContext2D;
  let renderer: CanvasRenderingContext2D;
  let pending: Map<number, FrameRequestCallback>;
  let dispose: () => void;
  let now: number;
  const disconnect = vi.fn();

  const move = (x: number, y: number, pointerType = 'mouse') => {
    const event = new MouseEvent('pointermove', { clientX: x, clientY: y });
    Object.defineProperty(event, 'pointerType', { value: pointerType });
    root.dispatchEvent(event);
  };

  const tick = (time: number) => {
    now = time;
    const callbacks = [...pending.values()];
    pending.clear();
    callbacks.forEach((callback) => callback(time));
  };

  beforeEach(() => {
    now = 100;
    pending = new Map();
    let id = 0;
    dispose = () => {};
    disconnect.mockClear();
    root = document.createElement('section');
    canvas = document.createElement('canvas');
    root.append(canvas);
    document.body.append(root);
    vi.spyOn(root, 'getBoundingClientRect').mockReturnValue(new DOMRect(40, 20, 1000, 700));
    media = Object.assign(new EventTarget(), { matches: true }) as MediaQueryList;
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    );
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect = disconnect;
      },
    );
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        pending.set(++id, callback);
        return id;
      }),
    );
    vi.stubGlobal(
      'cancelAnimationFrame',
      vi.fn((frame: number) => pending.delete(frame)),
    );
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(1489);
    vi.spyOn(HTMLImageElement.prototype, 'naturalHeight', 'get').mockReturnValue(661);
    renderer = drawingContext();
    brush = drawingContext();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValueOnce(renderer)
      .mockReturnValue(brush);
  });

  afterEach(() => {
    dispose();
    root.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('draws a connected trail inside the hero, then stops and clears at rest', () => {
    dispose = mountHeroImageTrail(root, canvas);
    expect(pending.size).toBe(0);
    move(150, 90);
    tick(116);
    expect(brush.moveTo).toHaveBeenLastCalledWith(55, 35);
    move(400, 190);
    tick(132);
    // Le trait suivant repart exactement de la fin du précédent.
    expect(brush.moveTo).toHaveBeenLastCalledWith(55, 35);
    expect(renderer.drawImage).toHaveBeenCalled();
    expect(pending.size).toBe(1);
    tick(1000);
    expect(pending.size).toBe(0);
    expect(renderer.clearRect).toHaveBeenLastCalledWith(0, 0, 1000, 700);
    const clears = vi.mocked(renderer.clearRect).mock.calls.length;
    window.dispatchEvent(new Event('scroll'));
    expect(renderer.clearRect).toHaveBeenCalledTimes(clears);
  });

  it('ignores touch scrolling and does not allocate a canvas on coarse or reduced-motion devices', () => {
    dispose = mountHeroImageTrail(root, canvas);
    move(150, 90, 'touch');
    expect(pending.size).toBe(0);
    dispose();
    vi.mocked(HTMLCanvasElement.prototype.getContext).mockClear();
    Object.defineProperty(media, 'matches', { value: false });
    dispose = mountHeroImageTrail(root, canvas);
    move(150, 90);
    expect(HTMLCanvasElement.prototype.getContext).not.toHaveBeenCalled();
    expect(pending.size).toBe(0);
  });

  it('cancels the animation immediately when motion preferences change or the page is destroyed', () => {
    dispose = mountHeroImageTrail(root, canvas);
    move(150, 90);
    expect(pending.size).toBe(1);
    Object.defineProperty(media, 'matches', { value: false, configurable: true });
    media.dispatchEvent(new Event('change'));
    expect(pending.size).toBe(0);
    expect(disconnect).toHaveBeenCalledOnce();
    Object.defineProperty(media, 'matches', { value: true });
    media.dispatchEvent(new Event('change'));
    move(150, 90);
    expect(pending.size).toBe(1);
    dispose();
    move(200, 150);
    expect(pending.size).toBe(0);
    expect(disconnect).toHaveBeenCalledTimes(2);
    dispose = () => {};
  });
});
