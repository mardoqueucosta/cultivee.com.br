// Manuais de montagem e plantio da Cultivee (página /manuais, src/pages/Manuais.tsx).
// Criada em 27/11/2026, a pedido do dono: "uma pagina com vários cards de montagem com um link para fazer o download".
// Manual novo = um item a mais nesta lista, com o PDF em public/manuais/<slug>.pdf e a capa em public/manuais/img/<slug>.jpg (4:3).
// O endereço do PDF é PÚBLICO e ESTÁVEL: a resposta automática aos comentários dos vídeos manda esse link. Nunca renomear;
// para atualizar o manual, trocar o arquivo mantendo o mesmo nome e mudar `atualizado`.
// Origem dos PDFs: Projeto-Videos\video-realista-DIY\guias-montagem\<produto>\ (só o PDF da raiz; nunca o de _versoes_antigas).

export type Manual = {
  slug: string;
  status: "disponivel" | "em-breve"; // em-breve: card sem download (vídeo e manual ainda não feitos)
  tipo: "Montagem" | "Plantio";
  titulo: string;
  resumo: string;
  imagem: string;
  alt: string;
  pdf?: string;
  paginas?: number;
  tamanho?: string;
  destaques: string[];
  atualizado?: string; // AAAA-MM-DD
  video?: string; // palavra da chamada do vídeo que entrega este manual
};

