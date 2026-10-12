import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export type SiteInformationId = 'mentions-legales' | 'confidentialite';

@Injectable({ providedIn: 'root' })
export class SiteInformationService {
  private readonly document = inject(DOCUMENT);

  open(id: SiteInformationId): void {
    this.document.querySelector<HTMLDialogElement>(`#${id}`)?.showModal();
  }
}
