// Páginas de edital (/editais/:slug): cópia integral do edital oficial + guia próprio + chamadas para a consultoria.
// Os JSON são GERADOS por captacao-recursos/vendas/paginas-editais/gerar_paginas_editais.py (não editar à mão).
// Importado só pela página Edital.tsx e, de forma dinâmica, pelo getStaticPaths do App.tsx (fora do chunk raiz).

export interface EditalPlano {
  nome: string;
  preco: string;
  link: string;
  chave: string;
  valor: number;
  desc: string;
}

export interface Edital {
  slug: string;
  titulo: string;
  tituloSeo: string;
  tituloCurto: string;
  descricao: string;
  indexar: boolean;
  versao: string;
  oficial: string;
  atualizada: string;
  deTitulo: string;
  fatos: [string, string][];
  guiaHtml: string;
  faq: [string, string][];
  integralHtml: string;
  plano: EditalPlano | null;
  venda: string;
  vendaRotulo: string;
  msg: string;
  linkDiagnostico: string;
  whatsapp: string;
  jsonld: object[];
}

const arquivos = import.meta.glob("./editais/*.json", { eager: true, import: "default" }) as Record<string, Edital>;

export const editais: Edital[] = Object.values(arquivos);

export const getEdital = (slug?: string) => editais.find((e) => e.slug === slug);
