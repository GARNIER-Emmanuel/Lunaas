import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnalyticsConsentService } from '../../shared/services/analytics-consent-service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NAVIGATION_DATA, SITE_DATA } from '../../shared/data';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly consent = inject(AnalyticsConsentService);
  protected readonly site = SITE_DATA;
  protected readonly links = NAVIGATION_DATA;
  protected readonly currentYear = new Date().getFullYear();
}
