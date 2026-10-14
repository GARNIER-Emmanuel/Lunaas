export interface Site {
  readonly name: string;
  readonly tagline: string;
  readonly url: string;
  readonly homepage: {
    readonly title: string;
    readonly highlight: string;
    readonly description: string;
  };
}
