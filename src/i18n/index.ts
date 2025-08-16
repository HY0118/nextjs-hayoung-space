'use client';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n/constants';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: DEFAULT_LOCALE,
      supportedLngs: SUPPORTED_LOCALES as unknown as string[],
      interpolation: { escapeValue: false },
      detection: {
        order: ['path', 'querystring', 'cookie', 'localStorage', 'navigator'],
      },
      backend: {
        loadPath: '/locales/{{lng}}.json',
      },
      react: {
        useSuspense: true,
      },
      load: 'languageOnly',
    });
}

export default i18n;
