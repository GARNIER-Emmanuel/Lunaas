import { MaintenancePlan } from '../interfaces/maintenance-plan.interface';

export const MAINTENANCE_PLAN_DATA: readonly MaintenancePlan[] = [
  {
    id: 'maintenance-essentiel',
    name: 'Essentiel',
    description: 'Pour garder votre site opérationnel et surveillé.',
    monthlyPrice: 39,
    includesEssential: false,
    features: [
      'Surveillance automatique de la disponibilité du site',
      'Vérification technique chaque mois',
      'Contrôle du HTTPS et du domaine',
      'Vérification mensuelle du formulaire de contact',
      'Accès aux statistiques de fréquentation',
    ],
    diagnosticMinutesPerMonth: 15,
    contentMinutesPerMonth: 0,
    acknowledgementBusinessDays: 2,
    limitationNote: 'Modifications de contenu facturées séparément.',
  },
  {
    id: 'maintenance-suivi',
    name: 'Suivi',
    description: 'Pour faire évoluer régulièrement votre site.',
    monthlyPrice: 79,
    includesEssential: true,
    features: [
      'Bilan mensuel simplifié de fréquentation',
      'Suivi basique de votre visibilité dans Google',
    ],
    diagnosticMinutesPerMonth: 15,
    contentMinutesPerMonth: 30,
    acknowledgementBusinessDays: 1,
    limitationNote: 'Minutes non utilisées non reportables.',
  },
];

export const MAINTENANCE_TERMS_DATA = {
  cancellation:
    'Abonnements facultatifs, sans engagement de durée. Résiliation à tout moment, effective à la fin de la période payée. Assistance les jours ouvrés uniquement.',
  response:
    'Les délais annoncés concernent l’accusé de réception de votre demande. Le délai de résolution dépend de l’incident. Aucune garantie de disponibilité à 100 % ni intervention ou correction illimitée.',
  extraCosts:
    'Hors forfait : 70 €/heure, après votre validation. Domaine, hébergement payant et services tiers non inclus, sauf mention contraire.',
  statistics:
    'Les statistiques de base peuvent être configurées et accessibles dès la livraison de votre site, sans abonnement. L’offre Suivi apporte notamment leur analyse et un bilan mensuel.',
} as const;
