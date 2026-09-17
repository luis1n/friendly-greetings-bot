import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronUp,
  HeartHandshake,
  Instagram,
  Laptop,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import heroPhoto from "../assets/sarah-hero.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarah Bastos | Nutricionista em Saúde da Mulher" },
      {
        name: "description",
        content:
          "Acompanhamento nutricional personalizado para mulheres, com foco em saúde hormonal, rotina e bem-estar.",
      },
      { property: "og:title", content: "Sarah Bastos | Nutricionista" },
      {
        property: "og:description",
        content: "Nutrição feminina com cuidado, ciência e acolhimento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/55XXXXXXXXXXX";
const INSTAGRAM_URL = "https://instagram.com/sarahbastosnutri";

const navigation = [
  ["INÍCIO", "inicio"],
  ["MÉTODO", "metodo"],
  ["FUNCIONAMENTO", "funcionamento"],
  ["NÚMEROS", "numeros"],
  ["DÚVIDAS", "duvidas"],
];

const methodSteps = [
  {
    number: "01",
    title: "Avaliação Completa Inicial",
    description: "Um olhar atento para você por inteiro, antes de qualquer plano.",
    items: ["Histórico clínico e alimentar", "Rotina e qualidade do sono", "Ciclo menstrual", "Bioimpedância"],
  },
  {
    number: "02",
    title: "Protocolo Alimentar Personalizado",
    description: "Estratégias possíveis, construídas para a sua vida real.",
    items: ["Saúde hormonal", "Alimentação adaptada à rotina", "Escolhas com autonomia", "Sem culpa ou restrições radicais"],
  },
  {
    number: "03",
    title: "Suporte Semanal Próximo",
    description: "Acompanhamento que não termina quando a consulta acaba.",
    items: ["Ajustes ao longo do processo", "Espaço para dúvidas", "Orientação prática", "Cuidado e acolhimento"],
  },
];

const faq = [
  ["Como funciona a primeira consulta?", "É um encontro aprofundado para entender seu histórico, rotina, sono, ciclo, objetivos e relação com a alimentação. A partir disso, construímos juntas um plano possível para você."],
  ["Você atende online?", "Sim. O teleatendimento oferece a mesma escuta e personalização da consulta presencial, com a praticidade de você participar de onde estiver."],
  ["Preciso de exames antes de começar?", "Não é obrigatório. Se você tiver exames recentes, eles podem ajudar na avaliação. Quando necessário, a solicitação é orientada durante a consulta."],
  ["Qual é a diferença entre consulta avulsa e plano?", "A consulta avulsa atende uma necessidade pontual. O plano contínuo inclui acompanhamento próximo, reavaliações e ajustes para sustentar sua evolução."],
  ["Você atende SOP e lipedema?", "Sim. O acompanhamento considera as necessidades específicas de mulheres com SOP e lipedema, sempre de forma individualizada e integrada ao cuidado médico."],
  ["Gestantes podem se acompanhar?", "Sim. O cuidado nutricional pode acompanhar cada fase da gestação e do pós-parto, respeitando as necessidades da mãe e do bebê."],
  ["Como funciona o suporte semanal?", "É um canal de proximidade entre as consultas para dúvidas, orientações e pequenos ajustes que ajudam você a manter o plano na rotina real."],
];

function WhatsAppButton({ label, variant = "green" }: { label: string; variant?: "green" | "light" | "pink" }) {
  const styles = {
    green: "bg-primary text-primary-foreground hover:bg-primary/90",
    light: "bg-surface text-ink hover:bg-accent hover:text-accent-foreground",
    pink: "bg-accent text-accent-foreground hover:bg-accent/90",
  };

  return (
    <Button asChild className={`h-12 rounded-full px-6 text-sm font-semibold ${styles[variant]}`}>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
        <MessageCircle aria-hidden="true" />
        {label}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const start = performance.now();
      const duration = 1300;
      const update = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{decimals ? display.toFixed(decimals) : Math.round(display)}{suffix}</span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2 font-display text-xl font-semibold text-primary" aria-label="Sarah Bastos — início">
          <Sparkles className="size-5" aria-hidden="true" /> Sarah Bastos
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {navigation.map(([label, id]) => <a key={id} href={`#${id}`} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
        </nav>
        <Button size="icon" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} className="size-11 rounded-sm lg:hidden">
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Navegação móvel">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-4 text-sm font-semibold last:border-0">
              {label}<ArrowUpRight className="size-4 text-primary" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Marquee() {
  const items = ["EMAGRECIMENTO SAUDÁVEL", "SAÚDE HORMONAL", "SOP E LIPEDEMA", "GESTAÇÃO E PÓS-PARTO"];
  return (
    <div className="overflow-hidden border-y border-border bg-muted py-5" aria-label={items.join(", ")}>
      <div className="marquee-track flex w-max items-center">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap text-sm font-semibold text-ink">
            {item}<span className="mx-8 text-accent">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section id="inicio" className="relative min-h-[calc(100svh-1rem)] overflow-hidden bg-ink pt-18 text-surface">
          <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-end gap-8 px-5 pb-8 pt-10 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pb-12 lg:pt-16">
            <div className="relative z-10 pb-2 lg:pb-10">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase text-accent"><span className="h-px w-8 bg-accent" /> Nutrição feminina</p>
              <h1 className="font-display text-[clamp(4.2rem,13vw,10rem)] font-medium leading-[.78] tracking-normal">Sarah<br />Bastos</h1>
              <div className="mt-7 flex flex-col gap-1 text-sm text-surface/70 sm:flex-row sm:gap-4">
                <span>Nutricionista CRN-11 19154</span><span className="hidden sm:inline">•</span><span>Especializada em Saúde da Mulher</span>
              </div>
              <div className="mt-8"><WhatsAppButton label="Agendar consulta" variant="light" /></div>
              <a href="#destaque" className="mt-10 inline-flex items-center gap-2 text-xs uppercase text-surface/60 transition-colors hover:text-surface">Role para baixo <ArrowDown className="size-4" /></a>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img src={heroPhoto} alt="Retrato provisório da nutricionista Sarah Bastos" className="h-full w-full object-cover grayscale" width={1200} height={1500} />
                <span className="absolute right-3 top-3 bg-surface px-2 py-1 text-[10px] font-semibold uppercase text-ink">Foto provisória</span>
              </div>
              <div className="absolute -bottom-1 left-0 w-[82%] border-l-4 border-primary bg-surface p-5 text-ink shadow-2xl sm:left-[-2rem] sm:w-72">
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">Cuidado especializado</p>
                <p className="mt-2 font-display text-xl leading-tight">Saúde da mulher dos 19 aos 60 anos</p>
                <p className="mt-3 text-xs text-muted-foreground">CRN-11 19154 · Atendimento personalizado</p>
              </div>
            </div>
          </div>
        </section>

        <section id="destaque" className="px-5 py-24 sm:py-32 lg:px-8 lg:py-40">
          <Reveal className="mx-auto max-w-6xl">
            <span className="mb-7 block text-xs font-semibold uppercase text-primary">Um cuidado que começa pela escuta</span>
            <p className="font-display text-3xl leading-tight sm:text-5xl lg:text-6xl">
              Acompanhamento nutricional personalizado que considera seus <span className="text-primary">hormônios, ciclo menstrual, rotina e sono</span> — sem restrições radicais, sem promessas falsas, com real cuidado e acolhimento.
            </p>
          </Reveal>
        </section>

        <Marquee />

        <section id="metodo" className="scroll-mt-18 px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-14 grid gap-5 lg:grid-cols-2">
              <div><span className="section-kicker">01 · O MÉTODO</span><h2 className="section-title">Estratégia com<br />acolhimento.</h2></div>
              <p className="max-w-md self-end text-base leading-7 text-muted-foreground lg:justify-self-end">Cada etapa é construída ao seu lado, respeitando seu corpo, seu momento e aquilo que realmente cabe na sua rotina.</p>
            </Reveal>
            <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
              {methodSteps.map((step, index) => (
                <Reveal key={step.number} className="h-full" >
                  <article className="group h-full bg-background p-7 transition-colors hover:bg-muted sm:p-9">
                    <span className="font-display text-5xl text-accent">{step.number}</span>
                    <h3 className="mt-12 font-display text-2xl leading-tight">{step.title}</h3>
                    <p className="mt-4 min-h-14 text-sm leading-6 text-muted-foreground">{step.description}</p>
                    <ul className="mt-7 space-y-3">
                      {step.items.map(item => <li key={item} className="flex gap-3 text-sm"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary"><Check className="size-3" /></span>{item}</li>)}
                    </ul>
                    <div className={`mt-8 h-1 w-10 transition-all duration-500 group-hover:w-full ${index === 1 ? "bg-accent" : "bg-primary"}`} />
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
              <p className="font-display text-2xl sm:text-3xl">Quer iniciar seu acompanhamento?</p>
              <WhatsAppButton label="Fale comigo no WhatsApp" />
            </Reveal>
          </div>
        </section>

        <Marquee />

        <section id="funcionamento" className="scroll-mt-18 bg-muted px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal><span className="section-kicker">02 · FUNCIONAMENTO</span><h2 className="section-title max-w-2xl">Onde você estiver,<br />estou com você.</h2></Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                [MapPin, "Consulta Presencial", "Um encontro cuidadoso, com avaliação completa e espaço para ser ouvida."],
                [Laptop, "Teleatendimento", "A mesma proximidade e personalização, com a praticidade do atendimento online."],
                [HeartHandshake, "Plano Contínuo", "Consultas, suporte e ajustes frequentes para uma mudança que se sustenta."],
              ].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof MapPin;
                return <Reveal key={String(title)} className="h-full"><article className="h-full border border-border bg-background p-7 transition-transform duration-300 hover:-translate-y-1"><FeatureIcon className="size-7 text-primary" /><h3 className="mt-14 font-display text-2xl">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{String(text)}</p></article></Reveal>;
              })}
            </div>
            <Reveal className="mt-4 bg-ink p-7 text-surface sm:p-10 lg:flex lg:items-center lg:justify-between">
              <div className="max-w-2xl"><span className="text-xs font-semibold uppercase text-accent">Acompanhamento personalizado</span><h3 className="mt-4 font-display text-3xl sm:text-4xl">O plano se adapta à sua vida.<br />Não o contrário.</h3></div>
              <div className="mt-8 lg:mt-0"><WhatsAppButton label="Conhecer o acompanhamento" variant="pink" /></div>
            </Reveal>
          </div>
        </section>

        <section id="numeros" className="scroll-mt-18 px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal><span className="section-kicker">03 · NÚMEROS</span><h2 className="section-title">Evolução que<br />você sente.</h2></Reveal>
            <div className="mt-14 grid border-y border-border md:grid-cols-3">
              <div className="stat-cell"><strong>+<Counter value={35} suffix="%" /></strong><span>Mulheres que transformaram</span></div>
              <div className="stat-cell"><strong><Counter value={4.8} decimals={1} suffix="/5" /></strong><span>Satisfação com o cuidado</span></div>
              <div className="stat-cell"><strong>+<Counter value={40} suffix="%" /></strong><span>Aderência ao plano</span></div>
            </div>
          </div>
        </section>

        <section id="duvidas" className="scroll-mt-18 bg-muted px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <Reveal><span className="section-kicker">04 · DÚVIDAS</span><h2 className="section-title">Vamos<br />conversar?</h2><p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">As respostas mais importantes para você começar com tranquilidade.</p></Reveal>
            <Reveal>
              <Accordion type="single" collapsible className="border-t border-border">
                {faq.map(([question, answer], index) => (
                  <AccordionItem key={question} value={`faq-${index}`}>
                    <AccordionTrigger className="py-6 text-left font-display text-lg font-medium hover:no-underline sm:text-xl">{question}</AccordionTrigger>
                    <AccordionContent className="max-w-2xl pb-6 pr-8 text-sm leading-6 text-muted-foreground">{answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-5 pb-8 pt-20 text-surface lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="border-b border-surface/15 pb-20">
            <span className="text-xs font-semibold uppercase text-accent">Seu próximo passo</span>
            <h2 className="mt-5 max-w-4xl font-display text-4xl leading-tight sm:text-6xl lg:text-7xl">Pronta para transformar sua relação com a comida e seu corpo?</h2>
            <div className="mt-9"><WhatsAppButton label="Agende sua consulta" variant="pink" /></div>
          </Reveal>
          <div className="grid gap-8 border-b border-surface/15 py-10 sm:grid-cols-2 lg:grid-cols-3">
            <div><p className="font-display text-xl">✳ Sarah Bastos</p><p className="mt-2 text-xs text-surface/55">Nutricionista CRN-11 19154</p></div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm transition-colors hover:text-accent"><Instagram className="size-4" /> @sarahbastosnutri</a>
            <p className="max-w-sm text-xs leading-5 text-surface/45">As informações neste site têm caráter educativo e não substituem uma consulta individualizada.</p>
          </div>
          <div className="flex flex-col gap-4 pt-7 text-xs text-surface/45 sm:flex-row sm:items-center sm:justify-between"><p>© Sarah Bastos Nutricionista 2025</p><a href="#inicio" className="flex items-center gap-2 transition-colors hover:text-surface">Voltar ao topo <ChevronUp className="size-4" /></a></div>
        </div>
      </footer>
    </div>
  );
}