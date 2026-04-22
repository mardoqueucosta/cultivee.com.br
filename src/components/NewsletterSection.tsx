import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://app.cultivee.com.br/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          // Honeypot — precisa vir vazio em humanos
          company_fax: (document.querySelector<HTMLInputElement>("input[name='company_fax_news']")?.value) || "",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast({
          title: "Não foi possível inscrever",
          description: data.error || "Tente novamente em alguns minutos.",
          variant: "destructive",
        });
        return;
      }

      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Inscrição realizada!",
        description: data.message || "Você receberá nosso conteúdo em breve.",
      });
    } catch (err) {
      toast({
        title: "Erro de conexão",
        description: "Não conseguimos processar sua inscrição agora. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Receba conteúdo gratuito toda semana
        </h2>
        
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Dicas práticas sobre cultivo, escrita acadêmica e tecnologia direto no seu email.
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center gap-3 text-white">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-medium">Obrigado por se inscrever!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            {/* Honeypot — invisível para humanos, bots preenchem */}
            <input
              type="text"
              name="company_fax_news"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
            />
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
            />
            <Button 
              type="submit" 
              variant="secondary"
              size="lg"
              disabled={isSubmitting}
              className="h-12 px-8 bg-white text-primary hover:bg-white/90"
            >
              {isSubmitting ? "Enviando..." : "Inscrever-se"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;