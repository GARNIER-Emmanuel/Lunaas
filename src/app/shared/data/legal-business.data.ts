import { LegalBusiness } from '../interfaces';

// Formalité déposée, en attente de validation Urssaf ; régime déclaré communiqué par l’éditeur.
// Les coordonnées sont réservées aux informations légales, pas aux sections de présentation.
export const LEGAL_BUSINESS_DATA: LegalBusiness = {
  displayName: 'Emmanuel Garnier Boidun',
  legalIdentity: 'Emmanuel Joël BOIDUN, nom d’usage GARNIER BOIDUN',
  tradeName: 'Lunaas',
  contactEmail: 'contact@lunaas.site',
  postalAddress: '1 avenue Victor Hugo, 33110 Le Bouscat, France',
  contactPhone: '+33 6 61 74 29 19',
  plannedStatus: 'Entreprise individuelle (EI), régime micro-entreprise envisagé',
  requestedVatRegime: 'Franchise en base de TVA déclarée, application non confirmée',
};
