import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "OCT6 Food Service — Inside V1 | Grupo Savvy",
  description: "Vertical especializada de Gestão de Alimentação Coletiva Hospitalar construída sobre o ERP OCT6 para o Grupo Savvy.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23c62828'/><text x='50%' y='55%' dominant-baseline='central' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='34'>OCT6</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#f8f9fe] text-slate-800 antialiased selection:bg-red-500 selection:text-white">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
