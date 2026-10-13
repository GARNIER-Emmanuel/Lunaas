import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Offer } from '../../shared/interfaces';

@Component({
  selector: 'app-offer-card',
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

  protected revealHalo(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const card = event.currentTarget as HTMLElement;
    const bounds = card.getBoundingClientRect();

    // La position reste locale à cette carte, comme pour le masque du hero.
    card.style.setProperty('--halo-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--halo-y', `${event.clientY - bounds.top}px`);
    card.style.setProperty('--halo-opacity', '1');
  }

  protected hideHalo(event: PointerEvent): void {
    (event.currentTarget as HTMLElement).style.setProperty('--halo-opacity', '0');
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
