import { MaintenancePlan } from '../interfaces/maintenance-plan.interface';

export const MAINTENANCE_PLAN_DATA: readonly MaintenancePlan[] = [
  {
    id: 'maintenance-essentiel',
    name: 'Essentiel',
    description: 'Je surveille votre site et contrôle ses points essentiels.',
    monthlyPrice: 39,
    includesEssential: false,
    features: [
      'Surveillance automatique de la disponibilité',
      'Contrôles techniques mensuels',
      'Accès aux statistiques de fréquentation',
    ],
    details: ['Contrôles mensuels : technique, HTTPS, domaine et formulaire.'],
    diagnosticMinutesPerMonth: 15,
    contentMinutesPerMonth: 0,
    acknowledgementBusinessDays: 2,
    limitationNote: 'Modifications de contenu facturées séparément.',
  },
  {
    id: 'maintenance-suivi',
    name: 'Suivi',
    description: 'Je vous accompagne pour actualiser vos contenus et suivre votre visibilité.',
    monthlyPrice: 79,
    includesEssential: true,
    features: [
      'Bilan mensuel simplifié de fréquentation',
      'Suivi basique de votre visibilité dans Google',
    ],
    details: [
      'Les modifications simples concernent les textes, les images et les coordonnées.',
      'Le temps de modification comprend les vérifications et la publication.',
    ],
    diagnosticMinutesPerMonth: 15,
    contentMinutesPerMonth: 30,
    acknowledgementBusinessDays: 1,
    limitationNote: 'Minutes non utilisées non reportables.',
  },
];

export const MAINTENANCE_TERMS_DATA = {
  cancellation:
    'Sans engagement de durée. Résiliation par e-mail à tout moment, effective à la fin de la période payée.',
  eligibility: 'Pour les clients professionnels et les sites créés et livrés par Lunaas.',
  payment:
    'Facturation mensuelle, payable à l’avance par virement.',
  extraCosts:
    'Hors forfait : 70 €/heure, après votre validation. Domaine, hébergement payant et services tiers non inclus, sauf mention contraire.',
} as const;
