import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Offer } from '../../shared/interfaces';

@Component({
  selector: 'app-offer-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './offer-card.html',
  styleUrl: './offer-card.css',
})
export class OfferCard {
  readonly offer = input.required<Offer>();
  readonly contactEmail = input.required<string>();

  protected readonly price = computed(() =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(this.offer().startingPrice),
  );

  protected readonly quoteLink = computed(() => {
    const subject = encodeURIComponent(`Demande de devis — ${this.offer().name}`);
    return `mailto:${this.contactEmail()}?subject=${subject}`;
  });
}
