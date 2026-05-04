import { Outlet, type RouteObject } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import AgroPage from "./pages/Agro";
import EducaPage from "./pages/Educa";
import TechPage from "./pages/Tech";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BlogPage from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticle";
import ProjetoPage from "./pages/Projeto";
import AplicativosPage from "./pages/Aplicativos";
import ProdutosPage from "./pages/Produtos";
import ProdutoHidroponiaPage from "./pages/ProdutoHidroponia";
import ProdutoHidroFarmPage from "./pages/ProdutoHidroFarm";
import ProdutoCameraPage from "./pages/ProdutoCamera";
import CursoMicroverdesPage from "./pages/CursoMicroverdes";
import CursoHidroponiaPage from "./pages/CursoHidroponia";
import CursoCultivoIndoorPage from "./pages/CursoCultivoIndoor";
import NotFound from "./pages/NotFound";
import { articlesMeta } from "@/data/blogArticles";

const queryClient = new QueryClient();

function Layout() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Outlet />
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
        getStaticPaths: () => articlesMeta.map((a) => `/blog/${a.slug}`),
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
      { path: "*", element: <NotFound /> },
    ],
  },
];
