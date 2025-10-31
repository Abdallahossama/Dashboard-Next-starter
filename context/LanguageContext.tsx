"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import i18n from "@/config/i18n";

type Language = "en" | "ar";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("kquires-language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage);
      // Change i18n language immediately if available
      if (i18n && typeof i18n.changeLanguage === "function") {
        i18n.changeLanguage(savedLanguage);
      }
    }
    setIsInitialized(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("kquires-language", newLang);

    // Change i18n language immediately
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(newLang);
    }
  };

  useEffect(() => {
    // Only apply DOM changes after initialization to avoid hydration issues
    if (!isInitialized) return;

    // Set document direction and language
    const html = document.documentElement;
    const body = document.body;

    html.lang = language;
    html.dir = language === "ar" ? "rtl" : "ltr";

    // Add class for styling to both html and body
    html.classList.remove("ltr", "rtl");
    body.classList.remove("ltr", "rtl");

    const dirClass = language === "ar" ? "rtl" : "ltr";
    html.classList.add(dirClass);
    body.classList.add(dirClass);
  }, [language, isInitialized]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
