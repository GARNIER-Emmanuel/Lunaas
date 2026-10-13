export interface LegalBusiness {
  readonly displayName: string;
  readonly legalIdentity: string;
  readonly tradeName: string;
  readonly contactEmail: string;
  readonly postalAddress: string;
  readonly contactPhone: string;
  readonly legalStatus: string;
  readonly siren: string;
  readonly siret: string;
  readonly apeCode: string;
  readonly registrationDate: string;
  readonly activityStartDate: string;
  readonly activityNature: string;
  readonly vatRegime: string;
  readonly pricingTaxNote: string;
  readonly audience: string;
  readonly clientInfrastructureNote: string;
  readonly mailProvider: string;
  readonly emailRoutingProvider: string;
  readonly hosting: {
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly website: string;
    readonly privacyPolicy: string;
  };
  readonly dataRetention: {
    readonly unansweredEnquiryMonths: number;
    readonly commercialDocumentYears: number;
    readonly accountingDocumentYears: number;
  };
}
