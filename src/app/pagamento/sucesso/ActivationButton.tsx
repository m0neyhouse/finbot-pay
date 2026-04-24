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
    async function fetchToken() {
      if (!paymentId || paymentId === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        // Buscando o token do bot no Railway
        const botUrl = process.env.NEXT_PUBLIC_BOT_API_URL || 'https://whatsapp-fin-bot-production.up.railway.app';
        const response = await fetch(`${botUrl}/get-token/${paymentId}`);
        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
        }
      } catch (err) {
        console.error('Erro ao buscar token do bot:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, [paymentId]);

  // Mensagem exatamente como o usuário pediu
  const mensagemBase = `Ola fin, me chamo ________, vc sera meu novo assistente financeiro!`;
  
  // Se tivermos o token, incluímos no final de forma que o bot consiga ler
  const mensagemFinal = token ? `${mensagemBase} TOKEN:${token}` : mensagemBase;
  
  const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagemFinal)}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
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
          transition: "all 0.3s ease",
          border: "none",
          boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
        }}
      >
        {loading ? "⌛ Preparando seu acesso..." : "💬 Ativar FinBot no WhatsApp"}
      </a>
      {token && (
        <p style={{ fontSize: '0.75rem', color: '#555' }}>
          Token de ativação: <span style={{ color: '#D4A847' }}>{token}</span>
        </p>
      )}
    </div>
  );
}
