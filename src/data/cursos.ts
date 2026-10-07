// Cursos do Cultivee Educa (fonte unica para a home e a pagina /educa).
// Status honesto (decisao do dono 2026-10-07): nenhum curso aberto; Cultivo em
// producao com lista de espera pelo WhatsApp; Negocios com a mentoria de captacao
// funcionando (landing estatica /fomento, por isso `external`).
// Imagens: geradas no estilo da casa (02-Gerador-imagem-API/gerar_site_cultivee.py).

const WHATSAPP = "https://wa.me/5519991644181?text=";

export type Curso = {
  title: string;
  description: string;
  status: string;
  href: string;
  external?: boolean;
  cta: string;
  image: string;
};

export const cursosCultivo: Curso[] = [
  {
    title: "Microverdes",
    description:
      "Do substrato à colheita: espécies, iluminação, irrigação, higiene e como planejar a venda para restaurantes e feiras.",
    status: "Em produção · lista de espera",
    href: "/cursos/microverdes",
    cta: "Ver o curso",
    image: "/img/site/curso-microverdes.jpg",
  },
  {
    title: "Hidroponia",
    description:
      "Sistema NFT na prática: montagem, solução nutritiva, pH e condutividade, manejo de pragas e planejamento da produção.",
    status: "Em produção · lista de espera",
    href: "/cursos/hidroponia",
    cta: "Ver o curso",
    image: "/img/site/curso-hidroponia.jpg",
  },
  {
    title: "Cultivo indoor",
    description:
      "Ambiente controlado: LED, clima, automação e os riscos de quem quer escalar uma fazenda vertical.",
    status: "Em breve",
    href: "/cursos/cultivo-indoor",
    cta: "Ver o conteúdo previsto",
    image: "/img/site/curso-cultivo-indoor.jpg",
  },
];

export const cursosNegocios: Curso[] = [
  {
    title: "Captação de recursos",
    description:
      "Mentoria para escrever e submeter projetos a agências de fomento: PIPE e FAPESP, Centelha, CNPq, Finep e EMBRAPII. Preço fixo, sem percentual sobre o recurso.",
    status: "Mentoria disponível",
    href: "/fomento",
    external: true,
    cta: "Conhecer a mentoria",
    image: "/img/site/curso-captacao.jpg",
  },
  {
    title: "Escrita de projetos",
    description:
      "Como transformar uma ideia ou resultado de pesquisa em projeto: problema, objetivos, metas verificáveis, cronograma e orçamento.",
    status: "Em breve",
    href: `${WHATSAPP}${encodeURIComponent("Quero entrar na lista de espera do curso de Escrita de Projetos da Cultivee")}`,
    external: true,
    cta: "Entrar na lista de espera",
    image: "/img/site/curso-escrita-projetos.jpg",
  },
  {
    title: "Venda o que você produz",
    description:
      "Marketing e vendas para quem produz: precificação, canais de venda direta, restaurantes e feiras, e presença nas redes.",
    status: "Em breve",
    href: `${WHATSAPP}${encodeURIComponent("Quero entrar na lista de espera do curso de Marketing e Vendas da Cultivee")}`,
    external: true,
    cta: "Entrar na lista de espera",
    image: "/img/site/curso-venda.jpg",
  },
];

// Guias em destaque (Agro e home): os mais clicados no Search Console (90 dias ate
// 05/10/2026) e temas de agro geral. Conferir o slug em src/data/blog ao trocar.
export const guiasDestaque = [
  {
    slug: "solucao-nutritiva-para-hidroponia-guia-completo-calculadora",
    titulo: "Solução nutritiva para hidroponia: guia completo e calculadora",
    tema: "Hidroponia",
    image: "/img/site/guia-solucao-nutritiva.jpg",
  },
  {
    slug: "calendario-de-plantio-o-que-plantar-em-cada-mes-do-ano",
    titulo: "Calendário de plantio: o que plantar em cada mês do ano",
    tema: "Horta",
    image: "/img/site/guia-calendario-plantio.jpg",
  },
  {
    slug: "manejo-integrado-de-pragas-mip-em-hortalicas-a-ceu-aberto",
    titulo: "Manejo integrado de pragas a céu aberto",
    tema: "Pragas e doenças",
    image: "/img/site/guia-manejo-pragas.jpg",
  },
];
