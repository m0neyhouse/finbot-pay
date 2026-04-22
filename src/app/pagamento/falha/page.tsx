import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamento Não Aprovado — FinBot",
  description: "Houve um problema com o seu pagamento.",
};

export default function FailurePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(180deg, #0a0a0a, #1a0a0a)",
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
            background: "rgba(239,68,68,0.15)",
            border: "2px solid #ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            margin: "0 auto 24px",
          }}
        >
          ❌
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "12px",
            color: "#fff",
          }}
        >
          Pagamento não aprovado
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#999",
            marginBottom: "36px",
            lineHeight: 1.6,
          }}
        >
          Houve um problema ao processar seu pagamento. Isso pode acontecer por
          saldo insuficiente, dados incorretos ou limite excedido.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/#precos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              background: "linear-gradient(135deg, #0D4F3C, #1a9e76)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            🔄 Tentar Novamente
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5500000000000"}?text=Tive%20um%20problema%20no%20pagamento%20do%20FinBot`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            💬 Falar com Suporte
          </a>
        </div>
      </div>
    </div>
  );
}
