import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamento Pendente — FinBot",
  description: "Seu pagamento está sendo processado.",
};

export default function PendingPage() {
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
          Pagamento Pendente
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#999",
            marginBottom: "16px",
            lineHeight: 1.6,
          }}
        >
          Seu pagamento está sendo processado. Isso pode levar alguns minutos
          para boletos ou pagamentos via PIX.
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "#777",
            marginBottom: "36px",
            lineHeight: 1.6,
          }}
        >
          Assim que o pagamento for confirmado, seu acesso ao FinBot será
          ativado automaticamente e você receberá uma mensagem no WhatsApp.
        </p>
        <a
          href="/"
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
          ← Voltar ao Início
        </a>
      </div>
    </div>
  );
}
