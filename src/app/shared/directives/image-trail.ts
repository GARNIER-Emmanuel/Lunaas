import { afterRenderEffect, Directive, ElementRef, inject, input } from '@angular/core';

// Réglages communs ; surcharge possible avec [trailOptions] sur une section.
const TRAIL_DEFAULTS = { size: 400, softness: 80, fade: 300, duration: 1600, opacity: 0.5 };
type TrailOptions = typeof TRAIL_DEFAULTS;
type TrailSource = string | { readonly colors: readonly [string, string] };
interface Point {
  x: number;
  y: number;
}

@Directive({ selector: '[appImageTrail]', host: { class: 'image-trail-host' } })
export class ImageTrail {
  readonly appImageTrail = input.required<TrailSource>();
  readonly trailOptions = input<Partial<TrailOptions>>({});

  constructor() {
    const root = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    // Réagit aussi aux changements d'image/réglages ; aucun DOM créé au prérendu.
    afterRenderEffect((onCleanup) => {
      const source = this.appImageTrail();
      const options = { ...TRAIL_DEFAULTS, ...this.trailOptions() };
      const browser = root.ownerDocument.defaultView;
      if (!browser?.matchMedia) return;
      const media = browser.matchMedia(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      );
      let dispose: (() => void) | undefined;
      const activate = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        root.removeEventListener('pointermove', activate);
        dispose = paintTrail(root, source, options, event);
      };
      const reset = () => {
        dispose?.();
        dispose = undefined;
        root.removeEventListener('pointermove', activate);
        if (media.matches) root.addEventListener('pointermove', activate, { passive: true });
      };
      reset();
      media.addEventListener('change', reset);
      onCleanup(() => {
        media.removeEventListener('change', reset);
        root.removeEventListener('pointermove', activate);
        dispose?.();
      });
    });
  }
}

function paintTrail(
  root: HTMLElement,
  source: TrailSource,
  options: TrailOptions,
  initial: PointerEvent,
) {
  const document = root.ownerDocument;
  const browser = document.defaultView!;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 0;
  const mask = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const brush = mask.getContext('2d');
  if (!context || !brush) return () => {};
  canvas.className = 'image-trail-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.opacity = String(options.opacity);
  root.append(canvas);

  const image = typeof source === 'string' ? document.createElement('img') : undefined;
  let background: string | CanvasGradient = '#fff';
  let bounds = root.getBoundingClientRect();
  let frame = 0,
    lastFrame = 0,
    lastMove = 0;
  let position: Point | undefined, target: Point | undefined;
  let firstStroke = false;
  let maskScale = 1;
  let crop: [number, number, number, number] = [0, 0, 0, 0];
  const fitSurface = () => {
    if (typeof source !== 'string') {
      const styles = browser.getComputedStyle(root);
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      source.colors.forEach((color, index) =>
        gradient.addColorStop(
          index,
          color.startsWith('--') ? styles.getPropertyValue(color).trim() : color,
        ),
      );
      background = gradient;
    } else if (image?.naturalWidth) {
      const cover = Math.max(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight,
      );
      const width = image.naturalWidth * cover,
        height = image.naturalHeight * cover;
      crop = [(canvas.width - width) / 2, (canvas.height - height) / 2, width, height];
    }
  };
  const clear = () => {
    if (!frame && !position) return;
    browser.cancelAnimationFrame(frame);
    frame = lastFrame = 0;
    position = target = undefined;
    context.clearRect(0, 0, canvas.width, canvas.height);
    brush.clearRect(0, 0, mask.width, mask.height);
  };
  const resize = () => {
    bounds = root.getBoundingClientRect();
    const scale = Math.min(1, 1200 / Math.max(1, bounds.width));
    const width = Math.max(1, Math.round(bounds.width * scale));
    const height = Math.max(1, Math.round(bounds.height * scale));
    if (canvas.width === width && canvas.height === height) return;
    clear();
    canvas.width = width;
    canvas.height = height;
    mask.width = Math.max(1, Math.round(width / 2));
    mask.height = Math.max(1, Math.round(height / 2));
    maskScale = mask.width / Math.max(1, bounds.width);
    brush.lineCap = 'round';
    brush.lineWidth = options.size * maskScale;
    brush.strokeStyle = brush.shadowColor = '#fff';
    fitSurface();
  };
  const draw = (now: number) => {
    frame = 0;
    if (!position || !target || now - lastMove > options.duration) {
      clear();
      return;
    }
    const delta = Math.min(50, lastFrame ? now - lastFrame : 16.7);
    lastFrame = now;
    const easing = 1 - Math.exp(-delta / 32);
    const next = {
      x: position.x + (target.x - position.x) * easing,
      y: position.y + (target.y - position.y) * easing,
    };
    brush.shadowBlur = 0;
    brush.globalCompositeOperation = 'destination-out';
    brush.fillStyle = `rgba(0, 0, 0, ${1 - Math.exp(-delta / options.fade)})`;
    brush.fillRect(0, 0, mask.width, mask.height);
    brush.globalCompositeOperation = 'source-over';
    if (firstStroke || Math.hypot(next.x - position.x, next.y - position.y) > 0.15) {
      brush.shadowBlur = options.softness * maskScale;
      brush.beginPath();
      brush.moveTo(position.x * maskScale, position.y * maskScale);
      brush.lineTo((next.x + (firstStroke ? 0.01 : 0)) * maskScale, next.y * maskScale);
      brush.stroke();
      firstStroke = false;
    }
    position = next;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'source-over';
    if (image) context.drawImage(image, ...crop);
    else {
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.globalCompositeOperation = 'destination-in';
    context.drawImage(mask, 0, 0, canvas.width, canvas.height);
    frame = browser.requestAnimationFrame(draw);
  };
  const start = () => {
    if (!frame && position && (!image || (image.complete && image.naturalWidth > 0)))
      frame = browser.requestAnimationFrame(draw);
  };
  const move = (event: PointerEvent) => {
    if ((event.pointerType !== 'mouse' && event.pointerType !== 'pen') || document.hidden) return;
    if (!position) {
      bounds = root.getBoundingClientRect();
      firstStroke = true;
    }
    target = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    position ??= { ...target };
    lastMove = browser.performance.now();
    start();
  };
  const leave = () => {
    target = position;
  };
  const observer = new ResizeObserver(resize);
  resize();
  observer.observe(root);
  if (image && typeof source === 'string') {
    image.onload = () => {
      fitSurface();
      start();
    };
    image.onerror = clear;
    image.src = source;
  }
  root.addEventListener('pointermove', move, { passive: true });
  root.addEventListener('pointerleave', leave);
  root.addEventListener('pointercancel', clear);
  browser.addEventListener('scroll', clear, { passive: true });
  document.addEventListener('visibilitychange', clear);
  move(initial);
  return () => {
    clear();
    observer.disconnect();
    if (image) image.onload = image.onerror = null;
    root.removeEventListener('pointermove', move);
    root.removeEventListener('pointerleave', leave);
    root.removeEventListener('pointercancel', clear);
    browser.removeEventListener('scroll', clear);
    document.removeEventListener('visibilitychange', clear);
    canvas.remove();
  };
}
