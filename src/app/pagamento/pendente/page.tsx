import type { Metadata } from "next";
  import ActivationButton from "../sucesso/ActivationButton";

  export const metadata: Metadata = {
    title: "Confirmando Pagamento — FinBot",
    description: "Estamos confirmando seu pagamento.",
  };
  
  export default async function PendingPage({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) {
    const params = await searchParams;
    const plan = params.plan as string | undefined;
    const paymentId = params.payment_id as string | undefined;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5519997483762";

    const planNames: Record<string, string> = {
      monthly: "Mensal",
      quarterly: "Trimestral",
      annual: "Anual",
      launch: "Vitalício (Lançamento)",
    };
    const planName = plan ? planNames[plan] || plan : "selecionado";

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "linear-gradient(180deg, #0a0a0a, #1a1500)",
        }}
      >
        <div
          style={{
            maxWidth: "560px",
            width: "100%",
            background: "rgba(26, 26, 26, 0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px",
            padding: "48px 40px",
            textAlign: "center",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(212,168,71,0.15)",
              border: "2px solid #D4A847",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              margin: "0 auto 24px",
            }}
          > 
            ⏳
          </div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "12px",
              color: "#fff",
            }}
          >
            Confirmando seu pagamento...
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#999",
              marginBottom: "8px",
              lineHeight: 1.6,
            }}
          >
            Seu plano <strong style={{ color: "#D4A847" }}>{planName}</strong> está quase pronto! Pagamentos via Pix levam
  apenas alguns instantes para confirmar.
          </p> 
          <p
            style={{
              fontSize: "1rem",
              color: "#777",
              marginBottom: "36px",
              lineHeight: 1.6,
            }}
          >
            Não feche esta página: assim que o pagamento confirmar, o botão abaixo libera o acesso ao seu assistente.
          </p>

          <div
            style={{
              background: "rgba(37,211,102,0.08)",
              border: "1px solid rgba(37,211,102,0.2)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "32px",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                color: "#25D366",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              Passo Final
            </p>
            <p style={{ fontSize: "1.1rem", color: "#e0e0e0", lineHeight: 1.6 }}>
              Quando o botão liberar, abra o chat, preencha seu nome na mensagem e envie!
            </p>
          </div>

          <ActivationButton
            paymentId={paymentId || ''}
            whatsappNumber={whatsappNumber}
          />

          <p style={{ marginTop: "24px", fontSize: "0.85rem", color: "#555" }}>
            Suporte técnico: @oficialfinbot
          </p>
        </div>
      </div>
    );
  }
