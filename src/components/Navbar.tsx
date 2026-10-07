import { useState } from "react";
import { Menu, X, Leaf, ChevronDown, Camera, Droplets, Sparkles, LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Arquitetura desde 2026-10-07: Cultivee = Agro (conteudo) + Educa (escola, trilhas
// Cultivo e Negocios) + Projetos. `external: true` = pagina estatica fora do React
// (public/fomento/index.html): precisa de <a href>, porque o <Link> do router
// cairia no NotFound do SPA.
type NavItem = { name: string; href: string; external?: boolean; note?: string };

const agroItems: NavItem[] = [
  { name: "Visão geral", href: "/agro" },
  { name: "Blog", href: "/blog" },
  { name: "Cotações agrícolas", href: "/cotacoes" },
];

const educaGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Trilha Cultivo",
    items: [
      { name: "Microverdes", href: "/cursos/microverdes", note: "lista de espera" },
      { name: "Hidroponia", href: "/cursos/hidroponia", note: "lista de espera" },
      { name: "Cultivo indoor", href: "/cursos/cultivo-indoor", note: "em breve" },
    ],
  },
  {
    label: "Trilha Negócios",
    items: [{ name: "Captação de recursos", href: "/fomento", external: true }],
  },
];

const productItems = [
  { name: "Cultivee Hidro", href: "/produtos/controle-hidroponia", icon: Droplets },
  { name: "Cultivee Hidro Farm", href: "/produtos/hidro-farm", icon: Sparkles },
  { name: "Cultivee Cam", href: "/produtos/controle-camera", icon: Camera },
];

const NavLink = ({ item, className, onClick }: { item: NavItem; className: string; onClick?: () => void }) => {
  const content = (
    <>
      {item.name}
      {item.note && <span className="ml-auto text-xs text-muted-foreground">{item.note}</span>}
    </>
  );
  return item.external ? (
    <a href={item.href} className={className} onClick={onClick}>
      {content}
    </a>
  ) : (
    <Link to={item.href} className={className} onClick={onClick}>
      {content}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const agroActive = ["/agro", "/blog", "/cotacoes"].some(isActive);
  const educaActive = ["/educa", "/cursos"].some(isActive);

  const topLink = (active: boolean) =>
    `px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
      active ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5"
    }`;

  const trigger = (active: boolean) => `flex items-center gap-1.5 ${topLink(active)}`;

  const mobileLink = (active: boolean) =>
    `px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
      active ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
    }`;

  const close = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-elegant group-hover:shadow-glow transition-shadow duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              CULTIVEE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Agro: conteudo */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={trigger(agroActive)}>
                  <span className="w-2 h-2 rounded-full bg-agro" aria-hidden="true" />
                  Agro
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-background border-border">
                {agroItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <NavLink item={item} className="flex items-center gap-2 w-full" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Educa: a escola */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={trigger(educaActive)}>
                  <span className="w-2 h-2 rounded-full bg-educa" aria-hidden="true" />
                  Educa
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64 bg-background border-border">
                <DropdownMenuItem asChild>
                  <Link to="/educa" className="flex items-center gap-2 font-semibold">
                    Todos os cursos e trilhas
                  </Link>
                </DropdownMenuItem>
                {educaGroups.map((group) => (
                  <div key={group.label}>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                      {group.label}
                    </DropdownMenuLabel>
                    {group.items.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <NavLink item={item} className="flex items-center gap-2 w-full" />
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/projetos" className={topLink(isActive("/projetos"))}>
              Projetos
            </Link>

            {/* Produtos: prototipos do projeto PIPE (ainda nao estao a venda) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={trigger(isActive("/produtos"))}>
                  Produtos
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-background border-border">
                <DropdownMenuItem asChild>
                  <Link to="/produtos" className="flex items-center gap-2 font-semibold">
                    <LayoutGrid className="w-4 h-4 text-primary" />
                    Todos os protótipos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {productItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/sobre" className={topLink(isActive("/sobre"))}>
              Sobre
            </Link>

            <Link to="/contato" className={topLink(isActive("/contato"))}>
              Contato
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              className="p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col space-y-1 bg-background rounded-xl border border-border p-4 mt-2 shadow-elegant">
              <Link to="/" className={mobileLink(isActive("/"))} onClick={close}>
                Home
              </Link>

              <div className="border-t border-border my-2" />
              <div className="px-4 py-2 text-xs font-semibold text-agro uppercase tracking-wide">Agro</div>
              {agroItems.map((item) => (
                <NavLink key={item.href} item={item} className={mobileLink(isActive(item.href))} onClick={close} />
              ))}

              <div className="border-t border-border my-2" />
              <div className="px-4 py-2 text-xs font-semibold text-educa uppercase tracking-wide">Educa</div>
              <Link to="/educa" className={mobileLink(location.pathname === "/educa")} onClick={close}>
                Todos os cursos e trilhas
              </Link>
              {educaGroups.map((group) => (
                <div key={group.label} className="flex flex-col space-y-1">
                  <div className="px-4 pt-2 text-xs text-muted-foreground">{group.label}</div>
                  {group.items.map((item) => (
                    <NavLink key={item.href} item={item} className={mobileLink(isActive(item.href))} onClick={close} />
                  ))}
                </div>
              ))}

              <div className="border-t border-border my-2" />
              <Link to="/projetos" className={mobileLink(isActive("/projetos"))} onClick={close}>
                Projetos
              </Link>
              <Link to="/produtos" className={mobileLink(isActive("/produtos"))} onClick={close}>
                Produtos (protótipos)
              </Link>
              <Link to="/sobre" className={mobileLink(isActive("/sobre"))} onClick={close}>
                Sobre
              </Link>
              <Link to="/contato" className={mobileLink(isActive("/contato"))} onClick={close}>
                Contato
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
