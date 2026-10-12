import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAVIGATION_DATA, SITE_DATA } from '../../shared/data';
import { SiteInformation } from '../site-information/site-information';

@Component({
  selector: 'app-footer',
  imports: [SiteInformation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly site = SITE_DATA;
  protected readonly links = NAVIGATION_DATA;
}
