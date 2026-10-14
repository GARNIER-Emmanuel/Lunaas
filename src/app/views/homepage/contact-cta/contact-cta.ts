import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form';
import { OfferSelection } from '../../../shared/interfaces';
import { ImageTrail } from '../../../shared/directives/image-trail';
@Component({
  selector: 'app-contact-cta',
  imports: [ContactFormComponent, ImageTrail],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.css',
})
export class ContactCta {
  readonly offerSelection = input<OfferSelection | null>(null);
}
