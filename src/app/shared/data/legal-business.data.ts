import { LegalBusiness } from '../interfaces';

// Informations professionnelles issues de la formalité de création validée le 13 octobre 2026.
// Les coordonnées sont réservées aux informations légales, pas aux sections de présentation.
export const LEGAL_BUSINESS_DATA: LegalBusiness = {
  displayName: 'Emmanuel Garnier Boidun',
  legalIdentity: 'Emmanuel Joel BOIDUN, nom d’usage GARNIER BOIDUN',
  tradeName: 'Lunaas',
  contactEmail: 'contact@lunaas.site',
  postalAddress: '1 avenue Victor Hugo, 33110 Le Bouscat, France',
  contactPhone: '+33 6 61 74 29 19',
  legalStatus: 'Entrepreneur individuel (EI), micro-entreprise',
  siren: '131438228',
  siret: '13143822800010',
  apeCode: '6201Z',
  registrationDate: '13 octobre 2026',
  activityStartDate: '12 octobre 2026',
  activityNature: 'Activité libérale non réglementée',
  vatRegime: 'Franchise en base de TVA',
  pricingTaxNote:
    'Franchise en base de TVA indiquée dans la formalité validée ; modalités fiscales précisées au devis.',
  audience: 'Prestations réservées aux clients professionnels.',
  clientInfrastructureNote:
    'Le domaine et l’hébergement sont souscrits par le client sur ses propres comptes. Lunaas accompagne leur création et leur configuration. Le client conserve la maîtrise de ses comptes après la livraison et après l’arrêt éventuel de la maintenance.',
  mailProvider: 'Gmail',
  emailRoutingProvider: 'Cloudflare Email Routing',
  // Coordonnées publiques vérifiées dans les conditions et la politique de Cloudflare.
  hosting: {
    name: 'Cloudflare, Inc.',
    address: '101 Townsend Street, San Francisco, CA 94107, États-Unis',
    phone: '+1 650 319 8930',
    website: 'https://www.cloudflare.com/',
    privacyPolicy: 'https://www.cloudflare.com/privacypolicy/',
  },
  dataRetention: {
    unansweredEnquiryMonths: 12,
    commercialDocumentYears: 5,
    accountingDocumentYears: 10,
  },
};
