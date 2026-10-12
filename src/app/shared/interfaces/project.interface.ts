export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly category: 'Projet personnel' | 'Projet client' | 'Démonstration';
  readonly label: string;
  readonly summary: string;
  readonly context: string;
  readonly goal: string;
  readonly solution: string;
  readonly technologies: readonly string[];
  readonly accent: string;
  readonly highlights?: readonly string[];
  readonly repo?: string;
  readonly live?: string;
}
