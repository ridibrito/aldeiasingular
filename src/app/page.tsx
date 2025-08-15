"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const BRAND_PRIMARY = "#5E2A84"; // roxo principal para ícones/CTAs
const HOTMART_LINK = process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL || "https://pay.hotmart.com/D101364302K?checkoutMode=2";

type Testimonial = {
  name?: string;
  location?: string;
  quote: string;
};

function OwlIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2c-2.8 0-5.2 1.6-6.3 4C3.1 6.2 1.5 8 1.5 10.2c0 2.6 2.1 4.8 4.8 4.8.8 0 1.6-.2 2.3-.6 1 1 2.4 1.6 3.9 1.6s2.9-.6 3.9-1.6c.7.4 1.5.6 2.3.6 2.6 0 4.8-2.1 4.8-4.8 0-2.2-1.6-4-3.9-4.2C17.2 3.6 14.8 2 12 2Zm-3.5 8.2c0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6Zm5.8 0c0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6Z"/>
      <path d="M6.6 16.4c1.5 1.1 3.4 1.8 5.4 1.8s4-.7 5.4-1.8c.4-.3 1-.2 1.3.2.3.4.2 1-.2 1.3-1.8 1.3-4.1 2.1-6.5 2.1s-4.7-.8-6.5-2.1c-.4-.3-.5-.9-.2-1.3.3-.4.9-.5 1.3-.2Z"/>
    </svg>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

function ArrowRight({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 4l1.41 1.41L9.83 9H20v2H9.83l3.58 3.59L12 16l-6-6 6-6z" />
    </svg>
  );
}

