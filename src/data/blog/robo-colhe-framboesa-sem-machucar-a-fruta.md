---
titulo: 'Robô Colhe Framboesa: a Colheita Robótica [2026]'
resumo: >-
  Um robô britânico já colhe framboesa sem machucar a fruta em Portugal e no
  Reino Unido, enquanto no Brasil a colheita de pequenas frutas segue 100% manual.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-22'
dataModificacao: '2026-07-22'
leitura: '16 min'
tldr: >-
  A colheita robótica de frutas já é realidade comercial na Europa: o Fieldworker 1,
  da britânica Fieldwork Robotics, colhe até 300 framboesas por hora com garra macia
  de silicone e câmeras 3D com IA. No Brasil, nenhum robô colhe framboesa ou
  amora-preta comercialmente até 2026, e a cultura ocupa apenas cerca de 40 hectares
  no país inteiro, uma fração dos 4.836 hectares de morango.
imagens:
  - src: /blog/robo-colhe-framboesa-sem-machucar-a-fruta/braco-robotico-com-garra-macia-de-silicone-segurando-de-1.jpg
    alt: 'Braço robótico com garra macia de silicone segurando delicadamente uma framboesa madura em estufa'
    caption: 'A garra macia distribui a pressão e destaca a framboesa do receptáculo sem danificar a fruta'
  - src: /blog/robo-colhe-framboesa-sem-machucar-a-fruta/maos-de-agricultor-colhendo-amora-preta-madura-manualme-2.jpg
    alt: 'Mãos de agricultor colhendo amora-preta madura manualmente em cultivo de pequenas frutas no Sul do Brasil'
    caption: 'No Brasil, a colheita de framboesa e amora-preta ainda é feita fruto a fruto, à mão'
  - src: /blog/robo-colhe-framboesa-sem-machucar-a-fruta/trabalhadora-rural-colhendo-morangos-maduros-a-mao-em-b-3.jpg
    alt: 'Trabalhadora rural colhendo morangos maduros à mão em bancada elevada de estufa comercial no Brasil'
    caption: 'A diária de colheita no Brasil varia de R$ 60 a R$ 75, muito abaixo do custo europeu que justifica o robô'
---
Um robô britânico está colhendo framboesa comercialmente em Portugal e no Reino Unido sem machucar a fruta, usando garras macias de silicone e câmeras com inteligência artificial. Do outro lado do Atlântico, no Brasil, a colheita de framboesa e amora-preta continua 100% manual, fruto por fruto, dedo por dedo. Essa distância entre o laboratório europeu e o campo brasileiro é o assunto deste artigo, e ela é maior do que parece.

A notícia que colocou o tema em pauta em 2026 foi uma rodada de investimento. Mas por trás dela há quase uma década de engenharia, um problema físico que desafiou robôs por anos e uma pergunta econômica que ninguém no Brasil ainda respondeu. Antes de entrar nos detalhes, três fatos ancoram a discussão:

| Fato-chave | Número | Fonte |
| --- | --- | --- |
| Captação da Fieldwork Robotics em 2026 | £3 milhões (abril) + nova rodada em julho | Fieldwork Robotics / Future Farming |
| Produtividade-meta do robô atual | até 300 frutos por hora (mais de 2 kg/h) | Fieldwork Robotics (meta declarada) |
| Área de framboesa cultivada no Brasil | cerca de 40 hectares no país inteiro | Incaper-ES (boletim técnico) |

## O robô que aprendeu a não machucar a framboesa

A **colheita robótica seletiva** é o processo de identificar, avaliar a maturação e remover fisicamente um fruto individual da planta por meio de um sistema robótico autônomo ou semiautônomo, sem intervenção humana direta, preservando a integridade da fruta. O termo "seletiva" a distingue da colheita mecânica tradicional, aquela da vibração de tronco ou das colhedeiras de arrasto, que remove todos os frutos de uma vez, maduros ou não, e é inviável para frutas de mesa delicadas como framboesa e morango.
![Braço robótico com garra macia de silicone segurando delicadamente uma framboesa madura em estufa](/blog/robo-colhe-framboesa-sem-machucar-a-fruta/braco-robotico-com-garra-macia-de-silicone-segurando-de-1.jpg)
*A garra macia distribui a pressão e destaca a framboesa do receptáculo sem danificar a fruta*

