import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsConsentService } from '../../shared/services/analytics-consent-service';

@Component({
  selector: 'app-analytics-consent',
  imports: [RouterLink],
  templateUrl: './analytics-consent.html',
  styleUrl: './analytics-consent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsConsent {
  protected readonly consent = inject(AnalyticsConsentService);
  constructor() {
    afterNextRender(() => this.consent.initialize());
  }
}
