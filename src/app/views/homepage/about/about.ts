import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE_DATA } from '../../../shared/data';
import { SkillsMarquee } from './skills-marquee/skills-marquee';
@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, SkillsMarquee],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly profile = PROFILE_DATA;
}
