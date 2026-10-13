import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
