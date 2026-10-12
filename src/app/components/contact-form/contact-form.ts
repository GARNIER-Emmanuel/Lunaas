import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  maxLength,
  required,
  validate,
} from '@angular/forms/signals';
import { ContactForm as ContactValues } from '../../shared/interfaces';
import { OFFER_DATA, SITE_DATA } from '../../shared/data';
import { ContactService } from '../../shared/services/contact-service';
import { SiteInformationService } from '../../shared/services/site-information-service';

@Component({
  selector: 'app-contact-form',
  imports: [FormField, FormRoot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactFormComponent {
  readonly idPrefix = input('contact');
  protected readonly offers = OFFER_DATA;
  protected readonly emailAddress = SITE_DATA.email;
  protected readonly feedback = signal('');
  protected readonly failed = signal(false);
  protected readonly information = inject(SiteInformationService);
  private readonly contactService = inject(ContactService);
  protected readonly model = signal<ContactValues>(this.emptyModel());
  protected readonly contactForm = form(
    this.model,
    (path) => {
      for (const field of [path.firstname, path.lastname]) {
        required(field, { message: 'Ce champ est obligatoire.' });
        maxLength(field, 80, { message: '80 caractères maximum.' });
        validate(field, ({ value }) =>
          value().length > 0 && !value().trim()
            ? { kind: 'required', message: 'Ce champ est obligatoire.' }
            : undefined,
        );
      }
      required(path.email, { message: 'Indiquez votre adresse e-mail.' });
      email(path.email, { message: 'Indiquez une adresse e-mail valide.' });
      maxLength(path.email, 254);
      required(path.projectType, { message: 'Choisissez un type de projet.' });
      validate(path.projectType, ({ value }) =>
        value() && value() !== 'autre' && !OFFER_DATA.some((offer) => offer.id === value())
          ? { kind: 'project', message: 'Choisissez une prestation proposée.' }
          : undefined,
      );
      maxLength(path.budget, 100, { message: '100 caractères maximum.' });
      required(path.message, { message: 'Décrivez votre besoin.' });
      validate(path.message, ({ value }) =>
        value().length > 0 && !value().trim()
          ? { kind: 'required', message: 'Décrivez votre besoin.' }
          : undefined,
      );
      maxLength(path.message, 2000, { message: '2 000 caractères maximum.' });
      validate(path.botcheck, ({ value }) =>
        value() ? { kind: 'spam', message: 'Envoi impossible.' } : undefined,
      );
    },
    {
      submission: {
        action: async (field) => {
          this.feedback.set('');
          this.failed.set(false);
          try {
            await this.contactService.sendEmail(field().value());
            field().reset(this.emptyModel());
            this.feedback.set(
              'Votre message a été envoyé. Merci, je reviendrai vers vous pour échanger sur votre projet.',
            );
          } catch {
            this.failed.set(true);
            this.feedback.set(
              'L’envoi n’a pas abouti. Votre saisie est conservée : réessayez ou contactez-moi directement par e-mail.',
            );
          }
        },
        onInvalid: () => {
          this.failed.set(true);
          this.feedback.set('Vérifiez les champs signalés avant d’envoyer votre message.');
        },
      },
    },
  );
  protected fieldId(name: string): string {
    return `${this.idPrefix()}-${name}`;
  }
  private emptyModel(): ContactValues {
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
