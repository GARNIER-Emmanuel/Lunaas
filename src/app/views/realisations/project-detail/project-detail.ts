import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Project } from '../../../shared/interfaces';
import { PageMotion } from '../../../shared/directives/page-motion';
@Component({
  selector: 'app-project-detail',
  hostDirectives: [PageMotion],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly project = toSignal(
    this.route.data.pipe(map((data) => data['project'] as Project)),
    { initialValue: this.route.snapshot.data['project'] as Project },
  );
}
