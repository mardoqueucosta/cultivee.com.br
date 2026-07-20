---
titulo: 'Calculadora de DLI para Cultivo Indoor [2026]'
resumo: >-
  Calculadora DLI passo a passo: converta PPFD e fotoperíodo em mol/m²/dia,
  compare com o alvo da sua cultura e ajuste luz, altura e horas.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-20'
dataModificacao: '2026-07-20'
leitura: '9 min'
tldr: >-
  A conta é DLI = (PPFD × 3.600 × horas) / 1.000.000. Um painel entregando
  250 µmol·m⁻²·s⁻¹ por 16 horas resulta em 14,4 mol·m⁻²·d⁻¹, dentro da faixa
  ótima de 14 a 17 mol·m⁻²·d⁻¹ para alface (Cornell CEA Lettuce Handbook).
  Se o número não fecha, as três alavancas são intensidade, distância do
  painel e horas de fotoperíodo, nessa ordem de custo-benefício.
imagens:
  - src: /blog/calculadora-de-dli-daily-light-integral-para-cultivo-indoor/mao-segurando-medidor-de-luz-sobre-mudas-de-alface-em-b-1.jpg
    alt: 'Mão segurando medidor de luz sobre mudas de alface em bancada hidropônica iluminada por painel LED'
    caption: 'A medição do PPFD deve ser feita na altura real das folhas, nunca na altura da bancada vazia'
  - src: /blog/calculadora-de-dli-daily-light-integral-para-cultivo-indoor/maos-ajustando-a-altura-de-um-painel-led-suspenso-sobre-2.jpg
    alt: 'Mãos ajustando a altura de um painel LED suspenso sobre bancada de folhosas em cultivo indoor'
    caption: 'Baixar o painel aumenta o PPFD rapidamente, mas concentra a luz e reduz a área útil aproveitável'
---
O cultivo indoor raramente falha de forma escandalosa. A planta não morre: ela estiola, alonga o internódio, produz folha fina e pálida, perde sabor e nunca fecha a cabeça. O cultivador troca o adubo, mexe no pH, desconfia do substrato, e o problema segue lá, porque o problema é luz insuficiente e a luz insuficiente não tem sintoma dramático, só resultado medíocre.

O número que revela isso é o DLI, a quantidade total de luz fotossinteticamente ativa que a planta acumula em 24 horas, medida em mol·m⁻²·d⁻¹. Se você quer entender a física por trás disso (espectro, PAR, como o PPFD é definido), o guia canônico é [iluminação LED para plantas: espectro, DLI e PPFD](/blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd). Aqui o objetivo é outro e é bem mais estreito: fazer você chegar ao SEU número, comparar com o alvo da sua cultura e saber exatamente o que mudar quando não fechar.

## A fórmula do DLI e como fazer a conta

