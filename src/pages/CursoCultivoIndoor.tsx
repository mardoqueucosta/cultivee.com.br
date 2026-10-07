import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Leaf, Sprout, Droplets, Sun, Clock, ChevronRight, Check,
  BookOpen, ShoppingCart, Shield, Lightbulb, TrendingUp,
  AlertTriangle, Layers, ThermometerSun, Wind, Package,
  Target, Zap, GraduationCap, Gauge, Settings, Wrench,
  BarChart3, Cpu, Wifi, Building2, Factory, Ruler,
  CircuitBoard, MonitorSpeaker, Lamp, Eye
} from "lucide-react";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import { ORG_ID, organizationJsonLd } from "@/lib/seo-schemas";

const modules = [
  {
    number: "01",
    title: "Fundamentos do Cultivo Indoor",
    icon: BookOpen,
    topics: [
      "O que é CEA (Controlled Environment Agriculture) e fazenda vertical",
      "História: de Dickson Despommier (1999) às grandes fazendas verticais atuais",
      "Diferenças: campo aberto vs estufa vs fazenda vertical",
      "Panorama do mercado global e do cenário brasileiro",
    ],
  },
  {
    number: "02",
    title: "Iluminação LED para Horticultura",
    icon: Lamp,
    topics: [
      "Espectro luminoso: azul (400-500nm), vermelho (600-700nm), far-red e branco",
      "Métricas: PAR, PPF, PPFD (µmol/m²/s) e DLI (mol/m²/dia), como medir e interpretar",
      "LED vs HPS vs fluorescente: eficiência (3,14 vs 1,7 vs 1,3 µmol/J)",
      "Receitas de luz por cultura: alface (150-300 PPFD), morango (200-400 PPFD)",
    ],
  },
  {
    number: "03",
    title: "Sistemas de Cultivo Indoor",
    icon: Settings,
    topics: [
      "NFT, DWC e Aeroponia: comparativo para ambientes fechados",
      "Torres verticais (ZipGrow, Tower Garden): ganho de área e limites de iluminação",
      "Cultivo em substrato (perlita, lã de rocha, fibra de coco): buffer e estabilidade",
      "Escolha do sistema ideal conforme cultura, escala e orçamento",
    ],
  },
  {
    number: "04",
    title: "Controle Climático Avançado",
    icon: ThermometerSun,
    topics: [
      "Temperatura (22-25°C dia / 15-18°C noite), umidade (70-80%) e VPD (0,8-1,2 kPa)",
      "Enriquecimento de CO₂: de 400 ppm (ambiente) para 600-1500 ppm",
      "HVAC e desumidificação: dimensionamento para ambientes selados",
      "Free cooling e outras estratégias para reduzir o consumo de energia",
    ],
  },
  {
    number: "05",
    title: "Racks Multi-Nível e Design",
    icon: Layers,
    topics: [
      "Projeto de racks: 4-10 níveis, espaçamento 30-45 cm entre bandeja e LED",
      "Racks móveis (rolling benches): mais área útil no mesmo espaço",
      "Gestão de fluxo de ar: microclimas por camada, ventilação horizontal",
      "Materiais: aço inox e alumínio anodizado resistentes à umidade",
    ],
  },
  {
    number: "06",
    title: "IoT e Automação",
    icon: Cpu,
    topics: [
      "Sensores: DHT22 (T/UR), DS18B20 (água), pH, EC, CO₂ (NDIR), PAR",
      "Microcontroladores: ESP32 (R$ 25-50), Arduino e Raspberry Pi",
      "Arquitetura MQTT: sensores → ESP32 → broker → dashboard (Grafana/Node-RED)",
      "Automação: irrigação, fotoperíodo, alertas e datalogger com timestamps",
    ],
  },
  {
    number: "07",
    title: "Culturas e Manejo Indoor",
    icon: Sprout,
    topics: [
      "Folhosas: alface (21-30 dias), rúcula e espinafre, com PPFD 150-300 e DLI 15-25",
      "Ervas: manjericão (21-35 dias), coentro e hortelã, com PPFD 200-300 e fotoperíodo de 16h",
      "Morango: PPFD 200-400, DLI 17-25 e polinização em ambiente fechado",
      "Microverdes e flores comestíveis: ciclos curtos e nichos de mercado",
    ],
  },
  {
    number: "08",
    title: "Gestão de Energia",
    icon: Zap,
    topics: [
      "Para onde vai a energia: iluminação, climatização e desumidificação",
      "Energia como principal custo operacional: como medir e otimizar",
      "LEDs de alta eficiência: Samsung LM301H EVO (3,14 µmol/J)",
      "Integração solar, baterias e gestão de fotoperíodo para redução de pico",
    ],
  },
  {
    number: "09",
    title: "Negócio e Viabilidade Econômica",
    icon: ShoppingCart,
    topics: [
      "Investimento por escala: do protótipo caseiro à operação industrial",
      "Custos operacionais: energia, mão de obra, insumos e manutenção",
      "Lucratividade: por que muitas operações não fecham a conta e o que fazem as que se mantêm",
      "Canais de venda: supermercados, restaurantes, B2B, assinaturas diretas",
    ],
  },
  {
    number: "10",
    title: "Projeto Final",
    icon: GraduationCap,
    topics: [
      "Desenvolvimento do seu projeto de cultivo indoor individual",
      "Dimensionamento: área, racks, LEDs, HVAC e sistema de cultivo",
      "Cálculo de viabilidade: CAPEX, OPEX e retorno esperado",
      "Revisão do plano: custos, riscos e próximos passos",
    ],
  },
];

