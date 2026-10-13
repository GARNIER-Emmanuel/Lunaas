import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { PRIMARY_NAVIGATION_DATA, SITE_DATA } from '../../shared/data';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(document:keydown.escape)': 'closeMenu(true)',
  },
})
export class Header {
  protected readonly site = SITE_DATA;
  protected readonly links = PRIMARY_NAVIGATION_DATA;
  protected readonly menuOpen = signal(false);
  private readonly router = inject(Router);
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
  );
  protected readonly activeSection = computed(() => {
    this.navigationEnd();
    if (this.router.url.split(/[?#]/)[0] !== '/') return '';
    return this.router.parseUrl(this.router.url).fragment || 'accueil';
  });
  private readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
  protected closeMenu(returnFocus = false): void {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(false);
    if (returnFocus && wasOpen) this.toggleButton()?.nativeElement.focus();
  }
}
