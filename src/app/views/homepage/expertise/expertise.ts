import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERTISE_DATA } from '../../../shared/data';

@Component({
  selector: 'app-expertise',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expertise.html',
  styleUrl: './expertise.css',
})
export class Expertise {
  protected readonly expertises = EXPERTISE_DATA;
}
