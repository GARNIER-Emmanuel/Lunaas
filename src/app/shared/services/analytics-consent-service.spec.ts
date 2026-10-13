import { TestBed } from '@angular/core/testing';
import { AnalyticsConsentService } from './analytics-consent-service';

const KEY = 'lunaas.analytics-consent.v1';
const beacon = () => document.querySelector('script[src*="cloudflareinsights"]');

describe('AnalyticsConsentService', () => {
  beforeEach(() => {
    localStorage.clear();
    beacon()?.remove();
    TestBed.configureTestingModule({});
  });
  afterEach(() => { beacon()?.remove(); localStorage.clear(); });

  it('makes no analytics request possible before a choice or after refusal', () => {
    const service = TestBed.inject(AnalyticsConsentService);
    service.initialize();
    expect(service.visible()).toBe(true);
    expect(beacon()).toBeNull();
    service.choose('refused');
    expect(beacon()).toBeNull();
    expect(JSON.parse(localStorage.getItem(KEY)!).choice).toBe('refused');
    service.open();
    expect(service.visible()).toBe(true);
    expect(beacon()).toBeNull();
  });

  it('loads the script once only after explicit acceptance', () => {
    const service = TestBed.inject(AnalyticsConsentService);
    service.initialize();
    service.choose('accepted');
    service.choose('accepted');
    expect(document.querySelectorAll('script[src*="cloudflareinsights"]')).toHaveLength(1);
    expect(service.visible()).toBe(false);
  });

  it('respects a saved refusal on a later visit', () => {
    localStorage.setItem(KEY, JSON.stringify({choice: 'refused', expires: Date.now() + 10000}));
    const service = TestBed.inject(AnalyticsConsentService);
    service.initialize();
    expect(service.visible()).toBe(false);
    expect(beacon()).toBeNull();
  });

  it('asks again when an acceptance has expired or the saved value is invalid', () => {
    for (const raw of [JSON.stringify({choice: 'accepted', expires: Date.now() - 1}), 'invalid']) {
      localStorage.setItem(KEY, raw);
      TestBed.resetTestingModule();
      const service = TestBed.inject(AnalyticsConsentService);
      service.initialize();
      expect(service.visible()).toBe(true);
      expect(beacon()).toBeNull();
    }
  });
});
