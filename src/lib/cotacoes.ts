import ultimo from "../../public/dados/cotacoes/ultimo.json";

/**
 * Acesso ao snapshot de cotacoes, compartilhado pelas paginas de `/cotacoes`.
 *
 * O snapshot ENTRA NO BUILD porque e' ele que precisa estar no HTML quando o
 * Google rastreia, e e' pequeno (~7 KB). A SERIE historica NAO entra: ela cresce
 * um ponto por dia util para sempre, e e' buscada sob demanda de
 * `/dados/cotacoes/series/`. Ver `07-cotacoes-site/CLAUDE.md` §6.
 *
 * Fonte da verdade do arquivo: `Site/public/dados/cotacoes/ultimo.json`, gravado
 * pelo coletor todo dia util as 05:30. Nenhum numero e' escrito a mao aqui.
 */

export type ItemCotacao = {
  key: string;
  nome: string;
  detalhe?: string;
  unidade: string;
  moeda: string;
  valor: number;
  valor_fmt: string;
  data_ref: string;
  ref_rotulo?: string;
  periodicidade: string;
  defasagem_dias?: number;
  var_pct: number | null;
  var_base?: string;
  sequencia?: { direcao: string; dias: number } | null;
};

export type Snapshot = {
  gerado_em: string;
  data_carrossel: string;
  fonte: string;
  fonte_url: string;
  licenca: string;
  itens: ItemCotacao[];
};

export const COTACOES = ultimo as unknown as Snapshot;

export const itemPorKey = (key: string) => COTACOES.itens.find((i) => i.key === key);

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
  "agosto", "setembro", "outubro", "novembro", "dezembro"];

/** "13/08/2026" vira "13 de agosto de 2026"; "06/2026" vira "junho de 2026". */
export function dataPorExtenso(ref?: string) {
  const p = (ref || "").split("/");
  if (p.length === 3) return `${Number(p[0])} de ${MESES[Number(p[1]) - 1]} de ${p[2]}`;
  if (p.length === 2) return `${MESES[Number(p[0]) - 1]} de ${p[1]}`;
  return ref || "";
}

export function horaDe(iso: string) {
  return ((iso || "").split("T")[1] || "").slice(0, 5);
}

export const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Qual pagina propria existe para cada indicador.
 *
 * Chave ausente = ainda nao ha pagina, e o indice mostra o numero SEM link, em
 * vez de prometer "em breve" ou apontar para 404. Ver a regra de link interno
 * na §6.3 do CLAUDE.md do projeto 07.
 */
export const PAGINA_DO_INDICADOR: Record<string, string> = {
  "cafe-arabica": "/cotacoes/cafe",
  "cafe-robusta": "/cotacoes/cafe",
};

/**
 * Nome de EXIBICAO, quando o nome tecnico da fonte nao e' a palavra que o
 * leitor usa. O dado guarda o nome do indicador; a pagina fala a lingua de quem
 * busca. `cafe-robusta` e' o nome da especie no Cepea, e no Brasil o mercado e a
 * busca dizem CONILON: sao 22.200 buscas/mes em "preco do cafe conilon" contra
 * praticamente nada em "robusta".
 *
 * Mapear aqui, e nao no coletor, porque o coletor alimenta tambem o painel
 * diario de redes sociais, e la o rotulo ja esta consolidado.
 */
export const NOME_EXIBICAO: Record<string, string> = {
  "cafe-robusta": "Café conilon (robusta)",
};

export const nomeDe = (i: Pick<ItemCotacao, "key" | "nome">) =>
  NOME_EXIBICAO[i.key] || i.nome;
