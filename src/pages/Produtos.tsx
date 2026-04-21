import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import {
  Droplets, Camera, Sparkles, ExternalLink, Wifi, Bell, RefreshCw,
  Shield, Smartphone, Gauge, Home, Plane, Factory, TreePine,
  CheckCircle2, ArrowRight, Package
} from "lucide-react";

const produtos = [
  {
    slug: "controle-hidroponia",
    name: "Cultivee Hidro",
    tagline: "Automação Essencial",
    description: "Pra quem está começando ou tem um setup simples. Controla os 4 equipamentos fundamentais do cultivo indoor.",
    icon: Droplets,
    color: "green",
    colorClass: {
      bg: "bg-green-500/10",
      text: "text-green-600",
      border: "border-green-500/20",
      gradient: "from-green-500/10 to-green-500/5",
      button: "bg-green-600 hover:bg-green-700",
      badge: "bg-green-500/10 text-green-600",
    },
    highlights: [
      "4 relés: luz, bomba, ventilação, aeração",
      "Até 10 fases de cultivo configuráveis",
      "RTC embarcado — funciona offline",
    ],
    indicado: "Cultivo caseiro · Grow tents · DWC",
  },
  {
    slug: "hidro-farm",
    name: "Cultivee Hidro Farm",
    tagline: "Premium",
    description: "Para quem leva o cultivo a sério. Tudo do Hidro + reposição automática de água, alertas e sensores ambientais.",
    icon: Sparkles,
    color: "emerald",
    colorClass: {
      bg: "bg-emerald-600/10",
      text: "text-emerald-700",
      border: "border-emerald-600/20",
      gradient: "from-emerald-600/10 to-emerald-500/5",
      button: "bg-emerald-700 hover:bg-emerald-800",
      badge: "bg-emerald-600/10 text-emerald-700",
    },
    highlights: [
      "Reposição automática de água (boias + válvula)",
      "Alertas push + e-mail com timer configurável",
      "Sensor DHT11 (temperatura + umidade)",
    ],
    indicado: "Hidroponia NFT · Gotejamento · Cultivo comercial",
    destaque: true,
  },
  {
    slug: "controle-camera",
    name: "Cultivee Cam",
    tagline: "Monitoramento Visual",
    description: "Veja as plantas de qualquer lugar. Câmera IP standalone com fotos programadas, stream ao vivo e galeria organizada.",
    icon: Camera,
    color: "blue",
    colorClass: {
      bg: "bg-blue-500/10",
      text: "text-blue-600",
      border: "border-blue-500/20",
      gradient: "from-blue-500/10 to-blue-500/5",
      button: "bg-blue-600 hover:bg-blue-700",
      badge: "bg-blue-500/10 text-blue-600",
    },
    highlights: [
      "Captura agendada (1min a 1h)",
      "Stream ao vivo até 10 minutos",
      "Galeria com pastas e seleção em lote",
    ],
    indicado: "Timelapse · Detecção visual · Tranquilidade em viagens",
  },
];

const plataformaFeatures = [
  { icon: Smartphone, title: "App Web Universal", desc: "Funciona em qualquer dispositivo. Instalável como app nativo (PWA)." },
  { icon: Bell, title: "Notificações Inteligentes", desc: "Push no celular + e-mail com cooldown, sem spam." },
  { icon: Wifi, title: "Funciona Offline", desc: "Módulo continua automatizando sozinho se a internet cair." },
  { icon: RefreshCw, title: "Atualizações Remotas", desc: "Novos recursos chegam automaticamente via OTA. Sem mexer no hardware." },
  { icon: Shield, title: "Múltiplos Módulos, 1 Conta", desc: "Dashboard único para todos os seus módulos. Reordene, agrupe, configure." },
  { icon: Gauge, title: "Telemetria de Saúde", desc: "Sinal WiFi, uptime, quedas de conexão. Saiba quando precisa ajustar." },
];

