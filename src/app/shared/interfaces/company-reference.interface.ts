export interface CompanyReference {
  readonly id: string;
  readonly name: string;
  readonly collaboration: string;
  readonly logo: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
  };
}
