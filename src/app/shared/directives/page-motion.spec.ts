import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageMotion } from './page-motion';
import { MotionService } from '../services/motion-service';

@Component({ template: '<h2>Page de test</h2>', hostDirectives: [PageMotion] })
class MotionHost {}

describe('Page motion lifecycle', () => {
  it('cleans up animations when the route component is destroyed', async () => {
    const dispose = vi.fn();
    const enhance = vi.fn().mockResolvedValue(dispose);
    TestBed.configureTestingModule({
      imports: [MotionHost],
      providers: [{ provide: MotionService, useValue: { enhance } }],
    });
    const fixture = TestBed.createComponent(MotionHost);
    await fixture.whenStable();
    expect(enhance).toHaveBeenCalledOnce();
    fixture.destroy();
    expect(dispose).toHaveBeenCalledOnce();
  });

  it('cleans up a late result after a fast route change', async () => {
    const dispose = vi.fn();
    let complete: ((cleanup: () => void) => void) | undefined;
    const enhance = vi.fn(
      () =>
        new Promise<() => void>((resolve) => {
          complete = resolve;
        }),
    );
    TestBed.configureTestingModule({
      imports: [MotionHost],
      providers: [{ provide: MotionService, useValue: { enhance } }],
    });
    const fixture = TestBed.createComponent(MotionHost);
    await fixture.whenStable();
    expect(enhance).toHaveBeenCalledOnce();
    fixture.destroy();
    complete!(dispose);
    await Promise.resolve();
    expect(dispose).toHaveBeenCalledOnce();
  });
});
