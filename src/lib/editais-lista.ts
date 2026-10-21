/**
 * Lista de editais abertos da página /editais.
 *
 * Fonte da verdade: `Site/public/dados/editais/editais.json`, refeito toda segunda-feira por
 * `captacao-recursos/busca-editais/publicar_site.py` (contrato em `busca-editais/SITE-PAGINA-EDITAIS.md`).
 * NÃO editar o JSON nem escrever número, órgão ou data na página: tudo sai daqui.
 *
 * Import pelo glob (e não `import x from "...json"`): se o arquivo faltar, o glob devolve vazio e o build
 * segue, com a página mostrando "lista em atualização".
 */

export interface ItemEdital {
  id: string;
  orgao: string;
  titulo: string;
  url: string;
  prazo: string | null;
  fluxo_continuo: boolean;
  recurso: string | null;
  contrapartida: string | null;
  contrapartida_min_pct: number | null;
  mei: boolean | null;
  mei_regra: string | null;
  abrangencia: string | null;
  publico: string | null;
  resumo: string | null;
  novo: boolean;
  restricao: string | null;
  guia_cultivee: { slug: string; url: string; nome: string } | null;
  secoes: string[];
}

export interface Previsto {
  orgao: string;
  titulo: string;
  url: string;
  lancamento: string | null;
}

export interface ListaEditais {
  versao: number;
  atualizado_em: string;
  proxima_atualizacao?: string;
  aviso?: string;
  criterio_fomento?: string;
  criterio_mei?: string;
  orgaos: string[];
  editais: ItemEdital[];
  previstos: Previsto[];
}

const arquivos = import.meta.glob("../../public/dados/editais/editais.json", { eager: true, import: "default" }) as Record<
  string,
  Partial<ListaEditais>
>;
const bruto = Object.values(arquivos)[0];

/** null = arquivo ausente, vazio ou fora do formato: a página mostra "lista em atualização". */
export const LISTA: ListaEditais | null =
  bruto && Array.isArray(bruto.editais) && bruto.editais.length > 0 && bruto.atualizado_em
    ? {
        versao: bruto.versao ?? 1,
        atualizado_em: bruto.atualizado_em,
        proxima_atualizacao: bruto.proxima_atualizacao,
        aviso: bruto.aviso,
        criterio_fomento: bruto.criterio_fomento,
        criterio_mei: bruto.criterio_mei,
        orgaos: Array.isArray(bruto.orgaos) ? bruto.orgaos : [],
        editais: bruto.editais,
        previstos: Array.isArray(bruto.previstos) ? bruto.previstos : [],
      }
    : null;

// Datas: tudo em dias inteiros a partir de "AAAA-MM-DD", sem fuso (UTC), para o build e o navegador baterem.
export const diaDe = (iso: string) => Math.floor(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 864e5);

/** Hoje no relógio de quem lê (data local), em AAAA-MM-DD. */
export const hojeLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const dataBR = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;

export const faltam = (prazo: string, hoje: string) => {
  const n = diaDe(prazo) - diaDe(hoje);
  if (n < 0) return "encerrado";
  if (n === 0) return "fecha hoje";
  if (n === 1) return "falta 1 dia";
  return `faltam ${n} dias`;
};

/** "Brasil", "Todo Brasil", "Nacional" e afins viram um grupo só no filtro; o texto original continua no item. */
export const grupoAbrangencia = (a: string | null) => {
  if (!a) return "Não informada";
  const s = a.toLowerCase();
  if (s.startsWith("brasil") || s.startsWith("todo brasil") || s.startsWith("nacional")) return "Nacional";
  return a;
};

/** Por prazo; fluxo contínuo (sem prazo) no fim. */
export const porPrazo = (a: ItemEdital, b: ItemEdital) => {
  if (!a.prazo && !b.prazo) return a.titulo.localeCompare(b.titulo, "pt-BR");
  if (!a.prazo) return 1;
  if (!b.prazo) return -1;
  return a.prazo.localeCompare(b.prazo);
};
