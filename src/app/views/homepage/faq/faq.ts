import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FAQ_DATA } from '../../../shared/data';
import { SentenceLines } from '../../../shared/pipes/sentence-lines';
@Component({
  selector: 'app-faq',
  imports: [SentenceLines],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly items = FAQ_DATA;
}
