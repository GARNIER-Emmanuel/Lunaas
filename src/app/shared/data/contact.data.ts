import { ContactConfiguration, ContactTopic } from '../interfaces';
import { MAINTENANCE_PLAN_DATA } from './maintenance-plan.data';

// Clé publique de routage Web3Forms, reprise de la configuration de contact existante.
// https://docs.web3forms.com/getting-started/faq
export const CONTACT_CONFIG: ContactConfiguration = {
  accessKey: '9431e9d7-7363-444b-8ff7-ad044dfd12e3',
  endpoint: 'https://api.web3forms.com/submit',
};

export const CONTACT_TOPICS: readonly ContactTopic[] = [
  ...MAINTENANCE_PLAN_DATA.map((plan) => ({ id: plan.id, label: `Maintenance - ${plan.name}` })),
  { id: 'autre', label: 'Autre demande' },
  { id: 'donnees-personnelles', label: 'Mes données personnelles' },
];
