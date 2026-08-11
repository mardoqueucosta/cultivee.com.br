---
titulo: 'Satélite e IA mapeiam telas antigranizo na maçã [2026]'
resumo: >-
  Satélite gratuito e IA já mapeiam telas antigranizo nos pomares de maçã do Sul
  do Brasil. Veja o que os dados mostram e como decidir o investimento.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-08-11'
dataModificacao: '2026-08-11'
leitura: '17 min'
tldr: >-
  Dois grupos brasileiros usam satélite Sentinel-2 (gratuito) e inteligência
  artificial para mapear telas antigranizo em pomares de maçã: a Embrapa, em
  Vacaria (RS), validou um classificador com 95% de acurácia para identificar
  tela, e a Epagri/Ciram (SC) mediu que apenas 23% da Serra Catarinense está
  protegida. Como a tela custa mais de R$ 31 mil por hectare, o mapa ajuda o
  produtor a decidir onde investir primeiro.
imagens:
  - src: /blog/satelite-e-ia-mapeiam-telas-antigranizo-no-pomar/vista-aerea-de-pomar-de-maca-com-fileiras-cobertas-por--1.jpg
    alt: 'Vista aérea de pomar de maçã com fileiras cobertas por tela antigranizo branca na serra'
    caption: 'Pomar de maçã protegido por tela antigranizo, o alvo que os algoritmos aprendem a identificar nas imagens de satélite'
  - src: /blog/satelite-e-ia-mapeiam-telas-antigranizo-no-pomar/pomares-de-maca-densamente-cobertos-por-tela-antigraniz-2.jpg
    alt: 'Pomares de maçã densamente cobertos por tela antigranizo em vale alpino com montanhas ao fundo'
    caption: 'Em regiões como o norte da Itália, a maçã sob rede é padrão consolidado, com mais de 80% dos pomares protegidos'
  - src: /blog/satelite-e-ia-mapeiam-telas-antigranizo-no-pomar/vista-de-dentro-de-pomar-de-maca-sob-tela-antigranizo-c-3.jpg
    alt: 'Vista de dentro de pomar de maçã sob tela antigranizo com luz difusa filtrada pela malha'
    caption: 'Debaixo da tela, a luz filtrada e o microclima alterado mudam a fotossíntese, o molhamento foliar e a incidência de pragas'
---
Perder uma safra inteira de maçã em quinze minutos de granizo é uma realidade recorrente na Serra Catarinense e no planalto gaúcho. A defesa mais eficaz, a tela antigranizo, custa caro: o investimento adicional passa de R$ 31 mil por hectare. A pergunta que o produtor faz há décadas ("proteger qual talhão primeiro?") sempre foi respondida no olho. Em 2025 e 2026, dois grupos de pesquisa brasileiros mudaram esse jogo ao usar imagens de satélite gratuitas e inteligência artificial para transformar essa decisão em um mapa com métrica de confiabilidade. Este artigo separa com clareza o que cada estudo mediu, explica como a tecnologia funciona, mostra quanto custa proteger um pomar e como o produtor pode usar esse dado hoje.

## O que os pesquisadores brasileiros descobriram

A **tela antigranizo** é uma estrutura física de polietileno de alta densidade (PEAD), montada sobre o pomar em formato de telhado ou semiplano, cuja função é interceptar o granizo antes que ele atinja folhas e frutos. Segundo a Embrapa Uva e Vinho, é a alternativa mais eficaz para evitar perdas econômicas causadas pelo granizo na macieira do Sul do Brasil, região que concentra a maior frequência desse tipo de evento no país. A novidade de 2025 e 2026 não é a tela em si, e sim a capacidade de enxergar, de cima, onde ela já existe e onde ainda falta.
![Vista aérea de pomar de maçã com fileiras cobertas por tela antigranizo branca na serra](/blog/satelite-e-ia-mapeiam-telas-antigranizo-no-pomar/vista-aerea-de-pomar-de-maca-com-fileiras-cobertas-por--1.jpg)
*Pomar de maçã protegido por tela antigranizo, o alvo que os algoritmos aprendem a identificar nas imagens de satélite*

Dois grupos chegaram a esse resultado de forma independente, e é fundamental não confundi-los, porque mediram coisas diferentes.

