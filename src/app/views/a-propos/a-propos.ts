import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE_DATA } from '../../shared/data';
import { ContactCta } from '../../components/contact-cta/contact-cta';
import { PageMotion } from '../../shared/directives/page-motion';
@Component({
  selector: 'app-a-propos',
  hostDirectives: [PageMotion],
  imports: [ContactCta],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './a-propos.html',
  styleUrl: './a-propos.css',
})
export class APropos {
  protected readonly profile = PROFILE_DATA;
}
