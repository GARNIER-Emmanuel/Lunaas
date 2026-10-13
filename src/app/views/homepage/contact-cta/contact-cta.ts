import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form';
import { OfferSelection } from '../../../shared/interfaces';
@Component({
  selector: 'app-contact-cta',
  imports: [ContactFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.css',
})
export class ContactCta {
  readonly offerSelection = input<OfferSelection | null>(null);

  constructor() {
    const root: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const section = root.querySelector<HTMLElement>('#contact');
      const title = root.querySelector<HTMLElement>('#cta-title');
      if (!section || !title) return;
      // Le titre est centré face au formulaire sur ordinateur. offsetTop ignore
      // les transformations d'entrée et suit sa position réelle dans la section.
      const measure = () => section.style.setProperty('--cta-title-offset', `${title.offsetTop}px`);
      measure();
      if (typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(measure);
      observer.observe(section);
      destroy.onDestroy(() => observer.disconnect());
    });
  }

  protected revealImage(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const section = event.currentTarget as HTMLElement;
    const bounds = section.getBoundingClientRect();
    section.style.setProperty('--cta-reveal-x', `${event.clientX - bounds.left}px`);
    section.style.setProperty('--cta-reveal-y', `${event.clientY - bounds.top}px`);
    // Le fond lavande reste assez clair pour les textes sombres.
    section.style.setProperty('--cta-reveal-opacity', '0.4');
  }

  protected hideImage(event: PointerEvent): void {
    (event.currentTarget as HTMLElement).style.setProperty('--cta-reveal-opacity', '0');
  }
}
