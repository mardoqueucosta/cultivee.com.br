import { Leaf, BookOpen, FlaskConical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PillarsSection = () => {
  const pillars = [
    {
      id: "agro",
      icon: Leaf,
      title: "Cultivee Agro",
      description: "Conteúdo gratuito sobre o agro: guias técnicos com fonte, cotações diárias do CEPEA e vídeos do campo, das feiras e da pesquisa.",
      color: "bg-agro",
      gradient: "bg-gradient-agro",
      shadow: "shadow-agro",
      textColor: "text-agro",
      href: "/agro",
      buttonText: "Ver conteúdo"
    },
    {
      id: "educa",
      icon: BookOpen,
      title: "Cultivee Educa",
      description: "A escola da Cultivee, em duas trilhas. Cultivo: microverdes, hidroponia e cultivo indoor. Negócios: captação de recursos, escrita de projetos e vendas.",
      color: "bg-educa",
      gradient: "bg-gradient-educa",
      shadow: "shadow-educa",
      textColor: "text-educa",
      href: "/educa",
      buttonText: "Ver cursos e trilhas"
    },
    {
      // Projetos reaproveita a cor do antigo pilar Tech (laranja): o design system
      // tem 3 cores e nao se cria cor nova (CLAUDE.md).
      id: "projetos",
      icon: FlaskConical,
      title: "Projetos",
      description: "Pesquisa aplicada com financiamento público, como o PIPE FAPESP em execução desde setembro de 2026, e os protótipos que saem dela.",
      color: "bg-tech",
      gradient: "bg-gradient-tech",
      shadow: "shadow-tech-shadow",
      textColor: "text-tech",
      href: "/projetos",
      buttonText: "Ver projetos"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que a Cultivee faz
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conteúdo aberto para quem é do agro, cursos para quem quer aprender e pesquisa para levar a tecnologia ao campo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className={`group relative bg-card rounded-2xl p-8 border border-border hover:border-transparent transition-all duration-300 hover:-translate-y-2 hover:${pillar.shadow}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 ${pillar.gradient} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <pillar.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-bold mb-4 ${pillar.textColor} group-hover:opacity-90 transition-opacity`}>
                {pillar.title}
              </h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {pillar.description}
              </p>

              {/* Button */}
              <Button 
                variant="ghost" 
                className={`${pillar.textColor} hover:bg-transparent p-0 group/btn`}
                asChild
              >
                <Link to={pillar.href}>
                  {pillar.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Decorative gradient on hover */}
              <div className={`absolute inset-0 ${pillar.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;