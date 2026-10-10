/**
 * Eventos de contato que nascem no React (envio de formulário com sucesso). Os cliques em WhatsApp,
 * e-mail e telefone são medidos por public/medicao-contato.js, carregado no <head>, para todo o site.
 * `gerar_lead_*` = contato (lido pelas análises de segunda); a newsletter usa outro nome de propósito,
 * porque inscrição não é contato de venda.
 */
type Gtag = (comando: "event", nome: string, params?: Record<string, string | undefined>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    cvContato?: { atribuicao: () => { canal?: string } };
  }
}

export function eventoContato(nome: string, origem: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const canal = window.cvContato?.atribuicao()?.canal;
  window.gtag("event", nome, { origem, pagina: window.location.pathname, canal });
}
