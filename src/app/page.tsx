"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";

// Cores conforme especificado no PRD
const BRAND_PRIMARY = "#f05046"; // Cor principal dos botões
const BRAND_SECONDARY = "#f9b214"; // Cor de destaque
const BACKGROUND_COLOR = "#f3e9e9"; // Cor de fundo do site

const HOTMART_LINK = "https://pay.hotmart.com/D101364302K?checkoutMode=2";



type FAQ = {
  question: string;
  answer: string;
};

function HeartIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function UsersIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.99 2.5V20h-2v-8.5L10.01 9A2.01 2.01 0 0 0 8 8H6.46c-.8 0-1.54.37-2.01 1L1.5 16.5H4v6h16z"/>
    </svg>
  );
}

function HomeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );
}

function VideoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
  );
}

function BookIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
    </svg>
  );
}

function ToolsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>
  );
}

function GroupIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  );
}

function LibraryIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={BRAND_PRIMARY}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
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

function PrimaryButton({ href, children, onClick, hotmart = false, variant = "primary", target }: { href?: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void; hotmart?: boolean; variant?: "primary" | "whatsapp"; target?: React.HTMLAttributeAnchorTarget }) {
  const base = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-semibold shadow-sm btn-hover";
  const palette = variant === "whatsapp" 
    ? " bg-[#25D366] hover:bg-[#1EBE5B]" 
    : " bg-[#f05046] hover:bg-[#d93d33] border-2 border-[#f9b214]";
  const className = base + palette;
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={`${className}${hotmart ? " hotmart-fb hotmart__button-checkout" : ""}`}
        onClick={onClick}
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
  const className = "inline-flex items-center gap-2 rounded-full px-6 py-3 border-2 border-[#f9b214] text-[#f9b214] font-semibold btn-hover hover:bg-[#f9b214] hover:text-white";
  
  if (href)
    return (
      <a
        href={href}
        className={`${className}${hotmart ? " hotmart-fb hotmart__button-checkout" : ""}`}
      >
        {children}
      </a>
    );
  return <button type="button" className={className}>{children}</button>;
}

