import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_BUSINESS_DATA } from '../../shared/data';

@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.css',
})
export class LegalNotice {
  protected readonly business = LEGAL_BUSINESS_DATA;
}
