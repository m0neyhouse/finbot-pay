import { Preference } from "mercadopago";
import { NextResponse } from "next/server";
import mercadopago, { PLANS } from "@/lib/mercadopago";
import type { PlanKey } from "@/lib/mercadopago";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan, email, name } = body as {
      plan: PlanKey;
      email?: string;
      name?: string;
    };

    // Validate plan
    if (!plan || !PLANS[plan]) {
      return NextResponse.json(
        { error: "Plano inválido. Escolha: monthly, quarterly, annual ou launch" },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const preference = new Preference(mercadopago);

    const result = await preference.create({
      body: {
        items: [
          {
            id: selectedPlan.id,
            title: selectedPlan.title,
            description: selectedPlan.description,
            quantity: 1,
            unit_price: selectedPlan.price,
            currency_id: "BRL",
          },
        ],
        payer: {
          ...(email && { email }),
          ...(name && { name }),
        },
        back_urls: {
          success: `${appUrl}/pagamento/sucesso?plan=${plan}`,
          failure: `${appUrl}/pagamento/falha`,
          pending: `${appUrl}/pagamento/pendente`,
        },
        ...(appUrl.includes("localhost") ? {} : { auto_return: "approved" }),
        ...(appUrl.includes("localhost") ? {} : { notification_url: `${appUrl}/api/webhooks/mercadopago` }),
        statement_descriptor: "FINBOT",
        external_reference: `finbot_${plan}_${Date.now()}`,
        metadata: {
          plan_key: plan,
          plan_period: selectedPlan.period,
        },
      },
    });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json(
      { error: "Erro ao processar pagamento. Tente novamente." },
      { status: 500 }
    );
  }
}