O primeiro é a **Embrapa Uva e Vinho, em Vacaria (RS)**, em parceria com a Embrapa Agricultura Digital (Campinas). O foco desse trabalho foi validar um método de classificação por inteligência artificial capaz de identificar automaticamente quais pomares têm tela. O resultado é uma métrica de acurácia, não um censo de área: o classificador acertou 76% das áreas no geral e 95% na tarefa específica de reconhecer o pomar coberto por tela, com índice Kappa de 0,67, tudo validado contra 800 pontos de referência em campo.

O segundo é o **levantamento da Epagri/Ciram, na Serra Catarinense (SC)**, sob responsabilidade do pesquisador Kleber Trabaquini, doutor em sensoriamento remoto pelo INPE. Esse trabalho é um censo de área: mediu que o pomar de maçã da Serra Catarinense cresceu de 12.060 hectares em 2020 para 14.981 hectares em 2025, e que cerca de 23% dessa área já conta com tela antigranizo. Só São Joaquim responde por 10.912 hectares, ou 63% da área estadual e 34% da área nacional de maçã.

> Os dois trabalhos não são o mesmo estudo. O da Embrapa (RS) valida um método de IA e entrega uma acurácia; o da Epagri (SC) mede área e cobertura e entrega um percentual. Instituições diferentes, estados diferentes, perguntas diferentes.

O Brasil planta cerca de 32.900 hectares de maçã, com Santa Catarina respondendo por perto de 48% da área nacional, segundo dados do IBGE. Não à toa, os dois maiores polos produtores, Vacaria e a Serra Catarinense, viraram o alvo dos primeiros mapeamentos: é onde há mais valor em risco e mais decisão de investimento pendente.

## Como funciona a classificação por satélite e IA

A classificação de imagens de satélite por aprendizado de máquina consiste em treinar um algoritmo para associar padrões de reflectância espectral, a assinatura de luz que cada superfície reflete em diferentes comprimentos de onda, a uma classe de cobertura do solo. No caso da maçã, as classes são "pomar sem tela", "pomar com tela branca", "pomar com tela preta" e "não-pomar". O algoritmo aprende a partir de pontos coletados em campo (a chamada verdade terrestre) e depois aplica esse aprendizado à imagem inteira, pixel a pixel.

Os estudos brasileiros combinam algumas técnicas. Vale entender cada uma porque a palavra "IA" nas manchetes esconde escolhas metodológicas concretas.

| Técnica | O que faz | Papel no estudo |
| --- | --- | --- |
| K-means | Agrupa pixels por similaridade espectral, sem supervisão | Segmentação inicial da imagem, etapa de pré-processamento |
| Random Forest (RF) | Conjunto de árvores de decisão, classificação supervisionada | Classificador principal nos dois estudos de Vacaria |
| 1DCNN | Rede neural profunda aplicada à série temporal de um índice | Testada em paralelo ao RF no estudo de 2026 |
| Índices espectrais | Fórmulas que realçam vegetação, água ou solo (NDVI, EVI, SAVI, NDWI, BSI) | Insumo de entrada para RF e 1DCNN |

No estudo de Vacaria, a equipe comparou classificação pixel a pixel contra classificação por objeto (que agrupa pixels em segmentos antes de classificar) e a abordagem pixel a pixel se saiu melhor. No estudo mais avançado, de 2026, o Random Forest superou a rede neural 1DCNN justamente nos níveis de classificação mais finos, como distinguir a cor da tela. Os índices BSI e NDVI se mostraram mais úteis para separações amplas (tem pomar ou não), enquanto EVI e SAVI foram decisivos para discriminar a cor da malha.

Duas métricas aparecem o tempo todo e merecem tradução. A **acurácia** é simplesmente o percentual de acertos: 95% de acurácia na classe "com tela" significa que, a cada 100 pomares que o algoritmo apontou como cobertos, cerca de 95 realmente estavam. O **índice Kappa** é mais rigoroso, porque desconta os acertos que aconteceriam por puro acaso; varia de 0 a 1, e um Kappa de 0,67 é considerado uma concordância substancial na literatura de sensoriamento remoto. Em outras palavras, o método é confiável o bastante para orientar planejamento regional, ainda que não perfeito ao ponto de dispensar checagem de campo.

