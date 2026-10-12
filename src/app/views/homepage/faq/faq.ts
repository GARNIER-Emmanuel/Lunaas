import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FAQ_DATA } from '../../../shared/data';
@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly items = FAQ_DATA;
}
