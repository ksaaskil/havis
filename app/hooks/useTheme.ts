"use client";
import { useEffect, useState } from "react";

export const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const DEFAULT_THEME = "forest";

export default function useTheme() {
  const [theme, setTheme] = useState("" as string | undefined);

  function selectTheme(theme: string) {
    console.log(`Setting theme in local storage: ${theme}`);
    window.localStorage.setItem("data-theme", theme);
    setTheme(theme);
  }

  useEffect(() => {
    const selectedTheme = window.localStorage.getItem("data-theme");
    selectTheme(selectedTheme || DEFAULT_THEME);
  }, []);

  return { theme, themes: THEMES, setTheme: selectTheme };
}
