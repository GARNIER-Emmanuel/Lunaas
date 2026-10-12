import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { MotionService } from '../services/motion-service';

@Directive({ selector: '[appPageMotion]' })
export class PageMotion {
  constructor() {
    const root = inject(ElementRef<HTMLElement>).nativeElement;
    const destroy = inject(DestroyRef);
    const motion = inject(MotionService);
    let dispose: (() => void) | undefined;

    // afterNextRender ne s'exécute pas au prérendu : le HTML reste entièrement visible.
    afterNextRender(() => {
      void motion
        .enhance(root, () => destroy.destroyed)
        .then((cleanup) => {
          if (destroy.destroyed) cleanup();
          else dispose = cleanup;
        });
    });
    destroy.onDestroy(() => dispose?.());
  }
}
