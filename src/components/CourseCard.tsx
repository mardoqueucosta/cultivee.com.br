import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Curso } from "@/data/cursos";

// Card de curso (home e /educa): imagem 16:9 do estilo da casa, selo de status,
// titulo, descricao e chamada. `external` = <a href> (pagina estatica ou WhatsApp).
const CourseCard = ({ course }: { course: Curso }) => {
  const label = (
    <span className="inline-flex items-center gap-2 font-bold text-deep group-hover:text-agro transition-colors">
      {course.cta}
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </span>
  );
  const body = (
    <>
      <img
        src={course.image}
        alt={`Curso de ${course.title}`}
        className="w-full aspect-video object-cover bg-muted"
        loading="lazy"
        decoding="async"
      />
      <div className="p-6 flex flex-col gap-2 flex-1">
        <span className="self-start px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
          {course.status}
        </span>
        <h3 className="text-xl font-bold text-foreground mt-1">{course.title}</h3>
        <p className="text-muted-foreground flex-1">{course.description}</p>
        <div className="mt-3">{label}</div>
      </div>
    </>
  );
  const cls =
    "group bg-card rounded-2xl overflow-hidden border border-border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant";
  if (course.external) {
    const ext = course.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={course.href} className={cls} {...ext}>
        {body}
      </a>
    );
  }
  return (
    <Link to={course.href} className={cls}>
      {body}
    </Link>
  );
};

export default CourseCard;
