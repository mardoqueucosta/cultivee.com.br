---
titulo: 'Iluminação LED para Plantas: Espectro, DLI e PPFD [2026]'
resumo: >-
  Iluminação LED para plantas exige acertar espectro, PPFD e DLI. Veja as faixas
  ideais por cultura, a razão R:B, o fotoperíodo e como dimensionar o painel.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-10'
dataModificacao: '2026-07-10'
leitura: '18 min'
tldr: >-
  Plantas não medem luz em watts nem em lúmens, e sim em fótons na faixa PAR: o
  PPFD (µmol/m²/s) é a intensidade instantânea e o DLI (mol/m²/dia) é o total
  diário que determina a colheita. Folhosas como alface pedem DLI de 12 a 17 com
  PPFD de 150 a 250 µmol/m²/s e fotoperíodo de 16 a 18 horas; frutos como tomate
  e morango pedem DLI de 17 a 30. Para folhosas, a razão vermelho:azul ideal fica
  entre 3:1 e 4:1, e o painel deve ser escolhido pela eficácia em µmol/J, não pelos watts.
imagens:
  - src: /blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd/medidor-par-de-mao-apontado-para-folha-de-alface-sob-il-1.jpg
    alt: 'Medidor PAR de mão apontado para folha de alface sob iluminação LED em cultivo indoor'
    caption: 'O sensor quântico mede os fótons que realmente chegam à folha, a métrica que o lúmen ignora.'
  - src: /blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd/painel-led-full-spectrum-suspenso-sobre-bancada-de-alfa-2.jpg
    alt: 'Painel LED full-spectrum suspenso sobre bancada de alface hidropônica em estufa brasileira'
    caption: 'A altura do painel muda o PPFD que chega à folha tanto quanto a potência escolhida.'
  - src: /blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd/alface-e-mudas-de-tomate-cultivadas-lado-a-lado-sob-luz-3.jpg
    alt: 'Alface e mudas de tomate cultivadas lado a lado sob luz LED rosada em fazenda vertical'
    caption: 'Folhosas e frutos convivem sob o mesmo painel, mas pedem receitas de luz diferentes.'
---
Plantas não medem luz em watts nem em lúmens. Elas contam fótons dentro de uma faixa específica do espectro, a radiação fotossinteticamente ativa, e o que decide quanto elas crescem é quantos desses fótons chegam à folha ao longo do dia. Escolher a iluminação LED errada é o erro mais caro de quem cultiva dentro de casa, numa estufa ou numa fazenda vertical: gasta-se energia iluminando aquilo que a planta não aproveita e paga-se a conta de luz sem colher biomassa proporcional. Este guia reúne o tripé técnico que governa qualquer cultivo sob LED, o espectro, o DLI e o fotoperíodo, com faixas por cultura ancoradas em estudos de 2019 a 2025, a conta de energia em reais e o cenário brasileiro de marcas, preços e pesquisa.

Antes de destrinchar cada conceito, vale fixar as três métricas que quase todo consumidor confunde. Guarde esta tabela, porque ela reaparece o guia inteiro.

| Métrica | Unidade | Para que serve |
| --- | --- | --- |
| PPFD | µmol/m²/s | Intensidade instantânea de fótons PAR que chega à planta |
| DLI | mol/m²/dia | Total diário acumulado, o melhor preditor de biomassa |
| Fotoperíodo | horas | Duração da luz, gatilho de florescimento ou fase vegetativa |

O dado-âncora que resume o tema: a alface iceberg em hidroponia atinge seu ótimo com DLI de 11,5 mol/m²/dia, o equivalente a 200 µmol/m²/s durante 16 horas, segundo o estudo de Gavhane et al. (2023). A partir dele, tudo o que vem abaixo ganha sentido prático.

## O que é iluminação LED para plantas e como ela enxerga a luz

Iluminação LED para plantas é o uso de diodos emissores de luz com espectro otimizado para a fotossíntese e para a morfogênese vegetal, em substituição parcial ou total à luz solar, dentro de estufas ou de ambientes totalmente controlados como fazendas verticais e plant factories. A sigla técnica para esse contexto é CEA, agricultura em ambiente controlado, e quase toda operação séria combina o LED com [hidroponia](/blog/o-que-e-hidroponia-guia-definitivo-vantagens-tipos-e-como-co), o cultivo sem solo em solução nutritiva.
*As plantas utilizam diferentes fotorreceptores para absorver faixas específicas do espectro de luz, como o vermelho e o azul pela clorofila, ativando a fotossíntese e a morfogênese.*