function PrimaryButton({ href, children, onClick, hotmart = false, variant = "primary" }: { href?: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void; hotmart?: boolean; variant?: "primary" | "whatsapp" }) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-semibold shadow-sm transition-colors";
  const palette =
    variant === "whatsapp"
      ? " bg-[#25D366] hover:bg-[#1EBE5B]"
      : " bg-[#5E2A84] hover:bg-[#4b216a]";
  const className = base + palette;
  if (href) {
    return (
      <a
        href={href}
        className={`${className}${hotmart ? " hotmart-fb hotmart__button-checkout" : ""}`}
        onClick={(e) => {
          if (hotmart) e.preventDefault();
          onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

function SecondaryButton({ href, children, hotmart = false }: { href?: string; children: React.ReactNode; hotmart?: boolean }) {
  const className =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 border border-[#5E2A84] text-[#5E2A84] font-semibold transition-colors hover:bg-[#F3E8FF]";
  if (href)
    return (
      <a
        href={href}
        className={`${className}${hotmart ? " hotmart-fb hotmart__button-checkout" : ""}`}
        onClick={(e) => {
          if (hotmart) e.preventDefault();
        }}
      >
        {children}
      </a>
    );
  return <button type="button" className={className}>{children}</button>;
}

// formulário removido conforme solicitação

function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  const total = items.length;
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const current = items[index];
  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-lg leading-relaxed">“{current.quote}”</p>
        <p className="mt-3 text-sm text-black/60">
          {current.name ? current.name : "Membro"}
          {current.location ? `, ${current.location}` : ""}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir para depoimento ${i + 1}`}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-[#5E2A84] w-6" : "bg-black/20"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const checkoutUrl = HOTMART_LINK;
  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        quote:
          "Desde que entrei na Aldeia Singular, nunca mais me senti sozinha nessa jornada.",
        name: "Ana Paula, mãe do Lucas (7 anos)",
        location: "PR",
      },
      {
        quote:
          "O acolhimento e a clareza nos encontros mudaram nossa rotina em casa.",
        name: "Rogério",
        location: "SP",
      },
      {
        quote: "Encontramos direção e uma rede que entende nossas dores e alegrias.",
        name: "Juliana",
        location: "MG",
      },
    ],
    []
  );

  return (
    <div className="font-sans">
      {/* Navegação simples */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-black/5">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Image src="/ione.jpg" alt="Logomarca Aldeia Singular" width={28} height={28} className="rounded-full" />
            <span className="font-semibold">Aldeia Singular</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#sobre" className="hover:opacity-80">Sobre</a>
            <a href="#como" className="hover:opacity-80">Como funciona</a>
            <a href="#beneficios" className="hover:opacity-80">Benefícios</a>
            <a href="#depoimentos" className="hover:opacity-80">Depoimentos</a>
            <a href="#aldeias" className="hover:opacity-80">Aldeias</a>
          </nav>
          <PrimaryButton href={HOTMART_LINK} hotmart>
            Quero fazer parte <ArrowRight />
          </PrimaryButton>
        </div>
      </header>

      {/* Hero em tela cheia */}
      <section id="inicio" className="relative min-h-[100svh] flex items-center">
        <Image
          src="/hero.JPG"
          alt="Famílias reunidas na comunidade Aldeia Singular"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="container relative">
          <div className="max-w-2xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
              <OwlIcon className="w-4 h-4" />
              Maior comunidade brasileira de mães e pais de filhos com AHSD
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Cuidar de quem cuida: a aldeia que caminha com você.
            </h1>
            <p className="text-lg text-white/90">
              Apoio, clareza e pertencimento para mães e pais de crianças com Altas
              Habilidades e Superdotação.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton href={HOTMART_LINK} hotmart>
                Quero fazer parte
              </PrimaryButton>
              <SecondaryButton href="#beneficios">Ver benefícios</SecondaryButton>
            </div>
            {/* sem captura de e-mail na página */}
          </div>
        </div>
      </section>

      {/* Sobre a Comunidade */}
      <section id="sobre" className="section bg-[#FAFAFA]">
        <div className="container grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">O que é a Aldeia Singular?</h2>
            <p className="text-black/70">
              Cuidar de uma criança com AHSD é um presente e um desafio. A Aldeia Singular
              nasceu para que ninguém precise caminhar sozinho.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Encontros online e presenciais.", "Trilha de desenvolvimento.", "Apoio emocional.", "Rede de famílias que vivem os mesmos desafios."].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 p-6 bg-white">
            <div className="flex items-center gap-3">
              <OwlIcon />
              <h3 className="text-xl font-semibold">Proposta de Valor</h3>
            </div>
            <p className="mt-3 text-black/80">
              “Pais acolhidos. Filhos respeitados. Lares fortalecidos.” A maior comunidade
              brasileira de mães e pais de crianças com AHSD, oferecendo apoio, direção e
              pertencimento para transformar vidas.
            </p>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como" className="section">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Entre na comunidade",
                desc: "Acesso imediato ao grupo exclusivo.",
              },
              {
                title: "Participe da sua Aldeia",
                desc: "Pequenos grupos regionais e por fase de vida.",
              },
              {
                title: "Cresça com apoio",
                desc: "Conteúdo, encontros e orientação constante.",
              },
            ].map((card, i) => (
              <div key={i} className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "#F3E8FF" }}>
                    <span className="font-semibold" style={{ color: BRAND_PRIMARY }}>{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <p className="mt-3 text-black/70">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <SecondaryButton href={HOTMART_LINK} hotmart>Garanta sua vaga agora</SecondaryButton>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="section bg-[#FAFAFA]">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">O que você encontra na Aldeia Singular</h2>
          <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Acolhimento e escuta ativa.",
                "Direcionamento nas decisões e desafios.",
                "Pertencimento e rede de apoio.",
                "Troca com famílias que vivem as mesmas dores e alegrias.",
                "Clareza sobre o desenvolvimento do seu filho.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{t}</span>
          </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="section">
        <div className="container flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Depoimentos</h2>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* Sobre as Aldeias */}
      <section id="aldeias" className="section bg-[#FAFAFA]">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Como organizamos nossa comunidade</h2>
            <p className="mt-4 text-black/70">
              Cada grupo local é uma Aldeia, guiada por um Guardião que inspira, direciona e acolhe.
              Conectamos famílias por região, fase de vida e afinidade.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              {["Norte", "Sudeste", "Sul", "Centro-Oeste", "Nordeste", "Exterior"].map((r) => (
                <div key={r} className="rounded-lg border border-black/10 p-4">
                  <OwlIcon className="mx-auto" />
                  <p className="mt-2 text-sm font-medium">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <section id="checkout" className="section">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Sua jornada não precisa ser solitária</h2>
            <p className="mt-3 text-black/70">
              Entre hoje na Aldeia Singular e descubra a força de caminhar junto.
            </p>
            <p className="mt-2 text-sm text-black/60">+XX famílias já fazem parte</p>
            <div className="mt-6 flex gap-3">
              <PrimaryButton href={HOTMART_LINK} hotmart>
                Quero entrar agora
              </PrimaryButton>
              <SecondaryButton href="#depoimentos">Ver histórias</SecondaryButton>
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h3 className="text-lg font-semibold">Assinatura da Comunidade</h3>
            <p className="mt-2 text-black/70">Acesso imediato, encontros regulares e rede de apoio.</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Grupo exclusivo com moderação",
                "Encontros online semanais",
                "Aldeias regionais e por fase de vida",
                "Trilha de desenvolvimento contínua",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{t}</span>
          </li>
              ))}
            </ul>
            <div className="mt-6">
              <PrimaryButton href={HOTMART_LINK} hotmart variant="whatsapp">Ir para o checkout</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5">
        <div className="container py-8 text-sm text-black/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <OwlIcon className="w-5 h-5" />
            <span>Aldeia Singular</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#inicio" className="hover:opacity-80">Início</a>
            <a href="#sobre" className="hover:opacity-80">Sobre</a>
            <a href="#beneficios" className="hover:opacity-80">Benefícios</a>
            <a href="#checkout" className="hover:opacity-80">Assinar</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
