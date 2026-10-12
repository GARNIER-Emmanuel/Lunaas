import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_DATA } from '../../shared/data';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-homepage',
  imports: [Hero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  protected readonly approach = SITE_DATA.approach;
}
