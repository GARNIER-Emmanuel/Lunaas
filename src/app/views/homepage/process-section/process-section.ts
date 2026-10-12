import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROCESS_DATA } from '../../../shared/data';
@Component({
  selector: 'app-process-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './process-section.html',
  styleUrl: './process-section.css',
})
export class ProcessSection {
  protected readonly steps = PROCESS_DATA;
}
