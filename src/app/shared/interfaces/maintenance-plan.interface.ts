export type MaintenancePlanId = 'maintenance-essentiel' | 'maintenance-suivi';

export interface MaintenancePlan {
  readonly id: MaintenancePlanId;
  readonly name: string;
  readonly description: string;
  readonly monthlyPrice: number;
  readonly includesEssential: boolean;
  readonly features: readonly string[];
  readonly details: readonly string[];
  readonly diagnosticMinutesPerMonth: 15;
  readonly contentMinutesPerMonth: 0 | 30;
  readonly acknowledgementBusinessDays: 1 | 2;
  readonly limitationNote: string;
}
