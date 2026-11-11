import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

// Erro de rota (09/11/2026). Toda publicacao gera arquivos com nome novo
// (static-loader-data-manifest-<hash>.json e os chunks de /assets) e apaga os
// antigos. Uma aba aberta ANTES da publicacao, ao clicar num link interno,
// pede o arquivo antigo, recebe a pagina 404 em HTML e quebrava com
// "Unexpected token '<', "<!DOCTYPE "... is not valid JSON".
// Aqui: se o erro e' desse tipo, recarrega a URL pedida do servidor (que ja
// vem com os nomes novos). Uma vez so por URL em 30 s, para nunca entrar em
// laco; se repetir, mostra a mensagem com o link.
const VERSAO_VELHA =
  /is not valid JSON|Unexpected token '<'|dynamically imported module|Importing a module script failed|error loading dynamically imported|Failed to fetch/i;

const CHAVE = "cultivee-recarga-rota";

function jaRecarregou(url: string) {
  try {
    const salvo = JSON.parse(sessionStorage.getItem(CHAVE) || "null");
    return salvo && salvo.url === url && Date.now() - salvo.em < 30000;
  } catch {
    return false;
  }
}

function marcarRecarga(url: string) {
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify({ url, em: Date.now() }));
  } catch {
    /* sem sessionStorage: recarrega mesmo assim (no maximo uma vez por clique) */
  }
}

const ErroDeRota = () => {
  const erro = useRouteError() as { message?: string } | undefined;
  const mensagem = String(erro?.message ?? erro ?? "");
  const url = typeof window !== "undefined" ? window.location.href : "";
  const recarregar = VERSAO_VELHA.test(mensagem) && !!url && !jaRecarregou(url);

  useEffect(() => {
    if (recarregar) {
      marcarRecarga(url);
      window.location.reload();
    }
  }, [recarregar, url]);

  if (recarregar) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl text-foreground mb-3">Não foi possível abrir esta página</h1>
        <p className="text-muted-foreground mb-6">Tente carregar de novo. Se continuar, volte para o início.</p>
        <div className="flex gap-3 justify-center">
          <a href={url || "/"} className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold">
            Carregar de novo
          </a>
          <a href="/" className="px-5 py-3 rounded-lg border border-border text-foreground font-semibold">
            Início
          </a>
        </div>
      </div>
    </main>
  );
};

export default ErroDeRota;
