import { Injectable } from '@angular/core';

type MotionLibrary = {
  readonly gsap: (typeof import('gsap'))['gsap'];
  readonly ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger'];
};
type DisposeMotion = () => void;
const NO_MOTION: DisposeMotion = () => {};

@Injectable({ providedIn: 'root' })
export class MotionService {
  private library: Promise<MotionLibrary> | undefined;

  async enhance(root: HTMLElement, cancelled: () => boolean): Promise<DisposeMotion> {
    const browser = root.ownerDocument.defaultView;
    if (
      !browser?.matchMedia ||
      browser.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      cancelled()
    ) {
      return NO_MOTION;
    }

    let media: ReturnType<MotionLibrary['gsap']['matchMedia']> | undefined;
    let disposed = false;
    try {
      // Les bibliothèques ne sont chargées que dans le navigateur, si le mouvement est autorisé.
      const { gsap, ScrollTrigger } = await (this.library ??= Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]).then(([core, plugin]) => ({ gsap: core.gsap, ScrollTrigger: plugin.ScrollTrigger })));
      if (cancelled() || !root.isConnected) return NO_MOTION;

      gsap.registerPlugin(ScrollTrigger);
      media = gsap.matchMedia(root);
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = root.querySelectorAll<HTMLElement>('[data-motion="hero"]');
        if (hero.length) {
          gsap.from(hero, {
            y: 36,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform',
          });
        }

        for (const element of root.querySelectorAll<HTMLElement>(
          '[data-motion]:not([data-motion="hero"])',
        )) {
          // Le texte reste visible ; seule sa position change à l'entrée dans l'écran.
          gsap.from(element, {
            y: element.matches('h1, h2') ? 40 : 24,
            duration: 0.9,
            ease: 'power3.out',
            immediateRender: false,
            clearProps: 'transform',
            scrollTrigger: { trigger: element, start: 'top 90%', once: true, fastScrollEnd: true },
          });
        }
      });

      media.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        for (const element of root.querySelectorAll<HTMLElement>('[data-parallax]')) {
          gsap.fromTo(
            element,
            { y: -16 },
            {
              y: 16,
              ease: 'none',
              scrollTrigger: {
                trigger: element.closest('section') ?? element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            },
          );
        }
      });

      media.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => this.enableCardTilt(root, browser, gsap),
      );

      void root.ownerDocument.fonts?.ready.then(() => {
        if (!disposed && !cancelled() && root.isConnected) ScrollTrigger.refresh();
      });
      return () => {
        disposed = true;
        media?.revert();
      };
    } catch {
      // Une animation facultative ne doit jamais empêcher l'accès au contenu.
      media?.revert();
      this.library = undefined;
      return NO_MOTION;
    }
  }

  private enableCardTilt(
    root: HTMLElement,
    browser: Window,
    gsap: MotionLibrary['gsap'],
  ): DisposeMotion {
    const cleanups: DisposeMotion[] = [];

    for (const card of root.querySelectorAll<HTMLElement>('[data-tilt]')) {
      // Le parent reste stable : mesurer la carte inclinée ferait trembler l'effet.
      const surface = card.parentElement ?? card;
      const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power3.out' });
      const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power3.out' });
      const reset = () => {
        rotateX(0);
        rotateY(0);
      };
      const tilt = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const bounds = surface.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;

        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        rotateX((0.5 - y) * 12);
        rotateY((x - 0.5) * 12);
      };

      surface.addEventListener('pointerenter', tilt, { passive: true });
      surface.addEventListener('pointermove', tilt, { passive: true });
      surface.addEventListener('pointerleave', reset);
      surface.addEventListener('pointercancel', reset);
      browser.addEventListener('blur', reset);
      cleanups.push(() => {
        surface.removeEventListener('pointerenter', tilt);
        surface.removeEventListener('pointermove', tilt);
        surface.removeEventListener('pointerleave', reset);
        surface.removeEventListener('pointercancel', reset);
        browser.removeEventListener('blur', reset);
      });
    }

    // Les tweens sont restaurés par le contexte GSAP ; on retire aussi les événements.
    return () => cleanups.forEach((cleanup) => cleanup());
  }
}
