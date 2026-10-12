import { LegalBusiness } from '../interfaces';

// Déclaration au Guichet unique : ne vaut pas justificatif d’immatriculation validée.
// Les coordonnées sont réservées aux informations légales, pas aux sections de présentation.
export const LEGAL_BUSINESS_DATA: LegalBusiness = {
  displayName: 'Emmanuel Garnier Boidun',
  legalIdentity: 'Emmanuel Joël BOIDUN, nom d’usage GARNIER BOIDUN',
  tradeName: 'Lunaas',
  contactEmail: 'manu.boidun@gmail.com',
  declaredStatus: 'Entrepreneur individuel (EI), régime micro-entreprise déclaré',
  declaredVatRegime: 'Franchise en base de TVA',
  filingDate: '12/10/2026',
};
