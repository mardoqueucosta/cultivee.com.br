import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageHero from "@/components/ImageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import { webPageJsonLd } from "@/lib/seo-schemas";
import {
  Factory,
  Store,
  Cloud,
  Truck,
  TrendingUp,
  Users,
  TreePine,
  ArrowRight,
  Check,
  Sprout,
  BarChart3,
  Zap,
  ShieldCheck,
  ThermometerSun,
  ExternalLink,
  Calendar,
  Landmark,
} from "lucide-react";
import { Link } from "react-router-dom";

type ProjectStatus = "Em execução" | "Em andamento" | "Concluído";

interface FundedProject {
  financiador: string;
  processo?: string;
  processoUrl?: string;
  titulo: string;
  periodo: string;
  status: ProjectStatus;
  objetivo: string;
}

const projects: FundedProject[] = [
  {
    financiador: "FAPESP, Programa PIPE Fase 1",
    processo: "2025/27266-8",
    processoUrl: "https://bv.fapesp.br/pt/pesquisa/?q2=2025%2F27266-8",
    titulo:
      "Sistema inteligente de produção, distribuição e comercialização de hortaliças em ambientes urbanos utilizando IoT",
    periodo: "01/09/2026 a 31/05/2027",
    status: "Em execução",
    objetivo:
      "Desenvolver e validar o sistema integrado de cultivo, displays inteligentes e plataforma IoT. Valor aprovado: R$ 323.154,10. Executora: Cultivee, incubada na ESALQTec.",
  },
  {
    financiador: "Programa Base Deep Techs (FIESP / SENAI-RS)",
    titulo: "Maturação da proposta de negócio e de tecnologia",
    periodo: "set/2025 a 31/08/2026",
    status: "Concluído",
    objetivo:
      "Amadureceu a proposta de negócio e de tecnologia que levou ao projeto aprovado no PIPE FAPESP.",
  },
  {
    financiador: "Pós-doutorado ESALQ/USP, bolsa CNPq (parceria FEALQ / John Deere)",
    titulo: "Pesquisa de pós-doutorado em Engenharia de Biossistemas",
    periodo: "até nov/2026",
    status: "Em andamento",
    objetivo:
      "Pesquisa aplicada conduzida pelo fundador na ESALQ/USP, em parceria com a FEALQ e a John Deere.",
  },
];

const statusClass: Record<ProjectStatus, string> = {
  "Em execução": "bg-primary/10 text-primary",
  "Em andamento": "bg-educa/10 text-educa-dark",
  Concluído: "bg-muted text-muted-foreground border border-border",
};

