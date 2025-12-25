import { CompanySettings, Client, Document, DEFAULT_COMPANY_SETTINGS } from '@/types/invoice';

const STORAGE_KEYS = {
  COMPANY_SETTINGS: 'gst_invoice_company_settings',
  CLIENTS: 'gst_invoice_clients',
  DOCUMENTS: 'gst_invoice_documents',
};

export const saveCompanySettings = (settings: CompanySettings): void => {
  localStorage.setItem(STORAGE_KEYS.COMPANY_SETTINGS, JSON.stringify(settings));
};

export const loadCompanySettings = (): CompanySettings => {
  const stored = localStorage.getItem(STORAGE_KEYS.COMPANY_SETTINGS);
  if (stored) {
    return { ...DEFAULT_COMPANY_SETTINGS, ...JSON.parse(stored) };
  }
  return DEFAULT_COMPANY_SETTINGS;
};

export const saveClients = (clients: Client[]): void => {
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
};

export const loadClients = (): Client[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.CLIENTS);
  return stored ? JSON.parse(stored) : [];
};

export const saveDocuments = (documents: Document[]): void => {
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
};

export const loadDocuments = (): Document[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
  return stored ? JSON.parse(stored) : [];
};

export const incrementCounter = (settings: CompanySettings, type: keyof CompanySettings['counters']): CompanySettings => {
  const updated = {
    ...settings,
    counters: {
      ...settings.counters,
      [type]: settings.counters[type] + 1,
    },
  };
  saveCompanySettings(updated);
  return updated;
};
