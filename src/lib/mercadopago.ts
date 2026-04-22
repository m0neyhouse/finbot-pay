import { MercadoPagoConfig } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export default mercadopago;

// Planos do FinBot
export const PLANS = {
  monthly: {
    id: "finbot-monthly",
    title: "FinBot — Plano Mensal",
    description: "Assistente financeiro via WhatsApp - Assinatura mensal",
    price: 19.9,
    period: "mensal",
  },
  quarterly: {
    id: "finbot-quarterly",
    title: "FinBot — Plano Trimestral",
    description:
      "Assistente financeiro via WhatsApp - Assinatura trimestral (10% OFF)",
    price: 53.7,
    period: "trimestral",
  },
  annual: {
    id: "finbot-annual",
    title: "FinBot — Plano Anual",
    description: "Assistente financeiro via WhatsApp - Assinatura anual",
    price: 300.0,
    period: "anual",
  },
  launch: {
    id: "finbot-launch-lifetime",
    title: "FinBot — Acesso Vitalício (Lançamento)",
    description:
      "Assistente financeiro via WhatsApp - Acesso vitalício para os 50 primeiros",
    price: 60.0,
    period: "vitalício",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
