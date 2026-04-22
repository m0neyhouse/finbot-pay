import { Payment } from "mercadopago";
import { NextResponse } from "next/server";
import mercadopago from "@/lib/mercadopago";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Mercado Pago sends different types of notifications
    // We only care about payment notifications
    if (body.type === "payment") {
      const paymentId = body.data?.id;

      if (!paymentId) {
        return NextResponse.json({ received: true }, { status: 200 });
      }

      const payment = new Payment(mercadopago);
      const paymentData = await payment.get({ id: paymentId });

      console.log("=== PAGAMENTO RECEBIDO ===");
      console.log("Status:", paymentData.status);
      console.log("Valor:", paymentData.transaction_amount);
      console.log("E-mail:", paymentData.payer?.email);
      console.log("Referência:", paymentData.external_reference);
      console.log("Metadata:", paymentData.metadata);
      console.log("========================");

      if (paymentData.status === "approved") {
        // Pagamento aprovado!
        // Aqui você pode:
        // 1. Salvar no banco de dados
        // 2. Enviar mensagem de boas-vindas via WhatsApp
        // 3. Ativar a conta do usuário no FinBot
        // 4. Enviar e-mail de confirmação

        const planKey = paymentData.metadata?.plan_key;
        const payerEmail = paymentData.payer?.email;

        console.log(`✅ PAGAMENTO APROVADO - Plano: ${planKey}, Email: ${payerEmail}`);

        // TODO: Integrar com o sistema do FinBot para ativar o usuário
        // Exemplo:
        // await activateUser({
        //   email: payerEmail,
        //   plan: planKey,
        //   paymentId: paymentData.id,
        //   amount: paymentData.transaction_amount,
        // });
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Erro no webhook:", error);
    // Still return 200 to prevent Mercado Pago from retrying
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