const crops = [
  {
    name: "Alface",
    cycle: "21-30 dias",
    ppfd: "150-300",
    dli: "15-25",
    temp: "22-25°C",
    color: "bg-agro",
    note: "Várias colheitas por ano com plantio escalonado",
  },
  {
    name: "Microverdes",
    cycle: "7-14 dias",
    ppfd: "100-300",
    dli: "10-16",
    temp: "18-24°C",
    color: "bg-agro-light",
    note: "Ciclo curto, muitas colheitas por ano",
  },
  {
    name: "Manjericão",
    cycle: "21-35 dias",
    ppfd: "200-300",
    dli: "14-17",
    temp: "22-27°C",
    color: "bg-agro-dark",
    note: "Exige mais luz que as folhosas",
  },
  {
    name: "Rúcula",
    cycle: "21-28 dias",
    ppfd: "150-250",
    dli: "12-18",
    temp: "18-22°C",
    color: "bg-agro",
    note: "Crescimento rápido, alta demanda",
  },
  {
    name: "Morango",
    cycle: "60-90 dias",
    ppfd: "200-400",
    dli: "17-25",
    temp: "18-24°C",
    color: "bg-destructive",
    note: "Exige polinização em ambiente fechado",
  },
  {
    name: "Flores Comestíveis",
    cycle: "30-60 dias",
    ppfd: "150-300",
    dli: "12-18",
    temp: "18-24°C",
    color: "bg-tech",
    note: "Nicho voltado a restaurantes",
  },
];

const systemsComparison = [
  {
    name: "NFT",
    desc: "Filme fino de solução flui por canais",
    pros: "Simples, eficiente, ideal para folhosas",
    cons: "Risco se bomba falhar",
    best: "Alface, rúcula, espinafre",
    icon: Droplets,
  },
  {
    name: "Aeroponia",
    desc: "Raízes suspensas, pulverizadas com névoa",
    pros: "Máxima oxigenação, crescimento rápido",
    cons: "Complexo, sensível a falhas",
    best: "Culturas de alto valor",
    icon: Wind,
  },
  {
    name: "DWC",
    desc: "Raízes submersas em solução aerada",
    pros: "Fácil montagem, baixo custo",
    cons: "Risco de podridão radicular",
    best: "Alface, ervas, plantas maiores",
    icon: Layers,
  },
  {
    name: "Torres Verticais",
    desc: "Cultivo na face vertical com recirculação",
    pros: "Mais plantas por área de piso",
    cons: "Iluminação desigual",
    best: "Folhosas, ervas, morango",
    icon: Building2,
  },
];

