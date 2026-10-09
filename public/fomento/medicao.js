/*
 * Medicao da landing de fomento (cultivee.com.br/fomento): ponto UNICO de medicao.
 *
 * Porte para JavaScript puro do que o site da Biopdi faz em Next.js
 * (00-Sites/site-biopdi.com.br/Site/src): lib/gtag.ts, components/GoogleTags.tsx,
 * lib/atribuicao.ts, components/RastreioAtribuicao.tsx, lib/whatsapp.ts e
 * components/forms/ConversaoObrigado.tsx. Guia: 00-Sites/site-biopdi.com.br/MEDICAO-DO-SITE.md.
 * Documento desta landing: projeto-curso-captacao-recursos/MEDICAO-DO-SITE.md.
 *
 * Regras (armadilhas da Biopdi, secao 4 do guia):
 *  - UM gtag.js com dois config (GA4 e Google Ads). Este arquivo injeta o gtag.js e
 *    nenhum outro lugar pode injetar de novo.
 *  - Lead SO no envio do formulario (na pagina de obrigado) ou no clique no WhatsApp.
 *    Nunca em visita.
 *  - Filtro de robos (09/10/2026, secao 8b): no maximo 1 Lead por sessao de contato
 *    (30 min, sessionStorage) e nenhum Lead com navigator.webdriver === true (navegador
 *    automatizado, como o robo de revisao de anuncios da Meta). O GA4 recebe todo clique,
 *    com lead_contado = 'true' ou 'false'.
 *  - fbclid sozinho = social. So vira pago com utm_medium pago (a campanha Meta usa paid).
 *  - Quem dispara evento chama cvMedicao.evento() ou cvMedicao.conversao(), nunca
 *    window.gtag direto.
 *
 * Carregar no <head>, sincrono, ANTES de qualquer outro script de medicao:
 *   producao: <script src="/fomento/medicao.js"></script>  (caminho ABSOLUTO: a URL final
 *             da landing nao tem barra, entao caminho relativo quebraria)
 *   previa:   <script src="medicao.js"></script> e <script src="../medicao.js"></script>
 */
