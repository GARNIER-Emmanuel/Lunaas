import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skills-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills-marquee.html',
  styleUrl: './skills-marquee.css',
})
export class SkillsMarquee {
  readonly skills = input.required<readonly string[]>();
}
