import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Hero } from './hero/hero';
import { Services } from './services/services';
import { Projects } from './projects/projects';
import { ProcessSection } from './process-section/process-section';
import { Faq } from './faq/faq';
import { ContactCta } from './contact-cta/contact-cta';
import { About } from './about/about';
import { PageMotion } from '../../shared/directives/page-motion';
import { OfferSelection } from '../../shared/interfaces';

@Component({
  selector: 'app-homepage',
  hostDirectives: [PageMotion],
  imports: [Hero, Services, Projects, ProcessSection, Faq, About, ContactCta],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  protected readonly offerSelection = signal<OfferSelection | null>(null);

  protected selectOffer(offerId: string): void {
    // Un nouvel objet permet de choisir à nouveau la même offre après une modification manuelle.
    this.offerSelection.set({ offerId });
  }
}
