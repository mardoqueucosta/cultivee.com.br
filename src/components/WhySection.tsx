import { Award, GraduationCap, BookCheck } from "lucide-react";

const WhySection = () => {
  const reasons = [
    {
      icon: Award,
      title: "Pesquisa com financiamento público",
      description: "A Cultivee executa o projeto PIPE FAPESP 2025/27266-8, aprovado para desenvolver um sistema de produção e venda de hortaliças em ambiente urbano."
    },
    {
      icon: GraduationCap,
      title: "Incubada na ESALQTec",
      description: "Nasceu junto à ESALQ/USP, em Piracicaba-SP, e é dirigida por um pesquisador com formação completa pela USP, da graduação ao pós-doutorado."
    },
    {
      icon: BookCheck,
      title: "Conteúdo com fonte",
      description: "Cada guia cita de onde vem o dado (Embrapa, IAC, CEPEA, universidades). Sem fórmula mágica e sem promessa de resultado."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que aprender com a Cultivee?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {reason.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;