---
titulo: 'Drone e Robô Mapeiam Pomar em 3D com IA [2026]'
resumo: >-
  Cientistas coreanos fundiram drone e robô terrestre com IA para mapear pomar
  em 3D. Veja o que a fruticultura brasileira pode aproveitar hoje.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-26'
dataModificacao: '2026-07-26'
leitura: '16 min'
tldr: >-
  Pesquisadores da Chonnam National University (Coreia do Sul) combinaram
  imagens de drone com dados de LiDAR de um robô terrestre, usando uma rede de
  deep learning para gerar o mapa 3D mais detalhado já demonstrado de um pomar
  comercial (DOI 10.1016/j.aiia.2026.03.005). É prova de conceito, testada só em
  maçã de clima temperado, sem produto à venda. No Brasil, Embrapa (SEEMEAR) e a
  startup Adroit Robotics (LeafSense) já atacam o mesmo problema por rotas
  diferentes.
imagens:
  - src: /blog/drone-e-robo-mapeiam-pomar-com-ia-em-3d/drone-agricola-sobrevoando-pomar-de-citros-em-fileiras--1.jpg
    alt: 'Drone agrícola sobrevoando pomar de citros em fileiras organizadas para mapeamento de precisão'
    caption: 'Drone captura a vista aérea que, sozinha, não enxerga a base e o interior das árvores'
  - src: /blog/drone-e-robo-mapeiam-pomar-com-ia-em-3d/robo-terrestre-autonomo-com-sensores-percorrendo-fileir-2.jpg
    alt: 'Robô terrestre autônomo com sensores percorrendo fileira de pomar para coleta de dados no solo'
    caption: O robô terrestre captura tronco, base e espaços vazios que o drone não alcança
  - src: /blog/drone-e-robo-mapeiam-pomar-com-ia-em-3d/tela-em-campo-exibindo-reconstrucao-tridimensional-de-u-3.jpg
    alt: 'Tela em campo exibindo reconstrução tridimensional de um pomar em nuvem de pontos, com as árvores reais ao fundo'
    caption: 'Drone e robô juntos viram um gêmeo digital: cada árvore vira dado tridimensional'
---
Um drone sobrevoa o pomar e enxerga a copa de cima. Um robô percorre a fileira no chão e enxerga o tronco e os espaços vazios que o drone nunca vê. Uma rede de inteligência artificial junta as duas visões num único modelo tridimensional, árvore por árvore. Foi isso que pesquisadores da Coreia do Sul demonstraram em 2026, publicando o mapa 3D mais detalhado já feito de um pomar comercial. A notícia correu o mundo, mas quase ninguém explicou o essencial para quem produz fruta no Brasil: é prova de conceito de laboratório, foi testada só em maçã de clima temperado e não existe produto à venda em lugar nenhum.

Ao mesmo tempo, o Brasil já tem peças concretas desse quebra-cabeça funcionando em citros de São Paulo e maçã de Santa Catarina, com nome, empresa e safra. Este artigo separa o que é fato científico do que é hype comercial, e mostra o que a fruticultura de precisão brasileira pode (e não pode) aproveitar agora.

**Os três fatos que resumem a notícia:**

| Fato | O que significa |
| --- | --- |
| Alinhamento em escala centimétrica ao longo de ~1,3 km testados | A fusão aérea-terrestre casa as duas visões com precisão fina, não é aproximação grosseira |
| Aplicações citadas: inspeção de cultivo, pulverização direcionada, capina e colheita autônomas | O modelo 3D vira base para robôs que agem planta-a-planta |
| Validação restrita a pomar de maçã, clima temperado | Sem dado publicado para citros, manga ou uva tropicais brasileiros |

## O que os pesquisadores coreanos realmente fizeram

**Mapeamento 3D de pomar é a reconstrução digital tridimensional de um talhão de fruticultura**, geometria de copa, altura de planta, espaçamento de fileiras e falhas de plantio, feita a partir da fusão de dados aéreos (drone) com dados coletados no nível do solo (robô terrestre). O estudo que originou a pauta define o conceito de forma operacional: um sistema que funde imagens de sensoriamento remoto de drone de baixa altitude com odometria LiDAR-IMU de um robô terrestre, por meio de uma rede de alinhamento cross-modal baseada em aprendizado profundo, para gerar um modelo digital multicamada do pomar.

