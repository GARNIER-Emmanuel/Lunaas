export const PRIMARY_NAVIGATION_DATA = [
  { label: 'Réalisations', fragment: 'realisations' },
  { label: 'Tarifs', fragment: 'offres' },
  { label: 'Méthode', fragment: 'methode' },
] as const;

export const NAVIGATION_DATA = [
  { label: 'Accueil', fragment: 'accueil' },
  PRIMARY_NAVIGATION_DATA[0],
  PRIMARY_NAVIGATION_DATA[1],
  PRIMARY_NAVIGATION_DATA[2],
  { label: 'À propos', fragment: 'a-propos' },
  { label: 'Expérience', fragment: 'confiance' },
  { label: 'FAQ', fragment: 'faq' },
] as const;
