"use client";
import { createContext } from "react";

export interface ThemeProps {
  theme?: string;
  setTheme: (theme: string) => void;
  themes: string[];
}

export const ThemeContext = createContext<ThemeProps>({
  theme: "light",
  setTheme: () => {},
  themes: [],
});

export default function Providers({
  theme,
  setTheme,
  themes,
  children,
}: {
  theme?: string;
  setTheme: (theme: string) => void;
  themes: string[];
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
