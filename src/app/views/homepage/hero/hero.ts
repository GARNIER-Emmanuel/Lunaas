import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_DATA } from '../../../shared/data';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly site = SITE_DATA;

  protected revealImage(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const hero = event.currentTarget as HTMLElement;
    const bounds = hero.getBoundingClientRect();

    // Position de la souris dans le hero, transmise au masque CSS.
    hero.style.setProperty('--reveal-x', `${event.clientX - bounds.left}px`);
    hero.style.setProperty('--reveal-y', `${event.clientY - bounds.top}px`);
    hero.style.setProperty('--reveal-opacity', '0.2');
  }

  protected hideImage(event: PointerEvent): void {
    const hero = event.currentTarget as HTMLElement;
    hero.style.setProperty('--reveal-opacity', '0');
  }
}
