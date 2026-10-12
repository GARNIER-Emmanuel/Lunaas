import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_DATA, PROFILE_DATA } from '../../shared/data';
@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mentions-legales.html',
  styleUrl: './mentions-legales.css',
})
export class MentionsLegales {
  protected readonly site = SITE_DATA;
  protected readonly profile = PROFILE_DATA;
}
