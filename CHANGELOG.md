 # Changelog
  
  Todas as mudanças relevantes deste projeto são documentadas aqui.
  Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

  ## [Unreleased]
  
  ### Fixed
  - **ActivationButton**: corrigido o domínio do bot usado para buscar o token de ativação (`whatsapp-fin-bot-production` →
   `finbot-whatsapp-production`), que impedia a busca do token e fazia o link do WhatsApp ir sem `TOKEN:`.
  - **ActivationButton**: agora faz *polling* do token (tenta a cada 3s por até ~3 min) em vez de buscar uma única vez. O
  botão só fica clicável quando o token chega, evitando o cliente enviar a mensagem sem token.
  - **Página `/pagamento/pendente`**: deixou de ser um beco sem saída. Agora lê o `payment_id` retornado pelo Mercado Pago
  e mostra o mesmo botão de ativação (que aguarda a confirmação do pagamento via polling). Removido o texto incorreto que
  dizia que o cliente "receberá uma mensagem no WhatsApp" — o primeiro contato é sempre iniciado pelo cliente.

  ### Operacional (2026-05-21)
  - **Vercel (env)**: adicionada `MERCADOPAGO_WEBHOOK_SECRET`; `MERCADOPAGO_ACCESS_TOKEN` atualizado para o token de
  produção válido (carimbo de maio).
  - **Mercado Pago (webhook)**: webhook de produção configurado e, em seguida, **reapontado para o endpoint do bot**
  `https://finbot-whatsapp-production.up.railway.app/webhook/mercadopago` (evento Pagamentos). É o webhook do bot que cria
  o token de acesso e notifica o admin.

  ### Notas / Pendências
  - O webhook da Vercel (`/api/webhooks/mercadopago`) continua sendo um *stub* (apenas loga; não cria token). A criação do
  token é feita pelo webhook do bot. Decidir depois se o stub é implementado ou removido.
  - Mapeamento de plano: o bot lê `payment.metadata.plan` (inexistente — a preferência envia `plan_key`/`plan_period`),
  então todo token é criado como `BASIC`. Definir depois o mapeamento período → tier (BASIC/PREMIUM).
  
