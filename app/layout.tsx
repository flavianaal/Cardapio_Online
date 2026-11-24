
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cardápio Online",
  description:
    "Cardápio Online é uma plataforma que permite criar e gerenciar cardápios digitais para pizzarias.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