O ponto de partida é entender que a planta não enxerga a luz como o olho humano. A radiação fotossinteticamente ativa, chamada de PAR, é a faixa de 400 a 700 nanômetros que a clorofila e os carotenoides absorvem para produzir fotoassimilados. A pesquisa contemporânea ampliou essa janela para incluir o far-red, de 700 a 750 nanômetros, porque quando ele é somado ao vermelho o rendimento total da fotossíntese aumenta, um fenômeno conhecido como efeito Emerson descrito por Zhen e Bugbee (2020) e revisado por Lazzarin et al. (2024).

Dentro dessa faixa, a planta não usa uma única cor, e sim um conjunto de sensores químicos chamados fotorreceptores, cada um lendo uma parte do espectro e disparando uma resposta diferente. As clorofilas capturam sobretudo o vermelho e o azul para a fotossíntese. O fitocromo, que alterna entre as formas Pr e Pfr conforme recebe vermelho ou far-red, informa à planta se ela está no sol aberto ou sombreada e regula alongamento e florescimento. Os criptocromos e as fototropinas leem o azul e comandam a compactação da planta, a abertura dos estômatos e o direcionamento do crescimento. O UVR8 detecta o ultravioleta e aciona defesas e a produção de compostos como flavonoides. É esse conjunto que a receita de luz precisa alimentar, e não apenas a fotossíntese bruta.

Um mito que precisa cair já aqui é o de que o verde é desperdiçado. A curva de McCree, medida em 1972 e citada até hoje, mostra que a eficiência fotônica relativa é de cerca de 85% a 100% no vermelho de 600 a 680 nanômetros, de 60% a 75% no azul de 430 a 460 nanômetros e ainda de 70% a 85% no verde de 520 a 580 nanômetros. Ou seja, o verde é absorvido de verdade, e como ele penetra mais fundo no dossel do que o vermelho e o azul, ativa a fotossíntese nas folhas internas. Por isso as luminárias modernas de plant factory usam branco somado a vermelho e far-red, em vez do velho rosa puro de vermelho mais azul.

## Lúmen, PAR e PPFD: o erro que faz o consumidor comprar a lâmpada errada

O erro clássico de quem começa é comprar luz para planta olhando lúmens, watts ou temperatura de cor em Kelvin. Nenhuma dessas três métricas descreve o que a planta usa. O lúmen é uma unidade fotométrica calibrada para a sensibilidade do olho humano, cujo pico está em torno de 555 nanômetros, no verde. Ele penaliza justamente o vermelho e o azul, que são as faixas mais fotossinteticamente ativas, então uma lâmpada de muitos lúmens pode entregar pouquíssima luz útil para a folha.
![Medidor PAR de mão apontado para folha de alface sob iluminação LED em cultivo indoor](/blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd/medidor-par-de-mao-apontado-para-folha-de-alface-sob-il-1.jpg)
*O sensor quântico mede os fótons que realmente chegam à folha, a métrica que o lúmen ignora.*

A métrica correta é o PPFD, sigla para densidade de fluxo de fótons fotossintéticos, medida em µmol/m²/s. Ela conta quantos fótons na faixa PAR chegam a cada metro quadrado por segundo, que é exatamente o que a fotossíntese consome. Uma lâmpada residencial de 1.000 lúmens pode entregar 5 ou 50 µmol/m²/s dependendo do espectro: o lúmen é métrica de visão, o PPFD é métrica de planta. Para produzir biomassa em folhosas, o piso prático é ficar acima de 150 µmol/m²/s.

Isso tem consequência direta no bolso. Medir luz de planta com um luxímetro barato subestima o vermelho e o azul, e escolher painel por Kelvin não diz nada sobre a proporção de cores nem sobre quantos fótons PAR a peça realmente emite. Se você quer monitorar o ambiente do cultivo de forma confiável, o caminho é usar um medidor PAR dedicado ou integrar [sensores agrícolas para acompanhar luz, temperatura e umidade](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen), assunto que tratamos em detalhe no guia de sensoriamento. Mais adiante mostro como aproximar o PPFD a partir de um luxímetro comum quando não há orçamento para um sensor quântico.

## PPFD e DLI: a fórmula que prevê a sua colheita

O DLI, sigla para integral diária de luz, é a soma de todos os fótons PAR que atingem a planta ao longo do dia, expressa em mol/m²/dia, e é o melhor preditor isolado da biomassa que você vai colher. Ele conecta os dois números que você controla, a intensidade e o tempo, em uma única conta que vale a pena memorizar:

`DLI = PPFD × horas de luz × 3600 ÷ 1.000.000`

