import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_DATA } from '../../shared/data';
import { Hero } from './hero/hero';
import { Services } from './services/services';

@Component({
  selector: 'app-homepage',
  imports: [Hero, Services],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  protected readonly approach = SITE_DATA.approach;
}
