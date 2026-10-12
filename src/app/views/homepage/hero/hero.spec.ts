import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Hero } from './hero';

describe('Hero image reveal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('positions the reveal inside the hero and hides it when the pointer leaves', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const hero = fixture.nativeElement.querySelector('section') as HTMLElement;
    vi.spyOn(hero, 'getBoundingClientRect').mockReturnValue(new DOMRect(40, 20, 1000, 700));

    const movement = new MouseEvent('pointermove', { clientX: 150, clientY: 90 });
    Object.defineProperty(movement, 'pointerType', { value: 'mouse' });
    hero.dispatchEvent(movement);
    expect(hero.style.getPropertyValue('--reveal-x')).toBe('110px');
    expect(hero.style.getPropertyValue('--reveal-y')).toBe('70px');
    expect(hero.style.getPropertyValue('--reveal-opacity')).toBe('0.5');

    hero.dispatchEvent(new Event('pointerleave'));
    expect(hero.style.getPropertyValue('--reveal-opacity')).toBe('0');
  });

  it('does not activate the reveal for touch scrolling', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const hero = fixture.nativeElement.querySelector('section') as HTMLElement;
    const touch = new Event('pointermove');
    Object.defineProperty(touch, 'pointerType', { value: 'touch' });
    hero.dispatchEvent(touch);
    expect(hero.style.getPropertyValue('--reveal-opacity')).toBe('');
  });
});
