import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BookOpen, Sprout, Briefcase } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import { collectionPageJsonLd } from "@/lib/seo-schemas";
import ImageHero from "@/components/ImageHero";
import CourseCard from "@/components/CourseCard";
import { cursosCultivo as cultivo, cursosNegocios as negocios, type Curso } from "@/data/cursos";

// Cultivee Educa (reestruturacao 2026-10-07): a escola, com duas trilhas. Os cursos
// vem de src/data/cursos.ts (fonte unica, tambem usada na home).

const faqs = [
  {
    question: "Os cursos já estão abertos?",
    answer:
      "Ainda não. Os cursos de Microverdes e Hidroponia estão em produção e os demais estão em planejamento. Quem entra na lista de espera recebe o aviso da abertura da primeira turma. A mentoria de captação de recursos já está funcionando.",
  },
  {
    question: "Qual a diferença entre as duas trilhas?",
    answer:
      "A trilha Cultivo ensina a produzir: técnica, equipamento e manejo. A trilha Negócios ensina a transformar conhecimento em projeto, recurso e venda: captação de fomento, escrita de projetos, marketing e vendas.",
  },
  {
    question: "Haverá aulas presenciais?",
    answer:
      "Sim. Os encontros presenciais acontecem na ESALQTec, em Piracicaba-SP. As datas saem junto com a abertura de cada turma.",
  },
  {
    question: "Como entro na lista de espera?",
    answer:
      "Pelo botão de cada curso, que abre uma conversa no WhatsApp da Cultivee com a mensagem pronta. Não há cobrança para entrar na lista.",
  },
];

const Track = ({
  id,
  icon: Icon,
  title,
  description,
  courses,
  muted,
}: {
  id: string;
  icon: typeof BookOpen;
  title: string;
  description: string;
  courses: Curso[];
  muted?: boolean;
}) => (
  <section id={id} className={`py-16 scroll-mt-20 ${muted ? "bg-muted" : "bg-background"}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-start gap-4 mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-accent rounded-xl flex-shrink-0">
          <Icon className="w-7 h-7 text-deep" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </div>
    </div>
  </section>
);

const EducaPage = () => {
  const collectionLd = collectionPageJsonLd({
    pageName: "Cultivee Educa: cursos de cultivo e de negócios",
    pageUrl: `${SITE_BASE}/educa`,
    description:
      "A escola da Cultivee, com duas trilhas: Cultivo (microverdes, hidroponia, cultivo indoor) e Negócios (captação de recursos, escrita de projetos, marketing e vendas).",
    items: [
      { name: "Curso de Microverdes", url: "/cursos/microverdes", description: "Em produção, lista de espera." },
      { name: "Curso de Hidroponia", url: "/cursos/hidroponia", description: "Em produção, lista de espera." },
      { name: "Curso de Cultivo Indoor", url: "/cursos/cultivo-indoor", description: "Em breve." },
      {
        name: "Mentoria de captação de recursos de fomento",
        url: "/fomento",
        description: "PIPE, Centelha, CNPq, FAPESP, Finep e EMBRAPII.",
      },
    ],
  });
  const breadcrumbLd = breadcrumbJsonLd([{ name: "Educa", href: "/educa" }]);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Cultivee Educa: cursos de cultivo e de negócios no agro</title>
        <meta
          name="description"
          content="A escola da Cultivee em duas trilhas. Cultivo: microverdes, hidroponia e cultivo indoor. Negócios: captação de recursos, escrita de projetos e vendas."
        />
        <link rel="canonical" href={`${SITE_BASE}/educa`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_BASE}/educa`} />
        <meta property="og:title" content="Cultivee Educa: cursos de cultivo e de negócios" />
        <meta
          property="og:description"
          content="Trilha Cultivo e trilha Negócios. Cursos em produção, com lista de espera, e mentoria de captação de recursos."
        />
        <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>
      <Navbar />

      <ImageHero
        image="/img/site/topo-educa.jpg"
        alt="Bancada de aula prática numa estufa, com bandejas de mudas e canais de hidroponia"
        eyebrow="Cultivee Educa"
        title="Aprenda a produzir e a empreender no agro"
        subtitle="Duas trilhas: Cultivo, para quem quer produzir, e Negócios, para quem quer transformar o que sabe em projeto, recurso e venda."
      >
        <a
          href="#cultivo"
          className="inline-flex items-center justify-center rounded-full bg-sun text-deep font-bold px-7 py-3.5 hover:brightness-105 transition"
        >
          Trilha Cultivo
        </a>
        <a
          href="#negocios"
          className="inline-flex items-center justify-center rounded-full border-2 border-white/60 text-white font-bold px-7 py-3.5 hover:bg-white/10 transition"
        >
          Trilha Negócios
        </a>
      </ImageHero>

      <Track
        id="cultivo"
        icon={Sprout}
        title="Trilha Cultivo"
        description="Para quem quer produzir: técnica, equipamento e manejo, com o que a pesquisa e a prática já mostraram."
        courses={cultivo}
      />

      <Track
        id="negocios"
        icon={Briefcase}
        title="Trilha Negócios"
        description="Para quem quer transformar conhecimento em empresa, projeto financiado e venda."
        courses={negocios}
        muted
      />

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Perguntas frequentes</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-elegant transition-shadow"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EducaPage;
