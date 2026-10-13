import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MAINTENANCE_PLAN_DATA, MAINTENANCE_TERMS_DATA } from '../../../shared/data';
import { MaintenancePlanId } from '../../../shared/interfaces';

@Component({
  selector: 'app-maintenance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance {
  readonly offerSelected = output<MaintenancePlanId>();
  protected readonly plans = MAINTENANCE_PLAN_DATA;
  protected readonly terms = MAINTENANCE_TERMS_DATA;

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