export const manuais: Manual[] = [
  {
    slug: "horta-vertical-de-parede-em-canos-de-pvc",
    status: "disponivel",
    tipo: "Montagem",
    titulo: "Horta vertical de parede em canos de PVC",
    resumo:
      "4 canos de esgoto de 100 mm deitados, um acima do outro, apoiados em mãos francesas presas na parede, com terra e uma muda de alface em cada furo.",
    imagem: "/manuais/img/horta-vertical-de-parede-em-canos-de-pvc.jpg",
    alt: "Horta vertical de parede com canos de PVC brancos presos por mãos francesas numa parede de tijolinho, com alfaces verdes e roxas alternadas",
    pdf: "/manuais/horta-vertical-de-parede-em-canos-de-pvc.pdf",
    paginas: 10,
    tamanho: "2,1 MB",
    destaques: ["20 pés de alface", "146 cm de parede", "lista de compras com preços", "passo a passo com fotos"],
    atualizado: "2026-11-26",
    video: "HORTA",
  },
  // Próximos (27/11/2026, dono: "faça uns 9 exemplos de cards de possíveis faça você mesmo"): ideias de vídeo DIY, sem manual ainda.
  // Imagem ilustrativa pelo GPT. Quando o manual ficar pronto: status "disponivel", pdf, paginas, tamanho e atualizado.
  {
    slug: "hidroponia-nft-caseira-em-canos-de-pvc",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Hidroponia NFT caseira em canos de PVC",
    resumo:
      "Três canos de PVC numa estrutura inclinada, bomba pequena e reservatório: a água com nutrientes corre pelos canos e passa pelas raízes.",
    imagem: "/manuais/img/hidroponia-nft-caseira-em-canos-de-pvc.jpg",
    alt: "Sistema hidropônico caseiro com três canos de PVC brancos numa estrutura de metal, alfaces em copos e um reservatório azul com mangueiras pretas embaixo",
    destaques: ["hidroponia com bomba e reservatório", "lista de compras com preços", "solução nutritiva passo a passo"],
  },
  {
    slug: "bancada-de-microverdes-com-prateleiras-e-led",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Bancada de microverdes com prateleiras e LED",
    resumo:
      "Estante de três prateleiras com bandejas e luz de LED em cada andar, para produzir microverdes dentro de casa o ano todo.",
    imagem: "/manuais/img/bancada-de-microverdes-com-prateleiras-e-led.jpg",
    alt: "Estante de metal com três prateleiras, bandejas pretas cheias de microverdes de girassol, rabanete e ervilha e tubos de LED branco embaixo de cada prateleira",
    destaques: ["três andares de bandejas", "luz de LED por prateleira", "semeadura à colheita em dias"],
  },
  {
    slug: "torre-de-alface-em-tubo-de-pvc",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Torre de alface em tubo de PVC",
    resumo:
      "Colunas de PVC em pé, presas a um mourão, com saídas inclinadas que viram vasos: muitas alfaces num pedaço pequeno de chão.",
    imagem: "/manuais/img/torre-de-alface-em-tubo-de-pvc.jpg",
    alt: "Torre vertical de alface com duas colunas de PVC branco presas a um mourão de madeira num quintal, com alfaces verdes e roxas nas saídas laterais",
    destaques: ["muitas plantas em pouco chão", "três alturas de torre", "peças de catálogo"],
  },
  {
    slug: "hidroponia-kratky-em-caixa-organizadora",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Hidroponia sem bomba em caixa organizadora",
    resumo:
      "O método Kratky: uma caixa escura com furos na tampa, solução nutritiva e nada de bomba nem energia. A raiz desce enquanto a água baixa.",
    imagem: "/manuais/img/hidroponia-kratky-em-caixa-organizadora.jpg",
    alt: "Caixa organizadora escura com seis furos na tampa, cada um com um copo de alface, sobre uma mesa de madeira num pátio ensolarado",
    destaques: ["sem bomba e sem energia", "bom para começar", "caixa, copos e solução"],
  },
  {
    slug: "composteira-de-baldes",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Composteira de três baldes",
    resumo:
      "Três baldes empilhados transformam casca de fruta e de verdura em adubo, e a torneira de baixo tira o chorume para regar.",
    imagem: "/manuais/img/composteira-de-baldes.jpg",
    alt: "Composteira caseira com três baldes plásticos empilhados, o de baixo com uma torneira, ao lado de um canteiro e de uma tigela com cascas de verdura",
    destaques: ["adubo das sobras da cozinha", "chorume para regar", "furos e encaixes"],
  },
  {
    slug: "minhocario-domestico",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Minhocário doméstico",
    resumo:
      "Caixas empilhadas com minhocas californianas que comem o lixo orgânico e devolvem húmus para a horta e os vasos.",
    imagem: "/manuais/img/minhocario-domestico.jpg",
    alt: "Minhocário caseiro feito de três caixas plásticas escuras empilhadas, a de cima aberta com terra escura, minhocas e restos de verdura",
    destaques: ["húmus para a horta", "como começar com as minhocas", "o que pode e o que não pode"],
  },
  {
    slug: "irrigacao-por-gotejamento-com-timer",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Irrigação por gotejamento com timer",
    resumo:
      "Mangueira de gotejo nos canteiros e um timer na torneira: a horta rega sozinha, na hora certa e sem desperdiçar água.",
    imagem: "/manuais/img/irrigacao-por-gotejamento-com-timer.jpg",
    alt: "Canteiro de horta com mangueiras pretas de gotejamento ao longo das fileiras de alface e couve, ligadas a um timer de água na torneira",
    destaques: ["rega automática", "menos água gasta", "peças de loja de jardinagem"],
  },
  {
    slug: "canteiro-elevado-de-madeira",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Canteiro elevado de madeira",
    resumo:
      "Uma caixa de tábuas de pinus cheia de terra boa, na altura certa para plantar e colher sem se abaixar tanto.",
    imagem: "/manuais/img/canteiro-elevado-de-madeira.jpg",
    alt: "Canteiro elevado de tábuas de pinus cheio de terra escura, com fileiras de alface, cebolinha, salsinha e tomateiros novos num quintal gramado",
    destaques: ["medidas e corte das tábuas", "mistura de terra", "o que plantar primeiro"],
  },
  {
    slug: "mini-estufa-de-pvc-e-plastico",
    status: "em-breve",
    tipo: "Montagem",
    titulo: "Mini estufa de PVC e plástico",
    resumo:
      "Arcos de cano de PVC cobertos com plástico transparente: protege as mudas do frio, da chuva forte e do excesso de sol.",
    imagem: "/manuais/img/mini-estufa-de-pvc-e-plastico.jpg",
    alt: "Pequena estufa em túnel com arcos de cano de PVC branco e plástico transparente, uma ponta aberta mostrando bandejas de mudas dentro",
    destaques: ["arcos de cano de PVC", "plástico e fixação", "ventilação e uso"],
  },
];
