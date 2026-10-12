import { Injectable } from '@angular/core';
import { ContactForm } from '../interfaces';
import { CONTACT_CONFIG, OFFER_DATA, SITE_DATA } from '../data';

@Injectable({ providedIn: 'root' })
export class ContactService {
  async sendEmail(data: ContactForm): Promise<void> {
    if (data.botcheck) throw new Error('Envoi impossible.');
    const offer = OFFER_DATA.find((item) => item.id === data.projectType);
    const project = offer?.name ?? 'Autre projet de site internet';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(CONTACT_CONFIG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: CONTACT_CONFIG.accessKey,
          from_name: SITE_DATA.name,
          subject: `Demande de devis — ${project} | ${SITE_DATA.name}`,
          name: `${data.firstname.trim()} ${data.lastname.trim()}`,
          email: data.email.trim(),
          project,
          budget: data.budget.trim() || 'À préciser',
          message: data.message.trim(),
          botcheck: false,
        }),
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        typeof result !== 'object' ||
        result === null ||
        !('success' in result) ||
        result.success !== true
      ) {
        throw new Error('Le service n’a pas confirmé l’envoi.');
      }
    } finally {
      clearTimeout(timeout);
    }
  }
}
