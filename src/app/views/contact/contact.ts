import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CONTACT_CONFIG, SITE_DATA } from '../../shared/data';
import { PageMotion } from '../../shared/directives/page-motion';
import { ContactFormComponent } from '../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact',
  hostDirectives: [PageMotion],
  imports: [ContactFormComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly emailAddress = SITE_DATA.email;
  protected readonly location = CONTACT_CONFIG.location;
  private readonly route = inject(ActivatedRoute);
  private readonly query = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  protected readonly initialOffer = computed(() => this.query().get('offre') ?? '');
}