const businessNumbers = [
  { label: "Energia", value: "Energia", subtitle: "o principal custo a planejar" },
  { label: "Uso de água", value: "Água", subtitle: "menos água, com recirculação" },
  { label: "Calendário", value: "Ano todo", subtitle: "produção sem depender da estação" },
  { label: "Mercado", value: "Venda", subtitle: "comprador definido antes de construir" },
];

const ledSpectrum = [
  { range: "Azul (400-500nm)", role: "Crescimento vegetativo, compactação, clorofila", pct: "10-20%" },
  { range: "Verde (500-600nm)", role: "Penetração no dossel, fotossíntese em camadas inferiores", pct: "5-10%" },
  { range: "Vermelho (600-700nm)", role: "Fotossíntese primária, floração, extensão foliar", pct: "70-80%" },
  { range: "Far-Red (700-750nm)", role: "Alongamento, floração precoce, sinal de sombra", pct: "2-5%" },
];

const commonMistakes = [
  {
    mistake: "Escalar antes de provar demanda",
    detail: "Construir mega-fazendas antes de ter compradores garantidos levou à falência de empresas como Bowery e AppHarvest.",
    solution: "Comece pequeno, valide o mercado local, tenha contratos antes de expandir.",
  },
  {
    mistake: "Subestimar custos de energia",
    detail: "A eletricidade é um dos maiores custos operacionais. Muitos projetos falham ao subestimar isso no planejamento.",
    solution: "Calcule o consumo detalhado de iluminação, climatização e desumidificação antes de investir.",
  },
  {
    mistake: "Escolha errada de culturas",
    detail: "Produzir apenas alface de baixa margem em instalações caras de milhões de dólares.",
    solution: "Priorize culturas de alto valor: microverdes, ervas aromáticas, morangos.",
  },
  {
    mistake: "Over-engineering desde o início",
    detail: "Gastar em robótica e automação avançada antes de validar o modelo básico de produção.",
    solution: "Domine a agronomia primeiro, automatize depois.",
  },
  {
    mistake: "Ignorar gestão térmica",
    detail: "LEDs geram calor, e a climatização costuma ser o segundo maior custo de energia.",
    solution: "Dimensione HVAC corretamente, use free cooling e LEDs de alta eficiência.",
  },
  {
    mistake: "Falta de planejamento comercial",
    detail: "Produzir sem ter canais de venda definidos, como supermercados, restaurantes ou cestas.",
    solution: "Feche contratos de fornecimento antes de construir.",
  },
];

