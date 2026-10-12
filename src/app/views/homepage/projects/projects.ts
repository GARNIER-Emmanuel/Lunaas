import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCard } from '../../../components/project-card/project-card';
import { PROJECT_DATA } from '../../../shared/data';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  protected readonly projects = PROJECT_DATA;
}
