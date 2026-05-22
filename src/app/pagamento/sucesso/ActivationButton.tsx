 'use client';
  
  import { useEffect, useState } from 'react';

  interface ActivationButtonProps {
    paymentId: string;
    whatsappNumber: string;
  }

  export default function ActivationButton({ paymentId, whatsappNumber }: ActivationButtonProps) {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!paymentId || paymentId === 'undefined') {
        setLoading(false);
        return;
      }

      let cancelled = false;
      let attempts = 0;
      const MAX_ATTEMPTS = 60; // ~3 minutos (60 tentativas a cada 3s)

      async function poll() {
        try {
          // Busca o token do bot (criado pelo webhook quando o pagamento é aprovado)
          const botUrl = process.env.NEXT_PUBLIC_BOT_API_URL || 'https://finbot-whatsapp-production.up.railway.app';
          const response = await fetch(`${botUrl}/get-token/${paymentId}`);
          if (response.ok) {
            const data = await response.json();
            if (!cancelled) {   
              setToken(data.token);
              setLoading(false);
            }
            return;
          }
        } catch (err) {
          console.error('Erro ao buscar token do bot:', err);
        }

        // Token ainda não disponível (ex: Pix confirmando). Tenta de novo em 3s.
        attempts++;
        if (cancelled) return;
        if (attempts < MAX_ATTEMPTS) {
          setTimeout(poll, 3000);
        } else {
          setLoading(false);
        }
      }

      poll();
      return () => {
        cancelled = true;
      };
    }, [paymentId]);

    const mensagemBase = `Ola fin, me chamo ________, vc sera meu novo assistente financeiro!`;
    const mensagemFinal = token ? `${mensagemBase} TOKEN:${token}` : mensagemBase;
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagemFinal)}`;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        {token ? (
          <a
            href={link}
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
              border: "none",
              boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
            }}
          >
            💬 Ativar FinBot no WhatsApp
          </a>
        ) : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "rgba(37,211,102,0.2)",
              color: "#cfe9d6",
              padding: "16px 40px",
              borderRadius: "14px",
              fontSize: "1.1rem",
              fontWeight: 700,
              border: "none",   
              cursor: "default",
            }}
          >
            {loading ? "⌛ Preparando seu acesso..." : "⚠️  Não foi possível confirmar"}
          </span>
        )}

        {token && (
          <p style={{ fontSize: '0.75rem', color: '#555' }}>
            Token de ativação: <span style={{ color: '#D4A847' }}>{token}</span>
          </p> 
        )}

        {!token && !loading && (
          <p style={{ fontSize: '0.8rem', color: '#999', maxWidth: '320px', textAlign: 'center', lineHeight: 1.5 }}>
            Não conseguimos confirmar seu pagamento ainda. Se você pagou por Pix, aguarde alguns instantes e recarregue a
  página. Persistindo, fale com o suporte: @oficialfinbot
          </p>
        )}
      </div>
    );
  }
