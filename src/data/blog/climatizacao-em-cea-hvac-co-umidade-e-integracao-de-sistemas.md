---
titulo: 'Climatização em CEA: HVAC, CO₂ e Umidade [2026]'
resumo: >-
  Guia técnico de climatização CEA: por que temperatura, VPD e CO₂ são
  acoplados, limites do pad-fan no clima úmido e integração de sistemas.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-20'
dataModificacao: '2026-07-20'
leitura: '15 min'
tldr: >-
  Climatização em CEA é o controle acoplado de temperatura, déficit de pressão
  de vapor (VPD), CO₂ e fluxo de ar, não três termostatos independentes.
  A faixa segura de VPD para folhosas fica entre 0,45 e 1,25 kPa, com ótimo em
  torno de 0,85 kPa, e o HVAC responde por 15-25% do consumo de energia de uma
  fazenda vertical. Ajustar uma variável sempre desloca as outras três.
imagens:
  - src: /blog/climatizacao-em-cea-hvac-co-umidade-e-integracao-de-sistemas/condensacao-na-cobertura-de-sala-de-cultivo-indoor-com--1.jpg
    alt: 'Condensação na cobertura de sala de cultivo indoor com bancadas de alface sob luz LED'
    caption: 'A água que a planta transpira durante o dia reaparece como condensação quando a temperatura cai'
  - src: /blog/climatizacao-em-cea-hvac-co-umidade-e-integracao-de-sistemas/painel-evaporativo-de-celulose-com-agua-escorrendo-em-e-2.jpg
    alt: 'Painel evaporativo de celulose com água escorrendo em estufa de climatização pad-fan'
    caption: 'O painel evaporativo troca calor por umidade, e por isso perde eficiência em clima úmido'
  - src: /blog/climatizacao-em-cea-hvac-co-umidade-e-integracao-de-sistemas/cilindro-de-co-com-regulador-e-sensor-instalado-sobre-b-3.jpg
    alt: 'Cilindro de CO₂ com regulador e sensor instalado sobre bancada de alface em cultivo indoor'
    caption: 'Enriquecimento com CO₂ exige sala estanque e sensor de segurança independente do de cultivo'
---
Quem projeta ou opera cultivo em ambiente protegido no Brasil comete quase sempre o mesmo erro estrutural: trata temperatura, umidade e CO₂ como três problemas separados, compra um equipamento para cada um e descobre, depois de meses de operação, que os sistemas brigam entre si. Ventilar para tirar umidade joga fora o CO₂ injetado. Nebulizar para baixar a temperatura sobe a umidade justamente na hora em que ela já estava alta. Aquecer para evitar orvalho seca o ar e queima energia.

Este artigo é sobre a física que amarra essas variáveis e sobre como projetar o controle levando o acoplamento em conta. Ele parte do princípio de que você já conhece o conceito de [agricultura em ambiente controlado](/blog/cea-agricultura-em-ambiente-controlado-no-brasil) e já pensou no [projeto e no layout da estufa](/blog/hidroponia-comercial-dimensionamento-projeto-de-estufa-e-lay); aqui o assunto é o clima dentro dela.

## Por que temperatura e umidade não são variáveis independentes

Climatização em CEA é o controle simultâneo e acoplado de temperatura, umidade (expressa como VPD), concentração de CO₂ e movimentação de ar dentro de uma estrutura fechada ou semifechada. A palavra que importa é acoplado: a física do ar úmido garante que nenhuma dessas variáveis se mexe sozinha.
![Condensação na cobertura de sala de cultivo indoor com bancadas de alface sob luz LED](/blog/climatizacao-em-cea-hvac-co-umidade-e-integracao-de-sistemas/condensacao-na-cobertura-de-sala-de-cultivo-indoor-com--1.jpg)
*A água que a planta transpira durante o dia reaparece como condensação quando a temperatura cai*

O motivo é simples. A quantidade de vapor d'água que o ar consegue segurar depende da temperatura. Aqueça o ar sem adicionar ou remover uma gota sequer de água e a umidade relativa cai, porque o denominador da conta cresceu. Resfrie o mesmo ar e a umidade relativa sobe até saturar, e a partir daí a água condensa. Isso significa que:

- **Aquecer** reduz a umidade relativa sem desumidificar de fato; a água continua lá.
- **Resfriar por evaporação** (placa evaporativa ou nebulização) baixa a temperatura às custas de adicionar vapor ao ar. Você compra graus com umidade.
- **Desumidificar por condensação** remove calor latente junto com a água, então o desumidificador é também uma fonte de calor sensível na sala.
- **Ventilar** troca o ar interno pelo externo e importa a temperatura, a umidade e a concentração de CO₂ de fora, todas de uma vez.

