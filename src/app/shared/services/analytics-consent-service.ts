import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

type Consent = 'accepted' | 'refused';
const STORAGE_KEY = 'lunaas.analytics-consent.v1';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class AnalyticsConsentService {
  private readonly document = inject(DOCUMENT);
  readonly visible = signal(false);
  readonly choice = signal<Consent | null>(null);
  private script: HTMLScriptElement | null = null;

  initialize(): void {
    try {
      const raw = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      const saved: unknown = raw ? JSON.parse(raw) : null;
      if (saved && typeof saved === 'object' && 'choice' in saved && 'expires' in saved &&
          (saved.choice === 'accepted' || saved.choice === 'refused') &&
          typeof saved.expires === 'number' && saved.expires > Date.now()) {
        this.choice.set(saved.choice);
      }
    } catch { /* Un stockage indisponible n'empêche pas l'accès au site. */ }
    this.visible.set(this.choice() === null);
    if (this.choice() === 'accepted') this.load();
  }

  open(): void {
    this.visible.set(true);
  }

  choose(choice: Consent): void {
    this.choice.set(choice);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY,
        JSON.stringify({ choice, expires: Date.now() + MAX_AGE }));
    } catch { /* Le choix reste valable pour la page en cours. */ }
    this.visible.set(false);
    if (choice === 'accepted') this.load();
    else if (this.script) {
      // Le script chargé peut conserver des écouteurs. Bloquer ses envois avant
      // de recharger évite une dernière mesure lors de la fermeture de la page.
      const policy = this.document.createElement('meta');
      policy.httpEquiv = 'Content-Security-Policy';
      policy.content = "connect-src 'self' https://api.web3forms.com";
      this.document.head.appendChild(policy);
      this.script.remove();
      this.document.defaultView?.location.reload();
    }
  }

  private load(): void {
    if (this.script) return;
    const script = this.document.createElement('script');
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.dataset['cfBeacon'] = JSON.stringify({ token: 'd28501d6591844d5b34f9e007ba5cf3e' });
    this.script = script;
    this.document.body.appendChild(script);
  }
}
