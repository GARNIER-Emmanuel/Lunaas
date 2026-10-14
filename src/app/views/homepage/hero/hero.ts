import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_DATA } from '../../../shared/data';
import { ImageTrail } from '../../../shared/directives/image-trail';

@Component({
  selector: 'app-hero',
  imports: [ImageTrail],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly site = SITE_DATA;
}
