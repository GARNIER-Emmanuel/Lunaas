import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageTrail } from './image-trail';

@Component({
  imports: [ImageTrail],
  template: '<section [appImageTrail]="image()" [trailOptions]="options()">Contenu</section>',
})
class TrailHost {
  readonly image = signal('/images/hero-background.jpg');
  readonly options = signal<Partial<{ size: number; duration: number; opacity: number }>>({});
}

function drawingContext(): CanvasRenderingContext2D {
  return Object.fromEntries(
    ['clearRect', 'fillRect', 'beginPath', 'moveTo', 'lineTo', 'stroke', 'drawImage'].map(
      (method) => [method, vi.fn()],
    ),
  ) as unknown as CanvasRenderingContext2D;
}

describe('Shared image trail', () => {
  let fixture: ComponentFixture<TrailHost>;
  let root: HTMLElement;
  let media: MediaQueryList;
  let contexts: CanvasRenderingContext2D[];
  let images: HTMLImageElement[];
  let pending: Map<number, FrameRequestCallback>;
  let now: number;
  const disconnect = vi.fn();

  const move = (element = root, x = 150, y = 90, pointerType = 'mouse') => {
    const event = new MouseEvent('pointermove', { clientX: x, clientY: y });
    Object.defineProperty(event, 'pointerType', { value: pointerType });
    element.dispatchEvent(event);
  };
  const tick = (time: number) => {
    now = time;
    const callbacks = [...pending.values()];
    pending.clear();
    callbacks.forEach((callback) => callback(time));
  };

  beforeEach(async () => {
    now = 100;
    pending = new Map();
    contexts = [];
    images = [];
    let id = 0;
    disconnect.mockClear();
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
    vi.spyOn(HTMLImageElement.prototype, 'src', 'set').mockImplementation(function (
      this: HTMLImageElement,
    ) {
      images.push(this);
    });
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      const context = drawingContext();
      contexts.push(context);
      return context;
    });
    TestBed.configureTestingModule({ imports: [TrailHost] });
    fixture = TestBed.createComponent(TrailHost);
    await fixture.whenStable();
    root = fixture.nativeElement.querySelector('section');
    vi.spyOn(root, 'getBoundingClientRect').mockReturnValue(new DOMRect(40, 20, 1000, 700));
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('loads on first mouse movement, draws a connected trail and stops completely at rest', () => {
    expect(root.querySelector('canvas')).toBeNull();
    expect(contexts).toHaveLength(0);
    expect(images).toHaveLength(0);
    move();
    tick(116);
    expect(contexts[1].moveTo).toHaveBeenLastCalledWith(55, 35);
    expect(contexts[1].lineWidth).toBe(200);
    move(root, 400, 190);
    tick(132);
    expect(contexts[1].moveTo).toHaveBeenLastCalledWith(55, 35);
    expect(contexts[0].drawImage).toHaveBeenCalledTimes(4);
    tick(1800);
    expect(pending.size).toBe(0);
    const clears = vi.mocked(contexts[0].clearRect).mock.calls.length;
    window.dispatchEvent(new Event('scroll'));
    expect(contexts[0].clearRect).toHaveBeenCalledTimes(clears);
  });

  it('does not create or load the decoration for touch, coarse pointers or reduced motion', () => {
    move(root, 150, 90, 'touch');
    expect(contexts).toHaveLength(0);
    Object.defineProperty(media, 'matches', { value: false });
    media.dispatchEvent(new Event('change'));
    move();
    expect(contexts).toHaveLength(0);
    expect(images).toHaveLength(0);
    expect(pending.size).toBe(0);
  });

  it('keeps two sections independent and only cleans up the destroyed section', async () => {
    const other = TestBed.createComponent(TrailHost);
    await other.whenStable();
    const second = other.nativeElement.querySelector('section') as HTMLElement;
    vi.spyOn(second, 'getBoundingClientRect').mockReturnValue(new DOMRect(40, 20, 1000, 700));
    move();
    expect(second.querySelector('canvas')).toBeNull();
    move(second);
    expect(contexts).toHaveLength(4);
    expect(pending.size).toBe(2);
    fixture.destroy();
    tick(116);
    expect(contexts[0].drawImage).not.toHaveBeenCalled();
    expect(contexts[2].drawImage).toHaveBeenCalledTimes(2);
    expect(pending.size).toBe(1);
  });

  it('removes the canvas and pending frame on preference changes and destruction', () => {
    move();
    expect(pending.size).toBe(1);
    Object.defineProperty(media, 'matches', { value: false, configurable: true });
    media.dispatchEvent(new Event('change'));
    expect(pending.size).toBe(0);
    expect(root.querySelector('canvas')).toBeNull();
    expect(disconnect).toHaveBeenCalledOnce();
    Object.defineProperty(media, 'matches', { value: true });
    media.dispatchEvent(new Event('change'));
    expect(root.querySelector('canvas')).toBeNull();
    move();
    fixture.destroy();
    move();
    expect(root.querySelector('canvas')).toBeNull();
    expect(pending.size).toBe(0);
    expect(disconnect).toHaveBeenCalledTimes(2);
  });

  it('updates image and per-section settings without keeping the previous animation', async () => {
    move();
    fixture.componentInstance.image.set('/images/contact-mars.webp');
    fixture.componentInstance.options.set({ size: 200, duration: 500, opacity: 0.4 });
    await fixture.whenStable();
    expect(pending.size).toBe(0);
    expect(root.querySelector('canvas')).toBeNull();
    move();
    expect(contexts[3].lineWidth).toBe(100);
    expect(root.querySelector('canvas')?.style.opacity).toBe('0.4');
    expect(
      Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')?.set,
    ).toHaveBeenLastCalledWith('/images/contact-mars.webp');
    tick(700);
    expect(pending.size).toBe(0);
  });

  it('does not restart a destroyed effect when its image finishes loading', () => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false);
    move();
    expect(pending.size).toBe(0);
    fixture.destroy();
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
    images[0].dispatchEvent(new Event('load'));
    expect(pending.size).toBe(0);
  });

  it('clears on scroll and uses the new section position when movement resumes', () => {
    move();
    tick(116);
    window.dispatchEvent(new Event('scroll'));
    expect(pending.size).toBe(0);
    vi.mocked(root.getBoundingClientRect).mockReturnValue(new DOMRect(40, -280, 1000, 700));
    move();
    tick(132);
    expect(contexts[1].moveTo).toHaveBeenLastCalledWith(55, 185);
  });
});