O exemplo prático fecha o raciocínio. Uma alface a 200 µmol/m²/s durante 16 horas recebe `200 × 16 × 3600 ÷ 1.000.000`, que resulta em 11,52 mol/m²/dia, precisamente o ótimo medido para alface iceberg por [Gavhane et al. (2023)](https://www.nature.com/articles/s41598-023-36997-2). Muda a intensidade ou o número de horas e o DLI muda junto, o que dá ao produtor duas alavancas para chegar ao alvo de cada cultura. A tabela abaixo consolida as faixas que a literatura recente aponta.

| Cultura | DLI ótimo (mol/m²/dia) | PPFD (µmol/m²/s) | Fotoperíodo (h) | Fonte |
| --- | --- | --- | --- | --- |
| Alface folhosa e baby-leaf | 12 a 17 | 150 a 250 | 16 a 18 | Pennisi 2019; Gavhane 2023 |
| Alface iceberg | 11,5 | 200 | 16 | Gavhane et al. 2023 |
| Alface romana | cerca de 17 | 300 | 16 | Indoor Production studies |
| Manjericão | 12 a 18 | 200 a 300 | 16 a 18 | Carotti 2023; Dou e Niu 2022 |
| Tomate adulto em estufa | 22 a 30 | 400 a 600 | 16 a 18 | Hort Americas |
| Morango Albion | 17 a 25 | 300 a 450 | 16 | Park et al. 2023 |
| Pimentão | 20 a 30 | 400 a 500 | 16 a 18 | Hort Americas |
| Microverdes de brássicas | 7 a 12 | 100 a 210 | 12 a 16 | Xu 2024; Casadesús 2025 |
| Pak choi | 12 a 17 | 200 a 250 | 16 a 20 | Frontiers 2025 |

A leitura da tabela revela um padrão: folhosas e microverdes vivem confortáveis com DLI baixo a médio, enquanto frutos como tomate, morango e pimentão exigem quase o dobro de luz acumulada. Serviços de extensão como a Purdue e a Hort Americas usam essas mesmas faixas como referência de planejamento de estufa, o que dá segurança para transportá-las ao Brasil.

Um cuidado que quase nenhum guia brasileiro menciona é a saturação. Aumentar o PPFD indefinidamente não aumenta a colheita na mesma proporção. Acima de aproximadamente 600 µmol/m²/s em folhosas, o ganho marginal despenca e sobe o risco de fotoinibição, um mecanismo de proteção chamado dissipação não fotoquímica pelo qual a planta joga fora como calor a energia que não consegue processar. Passar desse ponto é pagar mais energia para colher quase o mesmo, ou até menos. Existe um DLI mínimo, abaixo do qual a planta estiola, um DLI ótimo, onde a relação entre luz e colheita é melhor, e um teto de saturação que não vale a pena cruzar.

## Espectro e razão R:B: o que cada cor faz na planta

A razão R:B, proporção entre luz vermelha e luz azul, é o parâmetro de espectro que mais afeta a forma e o rendimento de folhosas, e o consenso da literatura é claro para esse grupo. A tabela reúne as recomendações por cultura ancoradas em estudos recentes.

| Cultura | Razão R:B recomendada | Observação | Fonte |
| --- | --- | --- | --- |
| Alface folhosa | 3:1 a 4:1 | Dobra o rendimento frente a R:B 0,5; vermelho puro estiola | Pennisi 2019 |
| Alface roxa | 2:1 a 3:1 com UV-A | UV-A pré-colheita eleva antocianinas sem perder massa | Liu et al. 2023 |
| Manjericão | cerca de 3:1 | Azul acima de 30% reduz massa mas eleva óleos essenciais | Dou e Niu 2022 |
| Tomate em estufa | vermelho e azul com 10% a 20% de azul e 5% a 10% de far-red | Azul regula a forma; far-red eleva matéria seca | Wang 2024; Ji 2025 |
| Receita genérica de plant factory | 70% vermelho, 10% a 20% azul, até 10% verde, até 10% far-red | Consenso de referência para folhosas | Hort Americas |

O número mais citável vem de [Pennisi et al. (2019)](https://www.nature.com/articles/s41598-019-50783-z): uma razão R:B de 3:1 chega a dobrar o rendimento da alface em relação a uma razão de 0,5. O azul não pode faltar, porque abaixo de 10% a 20% do total a planta perde a compactação e estica de forma indesejada, mas azul em excesso reduz a biomassa. O vermelho é o motor de eficiência fotossintética, com pico perto de 660 nanômetros, e por isso domina as receitas de folhosas.

Duas fronteiras dão o toque premium ao espectro. A primeira é o far-red, de 700 a 750 nanômetros, que através do efeito Emerson soma rendimento ao vermelho e ainda funciona como sinal de florescimento em plantas de dia longo, como mostra a [revisão de Lazzarin et al. (2024)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11897601/). A segunda é o ultravioleta A, aplicado em dose baixa nas 24 a 48 horas que antecedem a colheita, de 20 a 30 µmol/m²/s, que aumenta antocianinas e compostos fenólicos e intensifica a cor e o aroma, conforme [Liu et al. (2023)](https://journals.ashs.org/hortsci/view/journals/hortsci/58/5/article-p525.xml) demonstraram em alface. É a ideia de usar a luz não só para crescer, mas para melhorar sabor e valor nutricional, ângulo que a alface roxa e o manjericão exploram bem.

## Fotoperíodo: dia-curto, dia-longo e dia-neutro na prática

Fotoperíodo é a duração diária de luz, e a botânica clássica de Garner e Allard, de 1920 e ainda válida, classifica as plantas pela duração da noite que dispara o florescimento. Entender essa categoria evita que você induza flor na hora errada ou perca uma cultura por bolting, a subida precoce do pendão floral. A tabela organiza os três grupos com exemplos de hortaliças e frutíferas.

| Categoria | Como floresce | Exemplos comerciais |
| --- | --- | --- |
| Dia-curto | Floresce quando a noite passa de um limiar | Soja, crisântemo, morango June-bearing |
| Dia-longo | Floresce quando a noite fica abaixo de um limiar | Espinafre, morango Albion, rabanete, alguns cultivares de alface |
| Dia-neutro | Floresce por idade e temperatura, indiferente à luz | Tomate, pimentão, pepino, morango San Andreas, a maioria das alfaces |

Na fase vegetativa de folhosas, ervas e microverdes, o fotoperíodo é gerencial, e não um gatilho de flor. Alface e manjericão respondem bem a 16 a 18 horas de luz. Mas há um teto: passar de 18 horas em alface eleva o risco de tipburn, a necrose de bordo causada por transporte deficiente de cálcio quando a planta cresce rápido demais. O manjericão é mais tolerante e aguenta até 24 horas de luz sem perder massa, ganhando aroma, como observaram Dou e Niu (2022). Já para frutificar, o escuro é obrigatório: o tomate precisa de pelo menos 6 horas contínuas de noite, e o morango Albion, de dia longo, chega a triplicar a produção quando o fotoperíodo sobe de 12 para 16 horas, segundo [Park et al. (2023)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9965992/).

Controlar isso com precisão é onde a automação entra. Um timer de tomada resolve o básico, mas quem quer transições suaves de amanhecer e anoitecer, que reduzem o estresse em alface e morango, ou quer ajustar o fotoperíodo por estágio, ganha muito com um controle programável. A base para montar esse tipo de acionamento está no nosso guia de [automação de fotoperíodo com Arduino e ESP32](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen), que mostra como comandar relés e timers a partir de um microcontrolador barato.

## LED contra HPS: eficácia, calor e custo

A métrica que separa uma boa fonte de luz de uma ruim é a eficácia fotônica, medida em µmol/J, ou seja, quantos fótons PAR a peça produz por joule de energia consumida. É por ela, e não por watts, que se compara qualquer tecnologia. A tabela põe LED e as fontes legadas lado a lado.

| Tecnologia | Eficácia (µmol/J) | Uso típico |
| --- | --- | --- |
| Chip vermelho 660 nm dedicado, ponta 2024 | até 3,8 | Referência de máximo teórico |
| LED SMD tipo Samsung LM301H | 2,7 a 3,2 | Padrão de painéis quantum-board |
| Painel quantum-board full-spectrum | 2,5 a 3,0 | Cultivo geral de folhosas, ervas e frutos |
| Barra LED inter-canopy | 2,8 a 3,2 | Penetração de dossel em tomate e pepino |
| LED COB | 1,8 a 2,5 | Hobby, cobertura uniforme e barato |
| LED rosa puro vermelho mais azul | 2,3 a 2,8 | Plant factory antiga, estiola alguns cultivares |
| HPS, sódio de alta pressão | cerca de 1,7 | Estufas legadas, muito calor |
| Fluorescente T5 | 0,9 a 1,2 | Mudas e microverdes legados |

A conta é direta: um bom painel LED entrega mais que o dobro de fótons por joule do que uma lâmpada HPS, e as luminárias comerciais top de linha já chegam de 2,8 a 3,5 µmol/J, segundo o [benchmark publicado pela Springer (2024)](https://link.springer.com/article/10.1007/s44279-024-00137-9). Isso significa menos energia para o mesmo DLI. O outro fator decisivo é o calor. Cerca de 50% a 70% da energia elétrica de um LED vira calor, contra 80% a 90% de um HPS, o que reduz a carga térmica do ambiente. Ainda assim, em cultivo fechado, cada 1 kW de LED demanda de 0,3 a 0,5 kW extra de refrigeração, então o painel moderno vem com dissipador robusto e ventilador. Fugir de painéis sem ventilação é regra para uso comercial. É esse par de luz e calor que empurrou a substituição gradual do HPS pelo LED nas estufas brasileiras, movida também pela tarifa de energia.

## Como escolher e dimensionar um painel LED no Brasil

Escolher um painel começa por ignorar o watt elétrico da embalagem e olhar a eficácia em µmol/J e o mapa de PPFD que o fabricante sério publica. Dois painéis de 200 watts podem entregar PPFD muito diferentes: um de 3,0 µmol/J produz 50% mais fótons que outro de 2,0 µmol/J consumindo a mesma energia. Depois vem o tipo de peça. Para folhosas e ervas em casa, um painel quantum-board full-spectrum resolve; para tomate e pepino altos em estufa, barras inter-canopy penetram o dossel; e placas COB baratas servem para hobby de baixa exigência.
![Painel LED full-spectrum suspenso sobre bancada de alface hidropônica em estufa brasileira](/blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd/painel-led-full-spectrum-suspenso-sobre-bancada-de-alfa-2.jpg)
*A altura do painel muda o PPFD que chega à folha tanto quanto a potência escolhida.*

O dimensionamento parte do DLI-alvo da cultura e da área a cobrir. Como referência de planejamento, iluminar 1 metro quadrado de alface até um DLI produtivo de 14 mol/m²/dia com um painel de 2,8 µmol/J pede na ordem de 150 watts de LED eficiente. Para uma horta doméstica, um painel de 100 a 150 watts cobre uma área de 40 a 60 centímetros de lado com PPFD adequado a folhosas. A distância entre painel e planta segue o mapa de PPFD, mas como heurística inicial use de 30 a 45 centímetros para painéis de 100 a 150 watts em fase vegetativa, de 45 a 60 centímetros para 240 a 320 watts, e de 60 a 90 centímetros para 600 watts ou mais.

No mercado brasileiro, os painéis mais encontrados são das linhas Mars Hydro, como a TS-1000, a TS-2000 e a FC-3000, e Spider Farmer, como a SF-1000 e a SF-2000, importadas e revendidas por lojas nacionais. Entre marcas e distribuidores que atuam no país aparecem Indoor Garden, BAVA, Leds Indoor, Growbacana, GreenPower Cultivo e Planet Iluminação. A faixa de preço varia muito conforme a potência e o câmbio, e o comprador atento evita as lâmpadas de rosca E27 anunciadas como grow em marketplace, que costumam entregar menos de 1,0 µmol/J, longe dos 2,5 a 3,5 dos painéis dedicados. Vale lembrar que a luz não substitui a nutrição: por melhor que seja o painel, a produtividade depende de uma [solução nutritiva bem calibrada](/blog/solucao-nutritiva-para-hidroponia-guia-completo-calculadora) e de um bom sistema de raiz.

Para quem não tem orçamento de um sensor quântico profissional, que custa de R$ 2 mil a R$ 6 mil em modelos como o Apogee MQ-500 ou o Li-Cor LI-190R, há um atalho. Um luxímetro comum, de R$ 80 a R$ 200, permite estimar o PPFD multiplicando a leitura em lux por um fator de correção que depende da fonte: cerca de 0,015 para LED full-spectrum, 0,019 para luz solar, 0,013 para HPS e 0,015 para fluorescente T5. Aplicativos de celular como o Photone também aproximam o valor, com erro em torno de 20%. É impreciso para especificação de engenharia, mas suficiente para o hobbysta conferir se a bancada está na faixa certa.

## Quanto custa manter o LED ligado: a conta em reais

O custo de operar iluminação LED é dominado pela conta de energia, e ela se calcula em três passos simples: potência do painel, horas por dia e tarifa de kWh. Um painel de 150 watts ligado 16 horas por dia durante 30 dias consome `150 × 16 × 30`, o que dá 72 kWh por mês. A uma tarifa urbana de cerca de R$ 0,90 por kWh, isso representa aproximadamente R$ 65 mensais para iluminar cerca de 1 metro quadrado de folhosas. É um valor que cabe no bolso de uma horta caseira e que escala de forma previsível com a área.

A eficácia do painel muda essa conta de forma concreta. A tabela compara dois painéis que entregam o mesmo DLI de 14 mol/m²/dia sobre 1 metro quadrado de alface, um eficiente e um de entrada.

| Painel | Eficácia | Potência para o mesmo DLI | Consumo mensal | Custo a R$ 0,85/kWh |
| --- | --- | --- | --- | --- |
| Eficiente | 2,8 µmol/J | cerca de 150 W | cerca de 72 kWh | cerca de R$ 61 |
| Entrada de gama | 2,0 µmol/J | cerca de 210 W | cerca de 101 kWh | cerca de R$ 86 |

A diferença de R$ 25 por mês por metro quadrado parece pequena, mas multiplicada pela área de uma operação comercial e pelos anos de vida útil do painel, ela paga com folga o preço mais alto da peça eficiente. No campo, a tarifa rural média em 2025 ficou em torno de R$ 0,80 a R$ 0,90 por kWh com bandeira verde, e há um detalhe que pode reduzir bastante o custo: a Resolução Normativa ANEEL 1000/2021 concede desconto de 60% na baixa tensão e de 70% na alta tensão para consumo entre 21h30 e 6h na atividade de irrigação e aquicultura. Cultivo em ambiente controlado pode se enquadrar dependendo da interpretação da concessionária, o que favorece operar o LED à noite. É por isso que a integração com energia solar e baterias, operando o fotoperíodo no horário de tarifa reduzida, é uma tendência forte no setor.

## Receitas de luz por cultura: da alface ao tomate

Reunir os parâmetros em receitas curtas por cultura ajuda a sair da teoria e montar o cultivo. Cada linha combina o PPFD-alvo, o fotoperíodo e o DLI resultante, com a nota de espectro que faz diferença naquela planta.
![Alface e mudas de tomate cultivadas lado a lado sob luz LED rosada em fazenda vertical](/blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd/alface-e-mudas-de-tomate-cultivadas-lado-a-lado-sob-luz-3.jpg)
*Folhosas e frutos convivem sob o mesmo painel, mas pedem receitas de luz diferentes.*

| Cultura | PPFD-alvo | Fotoperíodo | DLI resultante | Nota de espectro |
| --- | --- | --- | --- | --- |
| Alface baby-leaf | 180 a 220 µmol/m²/s | 16 h | cerca de 11 a 13 mol | R:B de 3:1 a 4:1, branco para uniformidade |
| Manjericão | 250 µmol/m²/s | 16 a 18 h | cerca de 14 a 16 mol | R:B perto de 3:1, azul eleva óleos essenciais |
| Microverdes | 150 µmol/m²/s | 12 a 16 h | cerca de 6,5 a 8,6 mol | Intensidade moderada, azul para antioxidantes |
| Morango Albion | 300 a 400 µmol/m²/s | 16 h | cerca de 17 a 23 mol | Far-red como sinal de indução floral |
| Tomate cereja | 400 a 500 µmol/m²/s | 16 h com escuro | cerca de 23 a 29 mol | Vermelho e azul com far-red, nunca 24 h |

Na alface, a receita clássica de vermelho dominante com azul suficiente entrega folha compacta e sabor equilibrado, e todo o passo a passo de cultivo está no [guia completo de alface hidropônica](/blog/guia-completo-de-alface-hidroponica-do-plantio-caseiro-a-pro). No manjericão, subir levemente o azul concentra aroma, motivo pelo qual essa erva rende tão bem sob luz, tema aprofundado no guia de [como plantar manjericão em vaso e hidroponia](/blog/como-plantar-manjericao-guia-completo-em-vaso-e-hidroponia). Os microverdes são a cultura mais generosa com luz modesta e ciclo curto, e quem quer começar por eles encontra o caminho em [como iniciar cultivo de microverdes em casa](/blog/como-iniciar-cultivo-microverdes-em-casa). Já morango e tomate elevam a exigência de DLI e de espaço, e o cultivo detalhado do fruto está no [guia de tomate hidropônico](/blog/como-plantar-tomate-hidroponico-guia-do-iniciante-ao-produto). Em folhosas conduzidas em calha, vale casar a luz com o dimensionamento do [sistema NFT de hidroponia](/blog/sistema-nft-de-hidroponia-o-que-e-como-funciona-e-como-dimen), que define a vazão e o espaçamento das plantas.

## Os erros mais comuns na iluminação LED de plantas

O primeiro e mais frequente erro é comprar o painel pela potência elétrica, o watt, quando o que importa é a eficácia em µmol/J. Um chip vermelho de 660 nanômetros de alta qualidade entrega cerca de 3,8 µmol/J, enquanto uma lâmpada de marketplace vendida como grow pode ficar abaixo de 1,0, ou seja, quase quatro vezes menos luz útil pela mesma energia. O segundo erro é medir a luz com luxímetro sem correção, o que subestima o vermelho e o azul e leva a decisões erradas de altura e intensidade. O terceiro é escolher painel por temperatura de cor em Kelvin, uma métrica que descreve apenas a aparência visual do branco e nada informa sobre a proporção de cores ou sobre os fótons PAR emitidos.

Há ainda armadilhas de espectro e de manejo. Insistir no LED rosa puro, só vermelho e azul, sem branco nem verde, estiola alguns cultivares e ignora que o verde penetra o dossel; as receitas modernas incluem branco e uma fração de far-red. Manter o LED 24 horas por dia em todas as culturas é outro engano: tomate, pimentão e morango precisam de escuro, e a alface, embora tolere fotoperíodos longos, corre risco de tipburn acima de 18 horas. Ignorar a saturação e a fotoinibição acima de 600 µmol/m²/s em folhosas é desperdiçar energia sem ganho de colheita. Por fim, negligenciar a uniformidade é um erro silencioso: o PPFD no centro da bancada pode ser 400 e nas bordas 150, e sem mapear isso com sensor a planta da borda cresce menos. Vale reforçar que luz não corrige nutrição, então acertar o painel sem acertar a [solução nutritiva e o preparo passo a passo](/blog/como-preparar-solucao-nutritiva-passo-a-passo-tabelas-para-1) apenas transfere o gargalo de lugar.

## A pesquisa brasileira em LED para plantas

O Brasil já produz ciência aplicada em iluminação de plantas, ainda que boa parte esteja em literatura técnica e não em papers indexados. A Embrapa Hortaliças, em Brasília, mantém um Laboratório de Agricultura em Ambiente Controlado montado em cerca de 90 metros quadrados de contêineres acoplados, com painéis de LED, e desenvolve desde 2020 modelos de produção para alface, rúcula, tomate, morango, pimentão, ervas e microverdes, como registra a própria [Embrapa](https://www.embrapa.br/en/busca-de-noticias/-/noticia/56018612/pesquisa-desenvolve-modelos-para-producao-de-hortalicas-em-fazendas-verticais). Na ESALQ-USP, em Piracicaba, a professora Simone Mello e o grupo GEPOL pesquisam iluminação suplementar em estufa tropical, com relatos de ganho de 15% a 30% no rendimento de alface usando uma receita de 80% de vermelho e 20% de azul, trabalho descrito no [perfil da pesquisadora no LPV](http://www.lpv.esalq.usp.br/equipe/simone-da-costa-mello).

O ecossistema se completa com o IAC de Campinas, onde Pedro Roberto Furlani consolidou a solução nutritiva de referência nacional, e a UFLA de Lavras, com forte tradição em fisiologia vegetal e hidroponia. No lado comercial, fazendas verticais como Pink Farms, BeGreen e Fazenda Cubo já operam com LED em escala urbana, um panorama que detalhamos no guia de [vertical farming no Brasil](/blog/vertical-farming-no-brasil-cases-pink-farms-be-green-mighty). Eventos como a HORTITEC, em Holambra, reúnem o setor de cultivo protegido e são a melhor vitrine para conhecer fornecedores de iluminação e conversar com quem já produz sob LED no país.

## Tendências da iluminação LED para 2026 e além

A fronteira mais concreta é a eficiência. As luminárias comerciais top de linha caminham dos atuais 2,8 a 3,5 µmol/J rumo a 4,0 µmol/J entre 2026 e 2028, o que reduz o custo energético operacional em 15% a 30% e melhora a viabilidade de cultivo indoor. Em paralelo, o mercado global de iluminação horticultural, avaliado entre 7 e 10 bilhões de dólares em 2025, cresce a uma taxa anual composta de 12% a 18% segundo consultorias como a [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/horticulture-lighting-market), com o LED respondendo pela ampla maioria desse valor.

Do lado da técnica, três movimentos ganham tração. O espectro dinâmico, em que o driver muda a proporção de vermelho, azul, far-red e ultravioleta ao longo do dia ou do ciclo, sai do laboratório para produtos comerciais. O ultravioleta A de fim de produção, aplicado nas horas finais antes da colheita, vira ferramenta de marketing nutricional em microverdes premium e alface roxa. E a integração de LED com sensores e inteligência artificial permite ajustar o PPFD em tempo real conforme a resposta da planta, aproximando a fazenda vertical de um sistema autorregulado. Some-se a isso a hibridização de estufas que trocam HPS por LED e a operação casada com energia solar no horário de tarifa reduzida, e fica claro que a próxima década será menos sobre acender mais luz e mais sobre acender a luz certa, na hora certa, ao menor custo.

## Perguntas frequentes

### Lâmpada de LED comum branca serve para plantas?
Não para resultados sérios. Lâmpadas residenciais são otimizadas para a visão humana, medidas em lúmens com pico no verde, e entregam poucos fótons na faixa PAR útil. Servem no máximo para manter viva uma planta de baixa exigência, como jiboia ou espada-de-são-jorge. Para produzir biomassa em hidroponia ou cultivo indoor, use um painel LED full-spectrum dedicado, com PPFD acima de 150 µmol/m²/s.

### Qual a diferença entre lúmen e PPFD?
O lúmen mede a luz ponderada pela sensibilidade do olho humano, com pico no verde a 555 nanômetros, e é útil para iluminação de ambiente. O PPFD, em µmol/m²/s, mede o número de fótons na faixa PAR de 400 a 700 nanômetros que chega à planta por segundo, e é a métrica correta para fotossíntese. Uma mesma quantidade de lúmens pode corresponder a PPFD muito diferentes conforme o espectro.

### O que é DLI e como calculo?
DLI é a integral diária de luz, a quantidade total de fótons PAR que atinge a planta em 24 horas, expressa em mol/m²/dia. A fórmula é o PPFD multiplicado pelas horas de luz, por 3600, dividido por 1.000.000. Por exemplo, 200 µmol/m²/s por 16 horas resultam em 11,52 mol/m²/dia. Folhosas pedem DLI de 12 a 17, tomate e morango de 17 a 30, e microverdes de 7 a 12.

### Quantas horas de luz a alface precisa por dia?
A alface é planta de dia-neutro, então o fotoperíodo não dispara florescimento e vira uma decisão de manejo. Para cultivo indoor, 16 a 18 horas entregam DLI de 12 a 17 mol/m²/dia com PPFD de 200 a 300 µmol/m²/s, a combinação ótima medida em alface iceberg por Gavhane et al. (2023). Acima de 18 horas cresce o risco de tipburn, a necrose de bordo por transporte deficiente de cálcio.

### Posso deixar o LED 24 horas ligado nas plantas?
Depende da espécie. O manjericão tolera 24 horas sem perda de massa e ainda ganha aroma, segundo Dou e Niu (2022). A alface tolera fotoperíodos longos, mas com risco crescente de tipburn acima de 20 horas. Já tomate, pimentão e morango precisam de pelo menos 6 horas de escuro para acumular açúcares, equilibrar hormônios e induzir a floração de forma correta.

### Qual a razão vermelho:azul ideal para folhosas?
O consenso da literatura é de 3:1 a 4:1, ou seja, 75% a 80% de vermelho a 660 nanômetros e 20% a 25% de azul a 450 nanômetros. Pennisi et al. (2019) mostraram que essa razão chega a dobrar o rendimento da alface frente a uma razão de 0,5. Receitas modernas ainda somam 5% a 10% de far-red pelo efeito Emerson e uma fração de verde ou branco para uniformidade.

### Watts elétricos são uma boa medida de potência de LED grow?
Não. O que importa é a eficácia fotônica em µmol/J, quantos fótons PAR a peça produz por joule consumido. Em 2024 a 2026, painéis premium chegam a 2,8 a 3,5 µmol/J, enquanto a entrada de gama fica em 1,8 a 2,3. Dois painéis de mesma potência elétrica podem entregar PPFD muito diferentes, então comparar por watt engana.

### Como medir PPFD sem um sensor PAR profissional?
Use um luxímetro comum, de R$ 80 a R$ 200, e converta a leitura multiplicando o lux por um fator de correção conforme a fonte: cerca de 0,015 para LED full-spectrum, 0,019 para luz solar e 0,013 para HPS. Aplicativos de celular como o Photone também aproximam o valor, com erro em torno de 20%. Para especificação profissional, invista em um sensor quântico como Apogee MQ-500 ou Li-Cor LI-190R, de R$ 2 mil a R$ 6 mil.

### O LED grow gera muito calor?
Sim, mas bem menos que o HPS. Cerca de 50% a 70% da energia elétrica do LED vira calor, contra 80% a 90% do HPS, dissipado pelo corpo de alumínio. Em cultivo fechado, cada 1 kW de LED demanda de 0,3 a 0,5 kW extra de refrigeração, então painéis comerciais sérios têm dissipador grande e ventilador. Não compre painel sem ventilação para uso profissional.

### Vale a pena LED grow para horta em apartamento?
Sim, especialmente para microverdes, alface baby-leaf e ervas como manjericão e salsa. Um painel de 100 a 150 watts cobre uma área de 40 a 60 centímetros de lado com PPFD adequado a folhosas, consumindo cerca de 72 kWh por mês, o que dá em torno de R$ 65 na tarifa urbana. Todo o raciocínio de luz, vaso e substrato está no nosso [guia de horta em apartamento](/blog/guia-definitivo-de-horta-em-apartamento-luz-vasos-substrato).
