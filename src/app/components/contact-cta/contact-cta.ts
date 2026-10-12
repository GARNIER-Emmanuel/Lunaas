import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_DATA } from '../../shared/data';
@Component({
  selector: 'app-contact-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.css',
})
export class ContactCta {
  protected readonly email = SITE_DATA.email;
}
