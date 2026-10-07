import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { cursosCultivo, cursosNegocios, guiasDestaque } from "@/data/cursos";

// Secoes da home (direcao de design 2026-10-07): cursos nas duas trilhas, faixa de
// Projetos e guias em destaque. Substituem PillarsSection e WhySection.

const SectionHead = ({
  title,
  text,
  link,
}: {
  title: string;
  text: string;
  link?: { to: string; label: string };
}) => (
  <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
    <div>
      <h2 className="text-3xl md:text-4xl text-foreground">{title}</h2>
      <p className="text-muted-foreground mt-2 max-w-xl">{text}</p>
    </div>
    {link && (
      <Link to={link.to} className="font-bold text-deep hover:text-agro inline-flex items-center gap-1">
        {link.label} <ArrowRight className="w-4 h-4" />
      </Link>
    )}
  </div>
);

export const HomeCursos = () => (
  <>
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          title="Trilha Cultivo"
          text="Para quem quer produzir: técnica, equipamento e manejo. Os cursos estão em produção, com lista de espera."
          link={{ to: "/educa", label: "Todos os cursos" }}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursosCultivo.map((c) => (
            <CourseCard key={c.title} course={c} />
          ))}
        </div>
      </div>
    </section>
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          title="Trilha Negócios"
          text="Para quem quer transformar conhecimento em empresa, projeto financiado e venda."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursosNegocios.map((c) => (
            <CourseCard key={c.title} course={c} />
          ))}
        </div>
      </div>
    </section>
  </>
);

export const HomeProjetos = () => (
  <section className="py-20 bg-deep text-white/85">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
      <figure className="relative">
        <img
          src="/img/site/projetos-faixa.jpg"
          alt="Alfaces vivas em vasos num expositor urbano"
          className="w-full aspect-[4/3] object-cover rounded-3xl"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="absolute bottom-3 right-4 text-[11px] text-white/70">Imagem ilustrativa</figcaption>
      </figure>
      <div>
        <div className="text-xs font-bold tracking-[0.14em] uppercase text-sun">Projetos</div>
        <h2 className="text-3xl md:text-4xl text-white mt-3">Pesquisa aplicada com financiamento público</h2>
        <p className="mt-4 text-lg">
          Um sistema de produção, distribuição e venda de hortaliças em ambiente urbano, em
          desenvolvimento pela Cultivee com apoio da FAPESP.
        </p>
        <dl className="grid grid-cols-2 gap-6 my-8">
          <div className="border-t border-white/20 pt-3">
            <dt className="text-2xl font-extrabold text-sun">PIPE Fase 1</dt>
            <dd>FAPESP 2025/27266-8</dd>
          </div>
          <div className="border-t border-white/20 pt-3">
            <dt className="text-2xl font-extrabold text-sun">2026 a 2027</dt>
            <dd>em execução</dd>
          </div>
        </dl>
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 rounded-full bg-sun text-deep font-bold px-7 py-3.5 hover:brightness-105 transition"
        >
          Ver projetos <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </section>
);

export const GuiasGrid = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {guiasDestaque.map((g) => (
      <Link key={g.slug} to={`/blog/${g.slug}`} className="group">
        <img
          src={g.image}
          alt=""
          className="w-full aspect-video object-cover rounded-2xl mb-4 transition-transform duration-300 group-hover:-translate-y-1"
          loading="lazy"
          decoding="async"
        />
        <div className="text-xs font-bold tracking-[0.1em] uppercase text-agro">{g.tema}</div>
        <h3 className="text-lg font-bold text-foreground mt-1 group-hover:text-agro transition-colors">{g.titulo}</h3>
      </Link>
    ))}
  </div>
);

export const HomeGuias = () => (
  <section className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHead
        title="Comece por aqui"
        text="Os guias mais lidos do blog, sempre com a fonte do dado."
        link={{ to: "/blog", label: "Ir para o blog" }}
      />
      <GuiasGrid />
    </div>
  </section>
);
