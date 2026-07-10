# Cultivee — Site Institucional

Contexto público do projeto (pitch, stack resumida, instalação) está em [`README.md`](./README.md). Este arquivo foca em deploy, infraestrutura, design system de 3 pilares, convenções e regras operacionais para o agente.

## Projeto

- SPA React + Vite 5 hospedada em VPS própria — Docker + Traefik + Let's Encrypt
- Repo: https://github.com/mardoqueucosta/cultivee.com.br (branch `main`)
- Domínio: https://cultivee.com.br + https://www.cultivee.com.br (ambos apontam para o mesmo container)
- Pasta local: `D:/01-projetos-claude/00-Sites/site-cultivee.com.br/Site`
- Relacionamento: este site é **marketing/institucional**; a plataforma IoT real (cadastro de ESP32, controle de relés, captura de fotos, dashboard de cultivo) vive no subprojeto irmão [`../cultivee-platform/`](../cultivee-platform/) e é acessada via subdomínio `app.cultivee.com.br`. As páginas `/produtos/controle-hidroponia` e `/produtos/controle-camera` deste site descrevem os produtos que são **implementados** pelo cultivee-platform — alterações nos hardware devem ser refletidas em ambos.
- Origem: template Lovable (`lovable-tagger` ainda presente em `devDependencies` — usado apenas em dev quando `mode === 'development'` em [`vite.config.ts`](./vite.config.ts), não vai para produção via `npm run build`).

## Stack

- **Framework:** React 18.3 + Vite 5.4 (`@vitejs/plugin-react-swc`) — SPA com **SSG** via `vite-react-ssg` (cada rota declarada em `App.tsx` é pré-renderizada para `dist/<rota>.html` no `npm run build`).
- **TypeScript:** 5.8 em modo **permissivo** (`strictNullChecks: false`, `noImplicitAny: false` em [`tsconfig.json`](./tsconfig.json)) — não tentar endurecer sem auditoria completa
- **Roteamento:** React Router DOM 6 (`routes: RouteObject[]` em [`src/App.tsx`](./src/App.tsx)) — `vite-react-ssg` consome a mesma config para o SSG.
- **UI:** shadcn/ui completo em [`src/components/ui/`](./src/components/ui/) (Radix Primitives), config em [`components.json`](./components.json) (`baseColor: slate`, `style: default`)
- **Estilos:** Tailwind CSS 3.4 + `tailwindcss-animate` + `@tailwindcss/typography` + design system próprio em [`tailwind.config.ts`](./tailwind.config.ts) e CSS variables em [`src/index.css`](./src/index.css)
- **SEO:** `<Head>` do `vite-react-ssg` (substitui `react-helmet-async` para que metadata seja serializada no HTML pré-renderizado). Cada página injeta título, description, canonical, OpenGraph e JSON-LD (Article, BreadcrumbList, FAQ) via `<Head>`.
- **Forms:** `react-hook-form` + `zod` + `@hookform/resolvers`
- **Conteúdo:** `react-markdown` 10 + `remark-gfm` (tabelas + listas de tarefa); custom components no `BlogArticle.tsx` (ver seção Blog).
- **Busca no blog:** `fuse.js` (fuzzy) em [`useArticleSearch`](./src/hooks/useArticleSearch.ts).
- **Extras:** `@tanstack/react-query` (QueryClient inicializado em `App.tsx`, uso leve), `embla-carousel-react`, `recharts`, `sonner`, `date-fns`, `lucide-react`, `dompurify`, `js-yaml`.
- **Runtime VPS:** Docker multi-stage (Node 20-alpine builder → Nginx alpine runtime) + Traefik + Let's Encrypt
- **Imagens:** pipeline `sharp` + `satori` + `@resvg/resvg-js` em [`scripts/generate-images.ts`](./scripts/generate-images.ts) (variantes responsivas) e [`scripts/generate-og.ts`](./scripts/generate-og.ts) (cards OpenGraph 1200×630). Manifest em [`src/data/image-variants.json`](./src/data/image-variants.json) e blur LQIP em [`src/data/blur-data.json`](./src/data/blur-data.json).

## Rotas (React Router)

Declaradas em [`src/App.tsx`](./src/App.tsx). Ordem importa — o `*` catch-all tem que ficar **no fim**.

