export interface ContentItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}
export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}
export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly introduction: string;
  readonly skills: readonly string[];
}
