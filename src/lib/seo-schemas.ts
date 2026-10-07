/**
 * Schemas JSON-LD reutilizáveis para SEO/GEO.
 *
 * Convenções:
 * - Todos os schemas usam `SITE_BASE` como prefixo absoluto (cultivee.com.br).
 * - `@id` consistentes entre páginas: `${SITE_BASE}/#organization`, `${SITE_BASE}/#author`.
 *   Permite o Google montar o knowledge graph do site.
 * - Pessoa autora é referenciada por `@id` em `author` dos artigos (E-E-A-T para YMYL).
 */
import { SITE_BASE } from "./breadcrumb-schema";

export const ORG_ID = `${SITE_BASE}/#organization`;
export const AUTHOR_ID = `${SITE_BASE}/#author`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Cultivee",
  legalName: "Cultivee Instituto de Ensino, Pesquisa e Inovação Ltda",
  alternateName: "Cultivee Instituto de Ensino, Pesquisa e Inovação",
  taxID: "64.471.739/0001-64",
  foundingDate: "2026-01-13",
  founder: { "@id": AUTHOR_ID },
  url: SITE_BASE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_BASE}/icon-512.png`,
    width: 512,
    height: 512,
  },
  description:
    "A Cultivee é um instituto de ensino, pesquisa e inovação no agro, incubado na ESALQTec (ESALQ/USP), em Piracicaba-SP. Tem duas frentes: Cultivee Agro, com conteúdo gratuito sobre agro, e Cultivee Educa, com cursos nas trilhas Cultivo e Negócios.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Piracicaba",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  sameAs: [
    // Perfis oficiais confirmados pelo dono (2026-07-10; Instagram corrigido em
    // 2026-10-07 para cultivee.br, com ponto). Os handles variam por rede:
    // YouTube @cultivee_br (underscore), Instagram e TikTok cultivee.br (ponto),
    // Facebook cultivee.brasil. Nao "corrigir" achando que e typo.
    "https://www.youtube.com/@cultivee_br",
    "https://www.instagram.com/cultivee.br/",
    "https://www.facebook.com/cultivee.brasil",
    "https://www.tiktok.com/@cultivee.br",
    "https://www.linkedin.com/company/cultivee-br",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "contato@cultivee.com.br",
    telephone: "+55-19-99164-4181",
    areaServed: "BR",
    availableLanguage: "pt-BR",
  },
};

/**
 * Person schema do autor principal (Mardoqueu Costa).
 * Referenciado por `@id` nos JSON-LD Article para E-E-A-T.
 */
export const authorJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: "Mardoqueu Martins da Costa",
  alternateName: "Mardoqueu Costa",
  honorificPrefix: "Prof. Dr.",
  jobTitle: "Pesquisador e fundador da Cultivee",
  url: `${SITE_BASE}/sobre`,
  worksFor: { "@id": ORG_ID },
  knowsAbout: [
    "Hidroponia",
    "Cultivo indoor",
    "Microverdes",
    "Agricultura urbana",
    "Instrumentação eletrônica",
    "IoT agrícola",
    "ESP32",
    "Automação de cultivo",
  ],
  identifier: {
    "@type": "PropertyValue",
    propertyID: "https://orcid.org",
    value: "0000-0002-4395-3069",
  },
  sameAs: [
    "http://lattes.cnpq.br/7819717440359474",
    "https://www.linkedin.com/in/mardoqueu/",
    "https://orcid.org/0000-0002-4395-3069",
  ],
};

/**
 * WebSite schema com SearchAction — Google usa para exibir caixa de busca no SERP.
 * O `query-input` aponta para a página de blog que tem a busca Fuse.js.
 */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_BASE}/#website`,
  url: SITE_BASE,
  name: "Cultivee",
  description:
    "Conteúdo gratuito sobre agro, cotações agrícolas, cursos e projetos de pesquisa aplicada da Cultivee.",
  inLanguage: "pt-BR",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_BASE}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * CollectionPage + ItemList — usado nas paginas Agro e Educa
 * e em listagens de cursos/produtos. Google pode renderizar como carousel.
 */
export function collectionPageJsonLd(opts: {
  pageName: string;
  pageUrl: string;
  description: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.pageName,
    url: opts.pageUrl,
    description: opts.description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${SITE_BASE}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: item.url.startsWith("http") ? item.url : `${SITE_BASE}${item.url}`,
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
      })),
    },
  };
}

/**
 * AboutPage schema — usado na página /sobre, referencia o autor por @id.
 */
export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_BASE}/sobre`,
  name: "Sobre a Cultivee",
  description: "Quem é a Cultivee: instituto de ensino, pesquisa e inovação no agro, incubado na ESALQTec, Piracicaba-SP.",
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${SITE_BASE}/#website` },
  mainEntity: { "@id": AUTHOR_ID },
};

/**
 * WebPage genérico com BreadcrumbList — para páginas institucionais sem schema dedicado.
 */
export function webPageJsonLd(opts: {
  pageName: string;
  pageUrl: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: opts.pageUrl,
    name: opts.pageName,
    description: opts.description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${SITE_BASE}/#website` },
    publisher: { "@id": ORG_ID },
  };
}
