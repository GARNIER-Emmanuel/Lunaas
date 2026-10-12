import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { NAVIGATION_DATA, SITE_DATA } from '../../shared/data';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: { '(document:keydown.escape)': 'closeMenu(true)' },
})
export class Header {
  protected readonly site = SITE_DATA;
  protected readonly links = NAVIGATION_DATA;
  protected readonly menuOpen = signal(false);
  private readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
  protected closeMenu(returnFocus = false): void {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(false);
    if (returnFocus && wasOpen) this.toggleButton()?.nativeElement.focus();
  }
}
