import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  maxLength,
  required,
  validate,
} from '@angular/forms/signals';
import { OfferSelection } from '../../../../shared/interfaces';
import { CONTACT_TOPICS, OFFER_DATA } from '../../../../shared/data';
import { ContactService } from '../../../../shared/services/contact-service';
import { ContactDraftService } from '../../../../shared/services/contact-draft-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  imports: [FormField, FormRoot, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactFormComponent {
  readonly idPrefix = input('contact');
  readonly offerSelection = input<OfferSelection | null>(null);
  protected readonly offers = OFFER_DATA;
  protected readonly topics = CONTACT_TOPICS;
  protected readonly feedback = signal('');
  protected readonly failed = signal(false);
  private readonly contactService = inject(ContactService);
  private readonly draft = inject(ContactDraftService);
  protected readonly model = this.draft.values;
  protected readonly contactForm = form(
    this.model,
    (path) => {
      for (const field of [path.firstname, path.lastname]) {
        maxLength(field, 80, { message: '80 caractères maximum.' });
      }
      required(path.email, { message: 'Indiquez votre adresse e-mail.' });
      email(path.email, { message: 'Indiquez une adresse e-mail valide.' });
      maxLength(path.email, 254);
      validate(path.projectType, ({ value }) =>
        value() &&
        !CONTACT_TOPICS.some((topic) => topic.id === value()) &&
        !OFFER_DATA.some((offer) => offer.id === value())
          ? { kind: 'project', message: 'Choisissez un sujet proposé.' }
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
            field().reset(this.draft.emptyValues());
            this.feedback.set(
              'Votre message a été envoyé. Merci, je reviendrai vers vous pour échanger sur votre projet.',
            );
          } catch {
            this.failed.set(true);
            this.feedback.set(
              'L’envoi n’a pas abouti. Votre saisie est conservée : vous pouvez réessayer.',
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

  constructor() {
    effect(() => {
      const selection = this.offerSelection();
      if (!selection || !OFFER_DATA.some((offer) => offer.id === selection.offerId)) return;
      untracked(() => {
        if (this.contactForm().submitting()) return;
        this.model.update((values) => ({ ...values, projectType: selection.offerId }));
      });
    });
  }

  protected fieldId(name: string): string {
    return `${this.idPrefix()}-${name}`;
  }
}
