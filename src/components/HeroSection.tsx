import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Onde conhecimento
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              vira colheita
            </span>
          </h1>
          
          {/* Definição extraível da marca (GEO): frase "A Cultivee é..." que LLMs e
              buscadores conseguem citar isolada para responder "o que é a Cultivee" */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A Cultivee é um instituto de ensino, pesquisa e inovação no agro, incubado na
            ESALQTec, em Piracicaba-SP: conteúdo gratuito sobre o campo, cursos de cultivo e
            de negócios, e pesquisa aplicada com financiamento público.
            <span className="font-semibold text-foreground"> Conhecimento com fonte, da semente à colheita.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="eco" 
              size="lg" 
              className="text-lg px-8 py-6 w-full sm:w-auto group"
              asChild
            >
              <Link to="/educa">
                Conhecer os cursos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 w-full sm:w-auto"
              asChild
            >
              <Link to="/agro">
                <BookOpen className="mr-2 w-5 h-5" />
                Conteúdo gratuito
              </Link>
            </Button>
          </div>

          {/* Faixa de credibilidade: so fatos verificaveis (processo publico na BV FAPESP). */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-6 text-sm text-muted-foreground">
            <li>Incubada na ESALQTec (ESALQ/USP)</li>
            <li aria-hidden="true">·</li>
            <li>Projeto PIPE FAPESP 2025/27266-8</li>
            <li aria-hidden="true">·</li>
            <li>Cotações diárias CEPEA</li>
          </ul>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;