Essa lógica de sensores lendo o ambiente e algoritmos interpretando o dado é a mesma que sustenta a agricultura de precisão em escala menor. Quem monta um sistema de cultivo com [sensoriamento e monitoramento por IoT](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen) usa o mesmo princípio: transformar leitura física em decisão de manejo, só que da bancada em vez da órbita.

## A evolução: de mapa manual a IA multissensor

O que torna esse tema mais rico do que uma nota de jornal é a trajetória metodológica por trás dele. Mapear tela por satélite não surgiu pronto: passou por três estágios claros em menos de uma década.

**2018 a 2022, interpretação visual sem IA.** Pesquisadores da UDESC/CAV (Lages-SC) publicaram na *Revista Brasileira de Fruticultura* o mapeamento dos pomares de São Joaquim usando imagens Sentinel-2 de agosto de 2018, processadas por interpretação visual em um sistema de informação geográfica, sem classificador automático, cruzadas com um modelo digital de elevação. O trabalho encontrou 7.974,80 hectares de pomar no município, dos quais apenas 11,79% (940,43 hectares) com tela antigranizo. Era preciso, porém trabalhoso e não escalável: cada polígono era desenhado por um analista humano.

**2025, a primeira aplicação de aprendizado de máquina ao problema.** No 19º CIIC (Congresso Interinstitucional de Iniciação Científica), realizado no Instituto Agronômico em Campinas, o pôster de Silva, Gebler e Dompieri aplicou K-means mais Random Forest sobre imagens Sentinel-2 processadas no Google Earth Engine, em Vacaria, alcançando o Kappa de 0,67. Segundo uma revisão publicada na revista *Climate* pelo mesmo grupo, esse foi o único estudo, até então, a mapear telas antigranizo com sensoriamento remoto no mundo.