(function (w, d) {
  'use strict';
  if (w.cvMedicao) return; // carregado duas vezes por engano: nao reinicializa nada

  // ===== 1. Identificadores (equivalente as variaveis NEXT_PUBLIC_* da Biopdi) =====
  var GA_ID = 'G-42DX5PZB0B';      // GA4 da propriedade do site Cultivee
  var ADS_ID = null;               // 'AW-XXXXXXXXX' quando a conta do Google Ads existir
  var ADS_CONVERSOES = {           // rotulos 'AW-XXXXXXXXX/AbC...' criados no painel do Ads
    formulario: null,
    whatsapp: null
  };
  // Valor estimado do lead em reais (ver MEDICAO-DO-SITE.md, secao 5). Provisorio ate o dono aprovar.
  var VALORES = { formulario: 100, whatsapp: 50 };
  var PIXEL_ID = '983656691147336';
  var CAPI_URL = 'https://cultivee.com.br/capi';
  var WA_NUMERO = '5519991644181';
  var WA_BASE = 'https://wa.me/' + WA_NUMERO;
  var MSG_PADRAO = 'Olá, Mardoqueu! Quero o Diagnóstico de Prontidão gratuito do meu projeto (captação de fomento).';

  // Chaves de armazenamento (prefixo proprio, para nao colidir com o resto do site da Cultivee)
  var CHAVE_SESSAO = 'cultivee_fomento_origem_sessao';      // sessionStorage
  var CHAVE_PAGO = 'cultivee_fomento_ultimo_clique_pago';   // localStorage, 90 dias
  var CHAVE_TESTE = 'cultivee_fomento_teste';               // sessionStorage + cookie
  var CHAVE_ENVIO = 'cultivee_fomento_envio';               // sessionStorage: ultimo envio do formulario
  var CHAVE_CONVERTIDOS = 'cultivee_fomento_convertidos';   // sessionStorage: envios ja contados
  var CHAVE_LEAD = 'cultivee_fomento_lead_sessao';          // sessionStorage: Lead ja contado nesta sessao
  var JANELA_LEAD_MIN = 30;                                 // sessao de contato: 1 Lead a cada 30 min
  var JANELA_PAGO_DIAS = 90;

  var MEDIAS_PAGAS = ['cpc', 'ppc', 'paid', 'paidsearch', 'paid-search', 'paid_social', 'paidsocial', 'cpm', 'display', 'ads'];
  var BUSCADORES = ['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'ecosia.', 'search.brave'];
  var SOCIAIS = ['facebook.', 'instagram.', 'linkedin.', 'youtube.', 't.co', 'twitter.', 'x.com', 'whatsapp', 'tiktok.', 'threads.'];
  var DOMINIO_PROPRIO = 'cultivee.com.br';
  var ALFABETO = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // sem 0/O e 1/I/L: o dono le e digita o codigo

  // ===== 2. Modo teste (?teste=1 liga, ?teste=0 desliga; vale para a aba e por 1 dia no cookie) =====
  function modoTeste() {
    try {
      var p = new URLSearchParams(w.location.search).get('teste');
      if (p === '1') {
        try { sessionStorage.setItem(CHAVE_TESTE, '1'); } catch (_) {}
        d.cookie = CHAVE_TESTE + '=1; path=/; max-age=86400; samesite=lax';
        return true;
      }
      if (p === '0') {
        try { sessionStorage.removeItem(CHAVE_TESTE); } catch (_) {}
        d.cookie = CHAVE_TESTE + '=; path=/; max-age=0; samesite=lax';
        return false;
      }
      var s = null;
      try { s = sessionStorage.getItem(CHAVE_TESTE); } catch (_) {}
      return s === '1' || (new RegExp('(?:^|; )' + CHAVE_TESTE + '=1')).test(d.cookie);
    } catch (_) { return false; }
  }
  var TESTE = modoTeste();

  // ===== 3. Tag do Google: UM gtag.js, dois config (GoogleTags.tsx) =====
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') {
    w.gtag = function () { w.dataLayer.push(arguments); };
  }
  if (GA_ID || ADS_ID) {
    var jaTem = d.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    if (!jaTem) {
      var sg = d.createElement('script');
      sg.async = true;
      sg.src = 'https://www.googletagmanager.com/gtag/js?id=' + (GA_ID || ADS_ID);
      (d.head || d.documentElement).appendChild(sg);
    }
    w.gtag('js', new Date());
    // Em teste: debug_mode (aparece no DebugView) e traffic_type=internal (filtro de trafego
    // interno do GA4 pode excluir). Fora de teste: config padrao.
    var cfg = TESTE ? { debug_mode: true, traffic_type: 'internal' } : {};
    if (GA_ID) w.gtag('config', GA_ID, cfg);
    if (ADS_ID) w.gtag('config', ADS_ID);
  }

  // ===== 4. Pixel da Meta (o mesmo snippet oficial que ja estava no <head>) =====
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(w,d,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  w.fbq('init', PIXEL_ID);

  // ===== 5. Atribuicao (atribuicao.ts) =====
  function nomeDoReferrer(ref) {
    try { return new URL(ref).hostname.replace(/^www\./, ''); } catch (_) { return String(ref).slice(0, 80); }
  }
  function limpaUtm(v, max) {
    if (!v) return undefined;
    var s = String(v).replace(/[^\w\-.]/g, '').slice(0, max || 100);
    return s || undefined;
  }
  /** utm_content no formato que vai na mensagem (mesma limpeza do cv_ref antigo). */
  function anuncioCurto(v) {
    if (!v) return '';
    return String(v).toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
  }

  /** Classifica a origem pela URL e pelo referrer. Puro: nao le nem grava armazenamento. */
  function classificar(href, referrer, agoraIso) {
    var url = new URL(href);
    var p = url.searchParams;
    var gclid = limpaUtm(p.get('gclid') || p.get('gbraid') || p.get('wbraid'), 300);
    var msclkid = limpaUtm(p.get('msclkid'), 300);
    var fbclid = limpaUtm(p.get('fbclid'), 300);
    var fonte = limpaUtm(p.get('utm_source'));
    var midia = limpaUtm(p.get('utm_medium'));
    var base = {
      fonte: fonte, midia: midia,
      campanha: limpaUtm(p.get('utm_campaign')),
      termo: limpaUtm(p.get('utm_term')),
      conteudo: limpaUtm(p.get('utm_content')),
      gclid: gclid, fbclid: fbclid,
      em: agoraIso || new Date().toISOString(),
      paginaEntrada: url.pathname,
      referrer: referrer ? nomeDoReferrer(referrer) : undefined
    };
    function com(o) { for (var k in o) base[k] = o[k]; return base; }
    var fonteL = (fonte || '').toLowerCase();

    // 1. Clique pago identificado pelo anunciante
    if (gclid) return com({ canal: 'pago', rede: 'google', rotulo: 'Google Ads (pago)' });
    if (msclkid) return com({ canal: 'pago', rede: 'microsoft', rotulo: 'Microsoft Ads (pago)', gclid: msclkid });
    // 2. Marcacao manual dizendo que e pago (a campanha Meta usa utm_medium=paid)
    if (midia && MEDIAS_PAGAS.indexOf(midia.toLowerCase()) !== -1) {
      var google = fonteL === 'google' || fonteL === 'adwords' || fonteL === 'googleads';
      return com({ canal: 'pago', rede: google ? 'google' : (fonteL || 'outro'), rotulo: (fonte || 'Campanha') + ' (pago)' });
    }
    // 3. fbclid sem midia paga: post organico do Instagram/Facebook. NUNCA pago.
    if (fbclid) return com({ canal: 'social', rotulo: 'Rede social (fbclid)' });
    // 4. UTM sem midia paga (newsletter, bio, parceiro)
    if (fonte) return com({ canal: 'referencia', rotulo: 'Campanha: ' + fonte + (midia ? ' / ' + midia : '') });
    // 5. Sem marcacao: decide pelo referrer
    if (!referrer) return com({ canal: 'direto', rotulo: 'Direto (digitou ou favoritos)' });
    var host = nomeDoReferrer(referrer).toLowerCase();
    var hostAtual = url.hostname.replace(/^www\./, '').toLowerCase();
    if (host.indexOf(DOMINIO_PROPRIO) !== -1 || host === hostAtual) {
      return com({ canal: 'direto', rotulo: 'Navegação interna', interna: true });
    }
    if (BUSCADORES.some(function (b) { return host.indexOf(b) !== -1; })) return com({ canal: 'organico', rotulo: 'Busca orgânica (' + host + ')' });
    if (SOCIAIS.some(function (s) { return host.indexOf(s) !== -1; })) return com({ canal: 'social', rotulo: 'Rede social (' + host + ')' });
    return com({ canal: 'referencia', rotulo: 'Site externo (' + host + ')' });
  }

  function leJson(store, chave) {
    try { var b = store.getItem(chave); return b ? JSON.parse(b) : null; } catch (_) { return null; }
  }
  function gravaJson(store, chave, valor) {
    try { store.setItem(chave, JSON.stringify(valor)); } catch (_) { /* modo anonimo: segue sem atribuicao */ }
  }

  /** Grava a origem: a PRIMEIRA da sessao (navegacao interna nao sobrescreve) e o ultimo clique pago. */
  function capturarAtribuicao() {
    var atual;
    try { atual = classificar(w.location.href, d.referrer || ''); } catch (_) { return null; }
    var sessao = leJson(sessionStorage, CHAVE_SESSAO);
    // Clique pago novo na mesma sessao substitui a origem (vale o ultimo pago, como na Biopdi)
    if ((!sessao && !atual.interna) || (atual.canal === 'pago' && sessao && sessao.canal !== 'pago')) {
      gravaJson(sessionStorage, CHAVE_SESSAO, atual);
    }
    if (atual.canal === 'pago') gravaJson(localStorage, CHAVE_PAGO, atual);
    return atual;
  }

  /** Atribuicao que vale para o lead: clique pago dentro de 90 dias vence; senao, a da sessao. */
  function lerAtribuicao() {
    var sessao = leJson(sessionStorage, CHAVE_SESSAO);
    var pago = leJson(localStorage, CHAVE_PAGO);
    if (pago && pago.em) {
      var dias = (Date.now() - new Date(pago.em).getTime()) / 86400000;
      if (dias >= 0 && dias <= JANELA_PAGO_DIAS) {
        var mesma = !!(sessao && sessao.canal === 'pago');
        pago.retornou = !mesma;
        return pago;
      }
    }
    if (sessao) return sessao;
    try { return classificar(w.location.href, d.referrer || ''); } catch (_) { return { canal: 'direto', rotulo: 'Direto' }; }
  }

  // ===== 6. Codigo de referencia (whatsapp.ts) =====
  function letraDaOrigem(a) {
    switch (a && a.canal) {
      case 'pago': return a.rede === 'google' ? 'G' : 'P';
      case 'organico': return 'O';
      case 'social': return 'S';
      case 'referencia': return 'R';
      default: return 'D';
    }
  }
  function codigo4() {
    var b = new Uint8Array(4);
    (w.crypto || w.msCrypto).getRandomValues(b);
    var s = '';
    for (var i = 0; i < 4; i++) s += ALFABETO[b[i] % ALFABETO.length];
    return s;
  }
  /** Gera o ref e a etiqueta que vai na mensagem: "[ref: P-7K3Q an3-dois-lados]". */
  function novoRef(a) {
    a = a || lerAtribuicao();
    var ref = letraDaOrigem(a) + '-' + (TESTE ? 'TST1' : codigo4());
    var anuncio = anuncioCurto(a && a.conteudo);
    return { ref: ref, anuncio: anuncio, etiqueta: '[ref: ' + ref + (anuncio ? ' ' + anuncio : '') + ']' };
  }

  // ===== 7. GA4 e Ads (gtag.ts) =====
  function evento(nome, params) {
    if (typeof w.gtag !== 'function') return;
    w.gtag('event', nome, params || {});
  }
  /**
   * Conversao nos dois destinos: GA4 sempre; Ads so com rotulo e fora do modo teste.
   * params.lead_contado = 'false' (clique repetido na sessao ou robo): o GA4 recebe o evento
   * SEM value (nao infla o valor) e o Ads nao recebe conversao.
   */
  function conversao(tipo, params) {
    params = params || {};
    var contado = params.lead_contado !== 'false';
    var valor = VALORES[tipo];
    var p = { currency: 'BRL' };
    if (valor !== undefined && contado) p.value = valor;
    for (var k in params) if (params[k] !== undefined && params[k] !== '') p[k] = params[k];
    if (TESTE) { p.secao = p.origem; p.origem = 'teste-claude'; p.debug_mode = true; }
    evento('gerar_lead_' + tipo, p);
    var sendTo = ADS_CONVERSOES[tipo];
    if (!contado || !ADS_ID || !sendTo || TESTE) return;
    w.gtag('event', 'conversion', { send_to: sendTo, value: valor, currency: 'BRL' });
  }

  // ===== 8. Pixel + CAPI (o cvCapi de antes, agora com o registro no mesmo POST) =====
  function cookie(n) { var m = d.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]+)')); return m ? m[1] : undefined; }
  function uuid() {
    try { if (w.crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (_) {}
    return Date.now() + '-' + Math.random().toString(16).slice(2);
  }
  function enviar(corpo) {
    var json = JSON.stringify(corpo);
    try {
      // fetch keepalive: sobrevive a troca de aba/app (era o que ja estava validado em producao)
      w.fetch(CAPI_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, body: json })
        .catch(function () {});
      return;
    } catch (_) {}
    try { navigator.sendBeacon && navigator.sendBeacon(CAPI_URL, new Blob([json], { type: 'text/plain' })); } catch (_) {}
  }
  /**
   * Evento para a Meta (Pixel no navegador + CAPI no Worker, mesmo event_id para dedup).
   * `registro` vai SO para o Worker, que repassa ao Sheet e nunca a Meta.
   * Em modo teste o Pixel do navegador NAO recebe Lead (o Lead e o evento de otimizacao do
   * conjunto de anuncios; Lead falso ensina a Meta errado). O Worker grava a linha marcada.
   */
  function meta(nome, contentName, registro) {
    try {
      var id = uuid();
      var extra = contentName ? { content_name: contentName } : {};
      if (typeof w.fbq === 'function' && !(TESTE && nome === 'Lead')) w.fbq('track', nome, extra, { eventID: id });
      var corpo = {
        event_name: nome, event_id: id, event_source_url: w.location.href,
        content_name: contentName || undefined, fbp: cookie('_fbp'), fbc: cookie('_fbc')
      };
      if (registro) corpo.registro = registro;
      enviar(corpo);
    } catch (_) {}
  }
  // Compatibilidade com o nome antigo (console, scripts de teste do projeto-ADS)
  w.cvCapi = function (name, extra) { meta(name, extra && extra.content_name); };

  /** Campos do registro permanente (sem nome, sem telefone, sem texto livre). */
  function registroBase(tipo, origem, a, r) {
    return {
      tipo: tipo,
      ref: r.ref,
      canal: a.canal,
      origem: origem,
      utm_source: a.fonte, utm_medium: a.midia, utm_campaign: a.campanha,
      utm_content: a.conteudo, utm_term: a.termo,
      gclid: a.gclid, fbclid: a.fbclid,
      pagina: w.location.pathname,
      pagina_entrada: a.paginaEntrada,
      clique_pago_em: a.canal === 'pago' ? a.em : undefined,
      teste: TESTE ? 'teste-claude' : undefined
    };
  }

  // ===== 8b. Filtro de robos: no maximo 1 Lead por sessao de contato, nenhum com webdriver =====
  function automatizado() {
    try { return navigator.webdriver === true; } catch (_) { return false; }
  }
  /**
   * Decide se este contato conta como Lead (Pixel + CAPI + registro no Sheet).
   *  - navigator.webdriver === true: nunca conta (robo de revisao de anuncios, scripts).
   *  - ja houve Lead nesta sessao nos ultimos 30 min: nao conta (o robo clica em todos os
   *    botoes em segundos; uma pessoa que clica de novo ja foi contada no primeiro clique).
   *  - modo teste: sempre conta, sem gravar a sessao (o Lead de teste nunca chega a Meta e o
   *    dono precisa poder clicar varias vezes para conferir o Sheet).
   * O link do WhatsApp funciona igual nos tres casos; so a medicao muda.
   */
  function decidirLead() {
    if (TESTE) return { contar: true };
    if (automatizado()) return { contar: false, robo: 'webdriver' };
    var ultimo = leJson(sessionStorage, CHAVE_LEAD);
    if (ultimo && ultimo.em) {
      var min = (Date.now() - new Date(ultimo.em).getTime()) / 60000;
      if (min >= 0 && min < JANELA_LEAD_MIN) return { contar: false };
    }
    return { contar: true };
  }
  function marcarLead(tipo, ref) {
    if (TESTE) return;
    gravaJson(sessionStorage, CHAVE_LEAD, { em: new Date().toISOString(), tipo: tipo, ref: ref });
  }

  // ===== 9. Clique no WhatsApp (whatsapp.ts + LinkContatoMedido.tsx) =====
  function urlWhatsApp(texto) { return WA_BASE + '?text=' + encodeURIComponent(texto); }
  function textoDoLink(a) {
    try { var t = new URL(a.href).searchParams.get('text'); return t ? t.replace(/\s*\[ref: [^\]]*\]\s*$/, '') : MSG_PADRAO; }
    catch (_) { return MSG_PADRAO; }
  }
  function origemDoLink(a) {
    if (a.dataset && a.dataset.origem) return a.dataset.origem;
    if (a.classList.contains('wa-float')) return 'flutuante';
    if (a.closest('header')) return 'header';
    if (a.closest('footer')) return 'rodape';
    var s = a.closest('section');
    if (s && s.id) return s.id;
    return 'outro';
  }
  /**
   * Registra o clique e devolve a URL final do wa.me. GA4 sempre; Pixel/CAPI + registro so
   * no primeiro contato da sessao e fora de navegador automatizado (decidirLead).
   */
  function cliqueWhatsApp(textoBase, origem) {
    var a = lerAtribuicao();
    var r = novoRef(a);
    var sep = textoBase.indexOf('\n') > -1 ? '\n' : ' ';
    var texto = textoBase + sep + r.etiqueta;
    var dec = decidirLead();
    conversao('whatsapp', { origem: origem, canal: a.canal, ref: r.ref, lead_contado: dec.contar ? 'true' : 'false', robo: dec.robo });
    if (dec.contar) {
      marcarLead('whatsapp', r.ref);
      meta('Lead', origem, registroBase('whatsapp', origem, a, r));
    }
    return urlWhatsApp(texto);
  }
  // Listener delegado: troca o href no clique, antes de o navegador seguir o link.
  // O href servido no HTML fica sem codigo, para o link funcionar mesmo sem JavaScript.
  d.addEventListener('click', function (e) {
    var el = e.target && e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (!el || el.hasAttribute('data-sem-lead')) return; // botao "abrir de novo" da pagina de obrigado
    el.href = cliqueWhatsApp(textoDoLink(el), origemDoLink(el));
  }, true);

  // ===== 10. Formulario: envio abre o WhatsApp e leva a aba para /obrigado/ =====
  function urlObrigado() {
    var path = w.location.pathname;
    if (path.indexOf('/fomento') === 0) return '/fomento/obrigado?tipo=diagnostico'; // sem barra: evita o 301 do nginx
    return path.replace(/[^\/]*$/, '') + 'obrigado/?tipo=diagnostico';                // previa local
  }
  /**
   * Chamar no submit do formulario, depois de validar. `textoBase` traz as respostas (com o
   * nome, que so vai na mensagem); `categorias` traz SO codigos fechados (edital, prazo_tipo,
   * estagio, perfil, investe). Nao dispara Lead: quem dispara e a pagina de obrigado.
   */
  function enviarFormulario(textoBase, origem, categorias) {
    var a = lerAtribuicao();
    var r = novoRef(a);
    var texto = textoBase + '\n' + r.etiqueta;
    var envio = {
      id: uuid(), ref: r.ref, origem: origem, canal: a.canal, categorias: categorias || {},
      texto: texto, em: new Date().toISOString(), popup: false
    };
    var url = urlWhatsApp(texto);
    var janela = null;
    try { janela = w.open(url, '_blank'); if (janela) janela.opener = null; } catch (_) {}
    envio.popup = !!janela;
    gravaJson(sessionStorage, CHAVE_ENVIO, envio);
    w.location.href = urlObrigado();
    return envio;
  }

  // ===== 11. Pagina de obrigado (ConversaoObrigado.tsx) =====
  /**
   * Dispara a conversao do formulario UMA vez por envio. Sem envio na sessao nao dispara
   * (diferenca deliberada da Biopdi: aqui o Lead treina o anuncio da Meta, e visita direta
   * a /obrigado/ nao prova envio). Com ?teste=1 e sem envio, dispara um envio sintetico
   * marcado como teste (ref X-TST1), para conferir a medicao sem gerar lead real.
   */
  function conversaoObrigado() {
    var envio = leJson(sessionStorage, CHAVE_ENVIO);
    if (!envio && TESTE) {
      var at = lerAtribuicao();
      envio = { id: 'teste-' + Date.now(), ref: letraDaOrigem(at) + '-TST1', origem: 'teste-direto', canal: at.canal,
        categorias: {}, texto: MSG_PADRAO + ' [ref: ' + letraDaOrigem(at) + '-TST1]', sintetico: true };
      gravaJson(sessionStorage, CHAVE_ENVIO, envio);
    }
    if (!envio) return { disparou: false, motivo: 'sem-envio' };
    var feitos = leJson(sessionStorage, CHAVE_CONVERTIDOS) || [];
    if (feitos.indexOf(envio.id) !== -1) return { disparou: false, motivo: 'ja-contado', envio: envio };
    feitos.push(envio.id);
    gravaJson(sessionStorage, CHAVE_CONVERTIDOS, feitos);
    var a = lerAtribuicao();
    var c = envio.categorias || {};
    // Filtro de robos: se ja houve Lead nesta sessao (ex.: clique no WhatsApp antes do envio)
    // ou o navegador e automatizado, o GA4 recebe o envio com lead_contado='false' e a Meta
    // e o Sheet nao recebem nada. A mensagem do WhatsApp sai igual.
    var dec = decidirLead();
    conversao('formulario', {
      origem: envio.origem, canal: envio.canal || a.canal, ref: envio.ref,
      edital: c.edital, prazo_tipo: c.prazo_tipo, estagio: c.estagio, perfil: c.perfil, investe: c.investe,
      lead_contado: dec.contar ? 'true' : 'false', robo: dec.robo
    });
    if (!dec.contar) return { disparou: false, motivo: dec.robo ? 'robo' : 'lead-da-sessao', envio: envio };
    marcarLead('formulario', envio.ref);
    var reg = registroBase('formulario', envio.origem, a, { ref: envio.ref });
    reg.canal = envio.canal || a.canal;
    reg.edital = c.edital; reg.prazo_tipo = c.prazo_tipo; reg.estagio = c.estagio; reg.perfil = c.perfil; reg.investe = c.investe;
    meta('Lead', 'form-' + envio.origem, reg);
    return { disparou: true, envio: envio };
  }

  // ===== 12. Na carga de toda pagina: atribuicao + PageView =====
  capturarAtribuicao();
  meta('PageView');

  w.cvMedicao = {
    GA_ID: GA_ID, ADS_ID: ADS_ID, teste: TESTE, MSG_PADRAO: MSG_PADRAO,
    evento: function (nome, params) {
      params = params || {};
      if (TESTE) { params.debug_mode = true; params.teste = 'teste-claude'; }
      evento(nome, params);
    },
    conversao: conversao,
    classificar: classificar,
    lerAtribuicao: lerAtribuicao,
    novoRef: novoRef,
    urlWhatsApp: urlWhatsApp,
    enviarFormulario: enviarFormulario,
    conversaoObrigado: conversaoObrigado,
    lerEnvio: function () { return leJson(sessionStorage, CHAVE_ENVIO); }
  };
})(window, document);
