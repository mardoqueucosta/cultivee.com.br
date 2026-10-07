import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageHero from "@/components/ImageHero";

// Topo da home (direcao de design 2026-10-07, "escola do agro"): foto da estufa no
// estilo da casa, definicao da marca (GEO) e quatro atalhos para as frentes.
const tiles = [
  { title: "Trilha Cultivo", text: "Microverdes, hidroponia e cultivo indoor", href: "/educa#cultivo" },
  { title: "Trilha Negócios", text: "Captação de recursos, projetos e vendas", href: "/educa#negocios" },
  { title: "Guias e cotações", text: "Conteúdo com fonte, CEPEA todo dia útil", href: "/agro" },
  { title: "Projetos", text: "PIPE FAPESP em execução", href: "/projetos" },
];

const HeroSection = () => (
  <>
    <ImageHero
      tall
      ilustrativa
      image="/img/site/hero-home.jpg"
      alt="Estufa de hidroponia com alfaces em canais de PVC ao fim da tarde"
      eyebrow="Instituto de ensino, pesquisa e inovação"
      title="Onde conhecimento vira colheita"
      subtitle={
        // Definicao extraivel da marca (GEO): frase "A Cultivee e..." citavel isolada.
        <>
          A Cultivee é um instituto de ensino, pesquisa e inovação no agro, incubado na ESALQTec, em
          Piracicaba-SP: conteúdo gratuito sobre o campo, cursos de cultivo e de negócios, e pesquisa
          aplicada com financiamento público.
        </>
      }
      aside={
        <div className="grid grid-cols-2 gap-3">
          {tiles.map((t) => (
            <Link
              key={t.title}
              to={t.href}
              className="group rounded-2xl border border-white/15 bg-deep/80 backdrop-blur-sm p-5 min-h-[128px] flex flex-col justify-between hover:bg-deep-light transition-colors"
            >
              <span className="font-bold text-white">{t.title}</span>
              <span className="text-sm text-white/75">{t.text}</span>
            </Link>
          ))}
        </div>
      }
    >
      <Link
        to="/educa"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-sun text-deep font-bold px-7 py-3.5 hover:brightness-105 transition"
      >
        Conhecer os cursos <ArrowRight className="w-5 h-5" />
      </Link>
      <Link
        to="/agro"
        className="inline-flex items-center justify-center rounded-full border-2 border-white/60 text-white font-bold px-7 py-3.5 hover:bg-white/10 transition"
      >
        Conteúdo gratuito
      </Link>
    </ImageHero>

    {/* Faixa de credibilidade: so fatos verificaveis (processo publico na BV FAPESP). */}
    <div className="bg-deep text-white/80 text-sm">
      <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-center gap-x-8 gap-y-2">
        <li>
          <strong className="text-white">Incubada na ESALQTec</strong> (ESALQ/USP)
        </li>
        <li>
          <strong className="text-white">PIPE FAPESP</strong> 2025/27266-8
        </li>
        <li>
          <strong className="text-white">Cotações CEPEA</strong> atualizadas todo dia útil
        </li>
      </ul>
    </div>
  </>
);

export default HeroSection;
