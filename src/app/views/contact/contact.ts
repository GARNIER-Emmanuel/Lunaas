import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  maxLength,
  required,
  validate,
} from '@angular/forms/signals';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContactForm } from '../../shared/interfaces';
import { OFFER_DATA, SITE_DATA } from '../../shared/data';
import { ContactService } from '../../shared/services/contact-service';

@Component({
  selector: 'app-contact',
  imports: [FormField, FormRoot, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly offers = OFFER_DATA;
  protected readonly emailAddress = SITE_DATA.email;
  private readonly contactService = inject(ContactService);
  private readonly route = inject(ActivatedRoute);
  protected readonly draft = signal<string | null>(null);
  protected readonly feedback = signal('');
  protected readonly model = signal<ContactForm>({
    name: '',
    email: '',
    projectType: OFFER_DATA.some(
      (item) => item.id === this.route.snapshot.queryParamMap.get('offre'),
    )
      ? this.route.snapshot.queryParamMap.get('offre')!
      : '',
    budget: '',
    message: '',
  });
  protected readonly contactForm = form(
    this.model,
    (path) => {
      required(path.name, { message: 'Indiquez votre nom.' });
      maxLength(path.name, 100, { message: 'Le nom doit contenir au maximum 100 caractères.' });
      validate(path.name, ({ value }) =>
        value().length > 0 && !value().trim()
          ? { kind: 'required', message: 'Indiquez votre nom.' }
          : undefined,
      );
      required(path.email, { message: 'Indiquez votre adresse e-mail.' });
      email(path.email, { message: 'Indiquez une adresse e-mail valide.' });
      maxLength(path.email, 254);
      required(path.projectType, { message: 'Choisissez un type de projet.' });
      maxLength(path.budget, 100, {
        message: 'Le budget doit contenir au maximum 100 caractères.',
      });
      required(path.message, { message: 'Décrivez votre besoin.' });
      validate(path.message, ({ value }) =>
        value().length > 0 && !value().trim()
          ? { kind: 'required', message: 'Décrivez votre besoin.' }
          : undefined,
      );
      maxLength(path.message, 2000, {
        message: 'Le message doit contenir au maximum 2 000 caractères.',
      });
    },
    {
      submission: {
        action: async (field) => {
          this.draft.set(this.contactService.prepareEmail(field().value()));
          this.feedback.set(
            'Votre brouillon est prêt. Ouvrez votre messagerie puis envoyez le message. Aucune demande n’a encore été envoyée.',
          );
        },
        onInvalid: () =>
          this.feedback.set('Vérifiez les champs signalés avant de préparer votre demande.'),
      },
    },
  );
  constructor() {
    effect(() => {
      this.model();
      this.draft.set(null);
      this.feedback.set('');
    });
  }
}