```
/                                    Home        → src/pages/Index.tsx
/agro /educa /tech                   Pilares     → Agro.tsx, Educa.tsx, Tech.tsx
/sobre /contato /projeto             Institucional → About.tsx, Contact.tsx, Projeto.tsx
/aplicativos                         Aplicativos → Aplicativos.tsx
/blog                                Lista blog  → Blog.tsx
/blog/:slug                          Detalhe     → BlogArticle.tsx
/produtos                            Lista       → Produtos.tsx
/produtos/controle-hidroponia        Produto     → ProdutoHidroponia.tsx
/produtos/hidro-farm                 Produto     → ProdutoHidroFarm.tsx
/produtos/controle-camera            Produto     → ProdutoCamera.tsx
/cursos/microverdes                  Curso       → CursoMicroverdes.tsx
/cursos/hidroponia                   Curso       → CursoHidroponia.tsx
/cursos/cultivo-indoor               Curso       → CursoCultivoIndoor.tsx
*                                    404         → NotFound.tsx
```

`blog/:slug` usa `getStaticPaths` retornando `articlesMeta.map(a => '/blog/' + a.slug)` — `vite-react-ssg` pré-renderiza um HTML por artigo no build. Toda nova página deve (1) viver em `src/pages/`, (2) ser adicionada em `App.tsx` **antes** do `*`, (3) também entrar em [`scripts/build-sitemap.ts`](./scripts/build-sitemap.ts) na lista `STATIC_PATHS`. A página precisa importar `<Navbar />` e `<Footer />` por conta própria — não há layout global.

## Design system de 3 pilares

O site é construído em torno de 3 pilares com cores dedicadas. **Nunca introduzir novas cores sem estender esse sistema** — use os tokens existentes.

| Pilar | Cor HSL | Classes Tailwind | Gradient | Shadow |
|---|---|---|---|---|
| **Agro** (verde) | `142 71% 45%` | `text-agro`, `bg-agro`, `text-agro-dark` | `bg-gradient-agro` | `shadow-agro` |
| **Educa** (azul) | `217 91% 60%` | `text-educa`, `bg-educa`, `text-educa-dark` | `bg-gradient-educa` | `shadow-educa` |
| **Tech** (laranja) | `25 95% 53%` | `text-tech`, `bg-tech`, `text-tech-dark` | `bg-gradient-tech` | `shadow-tech-shadow` |

Adicionalmente, o CSS variables em [`src/index.css`](./src/index.css) expõe:
- `--primary` = Agro (verde) — é o **padrão global** do site (botões primários, ring do input, acento do Navbar)
- `--secondary` = Educa (azul)
- `--tertiary` = Tech (laranja)
- `--gradient-hero` = gradiente verde → cyan (hero das páginas institucionais)
- `--gradient-subtle` = gradiente sutil branco/verde para backgrounds de hero

O tema `.dark` está **definido** em `src/index.css` (linhas ~75-125) mas não há toggle ativo — `next-themes` é dependência mas o `<ThemeProvider>` não foi instanciado em `App.tsx`. Não remover o bloco `.dark` (pode ser ligado no futuro).

## Padrão de alternância visual (branco/cinza)

Páginas longas (Projeto, About, Blog list, Blog article) seguem **alternância estrita branco/cinza** entre seções, com **verde nas pontas**:

```
🟢 Hero (bg-gradient-hero)  →  ⬜ ⬜ 🟫 ⬜ 🟫 ⬜ ...  →  🟢 CTA final (bg-gradient-hero)
   ↑ usa PageHeader hero=true       ↑ alternância 1 cor por bloco       ↑ texto branco, botões brancos
```

**Regras:**
- Cada `<section>` recebe `bg-background` (branco puro `#FFF`) **ou** `bg-muted` (cinza `#F3F4F6`) — nunca `bg-gradient-subtle` (visualmente quase indistinguível de branco — banido nessas páginas).
- A alternância é **estrita** após o hero verde: ⬜🟫⬜🟫... O cinza "amortece" e marca fim de tópico sem precisar de divisor explícito.
- O hero verde do topo e o CTA verde do final usam `bg-gradient-hero` (verde Agro). Isso vale mesmo em páginas onde o pilar é Educa ou Tech — o verde é a identidade do site, não da seção.
- Para textos em fundo verde, usar `<PageHeader hero />` (texto branco, breadcrumb branco/70, sem `bg-background`).

