import { Injectable, signal } from '@angular/core';
import { ContactForm } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ContactDraftService {
  // Le brouillon reste uniquement en mémoire, y compris pendant la lecture des pages légales.
  readonly values = signal<ContactForm>(this.emptyValues());

  emptyValues(): ContactForm {
    return {
      firstname: '',
      lastname: '',
      email: '',
      projectType: '',
      budget: '',
      message: '',
      botcheck: false,
    };
  }
}