O robô que hoje personifica essa tecnologia se chama Fieldworker 1, desenvolvido pela empresa britânica Fieldwork Robotics. Ele tem cerca de 2 metros de altura e opera com quatro braços modulares distribuídos ao longo de um eixo vertical, permitindo colher frutos em diferentes alturas da planta ao mesmo tempo. No topo, câmeras 3D alimentam uma rede neural que localiza cada framboesa no espaço tridimensional, mesmo quando ela está parcialmente escondida atrás de folhas.

A decisão mais delicada, porém, não é onde está o fruto, e sim se ele está pronto. O Fieldworker 1 usa análise espectral de frequência para estimar a maturação a partir da refletância da luz em comprimentos de onda específicos, removendo a subjetividade da inspeção visual humana. Em vez de um colhedor decidir "essa está boa" no olho, o robô lê uma assinatura óptica objetiva.

O elemento decisivo é a garra. Segundo um robô de colheita seletiva integra três subsistemas segundo a literatura de engenharia agrícola, percepção, planejamento de movimento e atuação, é a atuação que separa o sucesso do purê de framboesa. A garra do Fieldworker 1 é do tipo macia (soft gripper), feita de silicone flexível que se molda ao formato irregular da fruta e distribui a pressão em vez de concentrá-la em um ponto. A framboesa não é cortada, é destacada do receptáculo com o ângulo e a força corretos, imitando o gesto humano de "puxar de leve".

Vale registrar a evolução dos números, porque a imprensa costuma confundi-los. Modelos anteriores da mesma empresa, entre 2021 e 2022, colhiam cerca de 1 kg de framboesa por hora. O Fieldworker 1 atual tem meta declarada de 150 a 300 frutos por hora, mais de 2 kg/h, comparável à velocidade de um colhedor humano experiente. Essa cifra, é preciso dizer, é objetivo da própria empresa, não um benchmark independente auditado.

Para quem acompanha a fronteira da tecnologia agrícola, o Fieldworker 1 é primo distante dos sensores e da automação que já chegaram à hidroponia brasileira. Quem quiser entender a base dessa camada digital pode começar pela [automação e IoT com ESP32, os sensores que dão "visão" às máquinas agrícolas](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen), a mesma família de tecnologia de percepção, só que em escala doméstica e comercial acessível.

## Da lentidão de 2019 à frota comercial: a trajetória da Fieldwork Robotics

A Fieldwork Robotics não surgiu com a rodada de 2026. Ela é um spin-off da University of Plymouth, no Reino Unido, fundado em 2017 pelo Dr. Martin F. Stoelen, professor de robótica que divide sua atuação acadêmica entre Plymouth e a Western Norway University of Applied Sciences, na Noruega. A empresa recebeu apoio de engenharia, software e captação da Frontier IP Group, que detém 27,5% de participação societária. A dupla afiliação universitária do fundador ilustra um traço do setor: mesmo empresas já com produto comercial mantêm a pesquisa de ponta fortemente ancorada no ambiente acadêmico.

A linha do tempo do robô mostra o quanto o problema era difícil:

| Ano | Marco | Especificação |
| --- | --- | --- |
| 2019 | Primeiro teste de campo | 1 braço, cerca de 1 minuto por framboesa colhida |
| 2019 | Robô multi-braço | Grant de £547.250 do Innovate UK + National Physical Laboratory |
| 2021-2022 | Modelo comercial-piloto | 1,8 m, 4 braços impressos em 3D, cerca de 1 kg/h, custo de desenvolvimento de £2 milhões |
| 2024 | Lançamento do Fieldworker 1 | Maturação por análise espectral, colaboração com a Costa Group (Austrália) |
| 2026 | Especificação vigente | cerca de 2 m, 4 braços modulares, garra macia, câmeras 3D com IA, meta de 150 a 300 frutos/h |

