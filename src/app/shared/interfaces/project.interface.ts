export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  readonly category: 'Projet personnel' | 'Projet client' | 'Démonstration';
  readonly summary: string;
  readonly goal: string;
  readonly technologies: readonly string[];
  readonly accent: string;
  readonly repo?: string;
  readonly live?: string;
}
