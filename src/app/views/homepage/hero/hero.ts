import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { SITE_DATA } from '../../../shared/data';
import { mountHeroImageTrail } from './hero-image-trail';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly site = SITE_DATA;
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly reveal = viewChild.required<ElementRef<HTMLCanvasElement>>('reveal');

  constructor() {
    afterNextRender(() => {
      this.destroyRef.onDestroy(
        mountHeroImageTrail(this.element.nativeElement, this.reveal().nativeElement),
      );
    });
  }
}
