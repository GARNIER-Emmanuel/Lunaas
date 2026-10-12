import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE_DATA, SITE_DATA } from '../../shared/data';
import { SiteInformationService } from '../../shared/services/site-information-service';

@Component({
  selector: 'app-site-information',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-information.html',
  styleUrl: './site-information.css',
})
export class SiteInformation {
  protected readonly site = SITE_DATA;
  protected readonly profile = PROFILE_DATA;
  protected readonly email = SITE_DATA.email;
  protected readonly information = inject(SiteInformationService);
}
