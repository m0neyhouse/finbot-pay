"use client";

import Image from "next/image";
import { useState } from "react";

type PlanKey = "monthly" | "quarterly" | "annual" | "launch";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCheckout = async (plan: PlanKey) => {
    setLoadingPlan(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else if (data.sandbox_init_point) {
        window.location.href = data.sandbox_init_point;
      } else {
        alert("Erro ao iniciar pagamento. Tente novamente.");
      }
    } catch {
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const faqs = [
    {
      question: "Como o FinBot funciona?",
      answer:
        "É simples! Depois de assinar, você adiciona o número do FinBot no WhatsApp. A partir daí, basta mandar mensagens como 'gastei 50 no almoço' ou 'recebi 3500 de salário' e o bot registra tudo automaticamente. Todo dia você recebe um relatório completo dos seus gastos.",
    },
    {
      question: "Preciso instalar algum aplicativo?",
      answer:
        "Não! O FinBot funciona 100% pelo WhatsApp, que você já tem instalado. Sem downloads extras, sem cadastros complicados. É só salvar o número e começar a conversar.",
    },
    {
      question: "Meus dados financeiros estão seguros?",
      answer:
        "Sim! Seus dados são criptografados e armazenados com segurança. O FinBot utiliza as mesmas práticas de segurança de empresas de tecnologia financeira. Seus dados nunca são compartilhados com terceiros.",
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim, você pode cancelar sua assinatura a qualquer momento, sem multa ou burocracia. Basta enviar uma mensagem solicitando o cancelamento.",
    },
    {
      question: "O bot funciona 24 horas?",
      answer:
        "Sim! O FinBot está online 24 horas por dia, 7 dias por semana. Você pode registrar seus gastos a qualquer hora do dia ou da noite. Os relatórios diários são enviados automaticamente.",
    },
    {
      question: "Quais categorias de gastos são suportadas?",
      answer:
        "O FinBot suporta diversas categorias: Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Investimentos, Fundo de Emergência e muito mais. Ele categoriza automaticamente com inteligência artificial.",
    },
  ];

  return (
    <>
      {/* ======================== NAVIGATION ======================== */}
      <nav className="nav" id="nav">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <Image
              src="/logo-icon.png"
              alt="FinBot Logo"
              width={36}
              height={36}
              className="nav-logo-img"
            />
            <span>Fin</span>Bot
          </a>
          <ul className="nav-links" id="nav-links">
            <li>
              <a href="#problema">Problema</a>
            </li>
            <li>
              <a href="#funcionalidades">Funcionalidades</a>
            </li>
            <li>
              <a href="#como-funciona">Como Funciona</a>
            </li>
            <li>
              <a href="#precos">Preços</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#precos" className="nav-cta">
                Começar Agora
              </a>
            </li>
          </ul>
          <button
            className="nav-mobile-toggle"
            aria-label="Menu"
            onClick={() => {
              const links = document.getElementById("nav-links");
              if (links) {
                links.style.display =
                  links.style.display === "flex" ? "none" : "flex";
                links.style.flexDirection = "column";
                links.style.position = "absolute";
                links.style.top = "100%";
                links.style.left = "0";
                links.style.right = "0";
                links.style.background = "rgba(10,10,10,0.95)";
                links.style.padding = "24px";
                links.style.gap = "16px";
                links.style.borderBottom = "1px solid rgba(255,255,255,0.06)";
              }
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ======================== HERO ======================== */}
      <section className="hero section" id="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                Assistente Financeiro com IA
              </div>
              <h1 className="hero-title">
                Suas finanças no{" "}
                <span className="text-gradient">automático,</span> direto no
                WhatsApp
              </h1>
              <p className="hero-subtitle">
                Pare de se perder nas contas. Registre seus gastos por mensagem,
                receba relatórios diários e tenha o controle total do seu
                dinheiro — tudo pelo WhatsApp.
              </p>
              <div className="hero-ctas">
                <a href="#precos" className="btn btn-primary btn-lg" id="hero-cta-primary">
                  🚀 Quero Começar
                </a>
                <a href="#como-funciona" className="btn btn-secondary btn-lg" id="hero-cta-secondary">
                  Como Funciona?
                </a>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="hero-stat-number">24h</div>
                  <div className="hero-stat-label">Online por dia</div>
                </div>
                <div>
                  <div className="hero-stat-number">
                    <span className="text-green">IA</span>
                  </div>
                  <div className="hero-stat-label">
                    Inteligência Artificial
                  </div>
                </div>
                <div>
                  <div className="hero-stat-number">100%</div>
                  <div className="hero-stat-label">Via WhatsApp</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-mockup-wrapper">
                <div className="hero-mockup-glow"></div>
                <Image
                  src="/mockup-hero.png"
                  alt="FinBot funcionando no WhatsApp — registrando um gasto automaticamente"
                  width={380}
                  height={760}
                  className="hero-mockup"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== PAIN / PROBLEM ======================== */}
      <section className="pain-section section" id="problema">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">💸 O Problema</div>
            <h2 className="section-title">
              Você sabe{" "}
              <span className="text-gradient">exatamente</span> onde
              seu dinheiro vai?
            </h2>
            <p className="section-subtitle">
              A maioria das pessoas perde o controle do dinheiro porque não tem
              um sistema simples para acompanhar os gastos no dia a dia.
            </p>
          </div>
          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-icon">🤯</div>
              <h3>Gastos invisíveis</h3>
              <p>
                Pequenos gastos diários que parecem inofensivos, mas no final do
                mês somam centenas de reais. Você nem percebe para onde o
                dinheiro foi.
              </p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">📱</div>
              <h3>Apps complicados demais</h3>
              <p>
                Planilhas e apps financeiros são chatos de usar. Você até baixa,
                usa por 3 dias e depois abandona. O processo precisa ser fácil.
              </p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">😰</div>
              <h3>Fim do mês no vermelho</h3>
              <p>
                Sem controle, o salário acaba antes do mês. Você fica sem saber
                o que cortar, o que priorizar, e a ansiedade financeira só
                aumenta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== FEATURES ======================== */}
      <section className="features-section section" id="funcionalidades">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">✨ A Solução</div>
            <h2 className="section-title">
              Tudo que você precisa para{" "}
              <span className="text-gradient">dominar</span> suas finanças
            </h2>
            <p className="section-subtitle">
              O FinBot transforma o WhatsApp no seu assistente financeiro
              pessoal. Sem complicação, sem app extra.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">💬</div>
              <h3>Registro por Mensagem</h3>
              <p>
                Mande &quot;gastei 50 no mercado&quot; e pronto. O FinBot entende sua
                mensagem, categoriza o gasto e registra tudo automaticamente.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">📊</div>
              <h3>Relatórios Diários Automáticos</h3>
              <p>
                Todo dia você recebe um resumo completo: quanto gastou, em quais
                categorias, e quanto ainda resta do seu orçamento mensal.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">🧠</div>
              <h3>Inteligência Artificial</h3>
              <p>
                Powered by IA avançada, o FinBot entende contexto, categoriza
                seus gastos de forma inteligente e responde suas dúvidas
                financeiras.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">📂</div>
              <h3>Categorias Inteligentes</h3>
              <p>
                Alimentação, transporte, saúde, lazer, investimentos, fundo de
                emergência — o bot organiza tudo automaticamente em categorias.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">⚡</div>
              <h3>Online 24/7</h3>
              <p>
                O FinBot nunca dorme. Registre gastos às 3h da manhã, no
                domingo, ou no feriado. Ele está sempre pronto para te ajudar.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">🔒</div>
              <h3>Seguro e Privado</h3>
              <p>
                Seus dados financeiros são criptografados e protegidos. Nenhum
                dado é compartilhado com terceiros. Sua privacidade é
                prioridade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ======================== */}
      <section className="steps-section section" id="como-funciona">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">🎯 Como Funciona</div>
            <h2 className="section-title">
              Comece em <span className="text-gradient">3 passos</span>{" "}
              simples
            </h2>
            <p className="section-subtitle">
              Sem burocracia. Em menos de 2 minutos você já está com o FinBot
              funcionando no seu WhatsApp.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Escolha seu plano</h3>
              <p>
                Selecione o plano que melhor se encaixa para você. Pagamento
                rápido e seguro pelo Mercado Pago.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Salve o número</h3>
              <p>
                Após o pagamento, você recebe o número do FinBot. Adicione no
                WhatsApp e mande um &quot;Oi&quot;.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Comece a usar!</h3>
              <p>
                Pronto! Agora é só mandar seus gastos e receitas. O FinBot
                cuida de todo o resto para você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== DEMO ======================== */}
      <section className="demo-section section" id="demonstracao">
        <div className="container">
          <div className="demo-grid">
            <div className="demo-content">
              <div className="section-eyebrow">📱 Veja na Prática</div>
              <h2>
                Relatórios detalhados{" "}
                <span className="text-gradient">todo dia</span> no seu
                WhatsApp
              </h2>
              <p>
                Chega de surpresas no fim do mês. O FinBot te envia um resumo
                completo todos os dias, mostrando exatamente para onde seu
                dinheiro está indo.
              </p>
              <ul className="demo-checklist">
                <li>
                  <span className="demo-check">✓</span>
                  Resumo de gastos por categoria
                </li>
                <li>
                  <span className="demo-check">✓</span>
                  Comparativo com o orçamento mensal
                </li>
                <li>
                  <span className="demo-check">✓</span>
                  Alertas quando estiver gastando demais
                </li>
                <li>
                  <span className="demo-check">✓</span>
                  Rastreamento de receitas e investimentos
                </li>
                <li>
                  <span className="demo-check">✓</span>
                  Suporte com IA para tirar dúvidas
                </li>
              </ul>
              <a href="#precos" className="btn btn-primary" id="demo-cta">
                Quero receber meus relatórios →
              </a>
            </div>
            <div className="demo-visual">
              <Image
                src="/mockup-report.png"
                alt="Relatório financeiro diário enviado pelo FinBot no WhatsApp"
                width={380}
                height={760}
                className="demo-mockup"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================== PRICING ======================== */}
      <section className="pricing-section section" id="precos">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">💰 Planos</div>
            <h2 className="section-title">
              Invista em você por{" "}
              <span className="text-gradient">menos de R$1 por dia</span>
            </h2>
            <p className="section-subtitle">
              Quanto dinheiro você perde por mês sem controle? O FinBot se paga
              sozinho quando você começa a economizar.
            </p>
          </div>

          <div className="pricing-launch-banner">
            <p>
              🔥 <strong>Oferta de Lançamento:</strong> As primeiras 50
              assinaturas garantem acesso{" "}
              <strong>VITALÍCIO por apenas R$60</strong>. Sem mensalidade.
              Para sempre.
            </p>
            <button
              className="btn btn-gold"
              style={{ marginTop: "16px" }}
              onClick={() => handleCheckout("launch")}
              disabled={loadingPlan === "launch"}
              id="btn-plan-launch"
            >
              {loadingPlan === "launch" ? "Processando..." : "🔥 Garantir Acesso Vitalício — R$60"}
            </button>
          </div>

          <div className="pricing-grid">
            {/* Mensal */}
            <div className="pricing-card" id="plan-monthly">
              <div className="pricing-plan-name">Mensal</div>
              <div className="pricing-price">
                <span className="pricing-currency">R$</span>
                <span className="pricing-amount">19</span>
                <span className="pricing-currency">,90</span>
              </div>
              <div className="pricing-period">/mês</div>
              <div className="pricing-total">&nbsp;</div>
              <div className="pricing-divider"></div>
              <ul className="pricing-features">
                <li>Registro ilimitado de gastos</li>
                <li>Relatórios diários automáticos</li>
                <li>Categorização inteligente com IA</li>
                <li>Suporte via WhatsApp</li>
                <li>Cancele quando quiser</li>
              </ul>
              <button
                className="btn btn-secondary"
                id="btn-plan-monthly"
                onClick={() => handleCheckout("monthly")}
                disabled={loadingPlan === "monthly"}
              >
                {loadingPlan === "monthly" ? "Processando..." : "Assinar Mensal"}
              </button>
            </div>

            {/* Trimestral */}
            <div className="pricing-card featured" id="plan-quarterly">
              <div className="pricing-popular-badge">Mais Popular</div>
              <div className="pricing-plan-name">Trimestral</div>
              <div className="pricing-price">
                <span className="pricing-currency">R$</span>
                <span className="pricing-amount">17</span>
                <span className="pricing-currency">,90</span>
              </div>
              <div className="pricing-period">/mês</div>
              <div className="pricing-total">R$ 53,70 cobrados a cada 3 meses</div>
              <div className="pricing-discount">Economize 10%</div>
              <div className="pricing-divider"></div>
              <ul className="pricing-features">
                <li>Tudo do plano Mensal</li>
                <li>Relatórios diários automáticos</li>
                <li>Categorização inteligente com IA</li>
                <li>Suporte prioritário</li>
                <li>Economia garantida</li>
              </ul>
              <button
                className="btn btn-gold"
                id="btn-plan-quarterly"
                onClick={() => handleCheckout("quarterly")}
                disabled={loadingPlan === "quarterly"}
              >
                {loadingPlan === "quarterly" ? "Processando..." : "Assinar Trimestral"}
              </button>
            </div>

            {/* Anual */}
            <div className="pricing-card" id="plan-annual">
              <div className="pricing-plan-name">Anual</div>
              <div className="pricing-price">
                <span className="pricing-currency">R$</span>
                <span className="pricing-amount">25</span>
                <span className="pricing-currency">,00</span>
              </div>
              <div className="pricing-period">/mês</div>
              <div className="pricing-total">R$ 300,00 cobrados anualmente</div>
              <div className="pricing-divider"></div>
              <ul className="pricing-features">
                <li>Tudo do plano Trimestral</li>
                <li>Relatórios diários automáticos</li>
                <li>Categorização inteligente com IA</li>
                <li>Suporte VIP</li>
                <li>Acesso a novos recursos primeiro</li>
              </ul>
              <button
                className="btn btn-secondary"
                id="btn-plan-annual"
                onClick={() => handleCheckout("annual")}
                disabled={loadingPlan === "annual"}
              >
                {loadingPlan === "annual" ? "Processando..." : "Assinar Anual"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== FAQ ======================== */}
      <section className="faq-section section" id="faq">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">❓ Perguntas Frequentes</div>
            <h2 className="section-title">
              Tire suas <span className="text-gradient">dúvidas</span>
            </h2>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? "open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  id={`faq-toggle-${index}`}
                  aria-expanded={openFaq === index}
                >
                  {faq.question}
                  <span className="faq-arrow">▼</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-content">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FINAL CTA ======================== */}
      <section className="cta-section" id="cta-final">
        <div className="container">
          <h2 className="cta-title">
            Pronto para ter o{" "}
            <span className="text-gradient">controle total</span> das suas
            finanças?
          </h2>
          <p className="cta-subtitle">
            Junte-se ao FinBot e transforme a forma como você lida com
            dinheiro. Simples, rápido e direto no WhatsApp.
          </p>
          <div className="cta-buttons">
            <a href="#precos" className="btn btn-gold btn-lg" id="cta-final-pricing">
              💰 Ver Planos e Preços
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_SUPPORT_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5500000000000"}?text=Quero%20saber%20mais%20sobre%20o%20FinBot`}
              className="btn btn-whatsapp btn-lg"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-final-whatsapp"
            >
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ======================== FOOTER ======================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Image
                src="/logo-icon.png"
                alt="FinBot"
                width={28}
                height={28}
                style={{ borderRadius: "6px" }}
              />
              <span>Fin</span>Bot
            </div>
            <p className="footer-copy">
              © 2026 FinBot. Todos os direitos reservados.
            </p>
            <ul className="footer-links">
              <li>
                <a href="#">Termos de Uso</a>
              </li>
              <li>
                <a href="#">Privacidade</a>
              </li>
              <li>
                <a href="#">Contato</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
