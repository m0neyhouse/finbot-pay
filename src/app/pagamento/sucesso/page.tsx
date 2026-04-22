import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamento Confirmado — FinBot",
  description: "Seu pagamento foi confirmado com sucesso!",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const plan = params.plan as string | undefined;

  const planNames: Record<string, string> = {
    monthly: "Mensal",
    quarterly: "Trimestral",
    annual: "Anual",
    launch: "Vitalício (Lançamento)",
  };

  const planName = plan ? planNames[plan] || plan : "selecionado";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5500000000000";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(180deg, #0a0a0a, #062a1e)",
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
            background: "rgba(37,212,102,0.15)",
            border: "2px solid #25D366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            margin: "0 auto 24px",
          }}
        >
          ✅
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "12px",
            color: "#fff",
          }}
        >
          Pagamento Confirmado!
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#999",
            marginBottom: "8px",
            lineHeight: 1.6,
          }}
        >
          Parabéns! Seu plano <strong style={{ color: "#D4A847" }}>{planName}</strong> do FinBot foi ativado com sucesso.
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "#777",
            marginBottom: "36px",
            lineHeight: 1.6,
          }}
        >
          Agora é só salvar o número do FinBot no WhatsApp e mandar um
          &quot;Oi&quot; para começar a usar!
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
            Próximo passo
          </p>
          <p style={{ fontSize: "1.1rem", color: "#e0e0e0", lineHeight: 1.6 }}>
            Clique no botão abaixo para iniciar uma conversa com o FinBot no WhatsApp
          </p>
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}?text=Oi!%20Acabei%20de%20assinar%20o%20FinBot%20(plano%20${planName}).%20Quero%20começar!`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "#25D366",
            color: "#fff",
            padding: "16px 40px",
            borderRadius: "14px",
            fontSize: "1.1rem",
            fontWeight: 700,
            textDecoration: "none",
            transition: "all 0.3s ease",
            border: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
          }}
        >
          💬 Abrir WhatsApp do FinBot
        </a>

        <p style={{ marginTop: "24px", fontSize: "0.85rem", color: "#555" }}>
          Você receberá um e-mail de confirmação em breve.
        </p>
      </div>
    </div>
  );
}
