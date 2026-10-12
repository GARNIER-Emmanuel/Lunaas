import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE_DATA } from '../../../shared/data';
@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly profile = PROFILE_DATA;
  protected readonly initials = PROFILE_DATA.name.split(' ').map((part) => part[0]).join('');
}
