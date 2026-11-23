import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { LEGAL_BUSINESS_DATA, TECH_SERVICE_DATA } from '../../../shared/data';
import { TechServiceId } from '../../../shared/interfaces';
import { ImageTrail } from '../../../shared/directives/image-trail';

@Component({
  selector: 'app-tech-services',
  imports: [ImageTrail],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-services.html',
  styleUrl: './tech-services.css',
})
export class TechServices {
  protected readonly services = TECH_SERVICE_DATA;
  protected readonly business = LEGAL_BUSINESS_DATA;
  readonly serviceSelected = output<TechServiceId>();

  protected selectService(event: MouseEvent, serviceId: TechServiceId): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    this.serviceSelected.emit(serviceId);
  }
}