**Implementação por arquivo:**
- [`Projeto.tsx`](./src/pages/Projeto.tsx): 10 seções → 🟢⬜🟫⬜🟫⬜🟫⬜🟫🟢
- [`About.tsx`](./src/pages/About.tsx): 5 seções → 🟢⬜🟫⬜🟢
- [`Blog.tsx`](./src/pages/Blog.tsx): hero verde envolve `<PageHeader>`; lista de artigos abaixo em branco
- [`BlogArticle.tsx`](./src/pages/BlogArticle.tsx): ver seção "Blog" abaixo (estrutura de 5 blocos + alternância interna por H2 dentro do markdown)

## `src/data/`

Fontes de verdade estáticas (sem CMS — tudo no bundle):

- [`src/data/blog/*.md`](./src/data/blog/) — **um arquivo por artigo** (filename = slug). Frontmatter YAML obrigatório:

  ```yaml
  ---
  titulo: 'O Que É Hidroponia: Guia Definitivo [2026]'
  resumo: 'descrição curta para meta description e cards'
  categoria: 'Agro'           # 'Agro' | 'Educa' | 'Tech'
  categoriaVariant: 'agro'    # 'agro' | 'educa' | 'tech' (lowercase para classes)
  data: '2026-05-09'          # ISO YYYY-MM-DD (NÃO mais string PT-BR)
  dataModificacao: '2026-05-09'
  leitura: '24 min'
  tldr: 'parágrafo de 2-4 frases que aparece em destaque no preâmbulo'
  imagens:
    - src: /blog/<slug>/<filename>.jpg
      alt: 'descrição acessível'
      caption: 'legenda exibida sob a imagem'
  ---
  Conteúdo em Markdown aqui...
  ```

- [`blogArticles.ts`](./src/data/blogArticles.ts) — usa `import.meta.glob('./blog/*.md', { query: '?raw', eager: true })` para carregar todos os `.md`, parsear frontmatter via [`parseFrontmatter`](./src/lib/frontmatter.ts) e exportar `blogArticles`, `articlesMeta` (sem o `conteudo`), `getArticleBySlug`, `getRelatedArticles`.
- [`entities.ts`](./src/data/entities.ts) — entidades schema.org reusadas no JSON-LD (`mentions` em Article).
- [`image-variants.json`](./src/data/image-variants.json) e [`blur-data.json`](./src/data/blur-data.json) — gerados por `npm run build:images`; consumidos por `buildPictureProps` para gerar `<source>` AVIF/WebP + LQIP.

O blog é o único "CRUD" do site. Editar `.md` + commit + push = artigo no ar (após GitHub Actions).

## `src/components/`

Organização por responsabilidade:

- **`ui/`** — shadcn/ui intocado (accordion, alert, button, card, dialog, dropdown-menu, form, input, toast, tooltip, etc.). Gerado por `npx shadcn`, não editar à mão sem motivo.
- **Seções de página** (nível de `src/components/`):
  - [`Navbar.tsx`](./src/components/Navbar.tsx) — menu fixo com 2 dropdowns: "Pilares" (Agro/Educa/Tech) e "Produtos" (Controle Hidroponia/Controle Câmera). Logo à esquerda usa `Leaf` do lucide + gradiente verde.
  - [`Footer.tsx`](./src/components/Footer.tsx) — rodapé comum (institucional, links, contato).
  - [`HeroSection.tsx`](./src/components/HeroSection.tsx) — hero da home com CTAs para `/agro` e WhatsApp.
  - [`PillarsSection.tsx`](./src/components/PillarsSection.tsx) — 3 cards dos pilares na home.
  - [`WhySection.tsx`](./src/components/WhySection.tsx) — "por que Cultivee" da home.
  - [`NewsletterSection.tsx`](./src/components/NewsletterSection.tsx) — **newsletter simulada** (sem backend real, ver "Armadilhas").
  - [`WhatsAppButton.tsx`](./src/components/WhatsAppButton.tsx) — FAB flutuante fixo no canto inferior direito.
- **`blog/`** — componentes específicos do blog:
  - [`PageHeader.tsx`](./src/components/blog/PageHeader.tsx) — cabeçalho com breadcrumb + overline + título + descrição. Prop `hero?: boolean`: quando `true`, fica **transparente** (deixa o pai colorido aparecer) e usa **textos brancos** — combinado com wrapper `<section className="bg-gradient-hero">` produz o hero verde do topo das páginas.
  - [`ArticleSearch.tsx`](./src/components/blog/ArticleSearch.tsx) — busca fuzzy (Fuse.js) com filtro por categoria + agrupamento por pilar.
  - [`Badge.tsx`](./src/components/blog/Badge.tsx) — `<CategoriaBadge>` colorido por pilar.
  - [`RelatedArticles.tsx`](./src/components/blog/RelatedArticles.tsx) — grid de 4 artigos relacionados (mesma categoria primeiro, completa com outras se faltar).

