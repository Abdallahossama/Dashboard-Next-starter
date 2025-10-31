"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Theme, themes } from "@/lib/themes";

interface ThemeContextProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isDark, setIsDark] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("kquires-current-theme");
    const savedDarkMode = localStorage.getItem("kquires-dark-mode");

    if (savedTheme) {
      const theme = themes.find((t:any) => t.name === savedTheme) || themes[0];
      setCurrentTheme(theme);
    }

    if (savedDarkMode) {
      setIsDark(savedDarkMode === "true");
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    const themeVars = isDark
      ? currentTheme.cssVars.dark
      : currentTheme.cssVars.light;

    // Apply theme variables
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply dark class
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("kquires-current-theme", currentTheme.name);
    localStorage.setItem("kquires-dark-mode", isDark.toString());
  }, [currentTheme, isDark, isInitialized]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        availableThemes: themes,
        isDark,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
