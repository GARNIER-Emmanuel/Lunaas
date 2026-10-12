import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';
import { PROJECT_DATA } from '../../shared/data';
@Component({
  selector: 'app-realisations',
  imports: [ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './realisations.html',
  styleUrl: './realisations.css',
})
export class Realisations {
  protected readonly projects = PROJECT_DATA;
}