## Blog — detalhes de implementação

### Estrutura visual do artigo individual

5 blocos seguindo o padrão 🟢⬜🟫⬜🟢, com **alternância adicional por H2** dentro do bloco cinza:

1. **🟢 Hero verde** — `<section className="bg-gradient-hero">` envolve `<PageHeader hero />`. Sem imagem (a imagem foi movida para o bloco 2).
2. **⬜ Preâmbulo branco** — `bg-background py-10` contém: hero image (`<figure>` com `shadow-elegant aspect-[16/9]`), metadata (categoria + data + leitura), TL;DR (card colorido da categoria), ToC (card branco sobre fundo cinza interno).
3. **🟫⬜🟫⬜...** — `<article>` com **mini-sections alternadas, uma por H2 do markdown**. Cada `<section>` é `bg-background` (idx par) ou `bg-muted` (idx ímpar). O markdown é splitado por `^## ` (respeitando code blocks via fence ```` ``` ````) no `useMemo` `markdownSections`. Idx 0 é o "intro" antes do primeiro H2.
4. **⬜ ou 🟫 — Bio + Related + Voltar** — fundo dinâmico baseado em `markdownSections.length % 2` para garantir contraste com a última mini-section.
5. **🟢 CTA verde final** — `<section className="bg-gradient-hero py-16">` com "Quer aprofundar?" + botões "Ver cursos" e "WhatsApp" (estilo botão branco + outline branco igual ao CTA da Projeto.tsx).

Todos os wrappers usam `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` (era `max-w-3xl` — alterado para dar mais respiro à leitura e às tabelas).

### Tipografia

- **Texto justificado:** o wrapper do prose tem `lang="pt-BR"`, `hyphens-auto` e `[&_p]:text-justify [&_li]:text-justify` (arbitrary selectors — `prose-p:text-justify` perde para a especificidade do plugin Tailwind Typography).
- **Hifenização** automática quebra palavras longas para amenizar espaços largos do justify.

### Renderização do markdown — custom components

[`BlogArticle.tsx`](./src/pages/BlogArticle.tsx) sobrescreve componentes do `ReactMarkdown`:

- **`h2`:** injeta `id={slugify(text)}` para anchors do ToC.
- **`p`:** se o parágrafo contém **apenas uma imagem** (detectado via `node.children[0].tagName === "img"`), renderiza como `<figure>` com `<img>` (lazy + async), `shadow-elegant`, `rounded-2xl`, `aspect-[16/9]` e `<figcaption>` italicizado quando há `title`.
- **`blockquote`:** se contém "Leia também", vira um `<aside>` colorido da categoria.

### Pré-processamento do markdown (`enrichedContent` useMemo)

Aplicado em ordem:

1. **`injectCrossReferences`** — insere "Leia também" links contextuais entre artigos da mesma categoria.
2. **Remove placeholders `<!-- IMG_SLOT_N -->`** — restos do gerador inicial; nunca foram preenchidos com imagens reais (apenas lixo).
3. **Junta `![alt](src)\n*caption*`** em `![alt](src "caption")` — assim o `title` da sintaxe markdown vira `<figcaption>` no custom `p` component.
4. **Garante linha em branco antes** de cada imagem isolada — para que ela vire um parágrafo solitário e seja detectada como "p contendo só img".

### Outros detalhes

- **Rota:** `/blog/:slug` — `BlogArticle.tsx` usa `useParams()`, chama `getArticleBySlug(slug)` e faz `<Navigate to="/blog" replace />` se não encontrar.

## Relação com `cultivee-platform/`

As páginas de produto do Site descrevem o hardware + PWA do cultivee-platform. Exemplos de acoplamento:

- [`ProdutoHidroponia.tsx`](./src/pages/ProdutoHidroponia.tsx) declara: **2 relés** (luz + bomba), ESP32-WROOM-32D, servidor Flask + SQLite, PWA JS vanilla, AP `192.168.4.1`, token de sessão 30 dias. **Se o hardware mudar** (ex.: adicionar relés de ventilação/aeração, trocar microcontrolador, mudar o esquema de autenticação), essa página precisa ser revisada.
- [`ProdutoCamera.tsx`](./src/pages/ProdutoCamera.tsx) descreve o produto de câmera (ESP32-WROVER + OV2640). Mesma regra: especs lá têm que bater com [`../cultivee-platform/firmware/mod_cam.h`](../cultivee-platform/firmware/mod_cam.h) e [`../cultivee-platform/products/cam.h`](../cultivee-platform/products/cam.h).
- URL do app nas páginas de produto: `app.cultivee.com.br` (hospedado pelo cultivee-platform, **não** pelo Site).

Ao alterar algo sobre os produtos, abrir simultaneamente o CLAUDE.md de `cultivee-platform/` para confirmar os valores.

## Tracking & SEO externo

Configurado em [`index.html`](./index.html) (`<head>` — visível em todas as páginas pré-renderizadas):

- **Google Analytics 4:** `gtag.js` com Measurement ID `G-42DX5PZB0B`. Stream "Cultivee Site" criado em `analytics.google.com`. Enhanced Measurement ativo (page views, scroll, outbound clicks, downloads, video). Filtro de tráfego interno por IP configurado em **Admin → Configurações de dados → Filtros de dados**.
- **Google Search Console:** verificado via meta tag `<meta name="google-site-verification" content="wJTxIWAx64_KaX8suLp3JgCX8QJYEYqqVcwtRXYmSfQ" />`. Propriedade tipo "Prefixo do URL" em `https://cultivee.com.br`.
- **Sitemaps enviados:** `sitemap.xml` e `image-sitemap.xml` (imagens dos artigos com `<image:title>` e `<image:caption>`). Gerados pelo hook `postbuild` em [`scripts/build-sitemap.ts`](./scripts/build-sitemap.ts), gravados em `public/` e `dist/`. Lista de rotas estáticas hardcoded em `STATIC_PATHS` — manter sincronizada ao adicionar páginas. `lastmod` das estáticas vem da constante `STATIC_LASTMOD` (bump manual quando uma página estática mudar de verdade — NUNCA data do build: com deploy diário isso fazia 16 URLs "mudarem" todo dia e o Google ignora lastmod não confiável). O pipeline diário (projeto 05) reenvia os sitemaps via Search Console API após cada publicação.
- **OG images dos artigos:** geradas no hook `prebuild` (`npm run build:og`, [`scripts/generate-og.ts`](./scripts/generate-og.ts) — satori + resvg, 1200×630 por artigo) para `public/og/<slug>.png`, copiadas ao dist pelo vite. Tolerante a falha (`|| exit 0`): se a geração falhar, o og:image do artigo dá 404 (aceitável; NUNCA deixar voltar o fallback-home 200). Antes de 2026-07-10 o `build:og` estava fora da cadeia e 33/39 artigos declaravam og:image inexistente.
- **robots.txt:** gerado pelo mesmo script, aponta para os dois sitemaps.

Ao adicionar novo tracking (Pixel, Hotjar, Tag Manager, etc.), preferir o `<head>` do `index.html` para garantir que entre no HTML pré-renderizado pelo `vite-react-ssg`. Tags injetadas via React (componentes, useEffect) só rodam após hidratação — perde tracking de robôs e do primeiro paint.

## Deploy

Produção roda na VPS da Cultivee como container Docker atrás de Traefik + Let's Encrypt. Diretório remoto: `/opt/sites/cultivee.com.br/`.

### 1. Automático via GitHub Actions (preferido)

Push para `main` dispara [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), que usa `appleboy/ssh-action@v1` para:
1. SSH na VPS com o secret `VPS_SSH_KEY`
2. `git clone --depth 1 https://github.com/mardoqueucosta/cultivee.com.br.git /tmp/cultivee-site-deploy`
3. `rsync -a --exclude='.git' --exclude='node_modules' --exclude='dist' --exclude='01-imagens' /tmp/cultivee-site-deploy/ /opt/sites/cultivee.com.br/`
4. `cd /opt/sites/cultivee.com.br && docker compose build --no-cache && docker compose up -d`

Nenhum comando manual necessário — só `git push`.

### 2. Manual via `deploy.sh` (fallback)

Do diretório local:

```bash
cd "D:/01-projetos-claude/00-Sites/site-cultivee.com.br/Site"
bash deploy.sh
```

Empacota os fontes (excluindo `node_modules/`, `dist/`, `.git/`, `01-imagens/`), envia via `scp` para a VPS, extrai em `/opt/sites/cultivee.com.br/` e roda `docker compose build --no-cache && docker compose up -d`. Tudo numa única sessão SSH — não dispara múltiplas conexões em paralelo.

Requer a chave SSH em `D:/01-projetos-claude/.credentials/id_rsa` (hardcoded em [`deploy.sh`](./deploy.sh)).

### 3. Purge automático do cache Cloudflare

Após o deploy bem-sucedido (passos 1 ou 2), o [`deploy.sh`](./deploy.sh) tenta purgar o cache do Cloudflare via API. Configuração:

- Lê credenciais de `D:/01-projetos-claude/.credentials/cloudflare-cultivee.env`:
  ```
  CF_API_TOKEN=<token com permissão Zone:Cache Purge:Purge>
  CF_ZONE_ID=<id da zone cultivee.com.br>
  ```
- Token criado em `dash.cloudflare.com → My Profile → API Tokens → cultivee-worker-deploy`.
- Falhas de purge **não quebram o deploy** (erro é logado, mas o script continua) — se a entrega no container deu certo, a "única" consequência de não purgar é tráfego servir versão antiga por algumas horas até TTL natural.
- O GitHub Actions **não** purga o cache — esse passo só roda no `deploy.sh` manual. Para purgar via push, vai precisar exportar `CF_API_TOKEN` e `CF_ZONE_ID` como secrets do repo e adicionar passo no workflow.

### Verificar logs / status

```bash
ssh -p 22022 -i "D:/01-projetos-claude/.credentials/id_rsa" root@129.121.50.168 "docker logs cultivee-site --tail 50"
ssh -p 22022 -i "D:/01-projetos-claude/.credentials/id_rsa" root@129.121.50.168 "docker ps --filter name=cultivee-site"
```

## Infraestrutura VPS

- **IP:** `129.121.50.168` — **porta SSH 22022** (não a 22)
- **SSH:** `ssh -p 22022 -i "D:/01-projetos-claude/.credentials/id_rsa" root@129.121.50.168`
- **Diretório remoto:** `/opt/sites/cultivee.com.br/`
  - `docker-compose.yml` — labels Traefik + rede externa `web`
  - Fontes do repo extraídos na mesma pasta (Dockerfile faz o build dentro do container)
- **Container:** `cultivee-site` (Nginx alpine servindo `dist/` na porta 80 interna, não exposta diretamente)
- **Traefik:** reverse proxy + SSL automático via Let's Encrypt; rede Docker externa `web` compartilhada com outros sites da VPS (`cultivee-platform`, Imperial Toalheria, engenhariabiomedica, etc.)
- **Proxy chain:** Cloudflare → Traefik → container `cultivee-site:80`
- **Domínios configurados** (em [`docker-compose.yml`](./docker-compose.yml)):
  - `cultivee.com.br` + `www.cultivee.com.br` → ambos respondem no mesmo router via `Host() || Host()`
  - HTTP → HTTPS via middleware `https-redirect@file` (definido no Traefik dinâmico, não no compose)

## Convenções de código e UX

- **Alias `@`:** sempre usar `@/components/...`, `@/lib/utils`, `@/hooks/...`, `@/data/...`. Configurado em [`vite.config.ts`](./vite.config.ts) e [`tsconfig.json`](./tsconfig.json).
- **Importações ordenadas:** libs externas → `@/components/ui/*` → `@/components/*` → `@/hooks/*` → `@/lib/*` → `@/data/*`. Ver qualquer página de exemplo (ex.: [`Blog.tsx`](./src/pages/Blog.tsx)).
- **SEO por página:** usar `<Head>` importado de `vite-react-ssg` dentro de cada componente de página (substitui `<Helmet>` para que metadata seja serializada no HTML pré-renderizado). Não há layout global que injete metadata.
- **Cores nas páginas:** respeitar o pilar da página — página `/agro` usa `text-agro`/`bg-agro`/`shadow-agro`; `/educa` usa `-educa`; `/tech` usa `-tech`. Home e páginas institucionais usam `--primary` (verde Agro) como padrão.
- **Mobile-first:** breakpoints `sm: 640px`, `md: 768px`, `lg: 1024px`. Hero da home tem `text-4xl sm:text-5xl md:text-7xl` — começar pequeno, escalar.
- **Espaçamentos:** padding máximo de página é `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Seções verticais usam `py-16` ou `py-20`.
- **UX simplificada (memória `feedback_ux`):** preferir ações automáticas a passos manuais, não pedir informação redundante, botões destrutivos devem ser discretos (nunca vermelhos grandes), cards devem ter separação visual clara, o usuário prefere informação útil a decoração.
- **Linters:** `npm run lint` usa [`eslint.config.js`](./eslint.config.js) (flat config: `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`).

## Regras críticas

- **NUNCA** disparar múltiplas conexões SSH em sequência rápida contra a VPS (`129.121.50.168:22022`). A VPS tem `fail2ban` ativo — duas ou três tentativas próximas banem o IP, e só o usuário resolve via painel do provedor. Fazer **uma conexão por vez**, esperar terminar; se precisar de vários comandos, encadear com `&&` numa única sessão SSH. Se uma conexão falhar, **esperar 5 minutos** antes de tentar de novo.
- **NUNCA** rodar comandos SSH em paralelo (ex.: um `Bash` em background + outro em foreground contra a mesma VPS). Mesmo motivo.
- **NUNCA** voltar o fallback SPA (`/index.html` no fim do `try_files`) em [`nginx.conf`](./nginx.conf). Desde 2026-07-10 o contrato é SSG puro: `try_files $uri $uri.html =404` + `error_page 404 /404.html` (pré-renderizado com noindex via rota `404` em `App.tsx`). Toda rota válida TEM um `.html` físico no dist (o vite-react-ssg pré-renderiza tudo, incl. `blog/:slug` via `getStaticPaths`) — o fallback antigo servia a home com status 200 para QUALQUER URL inexistente (soft-404 universal com canonical pra home), principal causa técnica da desindexação em massa detectada na auditoria SEO de 2026-07-09. O nginx também faz: www→apex 301, trailing-slash→sem-barra 301, `absolute_redirect off` (obrigatório atrás do Cloudflare — sem isso o 301 sai como `http://`), cache immutable p/ `/assets/`, HSTS e `charset utf-8`. Ao adicionar rota nova em `App.tsx`, nada muda no nginx (o `.html` dela nasce no build).
- **NUNCA** commitar `.env` ou `.env.local`. O [`.gitignore`](./.gitignore) já cobre, mas conferir com `git status` antes de push. Hoje o site não usa env vars em runtime, mas se alguma for introduzida, tratar como segredo.
- **NUNCA** rotas fora do `*` catch-all em `App.tsx`. Toda nova rota tem que vir **antes** do `<Route path="*" element={<NotFound />} />`. O comentário `ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE` está lá por um motivo.
- **NUNCA** hardcodar cores fora do design system. Se precisar de uma cor nova, estender [`tailwind.config.ts`](./tailwind.config.ts) e [`src/index.css`](./src/index.css) com CSS variables. Exceção: `#25D366` do botão WhatsApp, que é a cor oficial da marca e está hardcoded intencionalmente em [`WhatsAppButton.tsx`](./src/components/WhatsAppButton.tsx).
- **SEMPRE** que mudar a especificação de um produto descrito em `/produtos/controle-hidroponia` ou `/produtos/controle-camera`, conferir se o hardware correspondente em [`../cultivee-platform/`](../cultivee-platform/) bate com a descrição. Divergência entre Site e plataforma confunde o usuário final.
- **SEMPRE** que alterar o número de WhatsApp, trocar em **todos** os lugares onde está hardcoded. O número atual é `5519991644181` (**(19) 99164-4181**, WhatsApp Business, desde 2026-07-02; anterior `5519992805563`). Aparece em **~24 ocorrências em 13 arquivos** (link cru `wa.me/5519991644181` + formatos de exibição `(19) 99164-4181` / `+55 (19) 99164-4181` / telefone schema.org `+55-19-99164-4181`): `src/components/` (`WhatsAppButton.tsx`, `HeroSection.tsx`, `Footer.tsx`), `src/lib/seo-schemas.ts` e `src/pages/` (`Contact.tsx`, `BlogArticle.tsx`, `Produtos.tsx`, `CursoMicroverdes.tsx`, `CursoHidroponia.tsx`, `CursoCultivoIndoor.tsx`, `ProdutoHidroponia.tsx`, `ProdutoHidroFarm.tsx`, `ProdutoCamera.tsx`). **Não há fonte única** — rodar `grep -rn "9164" src/` antes de commitar (pega link cru **e** exibição; `grep 19991644181` sozinho perde os textos com hífen). Débito técnico: extrair para `src/data/contact.ts` ou similar.
- **SEMPRE** usar `docker compose build --no-cache` ao redeployar (é o que o `deploy.sh` e o workflow fazem). Sem `--no-cache`, o Docker pode reter um bundle estale de um build anterior.

## Armadilhas conhecidas

- **Newsletter é simulada** — [`NewsletterSection.tsx:26-30`](./src/components/NewsletterSection.tsx) tem `// Simulate API call` seguido de `new Promise(resolve => setTimeout(resolve, 1000))`. **Emails inseridos não vão para lugar nenhum.** Se for plugar um backend real (Resend, Mailchimp, webhook), esse é o único ponto de alteração — mas cuidado com envio de CORS de dentro da SPA.
- **OpenGraph por página, não global** — o `<head>` de [`index.html`](./index.html) não tem `og:image` global. Cada página injeta o seu via `<Head>` (ex.: artigos do blog usam `/og/<slug>.png` gerado por [`scripts/generate-og.ts`](./scripts/generate-og.ts)). Páginas que esquecerem o `<Head>` com `og:image` ficam sem preview social — verificar com `https://cards-dev.twitter.com/validator` ou `https://developers.facebook.com/tools/debug/`.
- **tsconfig permissivo esconde bugs** — `strictNullChecks: false` e `noImplicitAny: false` deixam passar coisas que outros projetos pegariam em build-time. Ao mexer em código existente, **não** confiar só no compilador; rodar `npm run build` + smoke test manual.
- **Porta 8080 em dev, não 5173** — [`vite.config.ts`](./vite.config.ts) sobrescreve a porta padrão. Ignorar qualquer README genérico do Vite que mencione 5173.
- **`lovable-tagger` no bundle dev** — o plugin entra condicionalmente quando `mode === 'development'` em [`vite.config.ts`](./vite.config.ts). `npm run build:dev` leva o tagger para produção; `npm run build` (sem `:dev`) não. Usar `build:dev` só para staging de inspeção visual, nunca para `cultivee.com.br` real.
- **Dark mode definido mas não ligado** — `.dark` tem palette completa em [`src/index.css`](./src/index.css), mas `next-themes` nunca é instanciado em `App.tsx`. O usuário vê sempre o tema light. Se quiser ligar, precisa adicionar `<ThemeProvider attribute="class">` no `App.tsx`, criar um toggle e testar todos os componentes shadcn no tema escuro.
- **Blog ToC falha com headings duplicados** — o slug do anchor é gerado via `normalize("NFD")` + kebab-case. Dois `## Introdução` no mesmo artigo viram o mesmo anchor e o "Ir para seção" só leva ao primeiro.
- **Datas do blog são ISO `YYYY-MM-DD`** — `data: '2026-05-09'`. `formatDate(iso)` em `BlogArticle.tsx` converte para PT-BR longo na renderização. Não usar formato PT-BR no frontmatter (versões antigas usavam `"05 Fev 2025"` — migrado).
- **Cache de build do Vite em `node_modules/.vite`** — se erros bizarros aparecem depois de mexer em config, `rm -rf node_modules/.vite` e re-rodar `npm run dev`. O cache do dep-optimizer é fonte recorrente de "funcionava antes".
- **React Router `<Navigate to=".." replace />` em artigo inexistente** — [`BlogArticle.tsx:56`](./src/pages/BlogArticle.tsx) redireciona slugs inválidos para `/blog`. Isso gera um entry extra no histórico com `replace: true` (bom), mas se quiser 404 real, substituir por `return <NotFound />`.

## Informações do desenvolvedor

- **Git user:** Mardoqueu Costa (`mardo.abc@gmail.com`)
- **Chave SSH:** `D:/01-projetos-claude/.credentials/id_rsa` (compartilhada com todos os projetos da VPS)
- **Cloudflare:** conta `mardo.abc@gmail.com`; `cultivee.com.br` e `www.cultivee.com.br` proxied via Cloudflare (CDN + SSL na borda, DNS-only para subdomínios do cultivee-platform como `app.cultivee.com.br`)
- **WhatsApp comercial:** `+55 19 99164-4181` — hardcoded em 17 ocorrências em 10 arquivos de `src/` (ver "Regras críticas" para a lista completa)
