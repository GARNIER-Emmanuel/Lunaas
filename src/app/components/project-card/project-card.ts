import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Project } from '../../shared/interfaces';

@Component({
  selector: 'app-project-card',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  host: { '[class.featured]': 'featured()' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly featured = input(false);
}