O trabalho é de um grupo da Chonnam National University, liderado pelo professor Kyeong-Hwan Lee, e foi publicado na revista *Artificial Intelligence in Agriculture* (Zheng et al. 2026, [DOI 10.1016/j.aiia.2026.03.005](https://doi.org/10.1016/j.aiia.2026.03.005)). A arquitetura tem três módulos: uma extração de características em "dual-branch" (um ramo processa a imagem aérea, outro processa a nuvem de pontos LiDAR do robô), um módulo de atenção cruzada baseado em *transformer* (que aprende a correspondência entre as duas modalidades de dado) e um módulo de refinamento de fluxo multiescala. O resultado é o alinhamento das duas fontes num único referencial espacial, com precisão de escala centimétrica, validado ao longo de aproximadamente 1,3 km de percurso num pomar comercial de maçã.

Vale entender por que isso é difícil. A vista de cima (drone) cobre grandes áreas rápido, mas não penetra a copa densa nem enxerga a base do tronco. A vista de baixo (robô com LiDAR terrestre) captura tronco, estrutura interna e espaços vazios entre plantas, mas é lenta e não escala sozinha. Casar as duas automaticamente, sem intervenção humana, é o problema que a rede de IA resolve.

Um ponto que os concorrentes ignoram: este não é um sistema que caiu do céu. É a continuidade de um programa de pesquisa. O mesmo grupo já havia publicado em 2021 um método de mapeamento 3D de volume de macieiras usando **só** drone, por fotogrametria e um algoritmo de "concave hull by slices" (Dong, Kim & Lee, *Journal of Biosystems Engineering*, [DOI 10.1007/s42853-021-00120-y](https://doi.org/10.1007/s42853-021-00120-y)). O salto de 2026 foi adicionar a camada terrestre e a fusão por IA. E aqui está a primeira ressalva honesta: o estudo é prova de conceito revisada por pares, não um release de assessoria, mas os próprios autores não indicam fabricante, preço ou disponibilidade comercial. Confundir isso com produto pronto para comprar é o erro número um na leitura da notícia.

## Por que isso não é "só mais um drone agrícola"

Drone agrícola no Brasil já é rotina, mas para outras coisas. A imensa maioria dos voos hoje faz pulverização localizada (economia de defensivo) ou mapeamento 2D com NDVI (índice que detecta estresse hídrico e nutricional pela reflectância das plantas). Isso é manejo talhão-a-talhão: você olha o mapa, vê uma mancha de estresse e trata aquela zona. A reconstrução 3D planta-a-planta muda a lógica.
![Drone agrícola sobrevoando pomar de citros em fileiras organizadas para mapeamento de precisão](/blog/drone-e-robo-mapeiam-pomar-com-ia-em-3d/drone-agricola-sobrevoando-pomar-de-citros-em-fileiras--1.jpg)
*Drone captura a vista aérea que, sozinha, não enxerga a base e o interior das árvores*

A diferença é a mesma que separa uma foto de satélite de uma maquete física. O modelo 3D transforma **cada árvore** num ponto de dado individual: altura de copa, volume de dossel, espaço vazio na fileira, indicadores de saúde, posição GPS centimétrica. Num pomar, isso faz sentido porque cada árvore é um ativo de produção que vive décadas, diferente de uma lavoura de soja onde a planta dura um ciclo. É o que a literatura internacional chama de *precision orcharding*, manejo individual em vez de manejo por talhão.

Para enxergar onde a fusão drone+robô se encaixa, vale comparar os métodos disponíveis:

| Método | Princípio | O que entrega | Limitação principal | Custo relativo |
| --- | --- | --- | --- | --- |
| Fotogrametria RGB (drone) | Sobreposição de fotos vira nuvem de pontos | Ortomosaico, geometria aproximada | Não penetra copa densa, sem altura precisa sob dossel | Baixo (~R$ 15 a 40/ha) |
| Multiespectral/NDVI (drone) | Reflectância em bandas específicas | Estresse hídrico e nutricional | Não gera 3D real, exige calibração | Médio |
| LiDAR aéreo (drone) | Pulsos laser medem distância | Altura e volume de copa com precisão | Caro, não vê a base do tronco | Alto |
| LiDAR terrestre (robô/UGV) | Robô percorre a fileira com LiDAR e IMU | Tronco, base, espaços vazios | Lento, não escala em grandes áreas | Alto |
| Fusão cross-modal drone+robô | IA alinha a vista aérea com a terrestre | Modelo 3D multicamada por árvore | Prova de conceito, sem produto comercial | Não determinado |
| Satélite (Sentinel-2, Planet) | Reflectância orbital | Cobertura nacional, série histórica | Resolução baixa (3 a 10 m) para árvore individual | Muito baixo |

O ganho da fusão é somar o que cada fonte tem de melhor: a cobertura de área do drone com o detalhe estrutural do robô. Nenhum sensor sozinho entrega isso. Para quem quer entender a base de sensores e monitoramento que sustenta qualquer sistema desses, o [guia de automação e IoT com ESP32](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen) cobre os primeiros passos em sensoriamento agrícola, do sensor barato ao dado utilizável.

## O Brasil já tem peças desse quebra-cabeça

Aqui está o que os textos concorrentes não fazem: conectar a novidade coreana com o que já roda no Brasil. Nenhuma tecnologia nacional é idêntica à fusão cross-modal do estudo, mas várias atacam exatamente o mesmo problema, monitoramento planta-a-planta em pomar, por caminhos diferentes. E têm nome, empresa e safra.
![Robô terrestre autônomo com sensores percorrendo fileira de pomar para coleta de dados no solo](/blog/drone-e-robo-mapeiam-pomar-com-ia-em-3d/robo-terrestre-autonomo-com-sensores-percorrendo-fileir-2.jpg)
*O robô terrestre captura tronco, base e espaços vazios que o drone não alcança*

**Adroit Robotics (LeafSense)** é a mais próxima em espírito. A startup brasileira desenvolveu sensores de alta resolução acoplados a maquinário agrícola (tratores) para escanear pomares de citros em tempo real, contando frutos, medindo calibre, curva de maturação, volumetria de copa e detectando falhas de plantio. Está em operação comercial desde a safra 2020/2021 no grupo Alfacitrus (Botucatu, Engenheiro Coelho e Mogi Mirim, em São Paulo), monitorando cerca de 1.600 hectares e 1,6 milhão de caixas de produção. Em janeiro de 2022, fechou parceria com a Bayer para monitoramento digital de citros. A diferença para o estudo coreano: o sensor da Adroit vai embarcado no trator que o produtor já tem, não é um robô autônomo dedicado nem faz fusão com drone.

Segundo reportagem da [AgFunderNews](https://agfundernews.com/adroit-robotics-brazilian-ag-ai-startup-raises-seed-funding), os sensores da LeafSense são acoplados a tratores que circulam o pomar coletando dados, monitorando pomares de citros planta a planta.

**Embrapa, projeto SEEMEAR (plataforma Semear Digital)** é o caso mais parecido com o robô terrestre coreano. É um robô autônomo (classificado pelos pesquisadores como UGV, veículo terrestre não tripulado) que percorre fileiras de pomar com câmeras e GPS de alta precisão para identificar e contar frutos e estimar a safra automaticamente. Foi testado, assim como o estudo coreano, em pomar de maçã, e há artigo científico submetido pelos pesquisadores sobre a previsão automática de safra. Detalhes do programa estão no [portal Semear Digital da Embrapa](https://www.semear-digital.cnptia.embrapa.br/).

**Embrapa Instrumentação, projeto eContaFruto** ataca o mesmo problema pelo ar da imagem. É um método não destrutivo de contagem de frutos verdes e maduros em pés de laranja por visão computacional, iniciado em 2019, com o objetivo declarado de reduzir o custo da contagem manual de safra, uma das operações mais caras da citricultura.

**Fundecitrus com a SarDrones** mostra o drone já em campo no citros brasileiro, embora para outra finalidade: validaram o uso de drone para liberação a campo de *Tamarixia radiata*, inseto usado no controle biológico do vetor do greening (*Diaphorina citri*), com mortalidade do alvo superior à aplicação convencional. É a prova de que o produtor de citros de SP já convive com drone agrícola no dia a dia. Sobre o manejo dessa e de outras pragas, vale o guia de [pragas e doenças em cultivo protegido](/blog/pragas-e-doencas-em-hidroponia-e-cultivo-protegido).

Para dimensionar a escala do investimento em robótica agro no país, há ainda a **Solinftec**, que não faz robô de pomar, mas captou R$ 1,3 bilhão em rodadas e tem meta de colocar 700 robôs autônomos movidos a energia solar em operação até 2026, atuando em *scouting* contínuo na lavoura. Serve de referência de que dinheiro e viabilidade existem no agro brasileiro para esse tipo de tecnologia.

## A ressalva que ninguém pode pular: maçã coreana não é citros brasileiro

Este é o ponto onde a maioria dos textos falha ao tratar a tecnologia como pronta para qualquer cultura. O estudo coreano validou o sistema **apenas em pomar de maçã, em clima temperado**. Não há, até esta pesquisa, dado publicado de validação em pomares tropicais ou subtropicais como citros, manga ou uva. Isso não é detalhe: arquitetura de copa, densidade de plantio, sazonalidade e manejo mudam tudo na hora de treinar e calibrar a IA.

Um pomar de maçã na Serra Catarinense é conduzido em espaldeira, com copas relativamente uniformes e ciclo bem marcado pelo frio. Um pomar de laranja em São Paulo tem copa arredondada, densa e volumosa, produzindo o ano quase todo. Uma parreira de uva de mesa no Vale do São Francisco é conduzida em latada, uma estrutura horizontal completamente diferente. Uma mangueira do mesmo vale é uma árvore de grande porte com copa fechada. Um algoritmo que aprendeu a enxergar macieira não enxerga automaticamente nenhuma dessas.

E o que está em jogo é grande. Segundo a [CNA Brasil](https://cnabrasil.org.br/noticias/), o país cultiva cerca de 800 mil hectares de laranja e produziu 18,5 milhões de toneladas, respondendo por mais da metade da produção mundial de suco. São Paulo concentra a maior parte, e o preço da laranja de mesa reflete a força do setor: a caixa de 40,8 kg da laranja pera iniciou abril de 2026 a R$ 43,76, em alta por oferta reduzida, segundo o [CEPEA/ESALQ-USP](https://cepea.org.br/br/indicador/citros.aspx).

Na maçã, Santa Catarina é um dos principais polos produtores do país. Segundo o portal ndmais, o estado responde por cerca de 40% da produção nacional, com uma safra 2025/26 estimada em 615 mil toneladas, um ano de alta (crescimento em torno de 28% sobre o ciclo anterior). No Vale do São Francisco, a Valexport contabiliza 1,25 milhão de toneladas de manga por ano, com 253 mil toneladas exportadas gerando US$ 348 milhões, além de exportações de uva. A região movimenta em torno de US$ 500 milhões por ano em frutas. São quatro culturas de altíssimo valor, e nenhuma delas tem, hoje, a validação científica que a maçã coreana recebeu. Esperar resultado idêntico sem essa ressalva é apostar no escuro.

> Leia também: [Viabilidade econômica e ROI da hidroponia comercial](/blog/viabilidade-economica-e-roi-da-hidroponia-comercial)

## Quanto custa e quem já pode pagar por isso

A pergunta prática do produtor é direta: quanto custa? A resposta honesta é que o sistema completo do estudo não tem preço, porque não é vendido. Mas as peças isoladas têm, e ajudam a dimensionar o gargalo:

| Componente | Função | Exemplos | Faixa de custo |
| --- | --- | --- | --- |
| Drone com câmera RGB/multiespectral | Cobertura aérea, ortomosaico | DJI Matrice 4E, XMobots Nauru | R$ 30 mil a R$ 250 mil |
| Sensor LiDAR aéreo (payload) | Altura e volume de copa | DJI Zenmuse L2 e similares | R$ 150 mil ou mais |
| Robô terrestre autônomo (UGV) | Coleta LiDAR rasteira | Protótipos de pesquisa (Embrapa SEEMEAR) | Não comercializado para pomar no Brasil |
| Software de fotogrametria | Nuvem de pontos, ortomosaico | Pix4D, DroneDeploy, Agisoft | Licença anual (SaaS) |
| GNSS RTK/PPK | Georreferenciamento centimétrico | Base própria ou rede RBMC do IBGE | R$ 15 mil a R$ 60 mil |

Some tudo e fica claro o gargalo: hardware de ponta, dois sistemas operando de forma coordenada e processamento de dados pesado. É investimento para produtor de médio e grande porte, ou para prestador de serviço especializado, não para o pequeno pomar de fundo de quintal.

No plano global, o mercado dá o tom do crescimento, mas exige cautela na leitura. Os números variam muito por metodologia. Segundo a [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/agricultural-robots-market), o mercado de robôs agrícolas (todos os tipos) é estimado em US$ 18 bilhões em 2026, com projeção de US$ 41,3 bilhões em 2031 (CAGR de 18,07%). Já o mercado mais estreito de drones de agricultura de precisão é projetado em US$ 3,3 bilhões para 2026 pela Persistence Market Research, com CAGR de 22,8% até 2033. Outros relatórios divergem: a Fact.MR estima US$ 6,5 bilhões para drones agrícolas em 2026. A lição para o leitor é citar a **faixa** (drones agrícolas entre US$ 3 e 7 bilhões em 2026, robótica agrícola em torno de US$ 18 bilhões), porque escopos diferentes não são comparáveis. E o subsegmento específico desta notícia, fusão drone+robô com IA para pomar, ainda não tem categoria própria de mercado. Está embutido dentro de "robótica de colheita e mapeamento", justamente o segmento de maior crescimento projetado, cerca de 18,9% ao ano.

## As regras que mudam em 2026 para quem quer voar drone de mapeamento

Antes de sonhar com fusão 3D, quem quer voar um drone de mapeamento sobre o pomar precisa saber que a regulação brasileira mudou em 2026. O uso de drone agrícola no país é regulado simultaneamente por vários órgãos, e uma mudança recente pega muita gente de surpresa.

A **ANAC** exige cadastro de toda aeronave não tripulada com mais de 250 g no SISANT (Sistema de Aeronaves Não Tripuladas), com classificação por peso segundo o RBAC-E nº 94 e emendas. Está em curso a atualização para o RBAC 100, tratada pelo setor como consolidação regulatória de 2026.

O **DECEA** controla o espaço aéreo pelo SARPAS (Sistema de Reserva de Espaço Aéreo). Aqui está a novidade que mais importa: a partir de **1º de julho de 2026**, pelo normativo ICA 100-40, o SARPAS passou a ser **obrigatório para todo voo a céu aberto**, inclusive em lavoura isolada. Muitos voos de mapeamento em propriedade rural que antes passavam batido agora precisam dessa reserva. Uma síntese atualizada das camadas está no guia da [irlenmenezes.com.br sobre regras de drone agrícola em 2026](https://irlenmenezes.com.br/).

O **MAPA** entra quando o drone aplica defensivo, exigindo CAAR (Certificado de Autorização de Aviação Agrícola Restrita) e receituário agronômico. A **ANATEL** homologa os equipamentos de rádio. E operações comerciais devem manter seguro RETA (responsabilidade civil por danos a terceiros).

Uma nota que evita susto desnecessário: **mapeamento não é pulverização**. Quem só quer mapear, sem aplicar produto, tende a usar drones mais leves e regras proporcionalmente mais simples (cadastro SISANT mais regras gerais de espaço aéreo). A camada pesada de CAAR e receituário só aciona quando há aplicação de defensivo, o caso da pulverização direcionada que o estudo cita como aplicação futura. Para dimensionar a presença de drones no campo, a ANAC contabilizava 12.033 drones com cadastro vigente para pulverização agrícola em maio de 2026 (dado citado por fonte secundária do setor, o SINDAG, a partir de número oficial).

## Para onde essa tecnologia vai até 2030

O padrão histórico da agricultura digital é claro: entre o paper e o produto comercial passam de 5 a 10 anos. É razoável esperar que a fusão drone+robô saia do laboratório para pilotos comerciais em pomares de alto valor entre 2027 e 2030, começando por culturas de exportação onde o retorno por hectare justifica o investimento.
![Tela em campo exibindo reconstrução tridimensional de um pomar em nuvem de pontos, com as árvores reais ao fundo](/blog/drone-e-robo-mapeiam-pomar-com-ia-em-3d/tela-em-campo-exibindo-reconstrucao-tridimensional-de-u-3.jpg)
*Drone e robô juntos viram um gêmeo digital: cada árvore vira dado tridimensional*

Algumas tendências já estão em movimento:

| Tendência | O que muda | Horizonte |
| --- | --- | --- |
| Robótica de colheita e poda autônoma | Braço robótico e visão computacional para colher fruta sem danificar | CAGR 18,9% (2026 a 2031), maturidade estimada em ~5 anos |
| Digital twin de pomar | Simular poda, irrigação e adubação no modelo 3D antes de executar no campo | Incipiente para fruticultura |
| Sensor embarcado em trator | Caminho de menor atrito, sem comprar equipamento novo | Já em curso (LeafSense) |
| Contagem de frutos e previsão de safra por IA | Porta de entrada mais próxima do padrão comercial no Brasil | Curto prazo (1 a 3 anos) |

Repare no padrão: as três frentes brasileiras (eContaFruto, SEEMEAR e LeafSense) convergem todas para o mesmo caso de uso de curto prazo, contagem de frutos e previsão de safra por IA. Essa é a aplicação mais próxima de virar padrão comercial no país, e o digital twin de pomar (gêmeo digital que simula cenários de manejo) é a extensão natural do modelo 3D, ainda que hoje mais avançado em grandes culturas do que em fruticultura. O ambiente controlado, aliás, é onde muitas dessas ferramentas de dado amadurecem primeiro, um tema explorado no guia de [agricultura em ambiente controlado no Brasil](/blog/cea-agricultura-em-ambiente-controlado-no-brasil).

## Quem trabalha com isso e como se qualificar

O tema abre portas para três perfis profissionais. O **engenheiro agrônomo ou agrícola** especializado em agricultura de precisão é quem interpreta os mapas gerados e os traduz em prescrição de manejo, a ponte entre o dado e a decisão no campo. O **piloto remoto certificado** opera o drone conforme a regra da ANAC. E o **cientista de dados ou engenheiro de visão computacional** aplicado ao agro é o perfil que mais cresce dentro de agtechs como Adroit Robotics e Solinftec.

A base é graduação em Agronomia, Engenharia Agronômica ou Engenharia Agrícola. Para atuar especificamente com sensoriamento remoto e IA, cursos de pós-graduação e especialização em geoprocessamento e sensoriamento remoto agregam a camada técnica, com programas ligados a instituições como INPE, ESALQ-USP e UNIVASF. Para operar o drone em atividade comercial, é necessário o certificado de piloto remoto exigido pela ANAC, obtido em curso credenciado mais o cadastro. Vale registrar, com transparência, uma lacuna: não foi localizado dado oficial de salário (CAGED/MTE) para "operador de drone agrícola" ou "especialista em agricultura de precisão", então não há como cravar faixa salarial confiável. O que se pode afirmar é que o volume de investimento em agtech no Brasil (como o R$ 1,3 bilhão captado pela Solinftec) sinaliza demanda crescente por esses perfis.

Quem quer construir a fundação técnica pode começar pela eletrônica de sensores e automação, terreno onde o [guia completo de automação com ESP32](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen) dá os primeiros passos práticos em coleta e leitura de dados no campo.

## Perguntas frequentes

### O que é o sistema de drone e robô que mapeia pomares em 3D com IA?
É uma tecnologia de pesquisa desenvolvida por cientistas da Chonnam National University (Coreia do Sul), liderados pelo professor Kyeong-Hwan Lee, que combina imagens aéreas de drone com dados de LiDAR e odometria de um robô terrestre, alinhando as duas fontes por meio de uma rede de deep learning para gerar um modelo digital 3D detalhado do pomar. Foi publicado em 2026 na revista *Artificial Intelligence in Agriculture* (DOI 10.1016/j.aiia.2026.03.005).

### Essa tecnologia já está disponível para comprar no Brasil?
Não. O sistema descrito no estudo é uma prova de conceito científica, testada em um único pomar comercial de maçã na Coreia do Sul, sem produto comercial associado. No Brasil, tecnologias com objetivo semelhante já existem comercialmente, como o LeafSense da startup Adroit Robotics, mas usam abordagem diferente (sensor embarcado em trator, não fusão de drone com robô autônomo).

### Funciona também em citros, manga e uva, ou só em maçã?
O estudo validou o sistema apenas em pomar de maçã, em clima temperado. Não há, até o momento, dados publicados de validação em pomares tropicais ou subtropicais como citros, manga ou uva. É uma limitação explícita a considerar antes de esperar resultado idêntico no Brasil, porque arquitetura de copa, densidade de plantio e sazonalidade mudam tudo.

### Que problema esse tipo de mapeamento resolve na prática?
Segundo os pesquisadores, as aplicações possíveis incluem inspeção de cultivo, pulverização direcionada, capina autônoma, transporte e colheita. Isso porque o modelo 3D identifica, árvore por árvore, a altura de copa, os espaços vazios na fileira e indicadores de saúde da planta, permitindo decisões de manejo planta-a-planta.

### O Brasil tem alguma tecnologia parecida em desenvolvimento?
Sim. A Embrapa desenvolve, no programa Semear Digital, um robô terrestre autônomo (SEEMEAR) que percorre pomares contando frutos e estimando safra, testado em pomar de maçã. E o projeto eContaFruto, da Embrapa Instrumentação, usa inteligência computacional para contar frutos em pés de laranja. Nenhum dos dois faz fusão cross-modal com drone como no estudo coreano, mas atacam o mesmo tipo de problema.

### Quanto custa implementar drone de mapeamento em um pomar brasileiro hoje?
Depende do escopo. Um drone com câmera RGB ou multiespectral para ortomosaico básico custa a partir de dezenas de milhares de reais. Sensores LiDAR aéreos de ponta somam mais de R$ 150 mil ao payload. Sistemas de fusão de drone com robô como o do estudo não têm preço comercial porque ainda não são vendidos.

### Preciso de autorização para voar drone de mapeamento na minha fazenda?
Sim. Todo drone com mais de 250 g precisa de cadastro no SISANT da ANAC. A partir de 1º de julho de 2026, pelo normativo ICA 100-40, todo voo a céu aberto no Brasil, inclusive em lavoura isolada, passa a exigir reserva de espaço aéreo pelo SARPAS do DECEA. Se o drone aplicar defensivo, exige também CAAR do MAPA e receituário agronômico.

### Qual é o tamanho do mercado de drones e robôs agrícolas hoje?
As estimativas variam por metodologia. O mercado global de drones de agricultura de precisão é projetado em US$ 3,3 bilhões para 2026 (Persistence Market Research), enquanto o mercado mais amplo de robôs agrícolas, incluindo colheita, mapeamento e pulverização, é estimado em US$ 18 bilhões no mesmo ano (Mordor Intelligence). O segmento de robôs de colheita é o que mais cresce, com CAGR de 18,9% entre 2026 e 2031.

### Qual é o principal caso de citros no Brasil que usa tecnologia parecida?
A startup Adroit Robotics, com a tecnologia LeafSense, monitora comercialmente pomares de citros desde a safra 2020/2021, medindo número de frutos, calibre, curva de maturação e volumetria de copa. Fechou parceria com a Bayer em 2022 para monitoramento digital de citros em escala, operando em cerca de 1.600 hectares no grupo Alfacitrus, em São Paulo.

### Quais são as maiores limitações dessa tecnologia hoje?
Três principais. Primeiro, é prova de conceito de pesquisa, sem produto comercial. Segundo, foi validada em um único teste, em pomar de maçã de clima temperado, sem dado publicado para culturas tropicais brasileiras. Terceiro, exige operar dois sistemas simultaneamente (drone mais robô terrestre) de forma coordenada, o que é operacionalmente mais complexo e caro do que o drone isolado já usado hoje no Brasil.
