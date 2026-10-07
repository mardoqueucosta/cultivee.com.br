import { Leaf, Mail, Phone, MapPin, Instagram, Youtube, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Arquitetura desde 2026-10-07: Agro (conteudo) + Educa (escola) + Projetos.
  // `external`: pagina estatica fora do React (public/fomento) usa <a href>.
  const quickLinks = [
    { name: "Cultivee Agro", href: "/agro" },
    { name: "Blog", href: "/blog" },
    { name: "Cotações agrícolas", href: "/cotacoes" },
    { name: "Projetos", href: "/projetos" },
    { name: "Produtos (protótipos)", href: "/produtos" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ];

  const courses = [
    { name: "Todos os cursos e trilhas", href: "/educa" },
    { name: "Microverdes (lista de espera)", href: "/cursos/microverdes" },
    { name: "Hidroponia (lista de espera)", href: "/cursos/hidroponia" },
    { name: "Cultivo indoor (em breve)", href: "/cursos/cultivo-indoor" },
    { name: "Captação de recursos", href: "/fomento", external: true },
  ];

  // Perfis confirmados pelo dono: Instagram cultivee.br (07/10/2026); Facebook
  // cultivee.brasil (10/07/2026). Os handles variam por rede: nao "corrigir".
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/cultivee.br", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@cultivee_br", label: "YouTube" },
    { icon: Facebook, href: "https://www.facebook.com/cultivee.brasil", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/cultivee-br", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-deep-dark py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                CULTIVEE
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed mb-6">
              Instituto de ensino, pesquisa e inovação no agro. Conteúdo gratuito, cursos e projetos de pesquisa aplicada.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Cultivee
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Cultivee Educa
            </h3>
            <ul className="space-y-3">
              {courses.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a href={item.href} className="text-white/70 hover:text-white transition-colors duration-300">
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contato
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:contato@cultivee.com.br"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>contato@cultivee.com.br</span>
              </a>
              <a 
                href="https://wa.me/5519991644181"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+55 (19) 99164-4181</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>ESALQTec, Piracicaba-SP</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © 2026 Cultivee Instituto de Ensino, Pesquisa e Inovação Ltda · CNPJ 64.471.739/0001-64
              <br />
              Empresa incubada na ESALQTec (ESALQ/USP), Piracicaba-SP
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a
                href="https://status.cultivee.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition-colors duration-300 text-sm flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
                Status da Plataforma
              </a>
              <a
                href="https://app.cultivee.com.br/privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition-colors duration-300 text-sm"
              >
                Política de Privacidade
              </a>
              <a
                href="https://app.cultivee.com.br/termos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition-colors duration-300 text-sm"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;