export const PRIMARY_NAVIGATION_DATA = [
  // { label: 'Réalisations', fragment: 'realisations' },
  { label: 'Tarifs', fragment: 'offres' },
  { label: 'Maintenance', fragment: 'maintenance' },
  { label: 'Méthode', fragment: 'methode' },
  { label: 'FAQ', fragment: 'faq' },
] as const;

export const NAVIGATION_DATA = [
  { label: 'Accueil', fragment: 'accueil' },
  ...PRIMARY_NAVIGATION_DATA,
  // { label: 'À propos', fragment: 'a-propos' },
  // { label: 'Expérience', fragment: 'confiance' },
] as const;
