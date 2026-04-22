# Contexto Geral do Projeto: FinBot (Sistema de Vendas & Landing Page)

## 📌 Status Atual do Projeto (22 de Abril de 2026)
Este documento serve como ponte de contexto para qualquer Inteligência Artificial ou desenvolvedor que for atuar no projeto FinBot a partir de agora.

### 1. O que foi finalizado com sucesso:
- **Landing Page (Next.js):** 
  - Criada uma landing page completa de alto padrão em `src/app/page.tsx` focada em conversão, com tema escuro (verde e dourado).
  - Inclui seções: Hero, Problema, Como Funciona, Funcionalidades, Preços e FAQ.
- **Integração de Pagamentos (Mercado Pago):**
  - Gateway configurado via `mercadopago` SDK (v2).
  - **API Checkout** (`src/app/api/checkout/route.ts`): Cria as preferências de pagamento para os planos (Mensal, Trimestral, Anual e Lançamento Vitalício) e retorna o link de pagamento.
  - **Webhook** (`src/app/api/webhooks/mercadopago/route.ts`): Recebe a notificação de pagamentos aprovados do Mercado Pago e faz o log da transação (Pronto para integração com banco de dados ou liberação automática no bot).
- **Hospedagem & Go-to-Market:**
  - Código fonte versionado via Git e hospedado no GitHub (`https://github.com/m0neyhouse/finbot-pay`).
  - Deploy realizado com sucesso na **Vercel** (`https://finbot-pay.vercel.app`).
  - Identidade visual criada (Logos e posts do Instagram) e perfil oficial `@oficialfinbot` criado.
  - O fluxo de pagamento e os redirecionamentos para WhatsApp (suporte ou bot) estão testados e operacionais.

### 2. Variáveis de Ambiente Necessárias (.env.local)
O projeto depende das seguintes variáveis para funcionar na Vercel ou localmente:
- `MERCADOPAGO_ACCESS_TOKEN` = Token de PRODUÇÃO da conta Mercado Pago.
- `NEXT_PUBLIC_APP_URL` = URL pública do projeto (ex: `https://finbot-pay.vercel.app`).
- `NEXT_PUBLIC_SUPPORT_NUMBER` = Número de WhatsApp para direcionar clientes com problemas no pagamento ou dúvidas.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` = Número de WhatsApp oficial do FinBot, para clientes cujo pagamento foi **aprovado**.

### 3. Próximos Passos (A Fazer):
- **Bot do WhatsApp (Core):**
  - Hospedar o código primário do FinBot (o próprio bot que responde mensagens via Baileys/WWebJS) em uma nuvem (Cloud - ex: Railway, Render, AWS) para funcionar 24/7.
  - Fazer a conexão de liberação de uso: O Webhook (`route.ts`) criado aqui deve se comunicar com o banco de dados do Bot para ativar o número do usuário que acabou de pagar.
- **Domínio Personalizado:** Comprar o domínio `.com.br` e anexar à Vercel.

---
**Instrução para a IA:** Ao ler este arquivo, entenda que a etapa do "Funil de Vendas" está 100% pronta. O próximo foco é puramente a hospedagem e ativação técnica do código do bot de IA no WhatsApp.
