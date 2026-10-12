import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPANY_REFERENCE_DATA } from '../../../shared/data';

@Component({
  selector: 'app-trusted-companies',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trusted-companies.html',
  styleUrl: './trusted-companies.css',
})
export class TrustedCompanies {
  protected readonly companies = COMPANY_REFERENCE_DATA;
}
