import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Offer } from '../../shared/interfaces';
import { ImageTrail } from '../../shared/directives/image-trail';

@Component({
  selector: 'app-offer-card',
  imports: [ImageTrail],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './offer-card.html',
  styleUrl: './offer-card.css',
})
export class OfferCard {
  readonly offer = input.required<Offer>();
  readonly offerSelected = output<string>();

  protected selectOffer(event: MouseEvent): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    this.offerSelected.emit(this.offer().id);
  }

  protected readonly price = computed(() => {
    const amount = this.offer().startingPrice;
    return amount === null
      ? null
      : new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        }).format(amount);
  });
}
