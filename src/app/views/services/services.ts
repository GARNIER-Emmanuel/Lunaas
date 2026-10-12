import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OfferCard } from '../../components/offer-card/offer-card';
import { Faq } from '../../components/faq/faq';
import { ProcessSection } from '../../components/process-section/process-section';
import { ContactCta } from '../../components/contact-cta/contact-cta';
import { OFFER_DATA } from '../../shared/data';
@Component({
  selector: 'app-service-page',
  imports: [OfferCard, Faq, ProcessSection, ContactCta],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicePage {
  protected readonly offers = OFFER_DATA;
}
