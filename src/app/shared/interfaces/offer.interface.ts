export interface Offer {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly startingPrice: number | null;
  readonly features: readonly string[];
  readonly exclusions: readonly string[];
  readonly scopeNote: string;
  readonly flexible: boolean;
  readonly halo: 'moon' | 'mars' | 'sun';
}