Nenhuma dessas ações é cirúrgica. Toda decisão de climatização mexe em pelo menos duas variáveis, e é por isso que o projeto precisa ser pensado como sistema, não como lista de compras. Um HVAC dimensionado apenas pela carga térmica das luminárias entrega umidade fora de controle, porque ignora a carga latente da transpiração: em CEA fechado, as plantas podem liberar de 2 a 4 litros de água por metro quadrado por dia, segundo a [Desert Aire (Application Note AN28)](https://www.desert-aire.com/resources/vapor-pressure-deficit-and-hvac-system-design-an28/). Essa água precisa sair de algum lugar, e o dimensionamento da desumidificação tem que ser feito de forma independente do dimensionamento do resfriamento.

## VPD: a variável que a planta realmente enxerga

VPD (Vapor Pressure Deficit, ou déficit de pressão de vapor) é a diferença entre a pressão de vapor que o ar teria se estivesse saturado e a pressão de vapor que ele efetivamente tem, medida em kPa. Na prática, é a "sede" do ar: quanto mais vapor ele ainda consegue absorver, maior o VPD.

A planta não responde à umidade relativa. Ela responde ao VPD, porque é o gradiente entre a água dentro da folha e o vapor do ar que determina quanto ela consegue transpirar. E a mesma umidade relativa produz VPDs radicalmente diferentes conforme a temperatura: 65% de UR a 18 °C é uma condição completamente distinta de 65% de UR a 28 °C. Pilotar a estufa por setpoint de umidade relativa, com temperatura variando ao longo do dia, é pilotar por um número que muda de significado a cada hora.

A fórmula prática, conforme a definição consolidada em [Vapour-pressure deficit](https://en.wikipedia.org/wiki/Vapour-pressure_deficit), é:

`VPD = SVP × (1 − UR/100)`, onde `SVP ≈ 0,6108 × exp(17,27·T / (T + 237,3))` em kPa, com T em °C.

Um detalhe que muda o resultado no campo: a temperatura da folha costuma ficar de 1 a 3 °C abaixo da temperatura do ar por causa da própria transpiração. O VPD efetivo na superfície da planta, portanto, é menor do que o calculado apenas com o sensor de ar. Operações mais criteriosas usam termopar ou infravermelho na folha para corrigir isso.

### O que acontece nos dois extremos

Com **VPD baixo demais** (ar próximo da saturação), a transpiração trava. E aqui está a ligação que a maioria dos produtores não faz: o cálcio se move na planta pelo fluxo de transpiração, empurrado pela corrente de água no xilema. Sem transpiração, o cálcio não chega às folhas novas e aos frutos em formação, mesmo que a solução nutritiva esteja perfeita. Queima de bordo em alface e podridão apical em tomate aparecem, o produtor aumenta o cálcio no reservatório, e o problema não resolve, porque nunca foi um problema de nutrição, e sim de clima. Somado a isso, com VPD baixo a condensação na folha vira questão de tempo, e água parada sobre tecido vegetal é a porta de entrada de mofo cinzento e míldio.

Com **VPD alto demais**, os estômatos fecham como defesa contra a perda de água. Estômato fechado significa CO₂ não entra, e sem CO₂ não há fotossíntese. A planta para de crescer mesmo com água e nutriente disponíveis no reservatório, o que costuma ser diagnosticado erroneamente como problema de solução ou de luz.

| Variável | Faixa-alvo (folhosas) | Risco fora da faixa |
| --- | --- | --- |
| Temperatura do ar | 18-24 °C dia / 15-18 °C noite | Acima de 28 °C: pendoamento em alface e queda de fotossíntese |
| Umidade relativa | 60-75% vegetativo / 50-65% fase final | Abaixo de 40%: estresse hídrico; acima de 85%: oídio, podridão, gutação |
| VPD | 0,4-0,8 kPa em mudas / 0,8-1,2 kPa vegetativo | Alto: fechamento estomático; baixo: transpiração e cálcio travados |
| CO₂ | 400 ppm atmosférico, 800-1.000 ppm enriquecido | Abaixo de 250 ppm: fotossíntese cessa; acima de 1.500 ppm: desperdício e risco ocupacional |
| Velocidade do ar sobre o dossel | 0,3-0,7 m/s | Estagnação: doença fúngica; acima de 1 m/s: estresse mecânico e dessecação |

> "Faixa segura geral de VPD: 0,45 a 1,25 kPa, com ótimo em torno de 0,85 kPa."
> [Desert Aire, Application Note AN28](https://www.desert-aire.com/resources/vapor-pressure-deficit-and-hvac-system-design-an28/) e [DryGair](https://drygair.com/blog/vapor-pressure-deficit-relative-humidity/)

## Mecanismos de resfriamento e o limite físico do evaporativo

A ordem correta de decisão em resfriamento é sempre a mesma: primeiro o desenho passivo, depois o equipamento ativo. Orientação, altura de pé-direito, área e posição das aberturas, sombreamento e tela térmica definem quanta carga você terá que remover pelo resto da vida da instalação. Estufa mal desenhada gasta energia para sempre, e nenhum equipamento compensa isso de forma econômica.

**Ventilação natural** é a base. Depende de diferença de pressão e de efeito chaminé, o que significa que altura e área de abertura zenital mandam mais no resultado do que qualquer catálogo. Custo operacional próximo de zero, mas desempenho refém do vento e insuficiente para PFAL fechado.

**Ventilação forçada / exaustão** dá previsibilidade de vazão, ao custo de energia elétrica contínua e do limite óbvio de que você nunca resfria abaixo da temperatura do ar externo.

**Resfriamento evaporativo** (placa de celulose com exaustor, o clássico pad-fan, ou nebulização de alta pressão) é onde mora o mal-entendido mais caro do setor brasileiro. O princípio é trocar calor sensível por calor latente: a água evapora, e a energia para isso sai do ar, que esfria. Fabricantes como a [Tropical Estufas](https://tropicalestufas.com.br/climatizacao-em-estufas-agricolas-pad-fan/) reportam reduções de até 10 °C, com eficiência adiabática que pode chegar a 95%.

E aqui vai com todas as letras: **o evaporativo só funciona enquanto o ar externo tem capacidade de receber vapor.** Ele depende do déficit entre a temperatura de bulbo seco e a de bulbo úmido do ar de entrada. Em clima quente e seco, esse déficit é enorme e o sistema entrega o prometido. Em clima quente e úmido, o ar já chega perto da saturação e simplesmente não aceita mais água: com umidade relativa externa acima de 70%, a queda de temperatura despenca para 2 a 3 °C, e você ainda importa umidade para dentro da estufa, agravando o problema de VPD baixo que estava tentando evitar. Ou seja, a tecnologia perde eficiência exatamente na condição climática de boa parte do Brasil: litoral, Norte e verões úmidos do Sudeste. No Centro-Oeste em estação seca e em parte do Nordeste, ela é excelente.

Quando o evaporativo não basta, entra **compressão de vapor**: split/VRF (COP tipicamente 3,0 a 4,5) para salas pequenas e contêineres, chiller com fancoil (COP 4 a 6) para operações acima de 200 m², e bomba de calor dedicada a CEA (COP global acima de 5 com recuperação), que resfria, aquece e desumidifica no mesmo ciclo. O custo dessa escolha é real e recorrente, e é por isso que ela deve vir depois de esgotado o passivo.

| Estratégia | Melhor clima | CapEx | OpEx | Aplicação típica |
| --- | --- | --- | --- | --- |
| Ventilação natural | Ameno | Muito baixo | Quase nulo | Estufa pequena; insuficiente em PFAL |
| Pad-fan evaporativo | Quente e seco | Baixo-médio | ~10% de um AC convencional | Estufa comercial em região seca |
| Split / VRF | Qualquer | Médio | Alto | Sala de cultivo pequena, contêiner |
| Chiller + fancoil | Qualquer | Alto | Médio-alto, escalável | Vertical farm acima de 200 m² |
| Bomba de calor CEA | Qualquer | Alto | Baixo-médio | Operação comercial com recuperação de calor |

Vale registrar que a escolha do equipamento novo hoje já é atravessada pela transição de refrigerantes: R-410A cede espaço para R-32 e R-290, movimento acompanhado pela [ABRAVA](https://abrava.com.br/norma-que-regulamenta-instalacoes-de-ar-condicionado-em-sistemas-centrais-e-unitarios-nbr-16401-foi-atualizada/) no Brasil.

## Aquecimento e proteção contra o frio

No Brasil, aquecimento é assunto de Sul e de Sudeste de altitude, e a regra econômica é direta: **aquecer estufa é caro, reduzir perda é barato.** Antes de dimensionar qualquer aquecedor, o investimento com melhor retorno é a tela térmica ou cortina móvel, que fecha à noite e corta a perda radiativa pela cobertura. É o mesmo raciocínio de isolar a casa antes de comprar o aquecedor.
![Painel evaporativo de celulose com água escorrendo em estufa de climatização pad-fan](/blog/climatizacao-em-cea-hvac-co-umidade-e-integracao-de-sistemas/painel-evaporativo-de-celulose-com-agua-escorrendo-em-e-2.jpg)
*O painel evaporativo troca calor por umidade, e por isso perde eficiência em clima úmido*

Depois disso vêm as opções ativas, que no ambiente protegido brasileiro giram em torno de aquecedores a gás ou a biomassa com distribuição por duto, água quente circulando em tubos junto ao dossel e a própria bomba de calor operando em modo reverso, opção que ganha atratividade justamente porque o mesmo equipamento já está lá para resfriar e desumidificar.

Um efeito colateral útil: aquecer é também uma ferramenta de controle de umidade. Elevar a temperatura afasta o ar do ponto de orvalho e aumenta o VPD sem remover uma gota de água. É a base da estratégia clássica de "aquecer e ventilar" contra a condensação noturna, que funciona, mas cobra caro em energia.

## Desumidificação: o problema mais subestimado do projeto

O ciclo é sempre o mesmo e pega quase todo projeto de primeira viagem. Durante o dia, a planta transpira e despeja litros de água no ar da estufa fechada. À noite, a temperatura cai, a capacidade do ar de reter vapor cai junto, e em algum momento o ar satura. A partir daí a água condensa sobre a superfície mais fria disponível, que costuma ser a folha. Filme de água sobre tecido vegetal durante horas é a condição ideal para mofo cinzento e míldio, e nenhuma pulverização compensa um ambiente que orvalha toda madrugada.

Estratégias, do mais barato ao mais caro:

1. **Manejo de irrigação no fim do dia**, reduzir ou encerrar a irrigação algumas horas antes do pôr do sol diminui a carga de água disponível para transpirar durante a noite. Custo zero, e é a primeira coisa a ajustar.
2. **Movimentação de ar com ventiladores HAF**, manter 0,3 a 0,7 m/s sobre o dossel elimina a camada limite úmida em torno da folha e as zonas mortas nas extremidades das bancadas. Sem fluxo horizontal, mesmo uma umidade média aceitável convive com bolsões saturados.
3. **Renovação de ar**, trocar ar interno úmido por ar externo mais seco, quando ele de fato estiver mais seco em termos absolutos. À noite, no Brasil úmido, muitas vezes não está.
4. **Aquecer e ventilar**, a estratégia clássica: aquece para elevar a capacidade de retenção, ventila para expulsar o ar carregado. Funciona sempre, e é a que mais consome energia.
5. **Desumidificador por condensação**, resfria o ar abaixo do ponto de orvalho, condensa e reaquece. Equipamentos típicos removem de 1,5 a 3 litros de água por kWh. Tem a vantagem de não jogar fora o CO₂ da sala, o que o torna obrigatório em qualquer operação que enriqueça.

O paradigma moderno inverte a leitura do problema: a água condensada é um ativo, não um resíduo. Segundo a [Danfoss](https://www.danfoss.com/en/industries/food-and-beverage/dcs/vertical-farming/energy-efficient-climate-control-in-vertical-farms/), em sistemas bem projetados de 30% a 50% da água transpirada retorna ao reservatório nutritivo, e a recuperação de calor latente eleva o COP global do HVAC de cerca de 3 para mais de 5.

> Leia também: [Pragas e doenças em hidroponia e cultivo protegido](/blog/pragas-e-doencas-em-hidroponia-e-cultivo-protegido)

## CO₂: quando enriquecer compensa e quando é dinheiro jogado fora

A concentração atmosférica gira em torno de 420 ppm. Numa sala fechada com luz intensa, as plantas consomem esse estoque rápido: a concentração pode cair para a faixa de 100 a 250 ppm em poucas horas, conforme revisão de [Wang et al. (2022), *Frontiers in Plant Science*](https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2022.1029901/full). A partir daí, quem limita a fotossíntese não é mais a luz: é o carbono disponível.
![Cilindro de CO₂ com regulador e sensor instalado sobre bancada de alface em cultivo indoor](/blog/climatizacao-em-cea-hvac-co-umidade-e-integracao-de-sistemas/cilindro-de-co-com-regulador-e-sensor-instalado-sobre-b-3.jpg)
*Enriquecimento com CO₂ exige sala estanque e sensor de segurança independente do de cultivo*

Mas enriquecer só faz sentido sob a lei do mínimo. Se luz, temperatura ou nutrição ainda são o fator limitante, o CO₂ extra não é convertido em biomassa e você está pagando por gás que a planta não consegue usar. Antes de comprar cilindro, resolva o [PPFD e o DLI da instalação](/blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd) e a temperatura de operação.

| Cultura / objetivo | Faixa recomendada | Ganho reportado |
| --- | --- | --- |
| Alface e folhosas, manejo conservador | 550-700 ppm | +15-25% de biomassa fresca |
| Tomate em estufa | 800-1.200 ppm | +7 a +125% na produção de frutos, variando por cultivar |
| Suplementação intervalada (controle econômico) | 600 ppm em pulsos | +26 a +78% de biomassa fresca em alface |
| Ótimo experimental em alface (T 29 °C, luz 897 µmol·m⁻²·s⁻¹) | até 2.160 µmol·mol⁻¹ | Pico de fotossíntese ([Sun et al., 2023](https://www.sciencedirect.com/science/article/abs/pii/S0048969723013475)) |

O conflito com a ventilação é o ponto central. Ventilar é a resposta natural para excesso de umidade e para excesso de calor, e é exatamente o que destrói o investimento em CO₂: o gás injetado sai pela janela em minutos. Por isso enriquecimento exige estanqueidade, e por isso a arquitetura fechada (PFAL) é a única em que o CO₂ realmente se paga. Plant factories japonesas reportam eficiência de uso de CO₂ (CUE) de 87 a 89%, contra cerca de 50% em estufas com enriquecimento, segundo [Kozai (2013)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3881955/). Fechar a sala, porém, transfere toda a carga de umidade para o HVAC, o que reforça o ponto da seção anterior: quem enriquece CO₂ precisa de desumidificação por condensação, não por ventilação.

**Segurança não é opcional.** CO₂ em ambiente fechado é risco ocupacional. NIOSH e OSHA estabelecem limite de exposição ocupacional de 5.000 ppm em média ponderada de 8 horas. As faixas de cultivo, de 800 a 1.200 ppm, ficam bem abaixo disso, mas uma falha de válvula não. O mínimo aceitável é sensor de segurança independente dos sensores de cultivo, alarme sonoro acima de 2.000 ppm, sinalização na porta e protocolo de entrada com o dosador desligado.

## A integração: por que termostatos independentes se sabotam

Aqui está o núcleo do problema. Considere quatro dispositivos autônomos numa mesma sala: um termostato ligado ao exaustor, um umidostato ligado à nebulização, um controlador de CO₂ ligado à válvula do cilindro e um aquecedor com termostato próprio.

Meio-dia quente e úmido. O termostato aciona o exaustor. O exaustor tira calor, mas também expulsa todo o CO₂ que o dosador acabou de injetar, e o dosador, vendo a concentração cair, abre a válvula de novo. Enquanto isso o umidostato lê a umidade subindo com o ar externo e, dependendo da lógica, aciona ou desliga a nebulização em oposição ao exaustor. Nenhum dos quatro está com defeito. Cada um cumpre exatamente sua função, e o conjunto queima gás, energia e vida útil de compressor.

A saída é controle por **estratégia**, com hierarquia de prioridade explícita, e não por dispositivos paralelos. Um controlador integrado lê temperatura, umidade, CO₂, luz e velocidade do ar; calcula o VPD em tempo real; e decide a ação na ordem que menos prejudica as outras variáveis. Um exemplo de hierarquia para VPD abaixo do alvo: primeiro reduzir a nebulização, depois acelerar os ventiladores HAF, depois acionar o desumidificador, e só então mexer no setpoint do ar-condicionado. A ventilação, que é o que mais custa em CO₂ perdido, fica por último quando há enriquecimento ativo.

Dois conceitos de controle que evitam a maior parte do desperdício:

- **Setpoints por fase do dia.** Dia, noite e as transições (nascer e pôr do sol) pedem alvos diferentes. Uma rampa de temperatura no fim da tarde, em vez de um degrau, evita que a sala atravesse o ponto de orvalho de uma vez. O período de transição é onde a condensação nasce.
- **Banda morta.** Uma faixa em torno do setpoint dentro da qual nenhum atuador liga. Sem ela, o equipamento entra em ciclagem curta, oscila a sala e destrói compressor. Banda morta ampla economiza energia e vida útil; banda morta estreita entrega precisão a um custo que raramente se justifica em horticultura.

| Arquitetura | Sensores | Lógica | Aplicação |
| --- | --- | --- | --- |
| Stand-alone básico | DHT22/BME280 + NDIR simples | Histerese on/off | Estufa hobby |
| DIY profissional | BME280 + MH-Z19/SCD30 + termopar de folha | ESP32 + Home Assistant + MQTT | Microescala, pesquisa, prototipagem |
| Industrial modular | Sensores 4-20 mA, Modbus RTU/RS485 | PLC + supervisório | Vertical farm de 200 a 2.000 m² |
| Plataforma integrada | Pacote do fornecedor | Estratégia proprietária | Operação grande, alto investimento |

A abordagem maker com [ESP32 e sensores acessíveis](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen) monta um stack funcional por menos de R$ 1.000 e é excelente para prototipar a estratégia antes de comprá-la pronta. Para operação comercial, porém, ela não substitui redundância, sensores blindados e calibração rastreável.

## Sensores: onde medir importa tanto quanto medir

Sem dado não há controle, e dado ruim é pior que dado nenhum, porque produz decisão confiante e errada. Erros de posicionamento que invalidam a leitura:

- **Sensor exposto ao sol direto** lê a própria carcaça aquecida, não o ar. Exige abrigo ventilado.
- **Sensor perto da porta, do exaustor ou da placa evaporativa** lê o fluxo local, não a sala.
- **Sensor fora da altura do dossel** lê um ar que a planta não habita, o que é especialmente grave em cultivo vertical, onde a estratificação térmica entre o andar de baixo e o de cima é real e significativa.

O mínimo defensável é mais de um ponto de medição por zona controlada, posicionados na altura do dossel, mais um ponto por andar em sistema multi-nível. Para CO₂, o sensor precisa ser NDIR de qualidade industrial: tecnologias alternativas (MOS, eletroquímico) derivam em poucos meses e passam a mentir sem avisar. Calibração anual é o intervalo de referência, e a checagem mais barata é levar o sensor ao ar livre e conferir se ele lê algo próximo de 420 ppm.

Por fim, registro histórico. Um controlador que só mostra o valor instantâneo é inútil para diagnóstico. O que resolve problema é a série temporal: ver que a umidade cruza 90% às 3h da manhã todo dia, ou que a temperatura oscila 4 °C em ciclos de 12 minutos, revela causa que nenhuma inspeção visual encontra.

## Roteiro de diagnóstico: do sintoma na planta à variável climática

| Sintoma observado | Investigar primeiro | Causa provável |
| --- | --- | --- |
| Condensação/orvalho na folha pela manhã | Curva de temperatura e umidade na madrugada | Ar atinge o ponto de orvalho na transição noturna; falta desumidificação ou movimentação de ar |
| Queima de bordo em alface, podridão apical em tomate | VPD noturno e diurno, antes do cálcio na solução | Transpiração insuficiente por VPD baixo; o cálcio não é transportado, e adubar não resolve |
| Crescimento travado em dias quentes, com solução e luz adequadas | VPD no pico da tarde | Fechamento estomático por VPD alto; a planta interrompe a troca gasosa |
| Doença fúngica recorrente sempre nas mesmas bancadas | Velocidade do ar naquele ponto específico | Zona morta de circulação; falta ventilador HAF, não falta fungicida |
| CO₂ que não sustenta a concentração-alvo | Estanqueidade e lógica de ventilação | Ventilação disparando contra o enriquecimento, ou vazamento na estrutura |
| Compressor ligando e desligando o tempo todo | Banda morta e posição do sensor | Banda morta estreita demais ou sensor em ponto não representativo |

## A economia da climatização

Energia é quase sempre a maior fatia do custo de climatização, e a distribuição do consumo numa fazenda vertical costuma seguir este padrão, conforme benchmarks compilados por [Engler e Krarti (2024), *Energy and Buildings*](https://www.sciencedirect.com/science/article/pii/S030626192400789X):

| Item | Participação no consumo |
| --- | --- |
| Iluminação LED | 60-85% |
| HVAC (resfriamento) | 15-20% |
| HVAC (aquecimento) | 0-15%, baixo no Brasil |
| Desumidificação | 5-10% |
| Ventilação interna e bombas | 3-5% |

Em intensidade, uma PFAL de folhosas otimizada opera na faixa de 10 a 18 kWh por kg de alface fresca, e a otimização combinada de envelope, COP e eficácia luminosa pode levar esse número a cerca de 4,8 kWh/kg. Como referência de contraste, revisões de benchmark do setor apontam média de 38,8 kWh/kg em vertical farming contra 5,4 kWh/kg em estufa convencional, o que dimensiona o tamanho do espaço de melhoria disponível.

A conclusão prática é a mesma da seção de resfriamento, agora com a conta na mão: **investir em passivo antes de ativo entrega retorno maior.** Tela térmica, sombreamento adequado, isolamento do envelope, altura e posicionamento de aberturas custam uma fração do equipamento e reduzem a demanda para sempre. Comprar equipamento para compensar projeto ruim significa pagar CapEx uma vez e OpEx todo mês, pelo resto da vida da instalação. Para montar essa conta no seu caso, o caminho está no [guia de viabilidade econômica e ROI da hidroponia comercial](/blog/viabilidade-economica-e-roi-da-hidroponia-comercial).

No lado normativo, o projeto de HVAC central de uma operação comercial dialoga com a [ABNT NBR 16401](https://abrava.com.br/norma-que-regulamenta-instalacoes-de-ar-condicionado-em-sistemas-centrais-e-unitarios-nbr-16401-foi-atualizada/), partes 1, 2 e 3, que tratam de parâmetros de projeto, conforto térmico e qualidade do ar interno. Internacionalmente, o ASHRAE MTG.CEA e o [CEADS da ASABE](https://www.synrge.com/wp-content/uploads/2023/07/CEADS_ASABE_2300135-public.pdf) vêm consolidando padrões específicos para ambiente controlado.

## O ecossistema brasileiro

A [Embrapa Hortaliças](https://www.embrapa.br/en/busca-de-noticias/-/noticia/56018612/pesquisa-desenvolve-modelos-para-producao-de-hortalicas-em-fazendas-verticais), em Brasília, opera um Laboratório de Agricultura em Ambiente Controlado com 90 m² em dois contêineres com painéis termoisolantes e instrumentação completa de temperatura, umidade, CO₂ e radiação, em parceria com a 100% Livre, justamente para modelar produção de hortaliças em ambiente fechado.

No setor privado, a Pink Farms (São Paulo, fundada em 2016) opera com sensoriamento integrado de temperatura, umidade, CO₂ e O₂ e reconhece iluminação e climatização como seus maiores custos operacionais. A [Be Green Farm](https://www.begreen.farm/Institucional/fazenda) tem 8 unidades em shopping centers de cinco estados, com a primeira em 570 m² produzindo 1.841 kg por mês, com climatização automatizada. Do lado de equipamento, Tropical Estufas, Zanatta, Flórida Estufas e Megaclima fornecem pacotes de pad-fan e estufa, enquanto Hidrogood atende o lado hidropônico.

Na pesquisa pública, ESALQ-USP (Engenharia de Biossistemas), UNESP/FCAV Jaboticabal (resfriamento evaporativo), UFLA, UFV e UFRPE mantêm linhas ativas em ambiência e ambiente protegido.

## Checklist de projeto

1. Feche o desenho passivo antes de cotar equipamento: orientação, altura, aberturas, sombreamento e tela térmica.
2. Dimensione a carga latente da transpiração separadamente da carga sensível das luminárias.
3. Verifique se o clima local sustenta resfriamento evaporativo antes de comprar pad-fan; em região úmida, ele não entrega o catálogo.
4. Trate desumidificação como sistema próprio, não como efeito colateral do ar-condicionado.
5. Instale ventiladores HAF e valide 0,3 a 0,7 m/s sobre o dossel em toda a área, inclusive nas extremidades.
6. Só considere CO₂ depois de resolver luz, temperatura e nutrição, e só com a sala estanque.
7. Use sensor NDIR industrial e sensor de segurança ocupacional independente, com alarme.
8. Defina estratégia de controle com hierarquia de prioridade, setpoints por fase do dia e banda morta, em vez de dispositivos autônomos.
9. Posicione sensores na altura do dossel, em mais de um ponto por zona, com abrigo contra sol e longe de portas e exaustores.
10. Registre histórico e revise as séries temporais; sem elas, diagnóstico é chute.

## Perguntas frequentes

### Qual a diferença entre climatização de estufa convencional e de CEA fechado?
Estufa usa luz solar e troca ar com o exterior por ventilação natural ou pad-fan, enquanto o CEA fechado é isolado termicamente, usa apenas luz artificial e controla temperatura, umidade, CO₂ e fluxo de ar pelo mesmo sistema. Em estufa, o CO₂ injetado se perde pela ventilação; em ambiente fechado ele é retido, com eficiência de uso reportada em 87 a 89% por Kozai (2013).

### Que faixa de temperatura e umidade é ideal para alface em CEA?
De 18 a 24 °C durante o dia e de 15 a 18 °C à noite, com umidade relativa entre 60% e 75% na fase vegetativa. Convertido para VPD, isso corresponde aproximadamente à faixa de 0,6 a 1,1 kPa, que é a métrica que controladores modernos usam diretamente.

### O que é VPD e por que ele é melhor que umidade relativa?
VPD é a diferença entre a pressão de vapor de saturação e a pressão de vapor real do ar, em kPa, e incorpora o efeito da temperatura, coisa que a umidade relativa isolada não faz. Como 65% de UR a 18 °C produz um VPD muito diferente de 65% a 28 °C, pilotar por umidade relativa com temperatura variável leva a transpiração desbalanceada; a faixa segura de VPD é de 0,45 a 1,25 kPa, com ótimo por volta de 0,85 kPa.

### Quanto CO₂ enriquecer e em que momento?
Para folhosas, de 600 a 1.000 ppm durante o fotoperíodo, subindo para o topo da faixa em dias de luz alta e ficando em torno de 600 ppm sob luz baixa. Acima de 1.500 ppm não há ganho proporcional e cresce o risco ocupacional, e a suplementação só se paga com a sala fechada.

### Pad-fan funciona no clima brasileiro?
Funciona muito bem em regiões secas, como o Centro-Oeste em estação seca e parte do Nordeste, com redução de até 10 °C a cerca de 10% do consumo de um ar-condicionado. Em regiões úmidas, com umidade externa acima de 70%, o efeito cai para 2 a 3 °C e ainda aumenta a umidade interna, o que pode agravar o problema em vez de resolver.

### Quanto a climatização representa no consumo de energia de uma fazenda vertical?
O HVAC, somando resfriamento, aquecimento e desumidificação, responde por algo entre 15% e 25% do consumo total, enquanto a iluminação LED fica com 60% a 85%. Operações otimizadas produzem alface na faixa de 4,8 a 10 kWh/kg, contra uma média setorial reportada de 38,8 kWh/kg.

### Posso montar climatização de CEA com ESP32 e sensores baratos?
Para pesquisa, hobby ou microescala, sim: BME280 para temperatura e umidade, MH-Z19B ou SCD30 para CO₂ por NDIR, ESP32 e um supervisório como Home Assistant compõem um conjunto funcional por menos de R$ 1.000. Para operação comercial, exigem-se redundância, sensores blindados, calibração rastreável e controlador industrial, então use a abordagem maker como prototipagem e não como infraestrutura final.

### Como evito mofo e oídio na sala de cultivo?
Mantenha umidade relativa até 75%, VPD acima de 0,6 kPa, velocidade do ar entre 0,3 e 0,7 m/s sobre o dossel com ventiladores HAF, e desumidificação dedicada no período noturno, quando a temperatura cai e a umidade sobe. Encerrar a irrigação algumas horas antes do pôr do sol reduz a carga de água que vira orvalho de madrugada.

### O enriquecimento com CO₂ é seguro para os trabalhadores?
NIOSH e OSHA fixam o limite de exposição ocupacional em 5.000 ppm como média ponderada de 8 horas, bem acima das faixas de cultivo de 800 a 1.200 ppm. Ainda assim, uma falha de válvula muda o cenário, então são obrigatórios sensor de segurança independente do sensor de cultivo, alarme acima de 2.000 ppm, sinalização e protocolo de entrada com dosador desligado.

### Vale investir em recuperação de calor latente?
Em vertical farm comercial, sim: o COP global do HVAC sobe de cerca de 3 para mais de 5 e de 30% a 50% da água transpirada retorna ao reservatório nutritivo, segundo a Danfoss (2024). O CapEx adicional se paga em prazo que depende diretamente da tarifa de energia da região.

### Qual norma brasileira eu cito ao projetar o HVAC de uma operação comercial?
A ABNT NBR 16401, partes 1, 2 e 3, é a referência para parâmetros de projeto, conforto térmico e qualidade do ar interno em sistemas centrais e unitários. A NBR ISO 14644 fornece conceitos de sala limpa e a RDC 216/2004 da ANVISA entra quando a operação manipula alimento pronto para consumo.

### Por que meu cálcio não resolve a queima de bordo mesmo com a solução correta?
Porque o cálcio se move pelo fluxo de transpiração, e se o VPD está baixo demais a planta não transpira o suficiente para transportá-lo até as folhas novas. O problema é climático, não nutricional, e a correção passa por elevar o VPD com desumidificação e movimentação de ar, não por aumentar a dose no reservatório.
