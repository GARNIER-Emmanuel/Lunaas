import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteInformationService } from '../../shared/services/site-information-service';

@Component({
  selector: 'app-site-information',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-information.html',
  styleUrl: './site-information.css',
})
export class SiteInformation {
  protected readonly information = inject(SiteInformationService);
}
