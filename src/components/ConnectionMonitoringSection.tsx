import { Activity, TrendingUp, History, Clock, ShieldCheck } from "lucide-react";

type Accent = "green" | "emerald" | "blue";

interface ConnectionMonitoringSectionProps {
  accent: Accent;
}

const ACCENT_MAP: Record<Accent, { bg: string; text: string; ring: string; cta: string }> = {
  green: {
    bg: "bg-green-500/10",
    text: "text-green-600",
    ring: "ring-green-500/20",
    cta: "text-green-700",
  },
  emerald: {
    bg: "bg-emerald-600/10",
    text: "text-emerald-700",
    ring: "ring-emerald-600/20",
    cta: "text-emerald-800",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    ring: "ring-blue-500/20",
    cta: "text-blue-700",
  },
};

/**
 * Seção reutilizável sobre o monitoramento contínuo de conexão (v4.1.31 da
 * plataforma). Mesma estrutura nas 3 páginas de produto — só muda a cor do
 * acento pra respeitar o pilar de cada módulo.
 */
const ConnectionMonitoringSection = ({ accent }: ConnectionMonitoringSectionProps) => {
  const c = ACCENT_MAP[accent];

  const cards = [
    {
      icon: Activity,
      title: "Status agora",
      desc: "Sinal Wi-Fi em tempo real, tempo desde a última conexão e quando chegou a última leitura. Verifica num toque se tudo está de pé.",
    },
    {
      icon: TrendingUp,
      title: "Confiabilidade no período",
      desc: "Percentual de tempo online nos últimos 7, 30 ou 60 dias. Quantas quedas, qual foi a mais longa e a hora exata de cada uma.",
    },
    {
      icon: History,
      title: "Timeline de 90 dias",
      desc: "Cada conexão e desconexão registrada com horário, duração e motivo (Wi-Fi fraco, falha no roteador, etc.). Acesso direto pelo painel.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${c.bg} ${c.text} px-3 py-1.5 rounded-full text-xs font-medium mb-4`}>
            <Activity className="w-3.5 h-3.5" />
            Monitoramento Contínuo
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Você sempre sabe se seu cultivo está conectado
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada dispositivo Cultivee reporta status ao servidor a cada poucos segundos.
            Quedas de Wi-Fi, roteador ou energia são detectadas automaticamente e ficam
            registradas por <strong className="text-foreground">até 90 dias</strong> — sem
            você precisar configurar nada.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all ring-1 ${c.ring}`}
            >
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                <card.icon className={`w-6 h-6 ${c.text}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefícios práticos em linha única (versão mais compacta dos bullets) */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheck className={`w-5 h-5 ${c.text} flex-shrink-0 mt-0.5`} />
            <h3 className="font-semibold text-foreground">
              Por que isso importa
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm text-muted-foreground pl-8">
            <li className="list-disc">
              <strong className="text-foreground">Diagnóstico de rede:</strong> veja se quedas se repetem em horários específicos — sinal de que um repetidor Wi-Fi no galpão resolveria.
            </li>
            <li className="list-disc">
              <strong className="text-foreground">Prova do que aconteceu:</strong> registro detalhado pra conferir com seguro, garantia ou técnico em caso de perda.
            </li>
            <li className="list-disc">
              <strong className="text-foreground">Tranquilidade em viagens:</strong> ao voltar, você vê um resumo de tudo — se o cultivo ficou online 99% do tempo, não precisa se preocupar.
            </li>
            <li className="list-disc">
              <strong className="text-foreground">Dados seus, exportáveis:</strong> pode baixar o histórico completo a qualquer momento (LGPD garantida).
            </li>
          </ul>
          <div className={`mt-6 pt-5 border-t border-border flex items-center gap-2 text-xs ${c.cta}`}>
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              Ativo desde a primeira ligação do kit · Sem configuração · Sem custo extra
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectionMonitoringSection;
