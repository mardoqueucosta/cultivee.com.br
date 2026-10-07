import type { ReactNode } from "react";

// Topo de pagina com imagem em tela cheia (direcao de design 2026-10-07): foto do
// estilo da casa ao fundo, degrade verde-escuro da esquerda para a direita para o
// texto ficar legivel, titulo em Lora. `ilustrativa` mostra a legenda discreta
// "Imagem ilustrativa" quando a cena representa algo da Cultivee (estufa, projeto).
type Props = {
  image: string;
  alt: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  ilustrativa?: boolean;
  tall?: boolean;
};

const ImageHero = ({ image, alt, eyebrow, title, subtitle, children, aside, ilustrativa, tall }: Props) => (
  <section
    className={`relative flex items-end overflow-hidden bg-deep text-white ${
      tall ? "min-h-[640px] md:min-h-[680px]" : "min-h-[420px] md:min-h-[460px]"
    }`}
  >
    <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
    <div
      className="absolute inset-0 bg-[linear-gradient(180deg,hsl(157_64%_10%/0.55)_0%,hsl(157_64%_10%/0.9)_70%)] md:bg-[linear-gradient(90deg,hsl(157_64%_10%/0.92)_0%,hsl(157_64%_10%/0.7)_45%,hsl(157_64%_10%/0.15)_100%)]"
      aria-hidden="true"
    />
    <div
      className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 md:pb-16 ${
        aside ? "grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end" : ""
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="text-xs md:text-sm font-bold tracking-[0.14em] uppercase text-sun mb-4">{eyebrow}</div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-white mb-5">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-white/85 leading-relaxed">{subtitle}</p>}
        {children && <div className="flex flex-col sm:flex-row gap-3 mt-8">{children}</div>}
      </div>
      {aside}
    </div>
    {ilustrativa && (
      <span className="absolute bottom-2 right-3 z-10 text-[11px] text-white/60">Imagem ilustrativa</span>
    )}
  </section>
);

export default ImageHero;