const faqs = [
  {
    question: "Qual a diferença entre fazenda vertical e estufa?",
    answer: "Estufa usa luz solar (com suplementação opcional), tem controle parcial de clima e cultiva em 1 nível. Fazenda vertical usa só luz LED, controla o clima em ambiente fechado e empilha vários níveis de cultivo, sem depender do sol ou do clima externo.",
  },
  {
    question: "Preciso de experiência prévia?",
    answer: "Não. O curso está sendo desenhado para partir do zero: começa com conceitos de fisiologia vegetal e chega a IoT e viabilidade econômica.",
  },
  {
    question: "Quanto custa montar uma fazenda vertical?",
    answer: "Depende da escala. Um protótipo caseiro, com um ou dois racks, custa uma fração de uma operação comercial, que pode exigir milhões de reais. O curso ensina a calcular o investimento para a sua realidade.",
  },
  {
    question: "Fazenda vertical é lucrativa?",
    answer: "Pode ser, mas exige planejamento rigoroso. Várias empresas do setor fecharam nos últimos anos. As que se mantêm costumam focar em culturas de maior valor (microverdes, morangos, ervas), controlar o custo de energia e ter compradores definidos antes de construir.",
  },
  {
    question: "O consumo de energia é muito alto?",
    answer: "Sim, a energia é o maior desafio, e iluminação e climatização respondem pela maior parte do consumo. A matriz elétrica brasileira tem grande participação de fontes renováveis, o que ajuda na pegada de carbono, mas não reduz o custo. O curso mostra estratégias para reduzir o consumo.",
  },
  {
    question: "O curso aborda automação com IoT?",
    answer: "Sim. Um módulo é dedicado ao tema: sensores (pH, EC, temperatura, umidade, CO₂, luz), ESP32, MQTT, dashboards com Grafana/Node-RED e automação de irrigação e fotoperíodo.",
  },
  {
    question: "Quando o curso começa?",
    answer: "O curso ainda não tem data. Entre na lista de espera pelo WhatsApp para ser avisado quando ele for lançado, já com formato, carga horária e valor definidos.",
  },
];

