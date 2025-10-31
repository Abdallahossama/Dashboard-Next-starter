// filepath: src/config/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import English translations
import enCommon from "../locales/en/common.json";
import enAuth from "../locales/en/auth.json";
import enDashboard from "../locales/en/dashboard.json";
import enHomepage from "../locales/en/homepage.json";

// Import Arabic translations
import arCommon from "../locales/ar/common.json";
import arAuth from "../locales/ar/auth.json";
import arDashboard from "../locales/ar/dashboard.json";
import arHomepage from "../locales/ar/homepage.json";

const initI18n = () => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: {
        en: {
          common: enCommon,
          auth: enAuth,
          dashboard: enDashboard,
          homepage: enHomepage,
        },
        ar: {
          common: arCommon,
          auth: arAuth,
          dashboard: arDashboard,
          homepage: arHomepage,
        },
      },
      lng: "en",
      fallbackLng: "en",
      ns: ["common", "auth", "dashboard", "homepage"],
      defaultNS: "common",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  }
  return i18n;
};

export default initI18n();