const ProjetoPage = () => {
  const problems = [
    {
      icon: Truck,
      title: "Perdas pós-colheita",
      description:
        "Hortaliças folhosas são perecíveis e perdem qualidade rapidamente entre o campo e o consumidor final.",
    },
    {
      icon: TrendingUp,
      title: "Cadeia longa",
      description: "Vários intermediários encarecem o produto e reduzem a margem do produtor.",
    },
    {
      icon: Users,
      title: "Acesso a alimento fresco",
      description: "Nos centros urbanos, nem sempre é fácil encontrar hortaliças frescas perto de casa.",
    },
    {
      icon: ThermometerSun,
      title: "Vulnerabilidade climática",
      description:
        "Eventos extremos e pragas comprometem a produção convencional e aumentam o uso de agroquímicos.",
    },
  ];

  const solutionPillars = [
    {
      icon: Factory,
      title: "Hub: fazenda vertical",
      color: "bg-agro",
      shadowClass: "hover:shadow-agro",
      items: [
        "Cultivo hidropônico com iluminação LED",
        "Controle de temperatura, umidade e CO₂",
        "Produção de microverdes, mudas e plantas maduras",
        "Alface, rúcula, salsinha, cebolinha, agrião",
      ],
    },
    {
      icon: Store,
      title: "Spokes: displays inteligentes",
      color: "bg-educa",
      shadowClass: "hover:shadow-educa",
      items: [
        "Totens e prateleiras em áreas urbanas de alta densidade",
        "Condomínios, prédios residenciais e centros comerciais",
        "Mantêm as plantas vivas até o ponto de compra",
        "Planta colhida pelo consumidor, mais perto do momento do consumo",
      ],
    },
    {
      icon: Cloud,
      title: "Plataforma IoT na nuvem",
      color: "bg-tech",
      shadowClass: "hover:shadow-tech-shadow",
      items: [
        "Monitoramento e controle remoto do sistema",
        "Gestão de inventário e logística",
        "Alertas automáticos sobre condições e reposição",
        "Automação de clima e nutrição",
        "Receitas de cultivo baseadas em dados",
      ],
    },
  ];

  const impacts = [
    {
      icon: TreePine,
      title: "Ambiental",
      color: "text-agro",
      bgColor: "bg-agro/10",
      items: [
        "Busca reduzir perdas pós-colheita",
        "Logística local, com menos transporte",
        "Uso eficiente de água (hidroponia)",
        "Menor necessidade de agroquímicos",
      ],
    },
    {
      icon: Users,
      title: "Social",
      color: "text-educa",
      bgColor: "bg-educa/10",
      items: [
        "Mais acesso a vegetais frescos em centros urbanos",
        "Contribuição para a segurança alimentar e nutricional",
        "Geração de trabalho qualificado",
      ],
    },
    {
      icon: BarChart3,
      title: "Econômico",
      color: "text-tech",
      bgColor: "bg-tech/10",
      items: [
        "Cadeia mais curta entre produção e consumo",
        "Potencial de melhor margem para o produtor",
        "Potencial de preços mais estáveis ao consumidor",
      ],
    },
  ];

  const timeline = [
    { phase: "TRL 3", label: "Prova de conceito", description: "Componentes individuais validados separadamente", done: true },
    { phase: "TRL 4", label: "Validação em laboratório", description: "Protótipos integrados em ambiente controlado", done: true },
    { phase: "TRL 5", label: "Validação em ambiente relevante", description: "Sistema operando em escala piloto", done: false },
    { phase: "TRL 6", label: "Demonstração em ambiente operacional", description: "Protótipo completo testado em cenário real", done: false },
  ];

  const pageUrl = `${SITE_BASE}/projetos`;
  const projectLd = webPageJsonLd({
    pageName: "Projetos da Cultivee",
    pageUrl,
    description:
      "Projetos de pesquisa aplicada com financiamento público executados pela Cultivee na ESALQTec: PIPE Fase 1 FAPESP 2025/27266-8, Programa Base Deep Techs e pós-doutorado ESALQ/USP.",
  });
  const breadcrumbLd = breadcrumbJsonLd([{ name: "Projetos", href: "/projetos" }]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Projetos | Cultivee: pesquisa aplicada com financiamento público</title>
        <meta
          name="description"
          content="Projetos da Cultivee: PIPE Fase 1 FAPESP (2025/27266-8) em execução, Programa Base Deep Techs concluído e pós-doutorado ESALQ/USP. Pesquisa aplicada na ESALQTec, Piracicaba-SP."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Projetos da Cultivee" />
        <meta
          property="og:description"
          content="Pesquisa aplicada com financiamento público, executada pela Cultivee na ESALQTec."
        />
        <script type="application/ld+json">{JSON.stringify(projectLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Head>
      <Navbar />

      <ImageHero
        ilustrativa
        image="/img/site/topo-projetos.jpg"
        alt="Módulo eletrônico com antena e sensores ao lado de canais de hidroponia numa estufa"
        eyebrow="Projetos"
        title="Pesquisa aplicada com financiamento público"
        subtitle="Executada pela Cultivee na ESALQTec, em Piracicaba-SP."
      >
        <a href="#portfolio" className="inline-flex items-center justify-center rounded-full bg-sun text-deep font-bold px-7 py-3.5 hover:brightness-105 transition">
          Ver projetos
        </a>
        <a href="#pipe" className="inline-flex items-center justify-center rounded-full border-2 border-white/60 text-white font-bold px-7 py-3.5 hover:bg-white/10 transition">
          Detalhe do PIPE
        </a>
      </ImageHero>

      {/* Portfólio */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Portfólio de projetos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projetos com financiamento aprovado, em execução ou concluídos.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article
                key={p.financiador}
                className="bg-card rounded-2xl p-6 border border-border shadow-elegant flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl flex-shrink-0">
                    <Landmark className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClass[p.status]}`}>
                    {p.status}
                  </span>
                </div>
                <div className="text-sm font-semibold text-primary mb-1">{p.financiador}</div>
                {p.processo && (
                  <div className="text-xs text-muted-foreground mb-3">
                    Processo{" "}
                    {p.processoUrl ? (
                      <a
                        href={p.processoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground underline underline-offset-2 hover:text-primary inline-flex items-center gap-1"
                      >
                        {p.processo}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      p.processo
                    )}
                  </div>
                )}
                <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">{p.titulo}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{p.objetivo}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border">
                  <Calendar className="w-4 h-4" />
                  {p.periodo}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detalhe do PIPE: desafio */}
      <section id="pipe" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
              Detalhe do projeto PIPE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              A solução em desenvolvimento
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              O projeto PIPE Fase 1 FAPESP, aprovado e em execução, desenvolve um sistema integrado de
              produção, distribuição e comercialização de hortaliças em ambientes urbanos. O ponto de
              partida são os desafios da cadeia atual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border shadow-elegant text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-xl mb-4">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solução */}
      <section id="solucao" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Arquitetura Hub-and-Spoke
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Um sistema integrado que mantém as hortaliças vivas do cultivo até a compra,
              com o objetivo de reduzir perdas pós-colheita e preservar o frescor.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutionPillars.map((pillar, index) => (
              <div
                key={index}
                className={`bg-card rounded-2xl border border-border shadow-elegant ${pillar.shadowClass} transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                <div className={`${pillar.color} p-6 flex items-center gap-4`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                </div>
                <div className="p-6 space-y-3">
                  {pillar.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Da semente ao prato, em um fluxo contínuo.
            </p>
          </div>

          <div className="space-y-0">
            {[
              {
                step: "01",
                icon: Sprout,
                title: "Produção no Hub",
                desc: "Sementes germinam e crescem em ambiente controlado, com hidroponia e iluminação LED.",
                color: "bg-agro",
              },
              {
                step: "02",
                icon: Truck,
                title: "Distribuição",
                desc: "Plantas vivas são levadas para displays distribuídos em áreas urbanas de alta densidade.",
                color: "bg-educa",
              },
              {
                step: "03",
                icon: Store,
                title: "Display no ponto de venda",
                desc: "Displays inteligentes mantêm as plantas vivas até a compra, com monitoramento IoT contínuo.",
                color: "bg-tech",
              },
              {
                step: "04",
                icon: ShieldCheck,
                title: "Consumidor leva a planta fresca",
                desc: "O cliente compra a planta viva, com menos embalagem e menos desperdício.",
                color: "bg-agro",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-stretch gap-6">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  {index < 3 && <div className="w-0.5 bg-border flex-1 min-h-[40px]" />}
                </div>
                <div className="pb-10">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Etapa {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground max-w-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferencial */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-elegant">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">O que muda na proposta</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-destructive mb-3">Cadeia tradicional</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">&#x2717;</span>
                    Planta colhida perde frescor ao longo do transporte
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">&#x2717;</span>
                    Vários intermediários até o consumidor
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">&#x2717;</span>
                    Parte da produção se perde antes de chegar à mesa
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">&#x2717;</span>
                    Transporte refrigerado: custo e emissões
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-3">Sistema em desenvolvimento</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Planta viva até o momento da compra
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Cadeia curta: Hub, display, consumidor
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Menos desperdício entre a produção e o consumo
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Logística local, com menor custo e menor emissão
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Impacto esperado</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dimensões ambiental, social e econômica que o projeto pretende avaliar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border shadow-elegant"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${impact.bgColor} rounded-xl mb-6`}>
                  <impact.icon className={`w-7 h-7 ${impact.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{impact.title}</h3>
                <ul className="space-y-3">
                  {impact.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 ${impact.color} mt-0.5 flex-shrink-0`} />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estágio de desenvolvimento */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Estágio de desenvolvimento
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Maturidade tecnológica (TRL), da prova de conceito à demonstração em ambiente operacional.
            </p>
          </div>

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-5 rounded-xl border ${
                  item.done ? "bg-primary/5 border-primary/20" : "bg-card border-border"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                    item.done ? "bg-primary text-white" : "bg-muted text-muted-foreground border-2 border-border"
                  }`}
                >
                  {item.done ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.phase}</span>
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full hidden sm:inline ${
                    item.done ? "text-primary bg-primary/10" : "text-muted-foreground bg-muted"
                  }`}
                >
                  {item.done ? "Concluído" : "Próxima etapa"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Parcerias de P&amp;D
          </h2>
          <p className="text-lg text-white/85 mb-10 max-w-xl mx-auto">
            Instituições de pesquisa, empresas e produtores interessados em pesquisa aplicada no agro
            podem falar com a Cultivee. Para aprender, conheça também a Cultivee Educa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contato">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                Falar sobre parcerias
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/educa">
              <Button size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-primary px-8">
                Conhecer a Educa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjetoPage;
