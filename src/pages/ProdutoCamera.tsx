import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { MockupPhone, CamDashboardMockup } from "@/components/mockups/DashboardMockups";
import ConnectionMonitoringSection from "@/components/ConnectionMonitoringSection";
import {
  Camera, Smartphone, Wifi, Shield, Settings, Image as ImageIcon,
  Video, Eye, ExternalLink, ChevronRight, FolderOpen, Zap,
  Clock, Sparkles, Plane
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Captura Agendada",
    description: "Tira fotos em intervalos configuráveis de 1 minuto até 1 hora. Ideal para montar timelapses naturais do cultivo e acompanhar a evolução diária das plantas.",
  },
  {
    icon: Video,
    title: "Transmissão ao Vivo",
    description: "Stream de até 10 minutos direto pelo app. Útil para conferir poda, transplante ou fazer uma visita remota à estufa sem precisar se deslocar.",
  },
  {
    icon: FolderOpen,
    title: "Galeria com Pastas",
    description: "Todas as fotos organizadas automaticamente no app. Selecione múltiplas imagens, mova entre pastas, baixe ou apague em lote com poucos toques.",
  },
  {
    icon: Settings,
    title: "Resolução Configurável",
    description: "SVGA 800×600 para uso padrão, UXGA 1600×1200 quando precisa de detalhe máximo (ex: identificar deficiência nutricional, detectar pragas ou ácaros).",
  },
  {
    icon: Wifi,
    title: "Funciona de Qualquer Lugar",
    description: "Via servidor (4G/WiFi) para captura remota. Ou conecte direto no AP Cultivee-Cam na rede local para stream MJPEG ~10fps sem passar pela internet.",
  },
  {
    icon: Smartphone,
    title: "PWA Instalável",
    description: "Abre pelo navegador, instala como app nativo. Atualizações automáticas via OTA remoto. Todas as fotos disponíveis em qualquer dispositivo da sua conta.",
  },
];

const usageCases = [
  { icon: ImageIcon, title: "Timelapse do Cultivo", desc: "Documente 60 dias em 30 segundos de vídeo.", color: "text-blue-500" },
  { icon: Eye, title: "Detecção Visual de Problemas", desc: "UXGA 1600×1200 para ver pragas e deficiências.", color: "text-purple-500" },
  { icon: Plane, title: "Tranquilidade em Viagens", desc: "Confira as plantas de qualquer lugar, a qualquer hora.", color: "text-green-500" },
  { icon: Sparkles, title: "Mostrar Progresso", desc: "Compartilhe a evolução com clientes ou amigos.", color: "text-yellow-500" },
];

const cameraSpecs = [
  { label: "Sensor", value: "OV2640 (2 MP)" },
  { label: "Resolução padrão", value: "SVGA 800×600" },
  { label: "Resolução máxima", value: "UXGA 1600×1200" },
  { label: "Qualidade JPEG", value: "q4 (máxima) a q15 (leve)" },
  { label: "Stream local", value: "MJPEG ~10fps (rede local)" },
  { label: "Captura remota", value: "Via servidor (qualquer lugar)" },
  { label: "Intervalo de captura", value: "1 minuto a 1 hora" },
  { label: "Duração live", value: "Até 10 minutos por sessão" },
];

const techSpecs = [
  { label: "Microcontrolador", value: "ESP32-WROVER-DEV (com PSRAM)" },
  { label: "PSRAM", value: "8 MB (double-buffering DMA contínuo)" },
  { label: "Conexão", value: "WiFi 2.4GHz (AP + STA)" },
  { label: "Fonte", value: "5V / 2A" },
  { label: "Firmware", value: "Particionamento min_spiffs (OTA habilitado desde v4.1.8)" },
  { label: "Armazenamento", value: "Servidor (galeria com pastas)" },
  { label: "Suporte", value: "Rosca universal 1/4\" (padrão fotográfico)" },
  { label: "Modo Local", value: "AP Cultivee-Cam (192.168.4.1)" },
];

const ProdutoCameraPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-500/10 via-background to-blue-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <ChevronRight className="w-3.5 h-3.5" />
              <li className="text-foreground font-medium">Cultivee Cam</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Camera className="w-4 h-4" />
                Monitoramento Visual
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Cultivee Cam
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Câmera IP standalone pro seu cultivo. Tira fotos programadas,
                transmite ao vivo e organiza tudo numa galeria acessível pelo celular.
                Documente timelapses, detecte problemas visualmente e viaje tranquilo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://app.cultivee.com.br/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
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
              <MockupPhone badge="PWA" badgeColor="bg-blue-500">
                <CamDashboardMockup />
              </MockupPhone>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">O App por Dentro</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interface pensada para capturar rápido, visualizar ao vivo e organizar as fotos por pastas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 place-items-center">
            <div className="text-center">
              <MockupPhone width={240}>
                <CamDashboardMockup />
              </MockupPhone>
              <h3 className="font-semibold text-foreground mt-6 mb-1">Dashboard + Live</h3>
              <p className="text-sm text-muted-foreground max-w-[240px]">
                Preview ao vivo com timestamp, botões de captura e stream, galeria logo abaixo.
              </p>
            </div>

            <div className="text-center">
              <MockupPhone width={240}>
                <CamDashboardMockup />
              </MockupPhone>
              <h3 className="font-semibold text-foreground mt-6 mb-1">Captura Sob Demanda</h3>
              <p className="text-sm text-muted-foreground max-w-[240px]">
                Toque em "Capturar" e em 3–5 segundos a foto aparece no dashboard.
              </p>
            </div>

            <div className="text-center">
              <MockupPhone width={240}>
                <CamDashboardMockup />
              </MockupPhone>
              <h3 className="font-semibold text-foreground mt-6 mb-1">Galeria Organizada</h3>
              <p className="text-sm text-muted-foreground max-w-[240px]">
                Fotos em pastas, seleção múltipla e exclusão em lote — tudo pelo app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Funcionalidades</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tudo que uma câmera de cultivo precisa, sem frescura, sem mensalidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dois fluxos */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Duas Formas de Ver Suas Plantas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Captura remota pela internet ou stream direto na rede local — escolha o que funciona melhor pro momento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Remote Capture */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Captura Remota</h3>
                  <span className="text-xs text-muted-foreground">Via internet — de qualquer lugar</span>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-blue-500 font-bold">1.</span> Toque em "Capturar" no app</li>
                  <li className="flex gap-2"><span className="text-blue-500 font-bold">2.</span> Servidor enfileira o comando pro ESP32</li>
                  <li className="flex gap-2"><span className="text-blue-500 font-bold">3.</span> ESP32 tira a foto e envia pro servidor</li>
                  <li className="flex gap-2"><span className="text-blue-500 font-bold">4.</span> Imagem aparece no app em ~3-5s</li>
                </ol>
              </div>
              <p className="text-xs text-muted-foreground">
                Fotos com timestamp salvas no servidor. Acesse de qualquer dispositivo com sua conta.
              </p>
            </div>

            {/* Local Stream */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Stream ao Vivo Local</h3>
                  <span className="text-xs text-muted-foreground">Via rede local — 192.168.4.1</span>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-purple-500 font-bold">1.</span> Conecte na rede WiFi Cultivee-Cam</li>
                  <li className="flex gap-2"><span className="text-purple-500 font-bold">2.</span> Acesse 192.168.4.1 no navegador</li>
                  <li className="flex gap-2"><span className="text-purple-500 font-bold">3.</span> Toque em "Ao Vivo"</li>
                  <li className="flex gap-2"><span className="text-purple-500 font-bold">4.</span> Stream MJPEG ~10fps até ~60 segundos</li>
                </ol>
              </div>
              <p className="text-xs text-muted-foreground">
                Stream direto do ESP32 sem passar pelo servidor. Reconecta automaticamente ao terminar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Pra Que Serve na Prática</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usageCases.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
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
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Módulo ESP32-WROVER + OV2640</h3>
              <p className="text-sm text-muted-foreground">
                Sensor de 2MP, PSRAM 8MB para buffer duplo. Lente reposicionável para enquadrar o cultivo.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Suporte Universal 1/4"</h3>
              <p className="text-sm text-muted-foreground">
                Mesma rosca de câmera fotográfica — encaixa em tripés, garras e braços articulados comuns.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fonte 5V/2A + Cabo USB Longo</h3>
              <p className="text-sm text-muted-foreground">
                Cabo estendido para flexibilidade de posicionamento dentro de tendas ou estufas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Camera Specs + Tech Specs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Especificações Técnicas</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Camera */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-500" />
                Câmera
              </h3>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {cameraSpecs.map((spec, i) => (
                  <div key={spec.label} className={`flex items-center justify-between px-6 py-3 ${i < cameraSpecs.length - 1 ? 'border-b border-border' : ''}`}>
                    <span className="text-sm font-medium text-foreground">{spec.label}</span>
                    <span className="text-sm text-muted-foreground text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Sistema
              </h3>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {techSpecs.map((spec, i) => (
                  <div key={spec.label} className={`flex items-center justify-between px-6 py-3 ${i < techSpecs.length - 1 ? 'border-b border-border' : ''}`}>
                    <span className="text-sm font-medium text-foreground">{spec.label}</span>
                    <span className="text-sm text-muted-foreground text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combine com Hidro/Farm */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Combine com um Módulo de Automação</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            A Cam é standalone, mas fica ainda mais poderosa quando combinada com um módulo Hidro ou Hidro Farm.
            Um único app, múltiplos módulos na mesma conta.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link to="/produtos/controle-hidroponia" className="group">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all hover:-translate-y-0.5">
                <h3 className="font-semibold text-green-600 mb-1">Cultivee Hidro →</h3>
                <p className="text-xs text-muted-foreground">Automação essencial com 4 relés e 10 fases.</p>
              </div>
            </Link>
            <Link to="/produtos/hidro-farm" className="group">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all hover:-translate-y-0.5">
                <h3 className="font-semibold text-emerald-700 mb-1">Cultivee Hidro Farm →</h3>
                <p className="text-xs text-muted-foreground">Premium com reposição de água e alertas.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Monitoramento de conexão (v4.1.31) */}
      <ConnectionMonitoringSection accent="blue" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Veja suas plantas de qualquer lugar
          </h2>
          <p className="text-white/80 mb-8">
            Crie sua conta e vincule seu módulo Cultivee Cam em minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.cultivee.com.br/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90 gap-2">
                <ExternalLink className="w-4 h-4" />
                Acessar App
              </Button>
            </a>
            <a href="https://wa.me/5519992805563" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-blue-700">
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

export default ProdutoCameraPage;
