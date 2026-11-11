import { ArrowRight, BookOpen, Clock, MessagesSquare } from "lucide-react";

// Ofertas de captacao dentro dos artigos do funil de fomento (frontmatter `funil: 'fomento'`), 11/11/2026.
// O leitor do artigo nao chegava a /fomento: a unica chamada ficava no fim, depois da bio e dos
// relacionados. Agora sao tres pontos de contato, cada um com o seu `?de=` (a /fomento herda a origem
// pelo medicao.js) e o evento GA4 `clique_oferta_fomento` {posicao, servico, artigo}:
//   topo  : uma linha logo abaixo do resumo, dizendo que o autor faz esse trabalho;
//   meio  : cartao no meio do artigo, com o servico que combina com o programa do artigo;
//   fim   : os tres servicos lado a lado, no lugar do CTA verde generico.
// Textos seguem captacao-recursos/vendas/MENSAGEM-FOMENTO.md: sem travessao, sem "mentoria",
// sem "a gente", sem promessa de aprovacao, so valores da lista (R$ 290, R$ 497).

type Posicao = "topo" | "meio" | "fim";
type Servico = "consultoria" | "curso" | "acompanhamento" | "servicos";

// [padrao do slug, "ao/à <programa>" (pergunta do meio), "o/a <programa>" (titulo do fim)]
const PROGRAMAS: [RegExp, string, string][] = [
  [/pipe/, "ao PIPE-FAPESP", "o PIPE-FAPESP"],
  [/cnpq/, "ao CNPq", "o CNPq"],
  [/centelha/, "ao Centelha", "o Centelha"],
  [/finep|subvencao/, "à Finep", "a Finep"],
  [/sebraetec/, "ao Sebraetec", "o Sebraetec"],
  [/lei-do-bem/, "à Lei do Bem", "a Lei do Bem"],
];

function programaDoArtigo(slug: string): { ao: string; o: string } | null {
  for (const [re, ao, o] of PROGRAMAS) if (re.test(slug)) return { ao, o };
  return null;
}

// O curso e' do PIPE Fase 1 e ensina a escrever o projeto: aparece no meio so onde o tema e' esse.
function cursoCombina(slug: string) {
  return /pipe-fapesp-fase-1|modelo-de-projeto|como-elaborar-um-projeto/.test(slug);
}

function href(base: string, slug: string, posicao: Posicao) {
  return `${base}?de=${encodeURIComponent(`artigo-${slug}-${posicao}`.slice(0, 80))}`;
}

function medir(posicao: Posicao, servico: Servico, slug: string) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "clique_oferta_fomento", { posicao, servico, artigo: slug, transport_type: "beacon" });
}

type Props = { slug: string; posicao: Posicao };

