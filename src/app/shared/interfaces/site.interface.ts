export interface Site {
  readonly name: string;
  readonly tagline: string;
  readonly homepage: {
    readonly title: string;
    readonly description: string;
  };
}
