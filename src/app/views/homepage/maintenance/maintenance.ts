import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  LEGAL_BUSINESS_DATA,
  MAINTENANCE_PLAN_DATA,
  MAINTENANCE_TERMS_DATA,
} from '../../../shared/data';
import { MaintenancePlanId } from '../../../shared/interfaces';
import { SentenceLines } from '../../../shared/pipes/sentence-lines';
import { ImageTrail } from '../../../shared/directives/image-trail';

@Component({
  selector: 'app-maintenance',
  imports: [SentenceLines, ImageTrail],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance {
  readonly offerSelected = output<MaintenancePlanId>();
  protected readonly plans = MAINTENANCE_PLAN_DATA;
  protected readonly terms = MAINTENANCE_TERMS_DATA;
  protected readonly business = LEGAL_BUSINESS_DATA;
  protected readonly halos: Readonly<Record<MaintenancePlanId, 'moon' | 'mars'>> = {
    'maintenance-essentiel': 'moon',
    'maintenance-suivi': 'mars',
  };

  protected price(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  protected selectPlan(event: MouseEvent, id: MaintenancePlanId): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    this.offerSelected.emit(id);
  }
}
