export type TechServiceId = 'outils-numeriques' | 'integration-ia';

export interface TechService {
  readonly id: TechServiceId;
  readonly category: string;
  readonly name: string;
  readonly priceSubtitle: string;
  readonly priceLabel: string;
  readonly priceNote: string;
  readonly summary: string;
  readonly description: string;
  readonly examplesHeading: string;
  readonly examples: readonly string[];
  readonly detailsHeading: string;
  readonly details: readonly string[];
  readonly limitsHeading: string;
  readonly limits: readonly string[];
  readonly ctaLabel: string;
  readonly halo: 'moon' | 'mars' | 'sun';
}