const OfertaFomento = ({ slug, posicao }: Props) => {
  const programa = programaDoArtigo(slug);
  const link = (base: string, servico: Servico) => ({
    href: href(base, slug, posicao),
    onClick: () => medir(posicao, servico, slug),
  });

  if (posicao === "topo") {
    return (
      <p className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 px-5 py-4 mb-8 text-sm text-foreground leading-relaxed">
        <MessagesSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          Escrevo este guia porque trabalho com captação: participei de 18 financiamentos aprovados e já avaliei
          dezenas de projetos de outros pesquisadores.{" "}
          <a {...link("/fomento", "servicos")} className="font-semibold text-primary underline underline-offset-2">
            Veja como posso ajudar no seu projeto
          </a>
        </span>
      </p>
    );
  }

  if (posicao === "meio") {
    const comCurso = cursoCombina(slug);
    return (
      <aside
        className="not-prose my-10 rounded-2xl border border-primary/30 bg-primary/10 p-6 md:p-8"
        aria-label="Ajuda para escrever o seu projeto"
      >
        <div className="text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2">
          {programa ? `Vai submeter ${programa.ao}?` : "Vai submeter um projeto?"}
        </div>
        <p className="text-xl md:text-2xl font-semibold text-foreground leading-snug mb-3">
          Leio o seu projeto pelo critério de avaliação do edital, antes de você enviar.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Na consultoria por hora eu leio o seu projeto ou a sua ideia e digo qual edital cabe, o que está
          forte, o que falta e qual o próximo passo. 1 hora, R$ 290, no Pix ou em até 12x no cartão.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            {...link("/fomento", "consultoria")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Ver a consultoria por hora <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          {comCurso ? (
            <a
              {...link("/fomento/curso-pipe-fapesp", "curso")}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-background px-6 py-3 font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              Prefiro escrever sozinho: curso online (R$ 497)
            </a>
          ) : (
            <a
              {...link("/fomento", "servicos")}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-background px-6 py-3 font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              Ver todos os serviços
            </a>
          )}
        </div>
      </aside>
    );
  }

  // fim: os tres servicos, como no quadro de precos da /fomento
  const cartoes = [
    {
      servico: "consultoria" as Servico,
      icone: Clock,
      selo: "Comece por aqui",
      titulo: "Consultoria por hora",
      preco: "R$ 290",
      sufixo: "/ 1 hora",
      texto: "Leio o seu projeto ou a sua ideia e digo qual edital cabe, o que está forte, o que falta e qual o próximo passo.",
      botao: "Ver a consultoria",
      base: "/fomento",
    },
    {
      servico: "curso" as Servico,
      icone: BookOpen,
      selo: "Acesso imediato",
      titulo: "Curso online PIPE Fase 1",
      preco: "R$ 497",
      sufixo: "",
      texto: "Para quem quer escrever sozinho, com método: da ideia à submissão no SAGe, com a pasta-modelo e a norma da FAPESP.",
      botao: "Ver as aulas",
      base: "/fomento/curso-pipe-fapesp",
    },
    {
      servico: "acompanhamento" as Servico,
      icone: MessagesSquare,
      selo: "",
      titulo: "Acompanhamento",
      preco: "Valor combinado",
      sufixo: "",
      texto: "Você escreve, eu acompanho do diagnóstico à submissão, lendo cada parte pelos critérios do edital. FAPESP, CNPq, Centelha, Finep e outros.",
      botao: "Ver o acompanhamento",
      base: "/fomento",
    },
  ];

  return (
    <section className="bg-deep py-16" aria-labelledby="oferta-fomento-titulo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs md:text-sm font-bold tracking-[0.14em] uppercase text-sun mb-3">
            Captação de recursos
          </div>
          <h2 id="oferta-fomento-titulo" className="text-3xl md:text-4xl text-white mb-4">
            {programa ? `Precisa de ajuda com o seu projeto para ${programa.o}?` : "Precisa de ajuda com o seu projeto?"}
          </h2>
          <p className="text-lg text-white/80">
            Três jeitos de trabalhar, do mais rápido ao mais completo. Preço fixo, nunca percentual sobre o recurso.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {cartoes.map((c) => (
            <div key={c.servico} className="relative flex flex-col rounded-2xl bg-background p-6 pt-8">
              {c.selo && (
                <span className="absolute -top-3 left-6 rounded-full bg-sun px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-deep">
                  {c.selo}
                </span>
              )}
              <c.icone className="w-7 h-7 text-primary mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-foreground">{c.titulo}</h3>
              <div className="mt-2 mb-3">
                <span className="text-2xl font-bold text-primary">{c.preco}</span>
                {c.sufixo && <span className="text-sm text-muted-foreground"> {c.sufixo}</span>}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.texto}</p>
              <a
                {...link(c.base, c.servico)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {c.botao} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-white/70 mt-8">
          Prefere conversar antes?{" "}
          <a
            href="https://wa.me/5519991644181"
            data-origem={`artigo-fomento-fim`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline underline-offset-2"
          >
            Fale no WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
};

export default OfertaFomento;
