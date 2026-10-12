import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form';
import { CONTACT_CONFIG, SITE_DATA } from '../../../shared/data';
@Component({
  selector: 'app-contact-cta',
  imports: [ContactFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.css',
})
export class ContactCta {
  protected readonly emailAddress = SITE_DATA.email;
  protected readonly location = CONTACT_CONFIG.location;
  protected revealImage(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const section = event.currentTarget as HTMLElement;
    const bounds = section.getBoundingClientRect();
    section.style.setProperty('--cta-reveal-x', `${event.clientX - bounds.left}px`);
    section.style.setProperty('--cta-reveal-y', `${event.clientY - bounds.top}px`);
    // Le fond lavande reste assez clair pour les textes sombres.
    section.style.setProperty('--cta-reveal-opacity', '0.8');
  }

  protected hideImage(event: PointerEvent): void {
    (event.currentTarget as HTMLElement).style.setProperty('--cta-reveal-opacity', '0');
  }
}
