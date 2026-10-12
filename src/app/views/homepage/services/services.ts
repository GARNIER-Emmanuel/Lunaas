import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OfferCard } from '../../../components/offer-card/offer-card';
import { OFFER_DATA, SITE_DATA } from '../../../shared/data';

@Component({
  selector: 'app-services',
  imports: [OfferCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  protected readonly offers = OFFER_DATA;
  protected readonly email = SITE_DATA.email;
}