Repare no ponto de partida: em 2019, o robô levava cerca de um minuto para colher uma única framboesa. Um trabalhador experiente faria isso em poucos segundos. Segundo o [primeiro teste de campo divulgado pela University of Plymouth](https://phys.org/news/2019-05-fieldwork-robotics-field-trials-raspberry.html), aquilo já era considerado um marco, tamanha a dificuldade de fazer uma máquina tocar a fruta mais frágil do reino vegetal cultivado sem destruí-la.

Três anos depois, o salto foi grande. Em 2022, o jornal britânico The Guardian noticiou o feito com uma manchete que resume o desafio técnico:

> "O primeiro robô colhedor de framboesa do mundo quebra o osso mais duro de roer: a fruta macia."
> The Guardian, [01/06/2022](https://www.theguardian.com/business/2022/jun/01/uk-raspberry-picking-robot-soft-fruit)

A operação hoje é internacional. No Reino Unido, a empresa roda um programa de "colheita como serviço" de dois anos com a Place UK (Norfolk) e a Littywood Farm (Stafford). Em Portugal, opera comercialmente desde cerca de 2021 e 2022 na Summer Berry Company, em Odemira, com mais de 100 hectares, onde as primeiras framboesas colhidas por robô chegaram às gôndolas de supermercado; há ainda um programa de pesquisa de 24 meses com a Lusomorango, a maior organização de produtores de berries do país, em parceria com o INIAV e a Driscoll's, focado nas variedades Reyna e Maravilla. Na Austrália, a colaboração é com a Costa Group, a maior produtora de frutas e vegetais frescos do país, com testes a partir do início de 2025.

O combustível financeiro veio em etapas. Em 2023, a empresa captou £1,5 milhão em rodada seed com a Elbow Beach Capital. Em abril de 2026, anunciou [£3 milhões entre equity e grants](https://fieldworkrobotics.com/fieldwork-enters-scale-up-phase-with-3-million-funding/), somando aporte de capital e recursos não dilutivos do Innovate UK. Em julho de 2026, uma nova captação com a SEED Innovations, presidida pelo investidor Jim Mellon, elevou o total acumulado para US$ 5,67 milhões em 8 rodadas, segundo dados da Tracxn. A meta declarada é operar frotas multi-robô coordenadas por um único operador a partir de 2027.

## Por que a framboesa é o "chefe final" da colheita robótica

Se robôs já colhem maçã, laranja e até tomate há anos, por que a framboesa demorou tanto? A resposta está na física da fruta. A colheita robótica de bagas se distingue da colheita de frutas de árvore por três razões concretas: o fruto é mais frágil por unidade de massa, a planta tem geometria mais irregular e mutável (um arbusto denso, não um tronco previsível) e o valor comercial depende quase inteiramente da aparência intacta após a colheita, porque fruta amassada não vende fresca.

A framboesa é, ao mesmo tempo, estruturalmente frágil e mecanicamente presa. Uma compressão de poucos newtons já causa dano visível, o suficiente para desqualificar a fruta para o mercado in natura. E ela não se solta com um corte limpo: precisa ser destacada do receptáculo no ângulo certo, com a força certa. É por isso que a garra macia deixou de ser opção e virou obrigação. Segundo a revisão científica de referência sobre o tema:

> "As garras macias emergiram como a solução mais promissora para a colheita automática de culturas delicadas, por sua capacidade de se adaptar a formatos irregulares e distribuir a força de preensão."
> Navas et al. "Soft Grippers for Automatic Crop Harvesting", [revista Sensors (2021)](https://doi.org/10.3390/s21082689)

Existem várias abordagens de preensão, cada uma adequada a um tipo de fruto:

| Tecnologia de garra | Princípio físico | Uso típico |
| --- | --- | --- |
| Garra rígida com sensor de força | Pinça dura + feedback de força | Frutos rígidos (maçã, laranja, tomate verde) |
| Garra macia pneumática | Câmaras de silicone infláveis que se moldam ao fruto | Morango, framboesa, pêssego |
| Garra macia de sucção | Ventosa de silicone flexível + vácuo | Framboesa, mirtilo |
| Garra com sensor tátil integrado | Sensores capacitivos/ópticos detectam escorregamento | Pesquisa de ponta |
| Braço aéreo com sucção | Robô voador com ventosa, sem base rodante | Pomar de árvore (Tevel Aerobotics) |

A lógica que emerge da tabela é simples: quanto mais macia e valiosa a fruta, mais sofisticada e cara precisa ser a garra. Para a framboesa, a fronteira da pesquisa já incorpora sensores táteis que detectam o momento exato em que a fruta começa a escorregar e ajustam a força em tempo real, exatamente como os dedos de um colhedor fazem sem pensar. Colher framboesa com robô, no fim das contas, nunca foi um problema de braço mecânico. É um problema de tato artificial.

## O que a ciência já provou (e o marketing não conta)

Um cuidado editorial importante: os números de produtividade divulgados pela Fieldwork Robotics são metas comerciais, não benchmarks independentes. A empresa afirma colher "na mesma velocidade e qualidade" de um catador humano, mas não publicou uma taxa de acerto numérica para o Fieldworker 1. Para saber o que a ciência revisada por pares de fato mediu, é preciso olhar fora dos releases de imprensa.

O estudo mais rigoroso e recente sobre colheita robótica de framboesa foi publicado em 2023 na revista Communications Engineering, do grupo Nature, por pesquisadores da École Polytechnique Fédérale de Lausanne (EPFL, Suíça) em colaboração com o Instituto Superior Técnico (Lisboa). É um grupo independente da Fieldwork Robotics, o que dá peso adicional ao resultado. A equipe desenvolveu um "gêmeo físico" sensorizado da planta de framboesa, um simulador tátil com propriedades reguláveis que permite treinar o robô em laboratório o ano inteiro, fora da época de safra.

O resultado central é o número que faltava no debate brasileiro:

> "O robô treinado inteiramente em laboratório com o gêmeo físico atingiu 80% de taxa de sucesso de colheita em demonstrações de campo iniciais, sem nenhuma modificação."
> Junge, Pires e Hughes, Communications Engineering, [Nature Portfolio (2023)](https://doi.org/10.1038/s44172-023-00089-w)

Esses 80% são, hoje, o benchmark auditável mais próximo do desempenho real de um robô de colheita de framboesa. É um número que combina otimismo e realismo: mostra que a tecnologia funciona de verdade, mas também que uma em cada cinco tentativas ainda falha. Para uma cultura em que cada fruta perdida ou danificada é prejuízo direto, essa margem de erro explica por que a fase comercial ainda é de pilotos e não de larga escala. E explica por que a distinção entre "o que a empresa promete" e "o que o paper mede" precisa estar clara para quem avalia investir na tecnologia.

## O mapa global da colheita robótica de frutas

A Fieldwork Robotics não corre sozinha. A colheita robótica de frutas de alto valor virou uma corrida global, com empresas em pelo menos cinco países disputando culturas diferentes:

| Empresa | País | Cultura-alvo | Modelo de negócio | Status (2026) |
| --- | --- | --- | --- | --- |
| Fieldwork Robotics | Reino Unido | Framboesa | Colheita como serviço | US$ 5,67 mi em 8 rodadas |
| Dogtooth Technologies | Reino Unido | Morango | Venda (robôs Gen5, 200 kg/dia) | US$ 18,7 mi captados (jul/2026) |
| Tortuga AgTech | EUA | Morango hidropônico | Absorvida por vertical farm | Adquirida pela Oishii (abr/2025) |
| Advanced Farm | EUA | Morango, depois maçã | Venda de robôs | US$ 32,5 mi no total |
| Agrobot | Espanha/EUA | Morango | Venda | Série B de US$ 20 mi (2024) |
| Tevel Aerobotics | Israel | Frutas de árvore | Aluguel de robôs voadores | Operação em EUA, Itália, Chile |
| Autofarm | Brasil (RS) | Maçã | Protótipo pré-comercial | Sem captação pública divulgada |

Duas tendências saltam da tabela. A primeira é a consolidação por aquisição. A Tortuga AgTech, que colhia morango e venceu o prêmio "Ag Robot of the Year" de 2024, foi comprada pela Oishii, uma empresa de fazenda vertical, em abril de 2025. A lógica é econômica: robôs de colheita ficam parados no armazém a maior parte do ano, porque cada cultura é colhida em uma janela curta de safra. Operações de vertical farming, que colhem continuamente em [ambiente controlado o ano inteiro](/blog/cea-agricultura-em-ambiente-controlado-no-brasil), conseguem justificar o uso intensivo do equipamento, algo que um produtor sazonal dificilmente consegue.

A segunda tendência é o modelo de negócio. Em vez de vender o robô, a maioria das empresas cobra por fruta colhida ou por hectare, o que ficou conhecido como "colheita como serviço". Isso baixa a barreira de entrada para o produtor e mantém o risco e a manutenção do hardware com a startup. A Dogtooth Technologies, cujos robôs de quinta geração colhem 200 kg de morango por dia, e a Advanced Farm, que pivotou do morango para a maçã reaproveitando a mesma plataforma, ilustram os dois caminhos que o setor testa em paralelo.

O tamanho desse mercado, porém, é uma pergunta traiçoeira, e vale transparência sobre os números.

## Quanto vale esse mercado? Uma resposta honesta

Consultorias divergem bastante nas estimativas de mercado, e o motivo é o escopo de cada uma. Compare:

| Fonte | Escopo | Valor | Projeção | CAGR |
| --- | --- | --- | --- | --- |
| Mordor Intelligence | Robótica agrícola geral | US$ 18,0 bi (2026) | US$ 41,3 bi (2031) | 18,07% |
| Research and Markets | Robô de colheita | US$ 1,65 bi (2026) | US$ 3,09 bi (2030) | 17% |
| Grand View Research | Robôs de colheita | US$ 2,24 bi (2024) | US$ 6,93 bi (2030) | 21,9% |
| Coherent Market Insights | Robôs de colheita de frutas | US$ 2,31 bi (2026) | US$ 17,64 bi (2033) | 18,7% |

Os valores variam por até três vezes entre as fontes, porque cada uma mede uma coisa: robótica agrícola inteira (incluindo tratores autônomos e drones), robôs de colheita em geral ou robôs de colheita de frutas especificamente. Não existe pesquisa de mercado com o recorte "robôs de framboesa", porque essa fruta está diluída dentro da categoria "soft fruit". O que todas as fontes concordam, segundo a [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/agricultural-robots-market), é a direção: o mercado é pequeno em valor absoluto hoje, mas cresce acima de 17% ao ano, e os robôs de colheita são o subsegmento de crescimento mais rápido dentro da robótica agrícola. Entre 2022 e 2025, mais de US$ 1 bilhão foi investido globalmente em startups de colheita e capina robótica.

Como referência de mercado consumidor, a própria Fieldwork Robotics cita o mercado britânico de framboesa, avaliado em £2,6 bilhões, para justificar seu investimento. Não há dado equivalente publicado para o Brasil, pela simples razão de que o mercado brasileiro de framboesa é marginal, sem estatística oficial dedicada. E é aqui que a história muda de continente.

## E o Brasil, onde está nessa corrida?

A resposta curta é: o Brasil está na largada, não na pista. Até julho de 2026, nenhum robô de colheita seletiva de framboesa ou amora-preta operava comercialmente no país. O movimento nacional mais avançado é a Autofarm, startup gaúcha que desenvolve um robô de colheita de maçã, ainda em fase de protótipo. Vale a distinção: maçã é fruto rígido, tecnicamente mais fácil de colher com robô do que framboesa.
![Mãos de agricultor colhendo amora-preta madura manualmente em cultivo de pequenas frutas no Sul do Brasil](/blog/robo-colhe-framboesa-sem-machucar-a-fruta/maos-de-agricultor-colhendo-amora-preta-madura-manualme-2.jpg)
*No Brasil, a colheita de framboesa e amora-preta ainda é feita fruto a fruto, à mão*

Para entender o abismo, é preciso separar duas culturas que a imprensa costuma tratar como uma só. A **amora-preta** tem no Brasil um programa de melhoramento genético consolidado desde 1972 na Embrapa Clima Temperado, em Pelotas (RS), com dez cultivares lançadas, entre elas Tupy, Xavante, BRS Xingu e a mais recente, BRS Terena (2024). Já a **framboesa** é cultura marginal, estimada em cerca de 40 hectares no país inteiro, concentrada no Rio Grande do Sul, São Paulo e Minas Gerais, segundo o [boletim técnico do Incaper sobre framboeseira](https://biblioteca.incaper.es.gov.br/digital/bitstream/123456789/2972/1/BRT-framboesa-Incaper.pdf).

Um retrato regional deixa a escala evidente. No distrito de Monte Alegre dos Campos, em Vacaria (RS), polo nacional de pequenas frutas, a safra 2022/23 somou 5,88 hectares de framboesa, 34,42 hectares de amora-preta, 2,35 hectares de mirtilo e 8,53 hectares de morango, segundo [levantamento da Abrafrutas](https://abrafrutas.org/2022/06/rs-producao-de-pequenas-frutas-cresce-em-monte-alegre-dos-campos). Ou seja: mesmo no coração da produção nacional, a framboesa é uma fração pequena da amora-preta.

Para dimensionar o que a robótica encontraria se chegasse, o morango serve de proxy ideal, por ser a "pequena fruta" de maior escala e valor no Brasil, também colhida 100% à mão:

| Ano-safra | Área (ha) | Produtividade (t/ha) | Produção (t) |
| --- | --- | --- | --- |
| 2014 | 3.500 | 32,0 | 112.000 |
| 2018 | 4.500 | 39,9 | 179.700 |
| 2020 | 5.279 | 41,5 | 218.881 |
| 2023 | 4.836 | 38,8 | cerca de 187.800 |

Fonte: [Anuário HF Morango 2025 (Cepea/Esalq via Embrapa)](https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1178882/1/Anuario-HF-MORANGO-2025.pdf). O Brasil ocupa a 14ª posição global em área de morango, é o 3º maior produtor das Américas atrás de Estados Unidos e México, e concentra a produção em Minas Gerais, principalmente no Sul do estado. Mesmo assim, os 4.836 hectares de morango fazem os 40 hectares de framboesa parecerem quase invisíveis. Quem quiser entender a cultura de perto pode começar pelo guia de [como plantar morango em casa e em vaso](/blog/como-plantar-morango-em-casa-e-em-vaso-guia-completo).

A conclusão é desconfortável, mas honesta: a robótica de colheita provavelmente chegará ao Brasil primeiro pelas culturas de maior escala e valor, como morango e uva de mesa, muito antes de olhar para a framboesa. O mercado brasileiro de framboesa é pequeno demais para justificar, hoje, o investimento em um robô dedicado.

## A conta que ninguém fez: mão de obra x robô no Brasil

O argumento comercial da colheita robótica na Europa é a mão de obra. Segundo o CEO da Fieldwork Robotics, a mão de obra chega a responder por metade do custo total de colheita da framboesa no Reino Unido. Com salários altos e escassez de trabalhadores após o Brexit, o robô fecha a conta. No Brasil, a equação é diferente, e ninguém a resolveu publicamente ainda.
![Trabalhadora rural colhendo morangos maduros à mão em bancada elevada de estufa comercial no Brasil](/blog/robo-colhe-framboesa-sem-machucar-a-fruta/trabalhadora-rural-colhendo-morangos-maduros-a-mao-em-b-3.jpg)
*A diária de colheita no Brasil varia de R$ 60 a R$ 75, muito abaixo do custo europeu que justifica o robô*

Do lado do custo humano, os números são modestos. Pesquisa do Incaper com produtores de morango do Espírito Santo mostra que a colheita é predominantemente familiar: 90,2% dos entrevistados não contratam mão de obra externa para colher. Quando há contratação de diaristas, o valor varia de R$ 60 a R$ 75 por dia, com metade dos produtores pagando R$ 70, segundo o estudo da [cadeia produtiva do morango do Incaper](https://biblioteca.incaper.es.gov.br/digital/bitstream/item/4311/1/Cadeia-Produtiva-Morango-Incaper.pdf). Uma diária de R$ 70 é muito distante do custo de um colhedor britânico, o que reduz o incentivo econômico imediato para automatizar.

Mas há um vetor de longo prazo que muda a análise: a escassez estrutural de mão de obra rural. O número de pessoas ocupadas na agricultura brasileira caiu de 23,4 milhões em 1985 para 15,1 milhões em 2017, uma perda de mais de 8 milhões de trabalhadores em pouco mais de três décadas, segundo a [Embrapa](https://www.embrapa.br/en/visao-de-futuro/intensificacao-tecnologica-e-concentracao-da-producao/sinal-e-tendencia/escassez-e-elevacao-do-custo-da-mao-de-obra). Em 2026, com a safra recorde de grãos de 353,4 milhões de toneladas (Conab) disputando trabalhadores temporários, a pressão sobre a fruticultura tende a crescer. A diária barata de hoje pode não ser a diária de amanhã.

O que falta, portanto, é a conta completa: custo do robô por hectare, payback, produtividade real em campo brasileiro. Nenhuma dessas variáveis foi calculada publicamente para a realidade nacional. É exatamente o tipo de análise de [viabilidade econômica e retorno sobre investimento](/blog/viabilidade-economica-e-roi-da-hidroponia-comercial) que precede qualquer decisão séria de automação, e que ainda está por ser feita para as pequenas frutas do Brasil. Enquanto a produção seguir familiar e de pequena escala, a equação de retorno será muito diferente da agricultura empresarial de Portugal e do Reino Unido, onde a Fieldwork Robotics opera.

## Limitações e o que ainda não se sabe

Terminar sem ressalvas seria vender promessa como fato. A tecnologia é real, mas está longe de ser um produto de prateleira, e a transparência sobre as lacunas é parte da avaliação séria.

Primeiro, a taxa de sucesso do Fieldworker 1 não é pública. A empresa fala em qualidade equivalente à humana, mas o único número auditável de desempenho vem de um estudo independente (os 80% da EPFL), não do produto comercial. Segundo, o ambiente importa: mesmo os melhores robôs de colheita seletiva operam majoritariamente em estufas e túneis, com iluminação previsível e plantas em sistema "table-top", não em campo aberto tradicional. Terceiro, o custo continua alto e não amortizado: apenas o desenvolvimento do modelo de 2022 consumiu £2 milhões, e não há dado público de payback por hectare.

Há ainda a dependência de variedades específicas. Os testes documentados em Portugal usam cultivares proprietárias da Driscoll's, o que sugere que adaptar o robô a outras cultivares, inclusive as que se cultivam no Brasil, não é automático nem trivial. Cada mudança de planta pode exigir novo treinamento de percepção e novo ajuste de garra.

O balanço, então, é de otimismo cauteloso. A colheita robótica de framboesa saiu do laboratório e chegou ao supermercado europeu, um feito que parecia distante há dez anos. Mas ela ainda não resolveu o problema econômico que a justificaria no Brasil, onde a cultura é marginal, a mão de obra é barata e a conta nunca foi feita. Quando (e se) a robótica de colheita cruzar o Atlântico, ela provavelmente chegará pelo morango antes de tocar a primeira framboesa brasileira.

## Perguntas frequentes

### Existe algum robô colhendo framboesa comercialmente no Brasil?
Não. Não foi identificado nenhum robô de colheita seletiva de framboesa ou amora-preta em operação comercial no Brasil até julho de 2026. A tecnologia mais avançada em teste no país é o robô de colheita de maçã da startup gaúcha Autofarm, ainda em fase de protótipo.

### Por que é tão difícil fazer um robô colher framboesa sem machucar a fruta?
Porque a framboesa combina fragilidade estrutural extrema, já que poucos newtons de pressão a danificam, com a necessidade de ser destacada do receptáculo no ângulo certo, não cortada. Isso exige garras macias de silicone com sensores de força e visão 3D com inteligência artificial, tecnologia descrita em revisões científicas como Navas et al. (2021), na revista Sensors.

### Qual é a produtividade real do robô da Fieldwork Robotics?
O modelo atual, o Fieldworker 1, tem meta declarada de 150 a 300 frutos por hora, mais de 2 kg por hora, comparável a um colhedor humano experiente. Modelos anteriores da mesma empresa, de 2021 e 2022, colhiam cerca de 1 kg por hora. É importante notar que essa cifra é meta da própria empresa, sem taxa de acerto numérica publicada de forma independente.

### O Brasil já cultiva framboesa e amora-preta comercialmente?
Sim, mas em escala pequena. A amora-preta tem programa de melhoramento genético da Embrapa Clima Temperado desde 1972, com dez cultivares lançadas. Já a framboesa é cultura marginal, estimada em cerca de 40 hectares no país, concentrada no Rio Grande do Sul (região de Vacaria), São Paulo e Minas Gerais.

### Quanto custa colher framboesa ou morango manualmente no Brasil?
Não há série de preço específica para framboesa. Como proxy, pesquisa do Incaper no Espírito Santo mostra que diaristas de colheita de morango recebem entre R$ 60 e R$ 75 por dia, mas a colheita é majoritariamente feita por mão de obra familiar, em 90,2% dos produtores entrevistados, e não contratada.

### Existe um estudo científico que comprove que robôs conseguem colher framboesa?
Sim. Um estudo publicado na revista Communications Engineering, do grupo Nature, em 2023, por pesquisadores da EPFL (Suíça) e do Instituto Superior Técnico (Portugal), grupo independente da Fieldwork Robotics, reportou 80% de taxa de sucesso de colheita em demonstrações de campo iniciais, usando um robô treinado em laboratório com um "gêmeo físico" sensorizado da planta.

### Quanto as empresas de colheita robótica de bagas já captaram em investimento?
A Fieldwork Robotics captou US$ 5,67 milhões em 8 rodadas desde 2017, incluindo £3 milhões em abril de 2026 e uma nova captação em julho de 2026 com a SEED Innovations. A Dogtooth Technologies, do morango, captou US$ 18,7 milhões em julho de 2026, e a Advanced Farm Technologies, dos EUA, já captou US$ 32,5 milhões no total.

### Por que empresas de robótica de colheita estão sendo compradas por fazendas verticais?
Porque vender robôs de colheita isolados enfrenta um problema estrutural: a colheita de cada cultura acontece uma vez por safra, e é difícil justificar um equipamento que fica parado o resto do ano. Fazendas verticais, que colhem continuamente em ambiente controlado, usam o robô de forma intensiva. Foi o racional da aquisição da Tortuga AgTech pela Oishii, em abril de 2025.

### A colheita robótica poderia reduzir o custo de produção no Brasil?
Em tese sim, já que a mão de obra responde por até metade do custo de colheita da framboesa no Reino Unido. No Brasil, porém, essa conta ainda não foi feita publicamente: a produção de framboesa e amora é majoritariamente familiar e de pequena escala, o que muda a equação de retorno em relação à agricultura empresarial do Reino Unido e de Portugal.

### Qual a diferença entre colheita robótica seletiva e colheita mecânica tradicional?
A colheita mecânica tradicional, como a vibração de tronco, remove todos os frutos de uma vez, maduros ou não, e costuma danificar boa parte da produção, por isso serve só para frutas de processamento industrial. A colheita robótica seletiva identifica e remove fruto a fruto, avaliando a maturação individualmente, e preserva a fruta para venda in natura, que tem valor muito mais alto.
