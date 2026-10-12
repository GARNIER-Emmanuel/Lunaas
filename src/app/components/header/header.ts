import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NAVIGATION_DATA, SITE_DATA } from '../../shared/data';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(document:keydown.escape)': 'closeMenu(true)',
    '(window:hashchange)': 'updateActiveSection()',
  },
})
export class Header {
  protected readonly site = SITE_DATA;
  protected readonly links = NAVIGATION_DATA;
  protected readonly menuOpen = signal(false);
  private readonly document = inject(DOCUMENT);
  protected readonly activeSection = signal(this.document.location?.hash.slice(1) || 'accueil');
  private readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  protected updateActiveSection(): void {
    this.activeSection.set(this.document.location?.hash.slice(1) || 'accueil');
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
