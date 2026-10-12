import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_DATA } from '../../shared/data';
import { Hero } from './hero/hero';
import { Services } from './services/services';
import { Projects } from './projects/projects';
import { ProcessSection } from './process-section/process-section';
import { Faq } from './faq/faq';
import { ContactCta } from './contact-cta/contact-cta';
import { About } from './about/about';
import { Expertise } from './expertise/expertise';
import { TrustedCompanies } from './trusted-companies/trusted-companies';
import { PageMotion } from '../../shared/directives/page-motion';

@Component({
  selector: 'app-homepage',
  hostDirectives: [PageMotion],
  imports: [
    Hero,
    Services,
    Projects,
    ProcessSection,
    Faq,
    About,
    ContactCta,
    Expertise,
    TrustedCompanies,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  protected readonly approach = SITE_DATA.approach;
}
