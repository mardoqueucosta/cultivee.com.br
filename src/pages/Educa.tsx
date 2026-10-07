import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sprout, Briefcase, FileText, Store } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import { collectionPageJsonLd } from "@/lib/seo-schemas";

// Cultivee Educa (reestruturacao 2026-10-07): a escola, com duas trilhas.
// Status honesto em cada curso: nenhum curso esta aberto; Cultivo em producao
// (lista de espera via WhatsApp, decisao do dono) e Negocios com a mentoria de
// captacao ja funcionando (landing estatica /fomento, por isso <a href>).
const WHATSAPP = "https://wa.me/5519991644181?text=";

type Course = {
  title: string;
  description: string;
  status: string;
  href: string;
  external?: boolean;
  cta: string;
  image?: string;
  icon?: typeof BookOpen;
};

const cultivo: Course[] = [
  {
    title: "Microverdes",
    description:
      "Do substrato à colheita: espécies, iluminação, irrigação, higiene e como planejar a venda para restaurantes e feiras.",
    status: "Em produção · lista de espera",
    href: "/cursos/microverdes",
    cta: "Ver o curso",
    image: "/cursos/microverdes.jpg",
  },
  {
    title: "Hidroponia",
    description:
      "Sistema NFT na prática: montagem, solução nutritiva, pH e condutividade, manejo de pragas e planejamento da produção.",
    status: "Em produção · lista de espera",
    href: "/cursos/hidroponia",
    cta: "Ver o curso",
    image: "/cursos/hidroponia.jpg",
  },
  {
    title: "Cultivo indoor",
    description:
      "Ambiente controlado: LED, clima, automação e os riscos de quem quer escalar uma fazenda vertical.",
    status: "Em breve",
    href: "/cursos/cultivo-indoor",
    cta: "Ver o conteúdo previsto",
    image: "/cursos/cultivo-indoor.jpg",
  },
];

const negocios: Course[] = [
  {
    title: "Captação de recursos",
    description:
      "Mentoria para escrever e submeter projetos a agências de fomento: PIPE e FAPESP, Centelha, CNPq, Finep e EMBRAPII. Preço fixo, sem percentual sobre o recurso.",
    status: "Mentoria disponível",
    href: "/fomento",
    external: true,
    cta: "Conhecer a mentoria",
    image: "/cursos/empreendedorismo.jpg",
  },
  {
    title: "Escrita de projetos",
    description:
      "Como transformar uma ideia ou resultado de pesquisa em projeto: problema, objetivos, metas verificáveis, cronograma e orçamento.",
    status: "Em breve",
    href: `${WHATSAPP}${encodeURIComponent("Quero entrar na lista de espera do curso de Escrita de Projetos da Cultivee")}`,
    external: true,
    cta: "Entrar na lista de espera",
    icon: FileText,
  },
  {
    title: "Venda o que você produz",
    description:
      "Marketing e vendas para quem produz: precificação, canais de venda direta, restaurantes e feiras, e presença nas redes.",
    status: "Em breve",
    href: `${WHATSAPP}${encodeURIComponent("Quero entrar na lista de espera do curso de Marketing e Vendas da Cultivee")}`,
    external: true,
    cta: "Entrar na lista de espera",
    icon: Store,
  },
];

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

const CourseCard = ({ course }: { course: Course }) => {
  const Icon = course.icon;
  const linkClass = "inline-flex items-center gap-2 font-semibold text-educa hover:text-educa-dark";
  const label = (
    <>
      {course.cta}
      <ArrowRight className="w-4 h-4" />
    </>
  );
  return (
    <article className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-educa transition-shadow duration-300 flex flex-col">
      {course.image ? (
        <img
          src={course.image}
          alt={`Curso de ${course.title}`}
          className="w-full aspect-[16/9] object-cover bg-muted"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full aspect-[16/9] bg-educa/10 flex items-center justify-center">
          {Icon && <Icon className="w-14 h-14 text-educa" aria-hidden="true" />}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <span className="self-start px-3 py-1 bg-educa/10 text-educa text-xs font-semibold rounded-full mb-3">
          {course.status}
        </span>
        <h3 className="text-xl font-bold text-foreground mb-2">{course.title}</h3>
        <p className="text-muted-foreground mb-6 flex-1">{course.description}</p>
        {course.external ? (
          <a
            href={course.href}
            className={linkClass}
            {...(course.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        ) : (
          <Link to={course.href} className={linkClass}>
            {label}
          </Link>
        )}
      </div>
    </article>
  );
};

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
  courses: Course[];
  muted?: boolean;
}) => (
  <section id={id} className={`py-16 scroll-mt-20 ${muted ? "bg-muted" : "bg-background"}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-start gap-4 mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-educa/10 rounded-xl flex-shrink-0">
          <Icon className="w-7 h-7 text-educa" />
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

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-educa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cultivee Educa</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Aprenda a produzir e a transformar o que você sabe em projeto, recurso e venda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-educa hover:bg-white/90 font-semibold">
              <a href="#cultivo">Trilha Cultivo</a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-educa"
            >
              <a href="#negocios">Trilha Negócios</a>
            </Button>
          </div>
        </div>
      </section>

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
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-educa transition-shadow"
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
