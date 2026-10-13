import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-skills-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills-marquee.html',
  styleUrl: './skills-marquee.css',
})
export class SkillsMarquee {
  readonly skills = input.required<readonly string[]>();
  protected readonly paused = signal(false);

  protected togglePause(): void {
    this.paused.update((paused) => !paused);
  }
}
