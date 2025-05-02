import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import en from './en';
import fr from './fr';

const locales = {
    en: { translation: en },
    fr: { translation: fr },
}

const languageTag = Localization.getLocales()[0]?.languageCode || 'en';

i18n
    .use(initReactI18next)
    .init({
        lng: languageTag,
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: locales,
    });

// Set Language
export const setLocale = locale => i18n.changeLanguage(locale)
export const getCurrentLocale = () => i18n.language;
export default i18n;