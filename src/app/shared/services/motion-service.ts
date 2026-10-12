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
}