const casosDeUso = [
  {
    icon: Home,
    title: "Cultivo Caseiro / Hobby",
    combo: "1× Hidro + 1× Cam",
    desc: "Automatize luz/bomba/ventilação e monitore visualmente do trabalho. Registre a evolução, compartilhe com amigos.",
    color: "text-green-600 bg-green-500/10",
  },
  {
    icon: TreePine,
    title: "Hidroponia Séria",
    combo: "1× Hidro Farm + 1× Cam",
    desc: "Controle total do reservatório, alertas de nível, monitoramento ambiental + registro visual. Nunca perca planta por esquecimento.",
    color: "text-emerald-700 bg-emerald-600/10",
  },
  {
    icon: Factory,
    title: "Estufa / Viveiro Profissional",
    combo: "Múltiplos Hidro Farm + Cam",
    desc: "Cada bancada com módulo independente. Todos num dashboard único. Alertas individualizados por área.",
    color: "text-orange-600 bg-orange-500/10",
  },
  {
    icon: Plane,
    title: "Viajando Tranquilo",
    combo: "Qualquer combinação",
    desc: "O módulo cuida do ciclo sozinho. Se algo sair do esperado, alerta imediato. Confira visualmente de qualquer lugar (com Cam).",
    color: "text-blue-600 bg-blue-500/10",
  },
];

const comparativo = [
  { recurso: "Controle de iluminação", hidro: true, farm: true, cam: false },
  { recurso: "Controle de bomba", hidro: true, farm: true, cam: false },
  { recurso: "Ventilação + aeração", hidro: true, farm: true, cam: false },
  { recurso: "Sistema de 10 fases", hidro: true, farm: true, cam: false },
  { recurso: "RTC (relógio offline)", hidro: true, farm: true, cam: false },
  { recurso: "Reposição automática de água", hidro: false, farm: true, cam: false },
  { recurso: "Sensor temperatura + umidade", hidro: false, farm: true, cam: false },
  { recurso: "Alertas push + e-mail", hidro: false, farm: true, cam: false },
  { recurso: "Bomba de homogeneização", hidro: false, farm: true, cam: false },
  { recurso: "Captura de fotos agendada", hidro: false, farm: false, cam: true },
  { recurso: "Transmissão ao vivo", hidro: false, farm: false, cam: true },
  { recurso: "Galeria com pastas", hidro: false, farm: false, cam: true },
  { recurso: "App web incluído", hidro: true, farm: true, cam: true },
  { recurso: "Atualizações remotas (OTA)", hidro: true, farm: true, cam: true },
  { recurso: "Modo offline local", hidro: true, farm: true, cam: true },
  { recurso: "Notificações push", hidro: true, farm: true, cam: true },
];

const comoFunciona = [
  { step: 1, title: "Receba o módulo", desc: "Configurado de fábrica, pronto para usar." },
  { step: 2, title: "Conecte na tomada", desc: "Ligue aos equipamentos do cultivo (luz, bomba, etc.)." },
  { step: 3, title: "Abra o app", desc: "Acesse app.cultivee.com.br pelo navegador do celular." },
  { step: 4, title: "Pareie em 2 minutos", desc: "Conecte no WiFi temporário do módulo, configure sua rede." },
  { step: 5, title: "Configure fases", desc: "Use presets ou personalize luz, irrigação e ventilação por fase." },
  { step: 6, title: "Pronto", desc: "O resto é automático. Receba alertas se algo precisar de atenção." },
];

const faqs = [
  { q: "Precisa de computador sempre ligado?", a: "Não. O servidor é nosso. Você acessa app.cultivee.com.br de qualquer dispositivo." },
  { q: "Tem mensalidade?", a: "Não. Plataforma incluída por tempo ilimitado — pagou, é seu." },
  { q: "E se minha internet cair?", a: "O módulo continua automatizando sozinho com o RTC interno. Quando a internet voltar, tudo sincroniza." },
  { q: "Posso acessar de fora de casa?", a: "Sim. De qualquer lugar com internet — funciona via 4G do celular perfeitamente." },
  { q: "Posso controlar mais de um módulo?", a: "Sim, quantos quiser. Todos no mesmo app, mesma conta, dashboard único." },
  { q: "Preciso ser programador?", a: "Não. É plug-and-play. Se você sabe usar um app de celular, sabe usar o Cultivee." },
];

const ProdutosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_70%)]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            Linha Cultivee
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Automação inteligente
            <br />
            <span className="text-white/90">pro cultivo indoor</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed">
            Três módulos plug-and-play que transformam qualquer estufa, tenda de cultivo ou
            sistema hidropônico num ambiente monitorado e automatizado.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/90 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Sem mensalidade
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Plug and play
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Funciona offline
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Atualizações automáticas
            </span>
          </div>
        </div>
      </section>

      {/* Cards de produtos */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {produtos.map((p) => (
              <div
                key={p.slug}
                className={`relative bg-card border rounded-2xl overflow-hidden flex flex-col hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 ${
                  p.destaque ? p.colorClass.border : "border-border"
                }`}
              >
                {p.destaque && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`${p.colorClass.badge} text-xs font-bold px-3 py-1 rounded-full`}>
                      MAIS COMPLETO
                    </span>
                  </div>
                )}

                {/* Header com gradiente */}
                <div className={`p-8 bg-gradient-to-br ${p.colorClass.gradient}`}>
                  <div className={`w-16 h-16 rounded-2xl ${p.colorClass.bg} flex items-center justify-center mb-4`}>
                    <p.icon className={`w-8 h-8 ${p.colorClass.text}`} />
                  </div>
                  <div className={`inline-block ${p.colorClass.badge} px-3 py-1 rounded-full text-xs font-semibold mb-3`}>
                    {p.tagline}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{p.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col border-t border-border">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Principais recursos
                  </h3>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className={`w-4 h-4 ${p.colorClass.text} flex-shrink-0 mt-0.5`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6 pt-4 border-t border-border">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Indicado para
                    </div>
                    <p className="text-xs text-muted-foreground">{p.indicado}</p>
                  </div>

                  <Link to={`/produtos/${p.slug}`} className="block">
                    <Button className={`w-full gap-2 ${p.colorClass.button} text-white`}>
                      Ver detalhes
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plataforma incluída em todos */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Plataforma Incluída em Todos os Módulos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Independente de qual módulo você escolher, tudo isso vem junto, sem custo adicional, sem mensalidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plataformaFeatures.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Qual Combinação É Ideal Pra Você?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Os módulos se complementam. Compre um agora e expanda depois — tudo aparece num dashboard único.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {casosDeUso.map((caso) => (
              <div key={caso.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${caso.color}`}>
                    <caso.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{caso.title}</h3>
                    <div className="text-xs font-mono text-primary mb-2">{caso.combo}</div>
                    <p className="text-sm text-muted-foreground">{caso.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabela comparativa */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Comparativo Completo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todos os recursos lado a lado. Escolha o que faz sentido pro seu cultivo.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 bg-card px-4 sm:px-6 py-4 border-b-2 border-border">
              <span className="text-sm font-semibold text-foreground col-span-1">Recurso</span>
              <span className="text-sm font-semibold text-green-600 text-center">Hidro</span>
              <span className="text-sm font-semibold text-emerald-700 text-center">Hidro Farm</span>
              <span className="text-sm font-semibold text-blue-600 text-center">Cam</span>
            </div>
            {comparativo.map((row, i) => (
              <div
                key={row.recurso}
                className={`grid grid-cols-4 px-4 sm:px-6 py-3 ${
                  i < comparativo.length - 1 ? "border-b border-border" : ""
                } ${i % 2 === 0 ? "" : "bg-muted/20"}`}
              >
                <span className="text-sm text-foreground col-span-1">{row.recurso}</span>
                <span className="text-center text-lg">{row.hidro ? "✅" : "—"}</span>
                <span className="text-center text-lg">{row.farm ? "✅" : "—"}</span>
                <span className="text-center text-lg">{row.cam ? "✅" : "—"}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/produtos/controle-hidroponia">
              <Button variant="outline" className="w-full gap-2 border-green-500/30 text-green-700 hover:bg-green-500/10">
                <Droplets className="w-4 h-4" />
                Ver Hidro
              </Button>
            </Link>
            <Link to="/produtos/hidro-farm">
              <Button variant="outline" className="w-full gap-2 border-emerald-600/30 text-emerald-800 hover:bg-emerald-600/10">
                <Sparkles className="w-4 h-4" />
                Ver Hidro Farm
              </Button>
            </Link>
            <Link to="/produtos/controle-camera">
              <Button variant="outline" className="w-full gap-2 border-blue-500/30 text-blue-700 hover:bg-blue-500/10">
                <Camera className="w-4 h-4" />
                Ver Cam
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Como Funciona na Prática</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Do recebimento ao primeiro cultivo automatizado em menos de 10 minutos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comoFunciona.map((item) => (
              <div key={item.step} className="relative bg-card border border-border rounded-xl p-6">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2 mt-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-card border border-border rounded-xl p-5 group"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="font-semibold text-foreground pr-4">{faq.q}</h3>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto pra começar?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entrega em todo o Brasil · Garantia de 12 meses · Suporte por WhatsApp · Sem mensalidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/5519992805563" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-green-700 hover:bg-white/90 gap-2">
                Falar no WhatsApp
              </Button>
            </a>
            <a href="https://app.cultivee.com.br/" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-green-700 gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Conhecer o App
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProdutosPage;
