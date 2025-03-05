import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";
type ThemeProviderProps = { children: React.ReactNode };

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light",
  );
  const [accentColor, setAccentColor] = useState<string>(
    localStorage.getItem("accentColor") || "#7c3aed", // Default purple
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes
    root.classList.remove("light", "dark");

    // Handle system preference
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Set accent color CSS variable
    document.documentElement.style.setProperty("--accent-color", accentColor);
    document.documentElement.style.setProperty("--primary", accentColor);
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  const value = {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
