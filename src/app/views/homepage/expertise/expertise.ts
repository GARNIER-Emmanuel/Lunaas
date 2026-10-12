import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXPERTISE_DATA } from '../../../shared/data';

@Component({
  selector: 'app-expertise',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expertise.html',
  styleUrl: './expertise.css',
})
export class Expertise {
  protected readonly expertises = EXPERTISE_DATA;
}
