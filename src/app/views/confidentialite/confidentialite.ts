import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_DATA } from '../../shared/data';
@Component({
  selector: 'app-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confidentialite.html',
  styleUrl: './confidentialite.css',
})
export class Confidentialite {
  protected readonly email = SITE_DATA.email;
}
