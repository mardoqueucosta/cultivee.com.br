import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import {
  Droplets, Smartphone, Sun, Clock, Shield, Bell, Mail,
  Zap, ToggleLeft, Layers, ExternalLink, ChevronRight, Thermometer,
  Wind, Waves, Beaker, Sparkles, Gauge, AlertTriangle
} from "lucide-react";

const premiumFeatures = [
  {
    icon: Droplets,
    title: "Reposição Automática de Água",
    description: "Duas boias reed-switch (alimentícias, aço inox) monitoram o reservatório 24/7. Válvula solenoide abre quando o nível baixa e fecha quando enche. Nunca mais ficar sem água durante uma viagem.",
  },
  {
    icon: Bell,
    title: "Alertas Push + E-mail",
    description: "Se o reservatório não encher em X minutos (configurável de 1 a 120 min), você recebe notificação push no celular e e-mail com detalhes. Timer visual pulsa no dashboard.",
  },
  {
    icon: Thermometer,
    title: "Temperatura + Umidade",
    description: "Sensor DHT11 integrado reporta temperatura e umidade ambiente em tempo real. Detecte problemas de clima antes das plantas sofrerem.",
  },
  {
    icon: Beaker,
    title: "Bomba de Homogeneização",
    description: "Circuito separado, controlado manualmente pelo app, para misturar nutrientes no reservatório antes do ciclo de irrigação. Garante solução homogênea.",
  },
  {
    icon: ToggleLeft,
    title: "6 Relés de Controle",
    description: "Luz, bomba de irrigação, ventilação, aeração, válvula de entrada e bomba de homogeneização — todos em 8 canais opticamente isolados, 10A cada (2 livres para expansão).",
  },
  {
    icon: Sparkles,
    title: "Tudo do Hidro + Mais",
    description: "Sistema de 10 fases, RTC DS3231 offline, PWA instalável, modo local (AP WiFi), OTA remoto. Toda a base do Hidro somada aos recursos premium.",
  },
];

const alertTimeline = [
  { time: "00:00", event: "Nível cai abaixo da boia baixa", color: "text-yellow-500", icon: AlertTriangle },
  { time: "00:05", event: "Válvula abre automaticamente", color: "text-blue-500", icon: Droplets },
  { time: "10:00", event: "Alerta push + e-mail disparado (se não encher)", color: "text-red-500", icon: Bell },
  { time: "12:34", event: "Reservatório enche → válvula fecha → alerta para", color: "text-green-500", icon: Shield },
];

const techSpecs = [
  { label: "Microcontrolador", value: "ESP32-WROOM-32D" },
  { label: "Relés", value: "8 canais (6 em uso + 2 livres, 10A cada)" },
  { label: "Sensores de nível", value: "2 boias reed-switch (aço inox, alimentícias)" },
  { label: "Sensor ambiente", value: "DHT11 (temperatura + umidade)" },
  { label: "RTC", value: "DS3231 (relógio offline com bateria)" },
  { label: "Conexão", value: "WiFi 2.4GHz (AP + STA)" },
  { label: "Fonte", value: "5V / 3A reforçada" },
  { label: "Firmware", value: "Particionamento min_spiffs (OTA habilitado)" },
  { label: "Modo Local", value: "AP Cultivee-HidroFarm (192.168.4.1)" },
  { label: "Servidor", value: "app.cultivee.com.br (Flask + SQLite)" },
];

const comparacao = [
  { feature: "Controle de luz, bomba, ventilação, aeração", hidro: true, farm: true },
  { feature: "Sistema de 10 fases automáticas", hidro: true, farm: true },
  { feature: "RTC (relógio offline)", hidro: true, farm: true },
  { feature: "PWA + modo local (AP WiFi)", hidro: true, farm: true },
  { feature: "Atualizações OTA remotas", hidro: true, farm: true },
  { feature: "Reposição automática de água", hidro: false, farm: true },
  { feature: "Alertas push + e-mail", hidro: false, farm: true },
  { feature: "Sensor temperatura + umidade (DHT11)", hidro: false, farm: true },
  { feature: "Bomba de homogeneização", hidro: false, farm: true },
  { feature: "8 relés (vs 4 do Hidro)", hidro: false, farm: true },
];

const ProdutoHidroFarmPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-600/10 via-background to-emerald-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <ChevronRight className="w-3.5 h-3.5" />
              <li className="text-foreground font-medium">Cultivee Hidro Farm</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-600/10 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Premium · Para cultivo sério
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Cultivee Hidro Farm
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Tudo do Hidro + reposição automática de água, alertas no celular,
                sensor de temperatura/umidade e bomba de homogeneização. A versão
                definitiva para hidroponia NFT, gotejamento e cultivo comercial de pequeno porte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://app.cultivee.com.br/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-emerald-700 hover:bg-emerald-800">
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

            {/* Screenshot */}
            <div className="flex justify-center">
              <div className="relative w-[280px]">
                <div className="rounded-[2rem] overflow-hidden border-4 border-gray-800 shadow-2xl bg-[#0f1923]">
                  <img
                    src="/produtos/hidro-dashboard.jpg"
                    alt="Cultivee Hidro Farm — Dashboard Premium"
                    className="w-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  PREMIUM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que ele faz a mais */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">O Que o Hidro Farm Faz a Mais</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recursos premium pensados pra quem não quer perder uma planta por esquecimento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature) => (
              <div key={feature.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona o reservatório */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Como Funciona a Reposição Automática</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Máquina de estados com histerese: sem falsos disparos, sem vazamentos por sensor bugado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Diagrama conceitual */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="font-semibold text-foreground mb-6 text-center">Estados do Reservatório</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Cheio · Válvula fechada</div>
                    <div className="text-xs text-muted-foreground">Ambas as boias ativas → reservatório no nível máximo.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Enchendo · Válvula aberta</div>
                    <div className="text-xs text-muted-foreground">Boia baixa ativa, boia alta ainda não. Histerese evita liga-desliga.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Vazio · Alerta inicia</div>
                    <div className="text-xs text-muted-foreground">Timer conta quanto tempo está vazio. Se passar do limite, dispara alertas.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Erro · Válvula fechada por segurança</div>
                    <div className="text-xs text-muted-foreground">Boia alta ON mas baixa OFF (impossível) → sensor defeituoso, fecha tudo.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-semibold text-foreground mb-6 text-center">Exemplo Real de Alerta</h3>
              <div className="relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-border"></div>
                <div className="space-y-6">
                  {alertTimeline.map((item) => (
                    <div key={item.time} className="relative flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center flex-shrink-0 z-10">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="flex-1 bg-card border border-border rounded-lg p-4">
                        <div className="text-xs font-mono text-muted-foreground mb-1">+{item.time}</div>
                        <div className="text-sm text-foreground">{item.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-4 bg-emerald-600/5 border border-emerald-600/20 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Threshold configurável (1 a 120 min):</strong> ajuste o tempo máximo de nível baixo antes do alerta disparar, direto pelo app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alertas multicanal */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Você É Avisado de 3 Formas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Redundância pensada para não perder nenhum alerta, mesmo de férias ou com o app fechado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Push no Celular</h3>
              <p className="text-sm text-muted-foreground">
                Notificação push do sistema (PWA), funciona mesmo com o app fechado. Toca som, aparece na central.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">E-mail com Detalhes</h3>
              <p className="text-sm text-muted-foreground">
                E-mail completo do alerta em <code className="text-xs bg-muted px-1.5 py-0.5 rounded">contato@cultivee.com.br</code> para o e-mail configurado.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4">
                <Gauge className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Timer Visual no App</h3>
              <p className="text-sm text-muted-foreground">
                Contador no dashboard: "Nível baixo há 4min 32s" em laranja, pulsando em vermelho após o threshold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware incluso */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Hardware Incluso</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Módulo ESP32 Hidro Farm", desc: "ESP32-WROOM-32D com RTC DS3231 embarcado", color: "orange" },
              { icon: ToggleLeft, title: "Módulo de 8 Relés", desc: "6 em uso + 2 livres, 10A cada, opticamente isolados", color: "emerald" },
              { icon: Waves, title: "2× Boias Reed-Switch", desc: "Aço inox, uso alimentício, cabos blindados", color: "blue" },
              { icon: Thermometer, title: "Sensor DHT11", desc: "Temperatura e umidade ambiente", color: "red" },
              { icon: Shield, title: "Fonte 5V / 3A Reforçada", desc: "Dissipação melhorada para carga maior", color: "purple" },
              { icon: Layers, title: "Gabinete Premium", desc: "Slots livres para sensores extras (pH, EC, CO₂ — em breve)", color: "slate" },
            ].map((item) => {
              const colorMap: Record<string, string> = {
                orange: "bg-orange-500/10 text-orange-500",
                emerald: "bg-emerald-600/10 text-emerald-700",
                blue: "bg-blue-500/10 text-blue-500",
                red: "bg-red-500/10 text-red-500",
                purple: "bg-purple-500/10 text-purple-500",
                slate: "bg-slate-500/10 text-slate-500",
              };
              return (
                <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[item.color]}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparação com Hidro */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Hidro Farm vs Hidro</h2>
            <p className="text-muted-foreground">
              Comparativo direto entre os dois módulos de automação.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-muted/50 px-6 py-3 border-b border-border">
              <span className="text-sm font-semibold text-foreground">Recurso</span>
              <span className="text-sm font-semibold text-green-600 text-center">Hidro</span>
              <span className="text-sm font-semibold text-emerald-700 text-center">Hidro Farm</span>
            </div>
            {comparacao.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 px-6 py-3 ${i < comparacao.length - 1 ? 'border-b border-border' : ''}`}>
                <span className="text-sm text-foreground">{row.feature}</span>
                <span className="text-center">{row.hidro ? '✅' : '—'}</span>
                <span className="text-center">{row.farm ? '✅' : '—'}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/produtos/controle-hidroponia" className="text-sm text-green-600 hover:underline">
              ← Conhecer o Cultivee Hidro
            </Link>
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
            Para quem leva o cultivo a sério e quer tranquilidade total.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Hidroponia NFT", "Sistemas de gotejamento", "Estufas comerciais pequenas", "Cultivo em maior escala", "Viveiros profissionais"].map((item) => (
              <span key={item} className="bg-emerald-600/10 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Automatize, monitore, durma tranquilo
          </h2>
          <p className="text-white/80 mb-8">
            Crie sua conta e vincule seu módulo Cultivee Hidro Farm em minutos. Alertas no celular incluídos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.cultivee.com.br/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-emerald-800 hover:bg-white/90 gap-2">
                <ExternalLink className="w-4 h-4" />
                Acessar App
              </Button>
            </a>
            <a href="https://wa.me/5519992805563" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-emerald-800">
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

export default ProdutoHidroFarmPage;
