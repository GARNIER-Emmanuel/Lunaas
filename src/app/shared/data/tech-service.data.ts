import { TechService } from '../interfaces';

export const TECH_SERVICE_DATA: readonly TechService[] = [
  {
    id: 'outils-numeriques',
    category: 'Accompagnement technique',
    name: 'Outils numériques & sécurité',
    priceSubtitle: 'Après un premier échange',
    priceLabel: 'Sur devis',
    priceNote: 'Abonnements éventuels souscrits directement sur vos comptes.',
    summary: 'Mise en place et prise en main',
    description:
      'Structurez vos outils du quotidien et sécurisez vos accès pour travailler plus sereinement, sans jargon technique.',
    examplesHeading: 'Exemples d’accompagnement',
    examples: [
      'Mise en place d’un gestionnaire de mots de passe (ex. Bitwarden) et organisation des accès',
      'Configuration d’outils du quotidien (messagerie professionnelle, partage de fichiers, sauvegardes)',
      'Aide au choix des solutions adaptées à votre activité et prise en main guidée',
    ],
    detailsHeading: 'Déroulement de l’intervention',
    details: [
      'Point sur vos usages actuels et les outils déjà en place.',
      'Configuration sur vos propres comptes avec une documentation simple de prise en main.',
      'Intervention ponctuelle ou associée à la création de votre site.',
    ],
    limitsHeading: 'Cadre et limites',
    limits: [
      'Les licences ou abonnements payants éventuels restent souscrits directement à votre nom.',
      'Hors infogérance matérielle, dépannage de parc informatique et administration réseau d’entreprise.',
    ],
    ctaLabel: 'Présenter mon besoin',
    halo: 'moon',
  },
  {
    id: 'integration-ia',
    category: 'IA & automatisation',
    name: 'Intégration IA dans vos projets',
    priceSubtitle: 'Après cadrage du besoin',
    priceLabel: 'Sur devis',
    priceNote: 'Abonnements ou crédits API (Claude, OpenAI…) sur vos propres comptes.',
    summary: 'Automatisation ciblée et agents IA',
    description:
      'Gagnez du temps sur les tâches répétitives en intégrant l’IA dans vos outils ou vos flux de travail, selon vos besoins réels.',
    examplesHeading: 'Exemples de cas d’usage',
    examples: [
      'Tri, lecture et synthèse d’e-mails avec préparation de brouillons de réponses',
      'Mise en place d’assistants ou d’agents IA adaptés à votre métier (via Claude ou GPT selon l’usage)',
      'Automatisation de tâches répétitives et connexion entre vos outils existants',
    ],
    detailsHeading: 'Déroulement de la mise en place',
    details: [
      'Cadrage d’un cas d’usage précis et étude de faisabilité avant tout engagement.',
      'Choix du modèle adapté (Claude, GPT ou autre) et garde-fous, dont la validation humaine sur les actions sensibles.',
      'Tests sur des cas réels et accompagnement à la prise en main.',
    ],
    limitsHeading: 'Cadre et limites',
    limits: [
      'Les abonnements et consommations d’API IA sont ouverts et réglés directement sur vos comptes.',
      'Les flux sont cadrés pour limiter l’exposition de données sensibles ; l’intégration ne constitue pas un audit juridique RGPD.',
      'Les résultats générés restent soumis à votre contrôle, sans promesse d’automatisation autonome à 100 %.',
    ],
    ctaLabel: 'Discuter de mon cas d’usage',
    halo: 'sun',
  },
];