const CursoCultivoIndoorPage = () => {
  const pageUrl = `${SITE_BASE}/cursos/cultivo-indoor`;
  const pageDescription =
    "Curso de cultivo indoor e fazendas verticais da Cultivee Educa, em breve. LED, automação IoT e controle climático em 10 módulos previstos. Entre na lista de espera.";
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Cultivo Indoor e Fazendas Verticais",
    description: pageDescription,
    url: pageUrl,
    inLanguage: "pt-BR",
    provider: { "@id": ORG_ID },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "online",
      },
    ],
  };
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Educa", href: "/educa" },
    { name: "Cultivo", href: "/educa#cultivo" },
    { name: "Cultivo Indoor", href: "/cursos/cultivo-indoor" },
  ]);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Curso de Cultivo Indoor e Fazendas Verticais | Cultivee Educa</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Curso de Cultivo Indoor e Fazendas Verticais | Cultivee Educa" />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(courseLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>

      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-educa/10 via-background to-agro/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <ChevronRight className="w-3.5 h-3.5" />
              <li><Link to="/educa" className="hover:text-foreground transition-colors">Educa</Link></li>
              <ChevronRight className="w-3.5 h-3.5" />
              <li><Link to="/educa#cultivo" className="hover:text-foreground transition-colors">Cultivo</Link></li>
              <ChevronRight className="w-3.5 h-3.5" />
              <li className="text-foreground font-medium">Cultivo Indoor</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-educa/10 text-educa-dark border border-educa/30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Clock className="w-4 h-4" />
                Em breve · lista de espera
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Cultivo Indoor e Fazendas Verticais
              </h1>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Curso em breve. Você vai aprender a planejar cultivos em ambiente controlado, com LED,
                IoT, automação e controle climático, e a avaliar se o projeto fecha a conta.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-educa" /> 10 módulos previstos</span>
                <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-educa" /> LED, clima e IoT</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/5519991644181?text=Olá! Quero entrar na lista de espera do curso de Cultivo Indoor e Fazendas Verticais." target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-educa hover:bg-educa-dark w-full sm:w-auto">
                    Entrar na lista de espera
                  </Button>
                </a>
                <a href="#modulos">
                  <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                    Ver conteúdo previsto
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/img/site/curso-cultivo-indoor.jpg"
                  alt="Fazenda vertical com LED e prateleiras de plantas"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-card rounded-xl shadow-lg p-4 border border-border">
                <div className="text-2xl font-bold text-educa-dark">LED</div>
                <div className="text-xs text-muted-foreground">luz 100% artificial</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white dark:bg-card rounded-xl shadow-lg p-4 border border-border">
                <div className="text-2xl font-bold text-educa-dark">Ano todo</div>
                <div className="text-xs text-muted-foreground">sem depender da estação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que é Fazenda Vertical */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">O que é Fazenda Vertical?</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Fazenda vertical é um método de produção em ambiente controlado (CEA) em que os cultivos
                são empilhados em várias camadas dentro de estruturas fechadas. Usa LED, hidroponia ou
                aeroponia e controle de clima, sem depender de solo ou de luz solar.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                O conceito foi popularizado a partir de 1999 pelo Prof. Dickson Despommier, da Columbia University.
                Desde então, o modelo se espalhou pelo mundo, mas também viu empresas grandes fecharem.
                Isso mostra que a viabilidade depende de planejamento, e é esse o foco do curso.
              </p>
              <div className="bg-educa/5 border border-educa/20 rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-educa" />
                  Campo vs Estufa vs Fazenda Vertical
                </h4>
                <p className="text-sm text-muted-foreground">
                  Campo: 1 nível, luz solar, sem controle. Estufa: 1 nível, luz solar + suplementar, controle parcial.
                  Fazenda vertical: vários níveis, luz 100% LED e controle de clima, com produção ao longo de todo o ano.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, label: "Mais produção por m²", desc: "pelo empilhamento de níveis" },
                { icon: Droplets, label: "Menos água", desc: "sistema fechado recirculante" },
                { icon: Shield, label: "Ambiente protegido", desc: "menos exposição a pragas" },
                { icon: Sun, label: "Produção o ano todo", desc: "sem depender da estação" },
                { icon: Layers, label: "4-16+ níveis", desc: "multiplicação da área útil" },
                { icon: Target, label: "Menos área de terra", desc: "produção urbana compacta" },
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <item.icon className="w-6 h-6 text-educa mb-2" />
                  <div className="font-semibold text-foreground text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LED Spectrum */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Iluminação LED: o Motor da Fazenda Vertical
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A iluminação é uma das maiores parcelas do consumo de energia. Entender espectro, PPFD e DLI
            é essencial para equilibrar produção e custo.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Espectro */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Lamp className="w-5 h-5 text-educa" />
                Espectro Luminoso e Funções
              </h3>
              <p className="text-sm text-muted-foreground mb-6">Cada faixa do espectro cumpre uma função específica na planta</p>
              <div className="space-y-4">
                {ledSpectrum.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground text-sm">{item.range}</span>
                      <span className="text-xs font-semibold text-educa-dark bg-educa/10 px-2 py-0.5 rounded-full">{item.pct}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      i === 0 ? 'bg-gradient-educa' :
                      i === 1 ? 'bg-gradient-agro' :
                      i === 2 ? 'bg-destructive' :
                      'bg-destructive/60'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Métricas e comparação */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-educa" />
                LED vs Outras Tecnologias
              </h3>
              <p className="text-sm text-muted-foreground mb-6">Eficiência, custo e vida útil comparados</p>
              <div className="space-y-4">
                {[
                  { tech: "LED (Samsung LM301H EVO)", eff: "3,14 µmol/J", life: "50-100 mil h", heat: "15-25%", bar: "w-full" },
                  { tech: "HPS (Sódio Alta Pressão)", eff: "1,70 µmol/J", life: "~10 mil h", heat: "80%", bar: "w-[54%]" },
                  { tech: "Fluorescente/CFL", eff: "1,30 µmol/J", life: "~8 mil h", heat: "80%", bar: "w-[41%]" },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-3">
                    <div className="font-medium text-foreground text-sm mb-2">{item.tech}</div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                      <div className={`h-full bg-educa rounded-full ${item.bar}`} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <span>Efic.: <strong className="text-foreground">{item.eff}</strong></span>
                      <span>Vida: <strong className="text-foreground">{item.life}</strong></span>
                      <span>Calor: <strong className="text-foreground">{item.heat}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-educa/5 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">PPFD e espectro</strong> ajustados à cultura aumentam a biomassa. A resposta varia por espécie, e o curso mostra como calibrar a luz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sistemas de cultivo */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Sistemas de Cultivo para Ambientes Fechados
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Cada sistema tem vantagens específicas. No curso, você aprende a escolher o ideal para sua cultura e escala.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemsComparison.map((sys, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-educa/10 rounded-lg mb-3">
                  <sys.icon className="w-5 h-5 text-educa" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{sys.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{sys.desc}</p>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-agro-dark font-medium">+ </span>
                    <span className="text-muted-foreground">{sys.pros}</span>
                  </div>
                  <div>
                    <span className="text-destructive font-medium">- </span>
                    <span className="text-muted-foreground">{sys.cons}</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <span className="text-educa font-medium">Ideal: </span>
                    <span className="text-foreground">{sys.best}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culturas */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Culturas para Fazenda Vertical
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Faixas de referência de ciclo, PPFD, DLI e temperatura para as culturas mais usadas em ambiente fechado.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map((crop, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${crop.color}`} />
                  <h3 className="font-bold text-foreground">{crop.name}</h3>
                </div>
                <div className="space-y-1.5 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ciclo</span>
                    <span className="font-medium text-foreground">{crop.cycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PPFD (µmol/m²/s)</span>
                    <span className="font-medium text-foreground">{crop.ppfd}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">DLI (mol/m²/dia)</span>
                    <span className="font-medium text-foreground">{crop.dli}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperatura</span>
                    <span className="font-medium text-foreground">{crop.temp}</span>
                  </div>
                </div>
                <p className="text-xs text-educa font-medium">{crop.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IoT e Automação */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            IoT e Automação: Monitoramento e Controle
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Sensores, microcontroladores e dashboards para monitorar e controlar os parâmetros do cultivo em tempo real.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Sensores */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-educa/10 rounded-xl mb-4">
                <Eye className="w-6 h-6 text-educa" />
              </div>
              <h3 className="font-bold text-foreground mb-4">Sensores</h3>
              <ul className="space-y-2">
                {[
                  "DHT22 / SHT31: temperatura e umidade",
                  "DS18B20: temperatura da água",
                  "Eletrodo de pH: acidez da solução",
                  "EC/TDS: condutividade elétrica",
                  "MH-Z19 / SenseAir S8: CO₂ (NDIR)",
                  "BH1750: intensidade luminosa",
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CircuitBoard className="w-3.5 h-3.5 text-educa flex-shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Controladores */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-educa/10 rounded-xl mb-4">
                <Cpu className="w-6 h-6 text-educa" />
              </div>
              <h3 className="font-bold text-foreground mb-4">Microcontroladores</h3>
              <div className="space-y-3">
                {[
                  { name: "ESP32", price: "R$ 25-50", desc: "Wi-Fi + Bluetooth, GPIO e MQTT, muito usado em IoT" },
                  { name: "Arduino Mega", price: "R$ 80-150", desc: "Muitas portas analógicas, prototipagem" },
                  { name: "Raspberry Pi 4/5", price: "R$ 300-600", desc: "Linux, câmera, dashboard local, visão computacional" },
                ].map((mc, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-foreground text-sm">{mc.name}</span>
                      <span className="text-xs font-semibold text-educa">{mc.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{mc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Arquitetura */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-educa/10 rounded-xl mb-4">
                <Wifi className="w-6 h-6 text-educa" />
              </div>
              <h3 className="font-bold text-foreground mb-4">Arquitetura IoT</h3>
              <div className="space-y-3">
                {[
                  { step: "1", label: "Coleta", desc: "Sensores → ESP32 (leitura a cada 5-30s)" },
                  { step: "2", label: "Transmissão", desc: "Wi-Fi → Broker MQTT (Mosquitto/EMQX)" },
                  { step: "3", label: "Processamento", desc: "Node-RED → lógica de automação" },
                  { step: "4", label: "Visualização", desc: "Grafana → dashboards em tempo real" },
                  { step: "5", label: "Ação", desc: "Relés → bombas, LEDs, ventiladores, alertas" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-educa text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <span className="font-medium text-foreground text-sm">{item.label}</span>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos do curso */}
      <section id="modulos" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Conteúdo previsto: 10 módulos
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Do fundamento científico à automação IoT e à viabilidade econômica. O conteúdo pode ser ajustado até o lançamento.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.number}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-educa/10 rounded-xl flex items-center justify-center">
                      <mod.icon className="w-6 h-6 text-educa" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-educa-dark bg-educa/10 px-2 py-0.5 rounded-full">
                        Módulo {mod.number}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mb-3">{mod.title}</h3>
                    <ul className="space-y-1.5">
                      {mod.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-educa flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Números do negócio */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">O Que Pesa na Conta</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A fazenda vertical é um modelo promissor, mas exige planejamento rigoroso: muitas operações no mundo não conseguiram fechar a conta.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {businessNumbers.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-educa-dark mb-1">{item.value}</div>
                <div className="font-medium text-foreground text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.subtitle}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <BarChart3 className="w-8 h-8 text-educa mx-auto mb-3" />
              <h4 className="font-bold text-foreground mb-2">Protótipo / Caseiro</h4>
              <p className="text-sm text-muted-foreground">
                Ideal para aprendizado e validação. 1-2 racks com LED,
                sensores básicos e sistema NFT ou DWC.
              </p>
            </div>
            <div className="bg-card border border-educa/30 rounded-xl p-6 text-center shadow-md">
              <BarChart3 className="w-8 h-8 text-educa mx-auto mb-3" />
              <h4 className="font-bold text-foreground mb-2">Escala Comercial</h4>
              <p className="text-sm text-muted-foreground">
                Exige capital, controle rigoroso de energia e foco em culturas de maior valor.
                O mercado comprador precisa estar definido antes de construir.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <BarChart3 className="w-8 h-8 text-educa mx-auto mb-3" />
              <h4 className="font-bold text-foreground mb-2">Escala Industrial</h4>
              <p className="text-sm text-muted-foreground">
                Grande capital, equipe técnica e contratos de longo prazo com o varejo.
                Várias operações desse porte no exterior fecharam nos últimos anos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Erros comuns */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Erros que Derrubam Fazendas Verticais
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Várias empresas do setor fecharam nos últimos anos. No módulo 9, você estuda esses casos e o que fazem as operações que se mantêm.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-tech" />
                  <h4 className="font-bold text-foreground text-sm">{item.mistake}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.detail}</p>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-educa flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustentabilidade */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-educa to-agro rounded-2xl flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Sustentabilidade e o Brasil
                </h3>
                <p className="text-muted-foreground mb-4">
                  A pegada de carbono de uma fazenda vertical depende da matriz energética. Como a matriz elétrica
                  brasileira tem grande participação de fontes renováveis, o Brasil parte de uma posição favorável.
                  Ainda assim, o consumo de energia é alto e precisa entrar na conta desde o início.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Menos água", "Recirculação da solução", "Produção urbana", "Matriz elétrica renovável"].map((tag, i) => (
                    <span key={i} className="text-xs bg-agro/10 text-agro-dark px-3 py-1 rounded-full border border-agro/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-educa">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quer ser avisado quando o curso abrir?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            O curso está previsto com 10 módulos, do protótipo caseiro à análise de viabilidade
            comercial. Entre na lista de espera para receber a novidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/5519991644181?text=Olá! Quero entrar na lista de espera do curso de Cultivo Indoor e Fazendas Verticais." target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="gap-2 text-educa-dark font-semibold w-full sm:w-auto">
                Entrar na lista de espera
              </Button>
            </a>
            <Link to="/educa">
              <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                Ver todos os cursos
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

export default CursoCultivoIndoorPage;
