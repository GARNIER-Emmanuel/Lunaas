import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAVIGATION_DATA, SITE_DATA } from '../../shared/data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly site = SITE_DATA;
  protected readonly links = NAVIGATION_DATA;
}
