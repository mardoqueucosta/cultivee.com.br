import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { MockupPhone, HidroDashboardMockup, HidroPhasesMockup } from "@/components/mockups/DashboardMockups";
import {
  Droplets, Smartphone, Wifi, Sun, Clock, Shield,
  Zap, ToggleLeft, Layers, ExternalLink, ChevronRight, Timer, Gauge,
  Wind, Waves
} from "lucide-react";

const features = [
  {
    icon: ToggleLeft,
    title: "Controle de 4 Equipamentos",
    description: "Luz, bomba d'água, ventilação e aeração controlados pelo app. Liga e desliga com feedback visual instantâneo e confirmação do estado real do módulo.",
  },
  {
    icon: Clock,
    title: "Até 10 Fases de Cultivo",
    description: "Configure germinação, vegetativo, floração e mais. Cada fase tem seus próprios horários de luz, irrigação, ventilação e aeração. O Hidro troca de fase sozinho.",
  },
  {
    icon: Shield,
    title: "RTC — Funciona Offline",
    description: "Relógio DS3231 embarcado mantém a hora mesmo sem internet ou WiFi. Se a rede cair, o cultivo continua automatizado sem perder um ciclo.",
  },
  {
    icon: Gauge,
    title: "Dashboard em Tempo Real",
    description: "Dia do ciclo, fase atual, status dos 4 relés, sinal WiFi (RSSI), uptime do módulo e IP na rede local — tudo numa tela dark responsiva.",
  },
  {
    icon: Wifi,
    title: "Online e Offline Local",
    description: "Com internet, controle de qualquer lugar. Sem internet, conecte na rede WiFi do módulo (Cultivee-Hidro, 192.168.4.1) para controle local direto.",
  },
  {
    icon: Smartphone,
    title: "PWA Instalável",
    description: "Abre pelo navegador, instala como app nativo na tela inicial. Atualizações automáticas via OTA remoto — sem mensalidade, sem loja de apps.",
  },
];

const equipamentos = [
  { icon: Sun, label: "Iluminação", desc: "Horário ligado/desligado por fase", color: "text-yellow-500" },
  { icon: Droplets, label: "Bomba d'água", desc: "Ciclos dia/noite independentes", color: "text-blue-500" },
  { icon: Wind, label: "Ventilação", desc: "Exaustor/cooler programado", color: "text-cyan-500" },
  { icon: Waves, label: "Aeração", desc: "Pedra porosa / bomba de ar", color: "text-purple-500" },
];

const phases = [
  { name: "Germinação", days: "3 dias", light: "18h ON / 6h OFF", pump: "15/15 min", notes: "Umidade alta" },
  { name: "Vegetativo", days: "17 dias", light: "18h ON / 6h OFF", pump: "15/15 min dia", notes: "Ventilação ativa" },
  { name: "Floração", days: "∞", light: "12h ON / 12h OFF", pump: "15/45 min", notes: "Ciclo curto" },
];

const techSpecs = [
  { label: "Microcontrolador", value: "ESP32-WROOM-32D" },
  { label: "Relés", value: "4 canais (10A cada, opticamente isolados)" },
  { label: "RTC", value: "DS3231 (relógio offline com bateria)" },
  { label: "Conexão", value: "WiFi 2.4GHz (AP + STA)" },
  { label: "Fonte", value: "5V / 2A" },
  { label: "Firmware", value: "Particionamento min_spiffs (OTA habilitado)" },
  { label: "Servidor", value: "app.cultivee.com.br (Flask + SQLite)" },
  { label: "Modo Local", value: "AP Cultivee-Hidro (192.168.4.1)" },
];

const ProdutoHidroponiaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-500/10 via-background to-green-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <ChevronRight className="w-3.5 h-3.5" />
              <li className="text-foreground font-medium">Cultivee Hidro</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Droplets className="w-4 h-4" />
                Automação Essencial
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Cultivee Hidro
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Automatize os 4 equipamentos fundamentais do cultivo indoor —
                luz, bomba, ventilação e aeração — com até 10 fases configuráveis.
                Relógio offline embarcado: se a internet cair, seu cultivo continua.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://app.cultivee.com.br/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
                    <ExternalLink className="w-4 h-4" />
                    Acessar App
                  </Button>
                </a>
                <a href="https://wa.me/5519992805563" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2">
                    Falar com a equipe
                  </Button>
                </a>
              </div>
            </div>

            {/* Mockup ao vivo */}
            <div className="flex justify-center">
              <MockupPhone badge="PWA" badgeColor="bg-green-500">
                <HidroDashboardMockup />
              </MockupPhone>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Equipamentos */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Controla os 4 Equipamentos Fundamentais</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tudo que um cultivo indoor precisa, numa única caixa. Sem timers analógicos, sem esquecimento.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipamentos.map((eq) => (
              <div key={eq.label} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  <eq.icon className={`w-7 h-7 ${eq.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{eq.label}</h3>
                <p className="text-sm text-muted-foreground">{eq.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">O App por Dentro</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dashboard com status do módulo, controles dos 4 relés e sistema de fases configuráveis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 place-items-center">
            <div className="text-center">
              <MockupPhone>
                <HidroDashboardMockup />
              </MockupPhone>
              <h3 className="font-semibold text-foreground mt-6 mb-1">Dashboard Principal</h3>
              <p className="text-sm text-muted-foreground max-w-[280px]">
                Dia do ciclo, fase atual, status dos 4 relés, modo automático e botões manuais.
              </p>
            </div>

            <div className="text-center">
              <MockupPhone>
                <HidroPhasesMockup />
              </MockupPhone>
              <h3 className="font-semibold text-foreground mt-6 mb-1">Fases Configuradas</h3>
              <p className="text-sm text-muted-foreground max-w-[280px]">
                Até 10 fases com duração, horários de luz e ciclos de irrigação independentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Funcionalidades</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Controle completo do cultivo em uma interface simples, dark e responsiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemplo de fases */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Exemplo de Configuração</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Configure até 10 fases. O sistema conta os dias sozinho e troca automaticamente — nunca mais esquecer de ajustar o timer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((phase, i) => (
              <div key={phase.name} className="bg-card border border-border rounded-xl p-6 relative">
                {i === 1 && (
                  <span className="absolute top-3 right-3 bg-green-500/10 text-green-600 text-xs font-bold px-2 py-1 rounded-full">
                    ATIVA
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-green-600 font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{phase.name}</h3>
                    <span className="text-xs text-muted-foreground">{phase.days}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span>Luz: {phase.light}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>Bomba: {phase.pump}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Timer className="w-4 h-4 text-indigo-500" />
                    <span>{phase.notes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware incluso */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Hardware Incluso</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Módulo ESP32 + RTC</h3>
              <p className="text-sm text-muted-foreground">
                ESP32-WROOM-32D com WiFi 2.4GHz e relógio RTC DS3231 embarcado para automação offline confiável.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <ToggleLeft className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Módulo de 4 Relés</h3>
              <p className="text-sm text-muted-foreground">
                4 canais opticamente isolados, 10A cada. Aguenta luz, bombas, exaustores e compressores pequenos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Gabinete + Fonte 5V/2A</h3>
              <p className="text-sm text-muted-foreground">
                Gabinete plástico com ventilação passiva, fonte chaveada e cabos de ligação prontos para usar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Especificações Técnicas</h2>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {techSpecs.map((spec, i) => (
              <div key={spec.label} className={`flex items-center justify-between px-6 py-4 ${i < techSpecs.length - 1 ? 'border-b border-border' : ''}`}>
                <span className="text-sm font-medium text-foreground">{spec.label}</span>
                <span className="text-sm text-muted-foreground text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indicado para */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Indicado Para</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            O Hidro é a escolha ideal para quem está começando ou tem um setup simples.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Cultivo caseiro", "Tendas de cultivo (grow tents)", "Estufas pequenas", "Sistemas DWC", "Hidroponia básica"].map((item) => (
              <span key={item} className="bg-green-500/10 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-10 p-6 bg-muted/50 border border-border rounded-xl max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Precisa de <strong className="text-foreground">reposição automática de água</strong>, <strong className="text-foreground">alertas no celular</strong> ou <strong className="text-foreground">sensor de temperatura/umidade</strong>?
              Conheça o <Link to="/produtos/hidro-farm" className="text-green-600 font-semibold hover:underline">Cultivee Hidro Farm Premium →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comece a automatizar seu cultivo
          </h2>
          <p className="text-white/80 mb-8">
            Crie sua conta gratuitamente e vincule seu módulo Cultivee Hidro em minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.cultivee.com.br/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-green-700 hover:bg-white/90 gap-2">
                <ExternalLink className="w-4 h-4" />
                Acessar App
              </Button>
            </a>
            <a href="https://wa.me/5519992805563" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-green-700">
                Falar no WhatsApp
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

export default ProdutoHidroponiaPage;
