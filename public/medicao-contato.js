/*
 * medicao-contato.js - mede o CONTATO no site principal da Cultivee (10/10/2026, pedido do dono).
 *
 * O problema: o site so tinha o gtag base. Os ~20 links de WhatsApp (botao flutuante, rodape, cursos,
 * produtos, blog, contato) nao geravam evento nenhum, e o contato da Cultivee chega quase todo pelo
 * WhatsApp. A landing /fomento tem medicao propria (public/fomento/medicao.js) e NAO carrega este arquivo.
 *
 * Como funciona: UM ouvinte de clique no documento inteiro (captura), entao vale para todo link que
 * existe hoje e para os que forem criados depois, sem mexer em cada componente.
 *  - wa.me / api.whatsapp.com  -> evento GA4 "gerar_lead_whatsapp" e a mensagem ganha "[ref: X-XXXX]"
 *  - mailto:                   -> "gerar_lead_email" (clicar no endereco nao prova envio: so GA4)
 *  - tel:                      -> "gerar_lead_telefone"
 * Parametros: origem (de onde no site: data-origem do elemento, rodape, ou a secao da pagina), pagina,
 * canal (pago, organico, social, referencia, direto) e ref.
 *
 * O codigo de referencia e o mesmo da Biopdi e da /fomento: a letra diz a origem da VISITA
 * (G Google Ads, P outro anuncio, O busca organica, S rede social, R outro site, D direto) e as 4 letras
 * identificam o clique. Quando a conversa chega no celular, o codigo diz de onde a pessoa veio; o mesmo
 * ref vai para o GA4, entao da para achar o clique.
 * Limite: site estatico, sem servidor proprio (MEDICAO-DO-SITE.md da Biopdi, Passo 4): nao ha registro
 * ref <-> gclid em arquivo; a pessoa pode apagar o codigo antes de enviar.
 *
 * Carregado no <head> do index.html (entra no HTML pre-renderizado e funciona antes da hidratacao).
 */
