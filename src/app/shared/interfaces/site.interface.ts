export interface Site {
  readonly name: string;
  readonly tagline: string;
  readonly email: string;
  readonly homepage: {
    readonly title: string;
    readonly description: string;
  };
  readonly approach: readonly { readonly title: string; readonly description: string }[];
}
