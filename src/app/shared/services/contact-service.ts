import { Injectable } from '@angular/core';
import { ContactForm } from '../interfaces';
import { OFFER_DATA, SITE_DATA } from '../data';

@Injectable({ providedIn: 'root' })
export class ContactService {
  prepareEmail(data: ContactForm): string {
    const offer = OFFER_DATA.find((item) => item.id === data.projectType);
    const project = offer?.name ?? 'Autre projet de site internet';
    const subject = `Demande de devis — ${project}`;
    const body = [
      `Nom : ${data.name.trim()}`,
      `E-mail : ${data.email.trim()}`,
      `Projet : ${project}`,
      `Budget indicatif : ${data.budget.trim() || 'À préciser'}`,
      '',
      'Mon besoin :',
      data.message.trim(),
    ].join('\n');
    return `mailto:${SITE_DATA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