**2026, o framework multissensor.** O artigo de Furuya e colegas, publicado na revista *[Remote Sensing](https://doi.org/10.3390/rs18101465)* (MDPI, com revisão por pares) e assinado também por Luciano Gebler, deu o salto seguinte: combinou Sentinel-2 com a série harmonizada Landsat-Sentinel (HLS), montou uma série temporal densa de cinco índices espectrais e, pela primeira vez, discriminou não só a presença da tela, mas a sua cor (branca, preta ou sem tela). Os próprios autores escrevem, em tradução livre, que "até onde sabemos, este é o primeiro estudo a aplicar série temporal multissensor e aprendizado de máquina para mapear sistemas de tela antigranizo em pomares de maçã".

Essa linha do tempo, mapa manual em 2018, primeira IA em 2025, IA multissensor em 2026, mostra por que a tecnologia amadureceu agora. Não foi um avanço isolado, e sim a convergência de vários fatores.

| Fator | O que mudou |
| --- | --- |
| Custo da imagem | O Sentinel-2 é gratuito e público desde 2015, com revisita a cada cinco dias |
| Processamento | O Google Earth Engine processa séries temporais em escala regional sem infraestrutura própria |
| Resolução | O satélite CBERS-04A chega a 2 metros, suficiente para talhões de 1 a 5 hectares |
| Algoritmos | Random Forest e K-means viraram função pronta em bibliotecas de geoprocessamento |
| Pressão climática | O aumento de chuvas extremas no Sul desde 1950 eleva o custo de não ter dado |

Segundo a [Agência FAPESP](https://agencia.fapesp.br/chuvas-extremas-no-sul-do-brasil-tem-aumentado-desde-1950-aponta-estudo/51742), a tendência de chuvas extremas no Sul do Brasil vem crescendo desde 1950. Some-se a isso o acesso aberto do [Sentinel-2 pela plataforma Copernicus](https://dataspace.copernicus.eu/data-collections/copernicus-sentinel-missions/sentinel-2) e fica claro que o mapeamento deixou de ser caro justamente quando ficou mais necessário.

## Comparação internacional: o que a Itália já fez

Para dimensionar os 23% da Serra Catarinense, vale olhar para quem já percorreu esse caminho. A referência mundial em maçã sob rede é o norte da Itália, e o contraste é gritante.
![Pomares de maçã densamente cobertos por tela antigranizo em vale alpino com montanhas ao fundo](/blog/satelite-e-ia-mapeiam-telas-antigranizo-no-pomar/pomares-de-maca-densamente-cobertos-por-tela-antigraniz-2.jpg)
*Em regiões como o norte da Itália, a maçã sob rede é padrão consolidado, com mais de 80% dos pomares protegidos*

Em **Trentino**, a principal região produtora de maçã do país, mais de 80% dos pomares já usam tela antigranizo, com cerca de 95% da produção segurada. No vizinho **Alto Adige**, aproximadamente metade da área está sob rede e cerca de 60% conta com seguro multirrisco. São regiões pequenas, de relevo alpino e altíssimo valor agregado por hectare, onde a proteção deixou de ser opcional há muito tempo.

> Enquanto Trentino protege mais de 80% dos pomares, a Serra Catarinense está em torno de 23%. A diferença não é só de percentual, é de maturidade de um modelo de produção protegida que o Brasil ainda está construindo.

Colocar Brasil e Itália lado a lado ajuda o produtor a enxergar a direção da tendência. Não se trata de dizer que a Serra Catarinense precisa chegar a 80%, porque frequência de granizo, custo de mão de obra e valor da fruta são diferentes. Mas o dado italiano mostra que existe um patamar de adoção muito mais alto tecnicamente viável, e que a lacuna brasileira é grande o suficiente para justificar exatamente o tipo de ferramenta de planejamento que os mapas por satélite oferecem. É por isso que o mapeamento virou prioridade institucional: não faz sentido planejar a expansão da proteção sem saber, com números, de onde se está partindo.

Nenhuma fonte brasileira consultada fazia essa ponte internacional, o que torna a comparação um diferencial deste artigo. Vale a ressalva de que os dados italianos vêm de publicações setoriais e comerciais, então devem ser lidos como ordem de grandeza consolidada, não como estatística oficial auditada.

## Quanto custa proteger um pomar: tela, seguro e canhão

Aqui entra a parte que o mapa, sozinho, não responde: saber onde falta tela é útil, mas a decisão final é econômica. A referência mais sólida em português é o Documento 119 da Embrapa Uva e Vinho, de dezembro de 2020, que comparou o desempenho financeiro de pomares protegidos com tela contra pomares cobertos apenas por seguro agrícola.

| Método | Princípio | Investimento aproximado | Vida útil | Cobertura de área |
| --- | --- | --- | --- | --- |
| Tela antigranizo | Barreira física de PEAD sobre o pomar | R$ 31.502,94/ha adicionais (Embrapa, 2020) | 15 a 20 anos | Pontual, por talhão |
| Seguro agrícola | Transferência de risco financeiro | Prêmio anual ~R$ 4.620/ha; valor segurado ~R$ 60.000/ha | Renovação anual | Qualquer área segurável |
| Canhão antigranizo | Iodeto de prata na nuvem para reduzir granizo | R$ 500 mil a R$ 1 milhão por unidade | Uso contínuo | Regional, raio até 80 ha |
| Envelopamento de frutos | Ensaca cada fruto, foco em pragas | ~R$ 80.000/ha (2024) | Sazonal | Pontual, mão de obra intensiva |
| Tela fotosseletiva | Tela que também altera o espectro de luz | Similar à tela comum, com material premium | 15 a 20 anos | Pontual |

O ponto mais interessante do estudo é contraintuitivo. Segundo a [Embrapa Uva e Vinho (Documento 119)](https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1128294/1/Doc119.pdf), em um cenário sem ocorrência de granizo, a taxa interna de retorno foi ligeiramente maior para o pomar sem tela e com seguro (12,51%) do que para o pomar com tela e sem seguro (12,24%). A tela é um investimento pesado, imobilizado por duas décadas, e nem sempre "ganha" da simples transferência de risco quando o granizo não aparece.

> "Impactos do granizo sobre o desempenho econômico e financeiro da produção de maçã em pomares protegidos com tela ou com seguro agrícola."
> Lazzarotto e Fioravanço, Embrapa Uva e Vinho, Documentos 119 (2020)

O que muda o cálculo é a frequência local de granizo. Onde granizo é raro, o seguro pode bastar; onde é recorrente, a tela protege o próprio potencial produtivo da planta (não só o bolso), porque uma macieira desfolhada por pedra perde produção nas safras seguintes, e nenhum seguro devolve isso. Por isso a decisão nunca é única: depende do apetite a risco, do histórico climático do talhão e do valor da fruta. É exatamente esse tipo de análise, com CAPEX, prêmio anual e retorno, que separa uma decisão emocional de uma decisão de investimento. Quem quiser exercitar esse raciocínio em outra cultura pode ver como estruturamos custos e retorno na [viabilidade econômica de projetos agrícolas comerciais](/blog/viabilidade-economica-e-roi-da-hidroponia-comercial).

Uma nota de cautela sobre números: o custo de R$ 13.235,50/ha que às vezes circula vem de um estudo sobre pera-japonesa de 2002, cultura e época diferentes, e não deve ser usado como equivalente à maçã. Os dados do canhão antigranizo e do envelopamento vêm de fontes comerciais de menor rastreabilidade, então valem como ordem de grandeza, não como orçamento fechado.

## O efeito colateral da tela: fitossanidade e microclima

Instalar tela não é um ato neutro do ponto de vista agronômico. Ao cobrir o pomar, a rede reduz a radiação que chega às plantas e altera o microclima debaixo dela, o que gera efeitos documentados na produção e na sanidade, uma dimensão que a cobertura jornalística quase sempre ignora.
![Vista de dentro de pomar de maçã sob tela antigranizo com luz difusa filtrada pela malha](/blog/satelite-e-ia-mapeiam-telas-antigranizo-no-pomar/vista-de-dentro-de-pomar-de-maca-sob-tela-antigranizo-c-3.jpg)
*Debaixo da tela, a luz filtrada e o microclima alterado mudam a fotossíntese, o molhamento foliar e a incidência de pragas*

**Radiação e fotossíntese.** Estudos de Amarante e colegas, publicados na *Pesquisa Agropecuária Brasileira* (2007) e na *Revista Brasileira de Fruticultura* (2009), analisaram especificamente radiação, fotossíntese, rendimento e qualidade de frutos em macieiras 'Royal Gala' e 'Fuji' cobertas por tela antigranizo. Os títulos confirmam que o efeito é mensurável, ainda que os valores numéricos exatos exijam consulta ao texto integral. Na prática, a tela branca sombreia menos que a preta, e é por isso que discriminar a cor da malha por satélite tem valor agronômico real, não é curiosidade técnica.

**Molhamento foliar e risco de doença.** Paula e colegas mediram, em Vacaria, a duração do período de molhamento foliar em pomares a céu aberto contra pomares sob tela. Esse indicador é um proxy direto do risco de doenças fúngicas, como a sarna da macieira: quanto mais tempo a folha fica úmida, maior a chance de infecção. Como a tela altera a ventilação e o secamento do dossel, ela pode mexer na pressão de doença, para melhor ou para pior, dependendo do desenho.

**Pragas.** Um estudo de 2024, com as cultivares 'Maxi Gala' e 'Fuji', avaliou seis cores de tela mais uma parcela sem cobertura sobre a incidência do pulgão-lanígero e a severidade da Mancha Foliar de Glomerella. O resultado indicou que a presença da tela (mais do que a cor específica) influencia a ocorrência do pulgão. A mensagem para o produtor é clara: a tela resolve o granizo, mas obriga a reajustar o manejo fitossanitário, porque muda o ambiente em que as pragas e os fungos vivem.

Todo esse conhecimento sobre como a reflectância da folha muda sob a tela também é o que tornou o mapeamento por satélite possível. O trabalho de De Rossi, Amaral e Gebler (2024), que mediu a reflectância de macieiras a pleno sol e sob dois tipos de tela, é o elo entre a física medida em campo e a classificação feita da órbita. Quem já lida com [manejo de pragas em ambiente protegido](/blog/pragas-e-doencas-em-hidroponia-e-cultivo-protegido) reconhece o padrão: cobrir a cultura sempre redesenha o mapa de quem ataca a planta.

## Limitações: o que esse mapeamento ainda não resolve

Ser transparente sobre o estágio da tecnologia é o que separa informação de propaganda, e aqui há várias ressalvas importantes.

**Ainda é pesquisa, não serviço pronto.** Os estudos de Vacaria são um pôster de iniciação científica e um artigo científico publicado em maio de 2026. Não há, nas fontes consultadas, evidência de que o método já rode como ferramenta operacional aberta a produtores ou seguradoras. O levantamento da Epagri/Ciram é o que mais se aproxima de um serviço público contínuo, por estar na terceira edição e ter caráter de monitoramento, com expectativa institucional de cobrir todo o território catarinense.

**Os números variam conforme a safra e o método.** Não existe um "percentual único" de cobertura nacional. O mapa manual de São Joaquim em 2018 achou 11,79%; a leitura mais recente da Serra Catarinense aponta 23%; a área de São Joaquim aparece ora como 8.692 hectares, ora como 10.912 hectares, conforme a rodada do mesmo censo. Isso não é contradição, são edições diferentes de um levantamento em evolução, mas exige sempre acompanhar o número do seu ano e da sua fonte.

**A imagem óptica sofre com nuvem.** O Sul do Brasil é uma região nublada, e satélites ópticos como o Sentinel-2 não enxergam através de nuvens. É justamente por isso que o estudo de 2026 recorreu a séries temporais multissensor, para aumentar a chance de conseguir imagens limpas ao longo do tempo. Ainda assim, é uma limitação estrutural que exige janelas de aquisição mais longas.

**O uso para seguro é hipótese, não fato.** É plausível que mapas de cobertura venham a ser usados por seguradoras para diferenciar prêmio e risco por propriedade, como já ocorre em outras culturas e países. Nada nas fontes consultadas confirma que isso já aconteça para maçã no Brasil. É uma fronteira regulatória e comercial em aberto, e deve ser tratada como possibilidade futura.

Por fim, não há dado de mercado específico para "serviço de mapeamento por satélite de tela antigranizo". É um nicho de pesquisa aplicada, não uma categoria comercial consolidada. O mercado global de redes agrícolas, que serve apenas como proxy indireto, é estimado entre USD 10,5 bilhões e 11,4 bilhões em 2025 e 2026, crescendo de 5% a 7% ao ano, segundo consultorias como Mordor Intelligence e Straits Research.

## O que o produtor pode fazer com essa informação hoje

Mesmo sem acesso direto à ferramenta, o produtor de maçã tira proveito imediato desse movimento. Alguns caminhos práticos.

**Situar a própria propriedade no mapa regional.** Saber que a Serra Catarinense está em 23% de cobertura, contra mais de 80% em Trentino, diz muito sobre onde o setor caminha. Se os vizinhos estão majoritariamente sem tela e o seu histórico de granizo é ruim, há uma vantagem competitiva em antecipar a proteção antes que a demanda por tela e mão de obra especializada aperte os preços.

**Fazer as contas com o Documento 119 na mão.** O produtor não precisa de satélite para rodar a comparação entre tela e seguro no seu próprio pomar. Basta pegar o custo por hectare, o prêmio de seguro cotado na sua região e o histórico local de granizo. A regra prática que emerge da pesquisa é simples: onde o granizo é frequente, a tela tende a compensar apesar do custo alto; onde é raro, o seguro pode ser mais eficiente em capital.

**Decidir a cor da tela com critério agronômico.** Já que a pesquisa mostra que cor afeta radiação, pragas e qualidade do fruto, a escolha entre tela branca e preta deve considerar o quanto o seu pomar precisa de luz e qual é a sua pressão de doença e de pulgão, não só o preço da malha.

**Acompanhar a expansão do monitoramento.** O levantamento da Epagri/Ciram tende a virar referência pública para planejamento de proteção em Santa Catarina. Vale acompanhar os próximos boletins, porque um censo contínuo de cobertura é a base para futuras políticas de crédito, subvenção de seguro e priorização de assistência técnica.

A mensagem central é que o dado por satélite move a decisão de "achismo" para "planejamento". A ferramenta ainda amadurece, mas o raciocínio que ela habilita, proteger com base em risco medido e não em memória de safra, já está disponível para qualquer produtor disposto a levantar seus próprios números.

## Perguntas frequentes

### O que os pesquisadores brasileiros descobriram sobre telas antigranizo usando satélite e IA?
Dois grupos, de forma independente, usaram imagens de satélite Sentinel-2 (gratuitas) processadas por algoritmos de classificação para mapear onde já existe proteção antigranizo. Em Vacaria (RS), a Embrapa Uva e Vinho validou um classificador Random Forest com acurácia de 76% no geral e 95% para identificar especificamente o pomar com tela. Em Santa Catarina, a Epagri/Ciram mediu que a área de pomar da Serra Catarinense cresceu de 12.060 hectares (2020) para 14.981 hectares (2025), com cerca de 23% já protegida por tela.

### O estudo do RS e o de SC são o mesmo?
Não. São pesquisas distintas, de instituições e estados diferentes. O estudo da Embrapa (Vacaria-RS) valida um método de classificação por inteligência artificial e entrega métricas de acurácia. O levantamento da Epagri/Ciram (Serra Catarinense-SC) é um censo contínuo de área plantada e cobertura por tela, já na sua terceira edição.

### Quanto custa instalar tela antigranizo em um pomar de maçã?
Segundo o Documento 119 da Embrapa Uva e Vinho (dezembro de 2020), o investimento com tela representa cerca de R$ 31.502,94 a mais por hectare do que um pomar sem tela. Como comparação, o valor segurado típico via seguro agrícola gira em torno de R$ 60.000 por hectare, com prêmio anual de aproximadamente R$ 4.620 por hectare e cobertura de 80% do valor segurado.

### Vale mais a pena a tela ou o seguro agrícola?
Segundo a mesma fonte, em cenário sem ocorrência de granizo, a taxa interna de retorno é ligeiramente maior para o pomar sem tela e com seguro (12,51%) do que para o pomar com tela e sem seguro (12,24%). Porém o custo por quilo produzido tende a ser menor com tela, e o seguro não protege o potencial produtivo da planta atingida. A decisão depende da frequência local de granizo e do apetite a risco, não existe resposta única.

### O Brasil está atrás de outros países na adoção de tela antigranizo?
Sim, de forma expressiva. Em Trentino, no norte da Itália, mais de 80% dos pomares de maçã usam tela antigranizo, com cerca de 95% da produção segurada. Na Serra Catarinense, o índice mais recente é de aproximadamente 23%, uma diferença de escala que ajuda a explicar por que o mapeamento por satélite virou prioridade de planejamento no Brasil.

### Por que essa tecnologia de mapeamento só surgiu agora?
A combinação de fatores amadureceu recentemente. As imagens Sentinel-2 são gratuitas desde 2015, mas processar séries temporais em escala regional só ficou barato com plataformas de nuvem como o Google Earth Engine, e algoritmos como Random Forest hoje estão acessíveis em bibliotecas de geoprocessamento, sem exigir um time dedicado de ciência de dados.

### A tela antigranizo tem efeitos colaterais na produção?
Sim. Pesquisas da Embrapa e da UDESC mostram que a tela altera a radiação recebida pela planta, o período de molhamento foliar (fator de risco para doenças fúngicas) e a incidência de pragas como o pulgão-lanígero. Esses efeitos variam conforme a cor e o tipo de malha, então instalar tela costuma exigir reajuste no manejo fitossanitário do pomar.

### Que outras tecnologias competem com a tela antigranizo?
As principais são o seguro agrícola (transferência de risco financeiro sem proteção física), o canhão antigranizo (dispersão de iodeto de prata para reduzir a formação de granizo na nuvem, com raio de proteção de até 80 hectares por unidade e custo de R$ 500 mil a R$ 1 milhão) e, para proteção principalmente fitossanitária, o envelopamento individual de frutos, que não substitui a tela contra o clima.

### Esse mapeamento por satélite já está disponível para o produtor usar?
Não foi localizada evidência de um serviço operacional aberto ao produtor final. Os estudos de Vacaria estão em estágio de pesquisa aplicada (um pôster de congresso e um artigo científico de maio de 2026). O levantamento da Epagri/Ciram é o mais próximo de um serviço público contínuo, com expectativa institucional de expandir a cobertura geográfica em Santa Catarina.
