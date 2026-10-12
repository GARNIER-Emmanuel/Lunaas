import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Offer } from '../../shared/interfaces';

@Component({
  selector: 'app-offer-card',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './offer-card.html',
  styleUrl: './offer-card.css',
})
export class OfferCard {
  readonly offer = input.required<Offer>();

  protected readonly price = computed(() =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(this.offer().startingPrice),
  );
}
