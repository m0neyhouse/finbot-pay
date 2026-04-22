import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinBot — Seu Assistente Financeiro via WhatsApp",
  description:
    "Controle suas finanças pelo WhatsApp. Registre gastos por mensagem, receba relatórios diários automáticos e tenha um assistente financeiro 24h no seu bolso. Comece agora!",
  keywords: [
    "finbot",
    "assistente financeiro",
    "controle financeiro",
    "whatsapp bot",
    "finanças pessoais",
    "controle de gastos",
    "planejamento financeiro",
  ],
  openGraph: {
    title: "FinBot — Suas Finanças no Automático",
    description:
      "Registre seus gastos pelo WhatsApp e receba relatórios diários. Assistente financeiro com IA, 24h por dia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
