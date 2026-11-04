/**
 * Minigrafica da linha do painel: os ultimos pontos da serie, sem eixo.
 *
 * Renderiza no BUILD (SVG puro, sem JS), a partir dos `recentes` do resumo, para
 * que a tendencia esteja no HTML junto do numero. E' figura de apoio: o valor, a
 * variacao e as datas estao nas colunas ao lado, e o grafico completo fica abaixo.
 */
export function Sparkline({
  pontos,
  rotulo,
  largura = 96,
  altura = 28,
}: {
  pontos?: [string, number][];
  rotulo: string;
  largura?: number;
  altura?: number;
}) {
  if (!pontos || pontos.length < 2) return null;
  const vals = pontos.map((p) => p[1]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const faixa = max - min || 1;
  const pad = 3;
  const xy = vals.map((v, i) => [
    pad + (i / (vals.length - 1)) * (largura - 2 * pad),
    pad + (1 - (v - min) / faixa) * (altura - 2 * pad),
  ]);
  const d = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [ux, uy] = xy[xy.length - 1];
  return (
    <svg
      width={largura}
      height={altura}
      viewBox={`0 0 ${largura} ${altura}`}
      role="img"
      aria-label={`Tendência de ${rotulo} de ${pontos[0][0]} a ${pontos[pontos.length - 1][0]}`}
      className="inline-block align-middle"
    >
      <path d={d} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5"
            strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={ux} cy={uy} r="2.5" fill="hsl(var(--primary))" />
    </svg>
  );
}