DLI é o PPFD sustentado ao longo do fotoperíodo. A fórmula canônica, conforme a publicação [SPES-720 da Virginia Tech Cooperative Extension](https://www.pubs.ext.vt.edu/SPES/spes-720/spes-720.html) (Stallknecht, ago/2025), é:
![Mão segurando medidor de luz sobre mudas de alface em bancada hidropônica iluminada por painel LED](/blog/calculadora-de-dli-daily-light-integral-para-cultivo-indoor/mao-segurando-medidor-de-luz-sobre-mudas-de-alface-em-b-1.jpg)
*A medição do PPFD deve ser feita na altura real das folhas, nunca na altura da bancada vazia*

**DLI = (PPFD × 3.600 × horas de fotoperíodo) ÷ 1.000.000**

Cada termo tem uma função clara:

| Termo | O que é | Unidade | Por que está na conta |
| --- | --- | --- | --- |
| PPFD | Fótons que chegam à superfície da planta por segundo | µmol·m⁻²·s⁻¹ | É a intensidade instantânea, o "quanto" |
| 3.600 | Segundos em uma hora | s/h | Converte a taxa por segundo em taxa por hora |
| horas | Fotoperíodo programado no timer | h/dia | É o "por quanto tempo" |
| 1.000.000 | Micromol por mol | µmol/mol | Converte µmol em mol, a unidade do DLI |

### Exemplo 1: tenho o PPFD, quero o DLI

Painel LED a 35 cm da bancada, medindo 250 µmol·m⁻²·s⁻¹ no canopy, timer programado em 16 horas ligado e 8 desligado.

1. Fótons por hora: 250 × 3.600 = 900.000 µmol·m⁻²·h⁻¹
2. Fótons no dia: 900.000 × 16 = 14.400.000 µmol·m⁻²·d⁻¹
3. Converte para mol: 14.400.000 ÷ 1.000.000 = **14,4 mol·m⁻²·d⁻¹**

Esse valor cai dentro da faixa ótima de alface, mas com pouca folga em relação ao teto operacional de 17 mol·m⁻²·d⁻¹.

### Exemplo 2: tenho o DLI que preciso, quanto de PPFD ou de horas?

Inverta a fórmula. Digamos que você quer 17 mol·m⁻²·d⁻¹ para manjericão e o timer está fixo em 16 horas.

**PPFD necessário = (DLI × 1.000.000) ÷ (3.600 × horas)**

PPFD = (17 × 1.000.000) ÷ (3.600 × 16) = 17.000.000 ÷ 57.600 = **295 µmol·m⁻²·s⁻¹**

Agora o caminho contrário, com o painel fixo em 250 µmol·m⁻²·s⁻¹ e você querendo saber quantas horas precisa:

**Horas = (DLI × 1.000.000) ÷ (3.600 × PPFD)**

Horas = (17 × 1.000.000) ÷ (3.600 × 250) = 17.000.000 ÷ 900.000 = **18,9 horas**

Repare no que a segunda conta revelou: para ganhar 2,6 mol com o mesmo painel, você precisa de quase 3 horas a mais de energia por dia, todos os dias. Essa é exatamente a decisão que a seção de custo vai quantificar.

## Como obter o PPFD sem comprar equipamento caro

Aqui está o gargalo real de quem cultiva em casa. O quantômetro PAR dedicado é o instrumento correto e é caro: o Apogee MQ-500, referência de mercado, custa na ordem de USD 525, e o LI-COR LI-190R está na mesma categoria. Para uma bancada de 2 m² isso raramente se justifica. As alternativas, com honestidade sobre o que cada uma entrega:

| Método | O que é | Confiabilidade | Quando usar |
| --- | --- | --- | --- |
| Quantômetro PAR | Medição direta em µmol·m⁻²·s⁻¹ | Medição | Produção comercial, calibração de referência |
| App com correção espectral (Photone) | Câmera do celular com perfil de espectro | Estimativa boa, ±10% para LED branco segundo o fabricante | Hobby e pequena produção |
| Datasheet do fabricante | Mapa de PPFD por distância | Estimativa otimista | Dimensionamento antes da compra |
| Sensor DIY (TSL2591 + ESP32) | Lux com correção aplicada | Estimativa grosseira, ±20% | Monitoramento contínuo experimental |

**Lendo o datasheet corretamente.** O fabricante quase sempre informa o PPFD no ponto central, a uma distância fixa (tipicamente 30 cm). Esse é o melhor número que o painel produz, não o número médio da sua área. Nos cantos da área iluminada a queda é de 30% a 60%. Se você dimensionar a bancada inteira pelo valor central do datasheet, vai superestimar o DLI de metade das plantas.

**Sobre a conversão lux para PPFD.** Ela existe, mas o fator depende do espectro da fonte. Lux é uma unidade ponderada pela sensibilidade do olho humano, que tem pico no verde-amarelo (555 nm), justamente onde a planta absorve menos. Um LED roxo com pico em azul e vermelho pode ter lux baixíssimo e PPFD alto; um LED branco morno tem o oposto. Não existe fator universal, então trate qualquer conversão de lux como estimativa válida apenas para a família de espectro em que foi calibrada.

**Sempre meça em vários pontos.** Faça uma grade de pelo menos cinco leituras: centro, quatro cantos da área útil. Trabalhe com a média, não com o pico. Se você quer instrumentar isso de forma permanente, vale olhar o guia de [sensores agrícolas e como escolher](/blog/sensores-agricultura-guia-escolha-implementacao).

## Tabela de DLI alvo por grupo de cultura

Agrupar por comportamento fisiológico é mais útil e mais honesto do que fingir precisão espécie a espécie. As faixas abaixo vêm da compilação da Virginia Tech (SPES-720, 2025), do [Cornell CEA Lettuce Handbook](https://cpb-us-e1.wpmucdn.com/blogs.cornell.edu/dist/8/8824/files/2019/06/Cornell-CEA-Lettuce-Handbook-.pdf) (Both et al.) e dos experimentos de intensidade luminosa publicados por [Pennisi et al. em Scientia Horticulturae (2020)](https://www.sciencedirect.com/science/article/abs/pii/S0304423820303368).

| Grupo | DLI mínimo | DLI ótimo | Teto seguro | PPFD equivalente a 16 h | Observação |
| --- | --- | --- | --- | --- | --- |
| Mudas e propagação | 5 | 6 a 10 | 12 | 104 a 174 | Plântula tenra queima com PPFD alto |
| Microverdes | 6 | 9 a 12 | 15 | 156 a 208 | Ciclo de 7 a 14 dias; abaixo de 6 estiola |
| Alface | 10 | 14 a 17 | 17 | 243 a 295 | Acima de 17 por vários dias, risco de tipburn |
| Rúcula e agrião | 10 | 12 a 15 | 17 | 208 a 260 | Excesso acentua o amargor |
| Ervas (manjericão, coentro, salsa) | 12 | 15 a 25 | 30 | 260 a 434 | Manjericão satura próximo de 16,5 mol |
| Morango em frutificação | 15 | 17 a 22 | 30 | 295 a 382 | Fotoperíodo curto para indução floral |
| Frutos (tomate, pepino, pimentão) | 18 a 20 | 22 a 30 | 35 | 382 a 520 | Comercial opera na faixa de 25 a 30 |

O teto de 17 mol·m⁻²·d⁻¹ para alface merece destaque porque quase nenhum material em português menciona. A pesquisa da Cornell mostra que acima disso, sustentado por três dias ou mais, o risco de tipburn (necrose da borda da folha nova) sobe muito, e a mitigação é ventilação vertical dirigida ao ponto de crescimento, não redução de nutriente. Detalhes de manejo da cultura estão no [guia completo de alface hidropônica](/blog/guia-completo-de-alface-hidroponica-do-plantio-caseiro-a-pro).

> Leia também: [Como iniciar o cultivo de microverdes em casa](/blog/como-iniciar-cultivo-microverdes-em-casa)

## As três alavancas quando o número não fecha

Calculou, comparou, ficou abaixo do alvo. Você tem exatamente três variáveis para mexer, e elas custam coisas diferentes.
![Mãos ajustando a altura de um painel LED suspenso sobre bancada de folhosas em cultivo indoor](/blog/calculadora-de-dli-daily-light-integral-para-cultivo-indoor/maos-ajustando-a-altura-de-um-painel-led-suspenso-sobre-2.jpg)
*Baixar o painel aumenta o PPFD rapidamente, mas concentra a luz e reduz a área útil aproveitável*

### Alavanca 1: distância

É a mais poderosa e a mais mal usada. A intensidade cai aproximadamente com o quadrado da distância: dobrar a altura do painel derruba o PPFD para cerca de um quarto. Descer o painel é a única alavanca que aumenta o DLI sem gastar nem um watt a mais.

O preço é geométrico. Painel mais baixo concentra luz numa área menor, cria um ponto quente no centro, aumenta o risco de queima foliar por proximidade e reduz a área útil aproveitável. Você trocou intensidade por cobertura.

### Alavanca 2: intensidade

Painel mais potente, ou mais painéis. Resolve o problema de forma direta e sem efeito colateral biológico, mas custa CAPEX e custa energia proporcional. É a alavanca certa quando a área útil já está no limite e você não pode baixar mais o painel.

### Alavanca 3: tempo

Estender o fotoperíodo é barato em equipamento e caro em conta de luz, com custo linear: 20% mais horas é 20% mais kWh. E, crucialmente, **tempo não é variável livre, é restrição biológica.**

O escuro é fisiologicamente necessário, não é apenas ausência de luz. Alface e manjericão toleram fotoperíodos longos, de 20 a 24 horas, desde que o PPFD seja moderado e o DLI total continue na faixa; há evidência de melhora de qualidade foliar em manjericão sob luz contínua no [estudo publicado em Advances in Horticultural Science (Pennisi et al., 2024)](https://oaj.fupress.net/index.php/ahs/article/download/16590/13344/76114). Já tomate, pimentão e morango exigem período escuro: tomate sob iluminação contínua desenvolve clorose intervenal, e o morango depende do fotoperíodo curto como sinal de indução floral. Nessas culturas, esticar horas não só não funciona como pode inviabilizar a colheita.

Regra prática de decisão: verifique primeiro se a distância pode cair, depois se as horas cabem dentro do limite biológico da cultura, e só então gaste com mais painel.

## Uniformidade: o DLI do centro não é o DLI da bancada

Esse é o erro que estraga mais projeto do que qualquer outro. Você mede 300 µmol·m⁻²·s⁻¹ no centro, calcula um DLI confortável e planeja a produção inteira com esse número, enquanto as plantas da borda recebem 150 e entregam metade.

O mapa de luz importa mais que o pico. Alguns princípios operacionais:

- **Altura e uniformidade trabalham em oposição.** Painel mais alto ilumina área maior e de forma mais homogênea, mas com intensidade menor em todos os pontos. Painel baixo dá pico alto e distribuição péssima.
- **Sobreposição resolve borda.** Em bancada larga, dois painéis com áreas de cobertura sobrepostas produzem um platô mais plano que um painel potente central.
- **Parede clara e refletor recuperam borda.** Superfície branca fosca ao redor da área devolve para o canopy parte dos fótons que escapariam lateralmente. É a intervenção mais barata que existe para uniformidade.
- **Planeje pela área útil, não pela área iluminada.** Defina qual retângulo mantém pelo menos 80% do PPFD central e trate só ele como bancada produtiva. As plantas fora dele serão sempre inferiores, e é melhor descobrir isso na planilha do que na colheita.

Em sistemas de canal como o NFT, o canopy tende a ser mais uniforme porque as plantas estão em linha e na mesma altura, o que facilita o mapeamento. Vale conferir o dimensionamento no [guia do sistema NFT](/blog/sistema-nft-de-hidroponia-o-que-e-como-funciona-e-como-dimen). Em cultivo vertical em torre, o desafio é o oposto: a iluminação lateral cria gradiente vertical forte, tema tratado no guia de [horta vertical hidropônica residencial](/blog/horta-vertical-hidroponica-residencial-como-montar-a-sua).

## DLI e a conta de luz

DLI alvo implica consumo, e consumo tem preço. Essa ligação quase nunca aparece nos artigos sobre iluminação, e é ela que decide se o projeto para em pé.

A conta é simples:

**kWh/mês = (potência em W ÷ 1.000) × horas/dia × 30**

**Custo mensal = kWh/mês × tarifa em R$/kWh**

Exemplo trabalhado, um painel de 200 W com eficácia de 2,5 µmol/J, rodando 16 horas por dia:

1. Consumo diário: 0,2 kW × 16 h = 3,2 kWh
2. Consumo mensal: 3,2 × 30 = 96 kWh
3. A uma tarifa residencial na ordem de R$ 0,90/kWh: 96 × 0,90 = **R$ 86 por mês**, para aproximadamente 1 m² de alface

Agora o ponto que muda tudo: **a eficácia da luminária, em micromol por joule (µmol/J), é o que decide se o mesmo DLI sai caro ou barato.** Eficácia é quantos fótons úteis o equipamento entrega por unidade de energia consumida. Um painel de 2,0 µmol/J e outro de 3,0 µmol/J podem produzir o mesmo DLI na bancada, mas o segundo consome cerca de um terço a menos de energia para isso, todos os dias, pelos anos de vida útil do equipamento.

O programa [DLC Horticultural](https://www.designlights.org/) usa 2,3 µmol/J como piso de qualificação para luminárias hortícolas. Painéis atuais com LEDs de última geração superam 3,5 µmol/J. Ao comprar, exija do fornecedor o PPF (µmol/s), o mapa de PPFD por distância e a eficácia em µmol/J. Ignore "equivalente a 1.000 W de HPS", que é linguagem de marketing sem padrão de medição. No Brasil, confira também a certificação compulsória de lâmpadas LED do [INMETRO](http://www.inmetro.gov.br/) e a etiquetagem de eficiência PROCEL/ENCE.

Para quem está dimensionando produção comercial, a energia da iluminação costuma ser o maior item de OPEX de uma operação indoor, e o cálculo completo está no guia de [viabilidade econômica e ROI da hidroponia comercial](/blog/viabilidade-economica-e-roi-da-hidroponia-comercial). O contexto de operação em ambiente fechado, com o custo de climatização que acompanha a carga térmica das luminárias, está em [CEA: agricultura em ambiente controlado no Brasil](/blog/cea-agricultura-em-ambiente-controlado-no-brasil).

## Luz natural mais suplementação: o caso mais comum no Brasil

A maior parte de quem cultiva em casa não está num quarto fechado. Está numa janela, numa varanda, num canto de cozinha, com alguma luz natural entrando. Nesse cenário o problema muda de natureza: você não precisa gerar todo o DLI, precisa **completar o déficit.**

Em CEA indoor puro o cálculo é determinístico, porque toda a luz é artificial e controlada. Com luz natural entrando, três fatores fazem a contribuição solar variar bastante:

- **Estação.** O comprimento do dia e o ângulo solar mudam ao longo do ano, e no Brasil essa variação é menor que em latitudes altas, mas está longe de ser desprezível no Sul do país.
- **Orientação da janela.** Uma face que recebe sol direto por parte do dia entrega ordem de grandeza mais luz do que uma face que só recebe céu difuso.
- **Vidro e obstruções.** Vidro comum já atenua a radiação, vidro com película atenua bem mais, e prédio, marquise ou árvore em frente à janela mudam completamente a conta.

O método prático: meça o PPFD na posição real da planta em três momentos do dia (manhã, meio-dia, fim de tarde), estime o DLI natural por aproximação, subtraia do alvo da cultura e dimensione a luminária só para a diferença. Refaça a medição na virada de estação, porque o déficit de inverno é maior que o de verão.

Duas consequências úteis: primeiro, a luminária suplementar costuma ser bem menor (e mais barata) do que a de um setup sole-source; segundo, faz sentido concentrar as horas artificiais nos períodos em que a luz natural é fraca, no início da manhã e no fim da tarde. Para ervas na cozinha, que são o caso clássico dessa configuração, veja o [guia de horta gourmet na cozinha](/blog/horta-gourmet-na-cozinha-ervas-e-temperos-frescos-o-ano-todo).

## Erros frequentes no cálculo de DLI

- **Usar lux ou lúmen como se fosse PPFD.** Lux é unidade calibrada para o olho humano; PPFD conta fótons que a planta usa. São grandezas de mundos diferentes e não há fator de conversão universal.
- **Acreditar em watts como medida de luz.** Watt é consumo elétrico, não saída de luz útil. Dois painéis de 200 W com eficácias distintas entregam DLIs bem diferentes na mesma bancada.
- **Usar o número do centro como número da área.** Erro mais caro da lista. O datasheet informa o pico, e a produção acontece na área toda.
- **Ignorar a degradação do equipamento.** LEDs perdem uma fração da saída ao longo das primeiras milhares de horas de uso, e poeira acumulada na lente ou no difusor tira mais. Recalibre a medição a cada seis meses e limpe as luminárias periodicamente.
- **Esquecer que a exigência muda por fase.** Muda, crescimento vegetativo e produção pedem DLIs diferentes. Um DLI fixo de produção queima plântula; um DLI de muda mantido até a colheita entrega planta fraca.
- **Aplicar referência de estufa em cultivo indoor fechado.** Recomendação de estufa pressupõe contribuição solar variável; indoor puro exige o DLI inteiro do artificial e a conta não é intercambiável.

## Roteiro de 5 passos para fechar o seu número

1. **Meça ou estime o PPFD em cinco pontos** da área útil (centro e quatro cantos), na altura real do canopy, e anote a média e o menor valor.
2. **Calcule o DLI atual** com DLI = (PPFD × 3.600 × horas) ÷ 1.000.000, usando a média para o cenário realista e o menor valor para o cenário da planta de borda.
3. **Compare com o alvo do grupo da sua cultura** na tabela acima, e verifique também o teto (o excesso tem custo e, em alface, tem risco).
4. **Escolha a alavanca de menor custo**, na ordem: descer o painel se a área útil permitir, estender horas se a fisiologia da cultura permitir, aumentar potência por último.
5. **Reconfira depois de ajustar**, e repita a medição a cada seis meses ou na virada de estação se houver luz natural na equação.

Feito isso, você deixa de brigar com sintomas (folha fina, planta esticada, ciclo que não fecha) e passa a operar com um número que dá para verificar e defender.

## Perguntas frequentes

### Como calculo o DLI a partir do PPFD do meu painel LED?
Use DLI = (PPFD × 3.600 × horas) ÷ 1.000.000. Um PPFD de 250 µmol·m⁻²·s⁻¹ durante 16 horas resulta em 14,4 mol·m⁻²·d⁻¹. A mesma fórmula invertida responde às outras duas perguntas: PPFD necessário = (DLI × 1.000.000) ÷ (3.600 × horas), e horas necessárias = (DLI × 1.000.000) ÷ (3.600 × PPFD).

### Qual o DLI ideal para alface hidropônica?
A faixa ótima é de 14 a 17 mol·m⁻²·d⁻¹, o que equivale a 243 a 295 µmol·m⁻²·s⁻¹ num fotoperíodo de 16 horas. Acima de 17 mol·m⁻²·d⁻¹ sustentado por vários dias, a pesquisa da Cornell aponta risco elevado de tipburn, mitigado por ventilação vertical dirigida ao ponto de crescimento.

### Qual o DLI para microverdes?
De 9 a 12 mol·m⁻²·d⁻¹ atendem bem, com mínimo funcional em torno de 6. Abaixo disso o ciclo de 7 a 14 dias produz plântulas estioladas e frágeis; muito acima, o consumo elétrico sobe sem ganho proporcional de biomassa num ciclo tão curto.

### Posso usar lux ou lúmen para calcular DLI?
Não de forma confiável. Lux pondera a luz pela sensibilidade do olho humano, com pico no verde-amarelo, exatamente a faixa que a planta menos aproveita. Qualquer conversão de lux para PPFD depende do espectro específico da fonte, então serve como estimativa grosseira apenas para o tipo de luminária em que o fator foi calibrado.

### Como medir PPFD sem comprar um quantômetro caro?
As alternativas são o aplicativo de celular com correção espectral (o Photone declara precisão da ordem de ±10% para LED branco com o acessório de difusão), a leitura do mapa de PPFD do datasheet do fabricante corrigida pela distância real, e sensores DIY com ESP32, que ficam na faixa de ±20% e servem para acompanhar tendência, não para calibrar.

### O fotoperíodo de 24 horas prejudica as plantas?
Depende da cultura. Alface e manjericão toleram fotoperíodos de 20 a 24 horas se o PPFD for moderado e o DLI total ficar na faixa; há estudo indicando melhora de qualidade foliar em manjericão sob luz contínua. Tomate, pimentão e morango exigem período escuro: o tomate desenvolve clorose intervenal sob luz contínua e o morango depende do dia curto para induzir floração.

### Meu LED diz "1.000 W equivalente", posso confiar?
Não. "Watt equivalente a HPS" não tem padrão de medição e é linguagem de marketing. Peça três números ao fornecedor: PPF em µmol/s, mapa de PPFD por distância e eficácia em µmol/J. O programa DLC Horticultural usa 2,3 µmol/J como piso de qualificação, e equipamentos atuais de boa qualidade superam 3,5 µmol/J.

### O DLI alvo muda se eu uso NFT, DFT ou aeroponia?
O alvo depende da espécie e da fase, não do sistema hidropônico. O que muda é o PPFD efetivo que chega ao canopy: em DFT e floating, a lâmina d'água exposta reflete uma parcela da luz de volta para as folhas inferiores, enquanto em NFT e aeroponia essa reflexão é menor. Na prática, meça sempre no canopy do seu sistema real em vez de aplicar tabela de outro arranjo.

### A eficiência da luminária muda o DLI que consigo?
Não muda o DLI que você pode atingir, muda quanto custa atingi-lo. Eficácia em µmol/J diz quantos fótons úteis saem por unidade de energia consumida: dois painéis podem entregar o mesmo DLI na bancada com contas de luz bem diferentes, e essa diferença se acumula todo mês ao longo da vida útil do equipamento.

### Preciso recalcular o DLI de tempos em tempos?
Sim. LEDs perdem saída luminosa com as horas de uso, poeira na lente reduz mais, e a altura do painel frequentemente muda conforme as plantas crescem. Refaça a medição a cada seis meses, e também na virada de estação se houver contribuição de luz natural, porque nesse caso o déficit a suplementar muda junto.