function FAQAccordion({ items }: { items: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-[#f05046] rounded-lg card-hover">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#f05046]/5 transition-all duration-300"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-semibold text-[#43085e]">{item.question}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-[#43085e] animate-slide-in">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}



export default function Home() {

  
  // Hook para animações de scroll
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);
  


  const faqs: FAQ[] = useMemo(
    () => [
      {
        question: "A Aldeia Singular substitui a avaliação de identificação de AHSD?",
        answer: "Não. A Aldeia Singular é uma comunidade de apoio e desenvolvimento para pais de crianças com AHSD. Para identificação formal, recomendamos buscar profissionais especializados."
      },
      {
        question: "Terei acesso a consultas clínicas em grupo ou individualizadas?",
        answer: "Oferecemos plantões de dúvidas com especialistas duas vezes por mês, além de encontros mensais com mediação da PhD Ângela Virgolim. Não substituímos consultas individuais."
      },
      {
        question: "Com a Aldeia Singular não precisarei procurar nenhum outro especialista?",
        answer: "A Aldeia Singular complementa o trabalho de especialistas. Recomendamos sempre o acompanhamento profissional adequado para cada caso específico."
      },
      {
        question: "Quantos dias eu tenho de garantia?",
        answer: "Oferecemos 7 dias de garantia incondicional. Se não estiver satisfeito, devolvemos 100% do valor investido."
      },
      {
        question: "Como funcionam os grupos locais?",
        answer: "Os grupos são organizados por região e gênero, com aproximadamente 30 membros cada. Facilitam encontros presenciais e trocas locais."
      },
      {
        question: "Qual a frequência dos encontros online?",
        answer: "Realizamos encontros mensais ao vivo com especialistas e plantões de dúvidas duas vezes por mês, além de conteúdo assíncrono disponível 24/7."
      },
      {
        question: "O conteúdo é adequado para todas as idades das crianças?",
        answer: "Sim, abordamos temas relevantes para pais de crianças com AHSD em diferentes fases do desenvolvimento, desde a primeira infância até a adolescência."
      },
      {
        question: "Posso cancelar minha assinatura a qualquer momento?",
        answer: "Sim, você pode cancelar sua assinatura a qualquer momento através da plataforma Hotmart."
      },
      {
        question: "Há material específico para lidar com a escola?",
        answer: "Sim, oferecemos ferramentas e estratégias práticas para mediação escolar, incluindo roteiros de conversa e orientações sobre planos pedagógicos."
      },
      {
        question: "Como posso interagir com outros membros?",
        answer: "Através dos grupos locais, encontros online e nossa comunidade digital, você pode trocar experiências e se conectar com outros pais."
      },
      {
        question: "O conteúdo é baseado em evidências científicas?",
        answer: "Sim, todo o conteúdo é desenvolvido com base em pesquisas científicas e experiência clínica da PhD Ângela Virgolim e especialistas convidados."
      },
      {
        question: "Há suporte para casos de dupla excepcionalidade?",
        answer: "Sim, abordamos especificamente a dupla excepcionalidade em nossas trilhas de conhecimento e encontros com especialistas."
      },
      {
        question: "Posso acessar o conteúdo no meu tempo?",
        answer: "Sim, a maior parte do conteúdo é assíncrona, permitindo que você se desenvolva no seu próprio ritmo."
      },
      {
        question: "Há ferramentas para gestão emocional dos pais?",
        answer: "Sim, oferecemos protocolos específicos para combate ao medo, dependência emocional, proteção emocional e combate à culpa."
      },
      {
        question: "Como funciona o acervo digital?",
        answer: "O acervo inclui cursos, livros, vídeos, artigos e ferramentas curadas pela PhD Ângela Virgolim, disponíveis 24/7."
      },
      {
        question: "Há encontros presenciais?",
        answer: "Os grupos locais facilitam encontros presenciais regionais, além dos encontros online regulares."
      },
      {
        question: "O conteúdo é atualizado regularmente?",
        answer: "Sim, constantemente atualizamos nosso acervo com as mais recentes pesquisas e descobertas sobre AHSD."
      },
      {
        question: "Há suporte para famílias com múltiplos filhos com AHSD?",
        answer: "Sim, abordamos estratégias específicas para famílias com múltiplos filhos com características de AHSD."
      },
      {
        question: "Como posso tirar dúvidas específicas?",
        answer: "Através dos plantões mensais com especialistas, grupos locais e nossa comunidade digital."
      },
      {
        question: "Há material sobre legislação e direitos?",
        answer: "Sim, incluímos informações sobre legislação vigente sobre AH/SD e orientações sobre direitos educacionais."
      }
    ],
    []
  );

  return (
    <div className="font-sans" style={{ backgroundColor: BACKGROUND_COLOR }}>
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[100svh] flex items-center">
        <Image
          src="/hero.JPG"
          alt="Famílias reunidas na comunidade Aldeia Singular"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative px-4 py-8 sm:py-12 md:py-16">
          <div className="max-w-2xl space-y-4 sm:space-y-6 text-white">
            <div className="flex items-center gap-3 animate-fade-in-up">
              <Image src="/ione.jpg" alt="Logo Aldeia Singular" width={48} height={48} className="rounded-full animate-pulse-slow w-12 h-12 sm:w-12 sm:h-12" />
              <span className="text-lg sm:text-xl font-bold">Aldeia Singular</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in-up" style={{ color: BRAND_SECONDARY }}>
              Pais acolhidos.<br />
              Filhos compreendidos.<br />
              Lares fortalecidos.
            </h1>
            <p className="text-base sm:text-lg text-white/90 animate-fade-in-up leading-relaxed">
              Maior comunidade brasileira de mães e pais de filhos com AHSD, oferecendo apoio, direção e pertencimento para transformar vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up pt-2">
              <PrimaryButton href={HOTMART_LINK} hotmart target="_blank">
                Quero fazer parte <ArrowRight />
              </PrimaryButton>
              <SecondaryButton href="#video">
                Assistir vídeo
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 02 - Benefícios */}
      <section 
        id="beneficios" 
        className="section"
        ref={(el) => {
          sectionRefs.current.beneficios = el;
        }}
      >
        <div className="container">
          <div className={`text-center mb-8 sm:mb-12 ${isVisible.beneficios ? 'animate-fade-in-up' : 'section-enter'}`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 px-4" style={{ color: BRAND_SECONDARY }}>
              Quando você fortalece quem cuida, você transforma o mundo de quem é cuidado.
            </h2>
            <p className="text-base sm:text-lg text-[#43085e] max-w-3xl mx-auto px-4">
              Acreditamos na força da comunidade como um espaço seguro e transformador para quem cuida de crianças com AHSD, promovendo empoderamento parental, desenvolvimento infantil saudável e bem-estar familiar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className={`text-center card-hover p-4 sm:p-6 rounded-2xl ${isVisible.beneficios ? 'animate-fade-in-left' : ''}`}>
              <div className="flex justify-center mb-3 sm:mb-4">
                <HeartIcon className="w-6 h-6 icon-hover" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: BRAND_SECONDARY }}>Pais acolhidos</h3>
              <p className="text-sm sm:text-base text-[#43085e] leading-relaxed">
                Na Aldeia Singular as mães e os pais são acolhidos em um senso de comunidade genuíno. Aprenda com especialistas e com outros pais que passam pelo mesmo, recebendo informações confiáveis e validadas sobre AHSD.
              </p>
            </div>
            
            <div className={`text-center card-hover p-4 sm:p-6 rounded-2xl ${isVisible.beneficios ? 'animate-fade-in-up' : ''}`}>
              <div className="flex justify-center mb-3 sm:mb-4">
                <UsersIcon className="w-6 h-6 icon-hover" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: BRAND_SECONDARY }}>Filhos compreendidos</h3>
              <p className="text-sm sm:text-base text-[#43085e] leading-relaxed">
                Compreenda e ajude seus filhos a se desenvolverem de forma saudável e equilibrada. Pais mais preparados para lidar com escola, médicos e outros cuidadores, criando ambientes enriquecedores.
              </p>
            </div>
            
            <div className={`text-center card-hover p-4 sm:p-6 rounded-2xl ${isVisible.beneficios ? 'animate-fade-in-right' : ''}`}>
              <div className="flex justify-center mb-3 sm:mb-4">
                <HomeIcon className="w-6 h-6 icon-hover" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: BRAND_SECONDARY }}>Lares fortalecidos</h3>
              <p className="text-sm sm:text-base text-[#43085e] leading-relaxed">
                Lares emocionalmente mais estáveis e fortalecidos, com momentos de autocuidado e crescimento pessoal. Cuide de si mesmo sem culpa, com clareza e segurança sobre como agir em situações desafiadoras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 03 - Como Funciona */}
      <section 
        id="como" 
        className="section" 
        style={{ backgroundColor: 'white' }}
        ref={(el) => {
          sectionRefs.current.como = el;
        }}
      >
        <div className="container">
          <div className={`text-center mb-12 ${isVisible.como ? 'animate-fade-in-up' : 'section-enter'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: BRAND_SECONDARY }}>
              Uma comunidade completa para mães e pais de AHSD
            </h2>
            <p className="text-lg text-[#43085e] max-w-4xl mx-auto">
              Com conteúdo, encontros e orientação constante. Um lugar que cuida de quem cuida, pra quem busca acolhimento, conhecimento, transformação e conexão.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`rounded-2xl border-2 border-[#f05046] bg-white/80 backdrop-blur p-6 card-hover ${isVisible.como ? 'animate-fade-in-left' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <VideoIcon className="w-6 h-6 icon-hover" />
                <h3 className="text-lg font-bold" style={{ color: BRAND_SECONDARY }}>Encontros mensais ao vivo online</h3>
              </div>
              <p className="text-[#43085e]">
                Roda de Conversa ao vivo online com mediação da PhD Ângela Virgolim e participação de especialistas convidados, com objetivo de ampliar a visão dos pais sobre temas essenciais ligados às Altas Habilidades e Superdotação, bem-estar familiar, cuidados parentais, autocuidado e desenvolvimento pessoal.
              </p>
            </div>
            
            <div className={`rounded-2xl border-2 border-[#f05046] bg-white/80 backdrop-blur p-6 card-hover ${isVisible.como ? 'animate-fade-in-up' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <UsersIcon className="w-6 h-6 icon-hover" />
                <h3 className="text-lg font-bold" style={{ color: BRAND_SECONDARY }}>Plantões de dúvidas com especialistas</h3>
              </div>
              <p className="text-[#43085e]">
                Duas vezes por mês os membros da Aldeia Singular terão encontros temáticos com especialistas nas áreas de psicologia, neuropsicologia, pedagogia, neuropedagogia e outros profissionais. Com o objetivo de oferecer suporte direto, técnico e emocional aos pais, com base em dúvidas reais previamente mapeadas.
              </p>
            </div>
            
            <div className={`rounded-2xl border-2 border-[#f05046] bg-white/80 backdrop-blur p-6 card-hover ${isVisible.como ? 'animate-fade-in-right' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <BookIcon className="w-6 h-6 icon-hover" />
                <h3 className="text-lg font-bold" style={{ color: BRAND_SECONDARY }}>Trilhas de conhecimento</h3>
              </div>
              <p className="text-[#43085e]">
                Na Aldeia Singular, chamamos nossas trilhas de conhecimento como a Montanha do Amanhã. Nela iremos desbravar o universo das Altas Habilidades e Superdotação em uma jornada progressiva de aprendizado para conhecer e lidar com as necessidades e características únicas dos seus filhos.
              </p>
            </div>
            
            <div className={`rounded-2xl border-2 border-[#f05046] bg-white/80 backdrop-blur p-6 card-hover ${isVisible.como ? 'animate-fade-in-left' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <ToolsIcon className="w-6 h-6 icon-hover" />
                <h3 className="text-lg font-bold" style={{ color: BRAND_SECONDARY }}>Ferramentas e Estratégias Práticas</h3>
              </div>
              <p className="text-[#43085e]">
                Acesso à ferramentas, protocolos e estratégias práticas para que você atue com segurança, empatia e conhecimento no dia a dia com os seus filhos. Guias de identificação, roteiros de enriquecimento, planilhas de rotina e protocolos de manejo de crise emocional.
              </p>
            </div>
            
            <div className={`rounded-2xl border-2 border-[#f05046] bg-white/80 backdrop-blur p-6 card-hover ${isVisible.como ? 'animate-fade-in-up' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <GroupIcon className="w-6 h-6 icon-hover" />
                <h3 className="text-lg font-bold" style={{ color: BRAND_SECONDARY }}>Grupos Locais</h3>
              </div>
              <p className="text-[#43085e]">
                Cada grupo local é uma Aldeia, com aproximadamente 30 membros separados por gênero (grupo de mães e grupo de pais), cidade ou região. Um espaço seguro e transformador para trocas de experiências com outros pais que passam pelo mesmo.
              </p>
            </div>
            
            <div className={`rounded-2xl border-2 border-[#f05046] bg-white/80 backdrop-blur p-6 card-hover ${isVisible.como ? 'animate-fade-in-right' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <LibraryIcon className="w-6 h-6 icon-hover" />
                <h3 className="text-lg font-bold" style={{ color: BRAND_SECONDARY }}>Acervo Digital</h3>
              </div>
              <p className="text-[#43085e]">
                Curadoria de cursos, livros, vídeos e ferramentas. Acesso contínuo e organizado ao referencial teórico da PhD Ângela Virgolim, bem como a conteúdos como artigos, cursos, palestras e lives exclusivas, e-books e muito mais.
              </p>
            </div>
          </div>
          
          <div className={`text-center mt-12 ${isVisible.como ? 'animate-slide-in' : ''}`}>
            <PrimaryButton href={HOTMART_LINK} hotmart target="_blank">
              Entrar para a comunidade <ArrowRight />
            </PrimaryButton>
          </div>
        </div>
      </section>



      {/* Seção 05 - Pra quem é */}
      <section 
        id="publico" 
        className="section" 
        style={{ backgroundColor: 'white' }}
        ref={(el) => {
          sectionRefs.current.publico = el;
        }}
      >
        <div className="container">
          <div className={`text-center mb-8 ${isVisible.publico ? 'animate-fade-in-up' : 'section-enter'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: BRAND_SECONDARY }}>
              Pra quem é a Aldeia Singular
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Você que acha que grupos de whatsapp/telegram grandes mais atrapalham do que ajudam",
              "Mães e Pais que acreditam que cursos de AHSD não são suficientes",
              "Pra quem busca um conhecimento sólido e com base científica única para cuidar do seu filho",
              "Para quem não tem acesso financeiro suficiente para investir em conhecimento e consultas",
              "Pais que buscam pertencimento e rede de apoio local",
              "Compreender sobre AHSD com fundamentos e referencial teórico",
              "Quem busca acolhimento e escuta ativa sem julgamentos",
              "Famílias que precisam de direcionamento nas decisões e desafios",
              "Pais que querem trocar experiências com quem vive as mesmas dores e alegrias",
              "Quem busca clareza sobre o desenvolvimento do seu filho",
              "Mães e pais que se sentem sozinhos e incompreendidos",
              "Famílias que precisam reduzir a sobrecarga emocional e estresse"
            ].map((item, index) => (
              <div 
                key={index} 
                className={`rounded-2xl border-2 border-[#f05046] bg-white/80 backdrop-blur p-6 card-hover ${
                  isVisible.publico ? `animate-fade-in-${index % 3 === 0 ? 'left' : index % 3 === 1 ? 'up' : 'right'}` : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 icon-hover" />
                  <p className="text-[#43085e] font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 06 - Ângela Virgolim */}
      <section 
        id="angela" 
        className="section"
        ref={(el) => {
          sectionRefs.current.angela = el;
        }}
      >
        <div className="container">
          <div className={`text-center mb-8 ${isVisible.angela ? 'animate-fade-in-up' : 'section-enter'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: BRAND_SECONDARY }}>
              A mente por trás da Aldeia Singular
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className={`text-center ${isVisible.angela ? 'animate-fade-in-left' : ''}`}>
              <Image 
                src="/angela_site.png" 
                alt="PhD Ângela Virgolim" 
                width={800} 
                height={800} 
                className="rounded-lg"
              />
            </div>
            
            <div className={`space-y-6 ${isVisible.angela ? 'animate-fade-in-right' : ''}`}>
              <blockquote className="text-lg italic text-[#43085e] border-l-4 border-[#f05046] pl-6">
                &ldquo;Nos meus últimos 30 anos formei mais de 500 profissionais para atuarem em AHSD, acolhi mais de 2000 famílias com os mais variados desafios. Porém, nos últimos anos muitos pais me afirmaram que cursos não eram suficientes, que existem muitos e nem todos são confiáveis. Ter acesso a profissionais especializados é caro e muitas vezes o que eles precisam é apoio, suporte e uma base conhecimento de referência. Foi escutando por anos e entendendo as dores de cada um desses pais que eu acolhi, que resolvi não só atuar na formação de profissionais, mas também de construir algo que pudesse mudar a vida das famílias, com um olhar direcionado a cuidar de quem cuida.&rdquo;
              </blockquote>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold" style={{ color: BRAND_SECONDARY }}>Angela Virgolim</h3>
                <p className="text-[#43085e]">
                  Psicóloga, PhD em Psicologia Educacional pela University of Connecticut, especializando-se em Psicologia da Superdotação pelo Renzulli Center for Creativity, Gifted Education, and Talent Development.
                </p>
                <ul className="space-y-2 text-sm text-[#43085e]">
                  <li>• Idealizadora e CEO do Instituto Virgolim</li>
                  <li>• Ex-Presidente do Conselho Brasileiro para Superdotação</li>
                  <li>• Professora aposentada da Universidade de Brasília</li>
                  <li>• Autora de mais de 50 publicações sobre AHSD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section 
        id="faq" 
        className="section" 
        style={{ backgroundColor: 'white' }}
        ref={(el) => {
          sectionRefs.current.faq = el;
        }}
      >
        <div className="container">
          <div className={`text-center mb-8 ${isVisible.faq ? 'animate-fade-in-up' : 'section-enter'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: BRAND_SECONDARY }}>
              Perguntas Frequentes
            </h2>
          </div>
          <div className={`max-w-4xl mx-auto ${isVisible.faq ? 'animate-slide-in' : ''}`}>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#f05046] py-8" style={{ backgroundColor: BACKGROUND_COLOR }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/ione.jpg" alt="Logo Aldeia Singular" width={40} height={40} className="rounded-full" />
                <span className="text-xl font-bold text-[#43085e]">Aldeia Singular</span>
              </div>
              <p className="text-[#43085e] mb-4">
                Junte-se a Aldeia Singular e vamos juntos criar a maior comunidade de mães e pais de filhos com AHSD.
              </p>
              <div className="flex gap-3">
                <PrimaryButton href={HOTMART_LINK} hotmart target="_blank">
                  Entrar na Aldeia Singular
                </PrimaryButton>
                <SecondaryButton href="https://wa.me/5511999999999">
                  Tirar dúvidas via Whatsapp
                </SecondaryButton>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-[#43085e] mb-3">Links Principais</h4>
                                 <ul className="space-y-2 text-sm text-[#43085e]">
                   <li><a href="#beneficios" className="link-hover">Benefícios</a></li>
                   <li><a href="#como" className="link-hover">Como funciona</a></li>
                   <li><a href="#publico" className="link-hover">Pra quem é</a></li>
                   <li><a href="#angela" className="link-hover">Sobre a Ângela</a></li>
                 </ul>
               </div>
               
               <div>
                 <h4 className="font-bold text-[#43085e] mb-3">Suporte</h4>
                 <ul className="space-y-2 text-sm text-[#43085e]">
                   <li><a href="#" className="link-hover">Técnico</a></li>
                   <li><a href="#" className="link-hover">Financeiro</a></li>
                   <li><a href="https://wa.me/5511999999999" className="link-hover">Dúvidas (WhatsApp)</a></li>
                   <li><a href="#" className="link-hover">Políticas</a></li>
                 </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#43085e]/20 pt-6 text-center">
            <p className="text-sm text-[#43085e]/60 mb-2">
              A Aldeia Singular não substitui as avaliações para identificação de Altas Habilidades e Superdotação e outras Neurodivergências. Somos uma comunidade de mães e pais de filhos de AHSD, que buscam desenvolvimento pessoal, educação parental e bem-estar.
            </p>
            <p className="text-sm text-[#43085e]/60">
              © 2024 Aldeia Singular. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
