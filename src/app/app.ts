import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { SeoService } from './shared/services/seo-service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly seo = inject(SeoService);

  constructor() {
    const document = inject(DOCUMENT);
    const router = inject(Router);
    // Angular et les liens natifs utilisent le même décalage responsive.
    inject(ViewportScroller).setOffset(() => {
      const fragment = router.parseUrl(router.url).fragment;
      const target = fragment ? document.getElementById(fragment) : null;
      const view = document.defaultView;
      return [0, target && view ? parseFloat(view.getComputedStyle(target).scrollMarginTop) || 0 : 0];
    });
  }
}
