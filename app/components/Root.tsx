"use client";
import useTheme from "../hooks/useTheme";
import Providers from "./Providers";

export interface ThemeProps {
  theme?: string;
  setTheme: (theme: string) => void;
}

export default function Root({
  inter,
  children,
}: {
  inter: any;
  children: React.ReactNode;
}) {
  const { theme, setTheme, themes } = useTheme();

  return (
    <html lang="en" data-theme={theme}>
      <body className={inter.className}>
        <Providers theme={theme} setTheme={setTheme} themes={themes}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
