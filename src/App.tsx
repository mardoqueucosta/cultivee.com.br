import { lazy, Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

// Paginas em lazy: cada rota vira um chunk proprio (o SSG pre-renderiza o HTML
// completo mesmo assim — verificado em 2026-07-10). Antes, TODAS as paginas e o
// texto integral dos artigos iam num unico bundle de ~2 MB baixado em toda visita.
const Index = lazy(() => import("./pages/Index"));
const AgroPage = lazy(() => import("./pages/Agro"));
const EducaPage = lazy(() => import("./pages/Educa"));
const TechPage = lazy(() => import("./pages/Tech"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticle"));
const ProjetoPage = lazy(() => import("./pages/Projeto"));
const AplicativosPage = lazy(() => import("./pages/Aplicativos"));
const ProdutosPage = lazy(() => import("./pages/Produtos"));
const ProdutoHidroponiaPage = lazy(() => import("./pages/ProdutoHidroponia"));
const ProdutoHidroFarmPage = lazy(() => import("./pages/ProdutoHidroFarm"));
const ProdutoCameraPage = lazy(() => import("./pages/ProdutoCamera"));
const CursoMicroverdesPage = lazy(() => import("./pages/CursoMicroverdes"));
const CursoHidroponiaPage = lazy(() => import("./pages/CursoHidroponia"));
const CursoCultivoIndoorPage = lazy(() => import("./pages/CursoCultivoIndoor"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function Layout() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "agro", element: <AgroPage /> },
      { path: "educa", element: <EducaPage /> },
      { path: "tech", element: <TechPage /> },
      { path: "sobre", element: <AboutPage /> },
      { path: "contato", element: <ContactPage /> },
      { path: "blog", element: <BlogPage /> },
      {
        path: "blog/:slug",
        element: <BlogArticlePage />,
        // @ts-expect-error vite-react-ssg getStaticPaths augmentation
        // import dinamico: manter blogArticles FORA do chunk raiz do cliente
        // (so o build precisa da lista completa para pre-renderizar as rotas)
        getStaticPaths: async () =>
          (await import("@/data/blogArticles")).articlesMeta.map((a) => `/blog/${a.slug}`),
      },
      { path: "projeto", element: <ProjetoPage /> },
      { path: "aplicativos", element: <AplicativosPage /> },
      { path: "produtos", element: <ProdutosPage /> },
      { path: "produtos/controle-hidroponia", element: <ProdutoHidroponiaPage /> },
      { path: "produtos/hidro-farm", element: <ProdutoHidroFarmPage /> },
      { path: "produtos/controle-camera", element: <ProdutoCameraPage /> },
      { path: "cursos/microverdes", element: <CursoMicroverdesPage /> },
      { path: "cursos/hidroponia", element: <CursoHidroponiaPage /> },
      { path: "cursos/cultivo-indoor", element: <CursoCultivoIndoorPage /> },
      // rota concreta para o SSG emitir dist/404.html (o nginx usa como error_page 404)
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
