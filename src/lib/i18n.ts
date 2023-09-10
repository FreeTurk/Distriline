/* import i18n from "i18next";
import { initReactI18next } from 'next-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../../public/locales/en";
import de from "../../public/locales/de";
import tr from "../../public/locales/tr";
import sv from "../../public/locales/sv";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation:en}, de : {translation:de}, tr: {translation:tr}, sv: {translation:sv}
    },
    
    lng:"en",
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    }
    
  });

export default i18n; */