(function (w, d) {
  'use strict';
  var CHAVE_SESSAO = 'cultivee_site_origem_sessao';       // sessionStorage: 1a origem da sessao
  var CHAVE_PAGO = 'cultivee_site_ultimo_clique_pago';    // localStorage: ultimo clique pago, 90 dias
  var JANELA_PAGO_DIAS = 90;
  var DOMINIO_PROPRIO = 'cultivee.com.br';
  var MEDIAS_PAGAS = ['cpc', 'ppc', 'paid', 'paidsearch', 'paid-search', 'paid_social', 'paidsocial', 'cpm', 'display', 'ads'];
  var BUSCADORES = ['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'ecosia.', 'search.brave', 'chatgpt.', 'perplexity.', 'gemini.'];
  var SOCIAIS = ['facebook.', 'instagram.', 'linkedin.', 'youtube.', 'tiktok.', 't.co', 'twitter.', 'x.com', 'whatsapp', 'threads.'];
  var ALFABETO = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // sem 0/O e 1/I/L: o dono le e digita o codigo

  function host(ref) {
    try { return new URL(ref).hostname.replace(/^www\./, '').toLowerCase(); } catch (_) { return ''; }
  }

  /** Origem da visita pela URL e pelo referrer (mesma regra da /fomento e da Biopdi). */
  function classificar(href, referrer) {
    var url = new URL(href);
    var p = url.searchParams;
    var fonte = (p.get('utm_source') || '').toLowerCase();
    var midia = (p.get('utm_medium') || '').toLowerCase();
    var a = { em: new Date().toISOString(), entrada: url.pathname };
    if (p.get('gclid') || p.get('gbraid') || p.get('wbraid')) { a.canal = 'pago'; a.rede = 'google'; return a; }
    if (p.get('msclkid')) { a.canal = 'pago'; a.rede = 'microsoft'; return a; }
    if (midia && MEDIAS_PAGAS.indexOf(midia) !== -1) {
      a.canal = 'pago'; a.rede = (fonte === 'google' || fonte === 'adwords' || fonte === 'googleads') ? 'google' : (fonte || 'outro');
      return a;
    }
    if (p.get('fbclid')) { a.canal = 'social'; return a; } // post organico do Instagram/Facebook: NUNCA pago
    if (fonte) { a.canal = 'referencia'; return a; }
    if (!referrer) { a.canal = 'direto'; return a; }
    var h = host(referrer);
    if (h.indexOf(DOMINIO_PROPRIO) !== -1) { a.canal = 'direto'; a.interna = true; return a; }
    if (BUSCADORES.some(function (b) { return h.indexOf(b) !== -1; })) { a.canal = 'organico'; return a; }
    if (SOCIAIS.some(function (s) { return h.indexOf(s) !== -1; })) { a.canal = 'social'; return a; }
    a.canal = 'referencia';
    return a;
  }

  function le(store, k) { try { var v = store.getItem(k); return v ? JSON.parse(v) : null; } catch (_) { return null; } }
  function grava(store, k, v) { try { store.setItem(k, JSON.stringify(v)); } catch (_) { /* modo anonimo */ } }

  function capturar() {
    var atual;
    try { atual = classificar(w.location.href, d.referrer || ''); } catch (_) { return; }
    var sessao = le(sessionStorage, CHAVE_SESSAO);
    if ((!sessao && !atual.interna) || (atual.canal === 'pago' && sessao && sessao.canal !== 'pago')) grava(sessionStorage, CHAVE_SESSAO, atual);
    if (atual.canal === 'pago') grava(localStorage, CHAVE_PAGO, atual);
  }

  /** Clique pago dentro de 90 dias vence; senao, a origem da sessao. */
  function atribuicao() {
    var pago = le(localStorage, CHAVE_PAGO);
    if (pago && pago.em) {
      var dias = (Date.now() - new Date(pago.em).getTime()) / 86400000;
      if (dias >= 0 && dias <= JANELA_PAGO_DIAS) return pago;
    }
    return le(sessionStorage, CHAVE_SESSAO) || { canal: 'direto' };
  }

  function letra(a) {
    switch (a.canal) {
      case 'pago': return a.rede === 'google' ? 'G' : 'P';
      case 'organico': return 'O';
      case 'social': return 'S';
      case 'referencia': return 'R';
      default: return 'D';
    }
  }

  function codigo4() {
    var b = new Uint8Array(4), s = '';
    (w.crypto || w.msCrypto).getRandomValues(b);
    for (var i = 0; i < 4; i++) s += ALFABETO[b[i] % ALFABETO.length];
    return s;
  }

  /** De onde no SITE veio o clique: data-origem do elemento, rodape, ou a secao da pagina. */
  function origemNoSite(el) {
    var marcado = el.closest('[data-origem]');
    if (marcado) return marcado.getAttribute('data-origem');
    if (el.closest('footer')) return 'rodape';
    var p = w.location.pathname.replace(/\/+$/, '') || '/';
    if (p === '/') return 'home';
    var m = p.match(/^\/cursos\/([^/]+)/);
    if (m) return 'curso-' + m[1];
    if (/^\/produtos(\/|$)/.test(p)) return 'produto';
    if (/^\/blog\//.test(p)) return 'blog-artigo';
    return p.split('/')[1] || 'outra';
  }

  /** Nome legivel da pagina para a mensagem; null nas paginas genericas. */
  function nomeDaPagina() {
    var p = w.location.pathname.replace(/\/+$/, '') || '/';
    if (p === '/' || p === '/contato') return null;
    var t = (d.title || '').replace(/\s*[|·-]\s*Cultivee.*$/i, '').trim();
    if (!t || /^cultivee\b/i.test(t)) return null;
    return t.length > 80 ? t.slice(0, 77) + '...' : t;
  }

  function evento(nome, params) {
    if (typeof w.gtag === 'function') w.gtag('event', nome, params);
  }

  function noClique(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var at = atribuicao();
    var base = { origem: origemNoSite(a), pagina: w.location.pathname, canal: at.canal };
    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
      var ref = letra(at) + '-' + codigo4();
      try {
        var u = new URL(href);
        var texto = u.searchParams.get('text');
        if (!texto) {
          var pag = nomeDaPagina();
          texto = pag ? 'Olá! Vi a página "' + pag + '" no site da Cultivee e gostaria de saber mais.'
                      : 'Olá! Vim pelo site da Cultivee e gostaria de saber mais.';
        }
        u.searchParams.delete('text');
        var resto = u.searchParams.toString();
        // %20 e nao "+": o URLSearchParams troca espaco por "+", e nem todo WhatsApp o le como espaco
        var final = texto.replace(/\s*\[ref: [^\]]*\]\s*$/, '') + ' [ref: ' + ref + ']';
        a.setAttribute('href', u.origin + u.pathname + '?' + (resto ? resto + '&' : '') + 'text=' + encodeURIComponent(final));
        // o navegador segue o href que esta no link na hora do clique
      } catch (_) { /* URL estranha: segue sem o codigo, mas conta o clique */ }
      base.ref = ref;
      evento('gerar_lead_whatsapp', base);
    } else if (/^mailto:/i.test(href)) {
      evento('gerar_lead_email', base);
    } else if (/^tel:/i.test(href)) {
      evento('gerar_lead_telefone', base);
    }
  }

  capturar();
  d.addEventListener('click', noClique, true);
  w.cvContato = { atribuicao: atribuicao, classificar: classificar, origemNoSite: origemNoSite };
})(window, document);
