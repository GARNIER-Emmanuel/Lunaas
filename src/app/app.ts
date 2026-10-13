import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AnalyticsConsent } from './components/analytics-consent/analytics-consent';
import { SeoService } from './shared/services/seo-service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet, Header, Footer, AnalyticsConsent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly seo = inject(SeoService);
  private readonly mainContent = viewChild.required<ElementRef<HTMLElement>>('mainContent');

  constructor() {
    const document = inject(DOCUMENT);
    const router = inject(Router);
    // Angular et les liens natifs utilisent le même décalage responsive.
    inject(ViewportScroller).setOffset(() => {
      const fragment = router.parseUrl(router.url).fragment;
      const target = fragment ? document.getElementById(fragment) : null;
      const view = document.defaultView;
      return [
        0,
        target && view ? parseFloat(view.getComputedStyle(target).scrollMarginTop) || 0 : 0,
      ];
    });
  }

  protected skipToContent(event: MouseEvent): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    this.mainContent().nativeElement.focus({ preventScroll: true });
  }
}
