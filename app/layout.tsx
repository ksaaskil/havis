import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Root from "./components/Root";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kurppa",
  description: "Lintuhavaintokirja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Root inter={inter}>{children}</Root>;
}
