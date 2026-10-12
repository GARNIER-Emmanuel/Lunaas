export interface ContactForm {
  firstname: string;
  lastname: string;
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
