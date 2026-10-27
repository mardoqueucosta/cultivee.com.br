/* Player da VSL nas paginas /fomento, /fomento/pipe e /fomento/recurso (27/10/2026).
 *
 * O video e NAO LISTADO no YouTube. A pagina mostra so a capa local e carrega o YouTube no clique
 * (pagina leve). Pela IFrame API do YouTube:
 *   - no FIM, o player da lugar ao nosso cartao final (botao do Diagnostico e "assistir de novo"),
 *     para a grade de videos sugeridos do YouTube nao aparecer;
 *   - na PAUSA, uma camada cobre o "mais videos" do YouTube (a barra de controles fica livre);
 *   - mede ate onde a pessoa assiste: vsl_play, vsl_progresso (25, 50, 75) e vsl_fim (100), com a
 *     pagina e o id do video, para comparar as versoes de teste da VSL.
 *
 * Marcacao na pagina (um bloco por pagina):
 *   <div class="vsl" data-yt="<id>" data-pagina="pipe" data-video="vsl-pipe-completa"
 *        data-cta-href="<link do Asaas>" data-cta-texto="Agendar meu Diagnostico de Prontidao"
 *        data-cta-checkout="consultoria-avulsa" data-cta-valor="250"> <button>capa</button> </div>
 * O botao do cartao final leva data-checkout, entao o begin_checkout da pagina mede o clique.
 */
(function () {
  var d = document, w = window;
  var vsl = d.querySelector('.vsl[data-yt]');
  if (!vsl) return;

  function evento(nome, extra) {
    var p = { pagina: vsl.dataset.pagina, video: vsl.dataset.video || vsl.dataset.yt };
    for (var k in extra) p[k] = extra[k];
    try {
      if (w.cvMedicao && w.cvMedicao.evento) w.cvMedicao.evento(nome, p);
      else if (w.gtag) w.gtag('event', nome, p);
    } catch (_) {}
  }

  function el(tag, cls, html) {
    var e = d.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  var capa = (vsl.querySelector('img') || {}).src || '';
  var ICONE_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var ICONE_DE_NOVO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg>';

  function botaoCta(origem) {
    var a = el('a', 'vsl-cta');
    a.href = vsl.dataset.ctaHref;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = vsl.dataset.ctaTexto;
    a.setAttribute('data-origem', origem);
    if (vsl.dataset.ctaCheckout) a.setAttribute('data-checkout', vsl.dataset.ctaCheckout);
    if (vsl.dataset.ctaValor) a.setAttribute('data-valor', vsl.dataset.ctaValor);
    return a;
  }

  // Cartao final: cobre o player inteiro
  var fim = el('div', 'vsl-ov vsl-fim');
  if (capa) fim.style.backgroundImage = 'url("' + capa + '")';
  var fimCaixa = el('div', 'vsl-caixa', '<p class="vsl-tit">O próximo passo é o Diagnóstico de Prontidão</p>');
  fimCaixa.appendChild(botaoCta('vsl-fim'));
  var deNovo = el('button', 'vsl-sec', ICONE_DE_NOVO + 'Assistir de novo');
  deNovo.type = 'button';
  fimCaixa.appendChild(deNovo);
  fim.appendChild(fimCaixa);

  // Camada da pausa: deixa livre a barra de controles do YouTube (embaixo)
  var pausa = el('div', 'vsl-ov vsl-pausa');
  var pausaCaixa = el('div', 'vsl-caixa');
  var continuar = el('button', 'vsl-continuar', ICONE_PLAY + 'Continuar assistindo');
  continuar.type = 'button';
  pausaCaixa.appendChild(continuar);
  pausaCaixa.appendChild(botaoCta('vsl-pausa'));
  pausa.appendChild(pausaCaixa);

  var player = null, marcas = {}, relogio = null, tPausa = null, jaTocou = false;

  function mostra(ov, sim) { ov.classList.toggle('on', !!sim); }

  function conferirProgresso() {
    if (!player || !player.getDuration) return;
    var dur = player.getDuration(), t = player.getCurrentTime();
    if (!dur) return;
    [25, 50, 75].forEach(function (pct) {
      if (!marcas[pct] && t / dur >= pct / 100) { marcas[pct] = 1; evento('vsl_progresso', { pct: pct }); }
    });
  }

  function aoMudar(e) {
    var S = w.YT.PlayerState;
    if (e.data === S.PLAYING) {
      clearTimeout(tPausa);
      mostra(pausa, false); mostra(fim, false);
      if (!jaTocou) { jaTocou = true; evento('vsl_play', {}); }
      if (!relogio) relogio = setInterval(conferirProgresso, 1000);
    } else if (e.data === S.PAUSED) {
      // espera um pouco: arrastar a barra de tempo tambem passa por "pausado"
      clearTimeout(tPausa);
      tPausa = setTimeout(function () { mostra(pausa, true); }, 450);
    } else if (e.data === S.ENDED) {
      clearTimeout(tPausa);
      clearInterval(relogio); relogio = null;
      conferirProgresso();
      if (!marcas[100]) { marcas[100] = 1; evento('vsl_fim', { pct: 100 }); }
      mostra(pausa, false); mostra(fim, true);
    }
  }

  continuar.addEventListener('click', function () { if (player) player.playVideo(); });
  deNovo.addEventListener('click', function () {
    if (!player) return;
    mostra(fim, false);
    player.seekTo(0, true); player.playVideo();
  });

  function carregarApi(pronto) {
    if (w.YT && w.YT.Player) return pronto();
    var antes = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = function () { if (antes) antes(); pronto(); };
    var s = d.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    d.head.appendChild(s);
  }

  var botao = vsl.querySelector('button');
  botao.addEventListener('click', function () {
    vsl.classList.add('carregando');
    carregarApi(function () {
      var alvo = el('div');
      alvo.id = 'vsl-player';   // YT.get('vsl-player') no console, para conferir
      vsl.replaceChildren(alvo, pausa, fim);
      player = new w.YT.Player(alvo, {
        host: 'https://www.youtube-nocookie.com',
        videoId: vsl.dataset.yt,
        playerVars: { autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1 },
        events: { onStateChange: aoMudar }
      });
    });
  }, { once: true });
})();
