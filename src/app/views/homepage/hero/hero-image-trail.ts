interface Point {
  x: number;
  y: number;
}

// Un masque peint en continu, puis effacé progressivement : aucune simulation
// de fluide, particule ou dépendance supplémentaire.
export function mountHeroImageTrail(root: HTMLElement, canvas: HTMLCanvasElement): () => void {
  const browser = root.ownerDocument.defaultView;
  if (!browser || typeof browser.matchMedia !== 'function') return () => {};

  const media = browser.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  );
  let dispose = () => {};
  const update = () => {
    dispose();
    dispose = media.matches ? paintTrail(root, canvas, browser) : () => {};
  };

  update();
  media.addEventListener('change', update);
  return () => {
    media.removeEventListener('change', update);
    dispose();
  };
}

function paintTrail(root: HTMLElement, canvas: HTMLCanvasElement, browser: Window): () => void {
  const document = root.ownerDocument;
  const mask = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const brush = mask.getContext('2d');
  if (!context || !brush) return () => {};

  const image = document.createElement('img');
  let bounds = root.getBoundingClientRect();
  let frame = 0;
  let lastFrame = 0;
  let lastMove = 0;
  let position: Point | null = null;
  let target: Point | null = null;
  let firstStroke = false;

  const clear = () => {
    if (!frame && !position) return;
    browser.cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    position = null;
    target = null;
    context.clearRect(0, 0, canvas.width, canvas.height);
    brush.clearRect(0, 0, mask.width, mask.height);
  };

  const resize = () => {
    clear();
    bounds = root.getBoundingClientRect();
    // L'image est décorative et diffuse : inutile de dessiner en résolution
    // Retina. Plafond de 1 200 px et demi-résolution pour le masque.
    const scale = Math.min(1, 1200 / Math.max(1, bounds.width));
    canvas.width = Math.max(1, Math.round(bounds.width * scale));
    canvas.height = Math.max(1, Math.round(bounds.height * scale));
    mask.width = Math.max(1, Math.round(canvas.width / 2));
    mask.height = Math.max(1, Math.round(canvas.height / 2));
  };

  const draw = (now: number) => {
    frame = 0;
    if (!position || !target || now - lastMove > 850) {
      clear();
      return;
    }

    // Plafond de 60 images/s, même sur un écran à haute fréquence.
    if (lastFrame && now - lastFrame < 16) {
      frame = browser.requestAnimationFrame(draw);
      return;
    }

    const delta = Math.min(50, lastFrame ? now - lastFrame : 16.7);
    lastFrame = now;
    const easing = 1 - Math.exp(-delta / 32);
    const next = {
      x: position.x + (target.x - position.x) * easing,
      y: position.y + (target.y - position.y) * easing,
    };
    const maskScale = mask.width / Math.max(1, bounds.width);

    // Une décroissance calculée avec le temps reste identique à 60 ou 120 Hz.
    brush.shadowBlur = 0;
    brush.globalCompositeOperation = 'destination-out';
    brush.fillStyle = `rgba(0, 0, 0, ${1 - Math.exp(-delta / 145)})`;
    brush.fillRect(0, 0, mask.width, mask.height);
    brush.globalCompositeOperation = 'source-over';

    if (firstStroke || Math.hypot(next.x - position.x, next.y - position.y) > 0.15) {
      brush.lineCap = 'round';
      brush.lineJoin = 'round';
      brush.lineWidth = 110 * maskScale;
      brush.strokeStyle = '#fff';
      brush.shadowColor = '#fff';
      brush.shadowBlur = 58 * maskScale;
      brush.beginPath();
      brush.moveTo(position.x * maskScale, position.y * maskScale);
      brush.lineTo((next.x + (firstStroke ? 0.01 : 0)) * maskScale, next.y * maskScale);
      brush.stroke();
      firstStroke = false;
    }
    position = next;

    const cover = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * cover;
    const height = image.naturalHeight * cover;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'source-over';
    context.drawImage(
      image,
      (canvas.width - width) / 2,
      (canvas.height - height) / 2,
      width,
      height,
    );
    context.globalCompositeOperation = 'destination-in';
    context.drawImage(mask, 0, 0, canvas.width, canvas.height);
    frame = browser.requestAnimationFrame(draw);
  };

  const start = () => {
    if (!frame && position && image.complete && image.naturalWidth > 0) {
      frame = browser.requestAnimationFrame(draw);
    }
  };

  const move = (event: PointerEvent) => {
    if ((event.pointerType !== 'mouse' && event.pointerType !== 'pen') || document.hidden) return;
    target = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    if (!position) {
      position = { ...target };
      firstStroke = true;
    }
    lastMove = browser.performance.now();
    start();
  };

  const leave = () => {
    // Le sillage finit de disparaître sans poursuivre un curseur hors du hero.
    if (position) target = { ...position };
  };
  const visibility = () => {
    if (document.hidden) clear();
  };
  const scroll = () => {
    clear();
    bounds = root.getBoundingClientRect();
  };
  const observer = new ResizeObserver(resize);

  resize();
  observer.observe(root);
  image.onload = start;
  image.src = '/images/hero-background.jpg';
  root.addEventListener('pointermove', move, { passive: true });
  root.addEventListener('pointerleave', leave);
  browser.addEventListener('scroll', scroll, { passive: true });
  document.addEventListener('visibilitychange', visibility);

  return () => {
    clear();
    observer.disconnect();
    image.onload = null;
    root.removeEventListener('pointermove', move);
    root.removeEventListener('pointerleave', leave);
    browser.removeEventListener('scroll', scroll);
    document.removeEventListener('visibilitychange', visibility);
  };
}
