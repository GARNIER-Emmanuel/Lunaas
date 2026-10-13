export interface ContactForm {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  botcheck: boolean;
}

export interface ContactConfiguration {
  readonly accessKey: string;
  readonly endpoint: string;
}

export interface ContactTopic {
  readonly id: string;
  readonly label: string;
}

export interface OfferSelection {
  readonly offerId: string;
}
