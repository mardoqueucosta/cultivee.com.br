---
titulo: 'Conversor pH, EC, PPM e TDS para Hidroponia [2026]'
resumo: >-
  Conversor EC PPM hidroponia com as 3 escalas (500/640/700), tabela completa
  de conversão, correção por temperatura e faixas de EC por cultura.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-20'
dataModificacao: '2026-07-20'
leitura: '16 min'
tldr: >-
  EC mede a condutividade elétrica da solução em mS/cm (idêntico a dS/m). PPM e
  TDS não são medidos: o aparelho calcula multiplicando a EC por um fator, e
  existem três fatores em uso no mercado (0,5 na escala NaCl 500, 0,64 na escala
  442/640 e 0,7 na escala KCl 700). Por isso EC 1,8 mS/cm aparece como 900 ppm
  em um medidor Hanna e 1.260 ppm em um Bluelab, sem que nenhum dos dois esteja
  errado. Receita em PPM sem informar a escala é receita incompleta.
imagens:
  - src: /blog/conversor-phecppmtds-para-hidroponia/caneta-digital-medindo-condutividade-eletrica-em-reserv-1.jpg
    alt: 'Caneta digital medindo condutividade elétrica em reservatório de solução nutritiva para hidroponia'
    caption: 'A leitura de EC é universal, enquanto o valor em PPM depende da escala configurada no aparelho'
  - src: /blog/conversor-phecppmtds-para-hidroponia/medicao-da-condutividade-eletrica-da-agua-pura-antes-do-2.jpg
    alt: 'Medição da condutividade elétrica da água pura antes do preparo da solução nutritiva de hidroponia'
    caption: 'Medir a água de origem antes de adicionar qualquer sal evita erro de concentração na solução final'
  - src: /blog/conversor-phecppmtds-para-hidroponia/reservatorio-de-solucao-nutritiva-em-estufa-de-hidropon-3.jpg
    alt: 'Reservatório de solução nutritiva em estufa de hidroponia com bomba de recirculação e raízes de alface'
    caption: 'Em dias quentes a evaporação concentra a solução e a EC sobe, exigindo reposição com água pura'
---
Se você já colocou duas canetas na mesma caixa d'água e leu 900 em uma e 1.260 na outra, o problema quase nunca é aparelho quebrado. É escala de conversão. Este artigo resolve a confusão de unidades que faz o produtor brasileiro errar leitura e errar dose, com a tabela de conversão pronta para consulta, exemplos resolvidos passo a passo e o que fazer quando a própria água de origem já chega carregada de sal.

## O que EC, TDS e PPM medem de fato

**Condutividade elétrica (EC) é a capacidade de uma solução conduzir corrente elétrica, e em hidroponia serve como medida indireta da concentração total de sais dissolvidos.** Quanto mais íons livres na água (NO₃⁻, K⁺, Ca²⁺, SO₄²⁻), maior a corrente que passa entre os eletrodos e maior a leitura.

A EC é expressa em três unidades que descrevem a mesma coisa:

| Unidade | Equivalência | Uso típico |
| --- | --- | --- |
| mS/cm (milisiemens por centímetro) | 1 mS/cm | Canetas de hidroponia |
| dS/m (decisiemens por metro) | 1 dS/m = 1 mS/cm | Literatura agronômica e SciELO |
| µS/cm (microsiemens por centímetro) | 1.000 µS/cm = 1 mS/cm | Água potável, laboratório |

Ou seja: quando um artigo científico diz "EC de 1,5 dS/m" e sua caneta mostra "1,5 mS/cm", os dois falam exatamente o mesmo número. Não há conversão a fazer. A metodologia de referência para essa medição é a [APHA Standard Methods 2510-B](https://www.standardmethods.org/doi/10.2105/SMWW.2882.027), complementada pela [ISO 7888:1985](https://www.iso.org/standard/14838.html) e, no Brasil, pela ABNT NBR 14340, que trata da determinação de condutividade e resistividade elétrica em água.

**TDS (Total Dissolved Solids) é a massa total de sólidos dissolvidos em um litro, expressa em mg/L**, o que em água doce equivale numericamente a ppm (partes por milhão). Aqui mora o ponto que quase ninguém explica: o método oficial de TDS, o APHA 2540C, mede evaporando a amostra a 180 °C e pesando o resíduo em balança analítica. Nenhuma caneta faz isso.

O que a caneta faz é medir EC e multiplicar por um fator. O número em ppm que aparece no visor é, portanto, uma **estimativa derivada**, não uma pesagem. E como o fator escolhido varia de fabricante para fabricante, nasce o problema central deste artigo.

O **pH**, por sua vez, é o logaritmo negativo da atividade do íon H⁺. Ele não mede quantidade de nutriente nenhuma: define se o nutriente que está lá fica disponível para a raiz absorver. Abaixo de 5,5, ferro e manganês ficam excessivamente solúveis; acima de 6,5, cálcio, fósforo e ferro tendem a precipitar e saem de solução.

Resumindo em uma frase: EC mede a força total da solução, PPM estima a massa de sais a partir da EC (e depende da escala), pH decide se aquilo tudo entra na planta.

## As três escalas de PPM que existem no mercado

Não existe uma escala de PPM. Existem três, cada uma calibrada contra um sal-padrão diferente, e todas legítimas.

| Escala | Fator (a partir de mS/cm) | Sal de referência | Fabricantes típicos | Onde domina |
| --- | --- | --- | --- | --- |
| **500 (NaCl)** | ppm = EC × 500 | Cloreto de sódio puro | Hanna, HM Digital, TDS-EZ | EUA e Brasil |
| **640 (442)** | ppm = EC × 640 | Mistura 40% Na₂SO₄, 40% NaHCO₃, 20% NaCl | Myron L, Eutech | Europa, indústria de água |
| **700 (KCl)** | ppm = EC × 700 | Cloreto de potássio | Bluelab, Truncheon | Reino Unido, Austrália, Nova Zelândia |

O nome da escala é literalmente o multiplicador quando a EC está em mS/cm. Se a sua leitura estiver em µS/cm, o fator vira 0,5, 0,64 ou 0,7.

O efeito prático é brutal. A mesma solução, com EC de 1,8 mS/cm, aparece como:

- **900 ppm** em escala 500
- **1.152 ppm** em escala 640
- **1.260 ppm** em escala 700

São 40% de diferença entre o menor e o maior número, para uma água rigorosamente idêntica. A própria [Bluelab, em sua documentação técnica](https://support.bluelab.com/hc/en-us/articles/205237090), recomenda que o produtor trabalhe em EC justamente para escapar dessa ambiguidade. A [Hanna Instruments](https://hannainst.com/hi98192-waterproof-portable-ec-tds-resistivity-salinity-meter.html) segue caminho parecido em equipamentos de bancada, onde o fator EC/TDS é configurável entre 0,40 e 1,00 pelo usuário, ou seja, o próprio fabricante admite que o número de PPM é uma convenção ajustável.

A conclusão operacional é direta e vale como regra de bolso: **receita em PPM que não informa a escala é receita incompleta.** Se um vídeo, uma apostila ou um vendedor te passar "mantenha 1.400 ppm" sem dizer 500, 640 ou 700, você tem uma faixa de incerteza que vai de EC 2,0 a EC 2,8, e essa diferença separa uma alface saudável de uma alface com queima de bordas por excesso de sal.

Há ainda uma quarta notação, o **CF (Conductivity Factor)**, usada em medidores britânicos: CF é simplesmente a EC multiplicada por 10. EC 1,8 mS/cm equivale a CF 18. Essa é a única conversão do universo pH/EC que não tem armadilha.

## Tabela completa de conversão EC para PPM

Esta é a tabela de consulta. Encontre sua EC na primeira coluna e leia o PPM correspondente na escala do seu aparelho, ou faça o caminho inverso.
![Caneta digital medindo condutividade elétrica em reservatório de solução nutritiva para hidroponia](/blog/conversor-phecppmtds-para-hidroponia/caneta-digital-medindo-condutividade-eletrica-em-reserv-1.jpg)
*A leitura de EC é universal, enquanto o valor em PPM depende da escala configurada no aparelho*

| EC (mS/cm ou dS/m) | ppm escala 500 (NaCl) | ppm escala 640 (442) | ppm escala 700 (KCl) | CF |
| --- | --- | --- | --- | --- |
| 0,50 | 250 | 320 | 350 | 5 |
| 0,75 | 375 | 480 | 525 | 7,5 |
| 1,00 | 500 | 640 | 700 | 10 |
| 1,25 | 625 | 800 | 875 | 12,5 |
| 1,50 | 750 | 960 | 1.050 | 15 |
| 1,75 | 875 | 1.120 | 1.225 | 17,5 |
| 2,00 | 1.000 | 1.280 | 1.400 | 20 |
| 2,25 | 1.125 | 1.440 | 1.575 | 22,5 |
| 2,50 | 1.250 | 1.600 | 1.750 | 25 |
| 2,75 | 1.375 | 1.760 | 1.925 | 27,5 |
| 3,00 | 1.500 | 1.920 | 2.100 | 30 |
| 3,25 | 1.625 | 2.080 | 2.275 | 32,5 |
| 3,50 | 1.750 | 2.240 | 2.450 | 35 |

Para converter de PPM para EC, divida pelo fator: EC = ppm ÷ 500, ÷ 640 ou ÷ 700, conforme a escala do medidor.

## Exemplos resolvidos: as três dúvidas que todo produtor tem

### "Meu medidor mostra 1.120 ppm e eu não sei em que escala ele está"

Primeiro passo: descubra a escala antes de qualquer conta. Três caminhos, do mais rápido ao mais trabalhoso.

O caminho do manual: procure no manual ou no corpo do aparelho a indicação "NaCl", "442", "KCl", "×0.5", "×0.7" ou o nome da escala. Muita caneta chinesa genérica de mercado livre usa 500 sem informar em lugar nenhum.

O caminho da marca: Hanna e HM Digital tipicamente saem de fábrica em 500. Bluelab trabalha em 700 (ou em CF, ou em EC direta). Myron L usa 442.

O caminho definitivo, que funciona sempre: mergulhe a caneta na **solução-padrão de calibração de 1.413 µS/cm** (KCl 0,01 molar, a solução de referência universal, vendida em qualquer casa de instrumentação por R$ 40 a R$ 90 o frasco). Se o visor mostrar cerca de **707 ppm**, o aparelho está em escala 500. Se mostrar cerca de **905 ppm**, está em 640. Se mostrar cerca de **990 ppm**, está em 700. Um único teste de trinta segundos elimina a dúvida para sempre.

Voltando ao caso: 1.120 ppm equivale a EC 2,24 se a escala for 500; EC 1,75 se for 640; e EC 1,60 se for 700. Repare que a mesma leitura de visor pode significar uma solução forte demais para alface ou perfeitamente adequada, dependendo apenas de qual convenção o fabricante adotou. É exatamente por isso que a resposta correta nunca é "converta", e sim "descubra a escala primeiro".

### "A receita pede 1.400 ppm e meu aparelho lê em EC"

Você precisa saber a escala em que a receita foi escrita. Se a fonte for americana ou brasileira genérica, assuma 500 e confirme depois; se for britânica, australiana ou de material Bluelab, assuma 700.

- Receita em escala 500: 1.400 ÷ 500 = **EC 2,8 mS/cm**
- Receita em escala 640: 1.400 ÷ 640 = **EC 2,19 mS/cm**
- Receita em escala 700: 1.400 ÷ 700 = **EC 2,0 mS/cm**

A diferença entre o primeiro e o último cenário é de 40% na concentração de sal. Para tomate em produção, os três valores estão dentro de uma faixa tolerável. Para alface, EC 2,8 é excessivo e cobra o preço em queima de borda e em sabor amargo.

Quando a receita não declara a escala e você não consegue rastrear a origem, a saída conservadora é **começar pelo valor mais baixo das três conversões** e subir gradualmente observando a cultura, em vez de partir do teto.

### "Dois medidores na mesma solução mostram números diferentes. Qual está certo?"

Se um marca 900 ppm e outro marca 1.260 ppm na mesma caixa, provavelmente **os dois estão certos**: são as escalas 500 e 700 lendo uma solução de EC 1,8 mS/cm. Nada quebrou.

O teste que separa diferença de escala de defeito real é simples: coloque os dois aparelhos em **modo EC**, se ambos tiverem. Em EC, dois medidores calibrados e com compensação de temperatura devem ficar dentro de 2% a 5% um do outro. Se em EC eles divergirem 30%, aí sim há problema, e o suspeito costuma ser calibração vencida, eletrodo sujo com biofilme ou incrustação de sais, ou temperatura muito diferente entre as amostras.

Se um dos aparelhos só lê PPM, use a solução-padrão de 1.413 µS/cm no procedimento descrito acima e identifique a escala de cada um antes de acusar qualquer um de errado.

## A EC da água de origem: o erro que estraga o cálculo inteiro

Este é o ponto mais esquecido da hidroponia brasileira, e o que mais gera solução mal formulada.
![Medição da condutividade elétrica da água pura antes do preparo da solução nutritiva de hidroponia](/blog/conversor-phecppmtds-para-hidroponia/medicao-da-condutividade-eletrica-da-agua-pura-antes-do-2.jpg)
*Medir a água de origem antes de adicionar qualquer sal evita erro de concentração na solução final*

A água que você usa **já chega com EC própria**, antes de qualquer sal entrar. Faixas típicas observadas:

| Fonte de água | EC típica (mS/cm) | Observação |
| --- | --- | --- |
| Água de chuva captada | 0,00 a 0,05 | Praticamente pura, mas exige filtragem de sujeira |
| Osmose reversa | 0,00 a 0,03 | Custo de equipamento e descarte de rejeito |
| Água tratada de rede urbana | 0,10 a 0,60 | Varia por município e por estação |
| Poço em rocha calcária | 0,50 a 1,20 | Água dura, cálcio e magnésio altos |
| Poço em região semiárida ou salobra | 1,00 a 3,00+ | Sódio e cloreto dominam |

A regra que precisa ficar grudada na parede do galpão: **a EC alvo da receita é um valor final, não um incremento.** Se a alface pede EC 1,5 e sua água de poço já vem com 0,7, você tem apenas 0,8 mS/cm de espaço para colocar nutriente. Adicionar sal até "somar 1,5 a mais" leva a solução para 2,2 e queima a cultura.

O procedimento correto tem três passos:

1. **Meça a água pura**, direto da fonte, antes de qualquer adição, e anote o valor. Refaça essa medição pelo menos a cada troca de estação, porque água de rede e de poço variam ao longo do ano.
2. **Subtraia** essa leitura da EC alvo para saber quanto de nutriente cabe.
3. **Formule** a solução respeitando esse teto disponível. O cálculo dos sais em si está detalhado no guia canônico de [solução nutritiva para hidroponia](/blog/solucao-nutritiva-para-hidroponia-guia-completo-calculadora), que traz as tabelas de formulação.

### Quando a água de origem já passa da EC alvo

Acontece com frequência em poços do semiárido e em regiões com água salobra. Há quatro saídas, em ordem de custo:

- **Diluir com água de chuva.** Captação de telhado com filtro simples resolve boa parte do problema em propriedade pequena, e é a solução de menor custo por litro.
- **Osmose reversa.** Investimento maior e geração de rejeito, mas entrega água praticamente zerada e dá controle total sobre a formulação.
- **Trocar de fonte.** Às vezes um poço vizinho ou a rede urbana tem água muito melhor do que a fonte que você usa por hábito.
- **Aceitar o teto e escolher a cultura.** Se a água entrega EC 1,8 e não há como tratá-la, cultivar alface fica inviável, mas tomate, que tolera EC de 2,0 a 3,5, pode funcionar. Ajustar a cultura à água é uma decisão legítima de projeto.

Há um agravante importante. **Sódio e cloreto sobem a EC sem nutrir a planta.** Uma água com EC 0,8 vinda de nitrato e cálcio é muito diferente de uma água com EC 0,8 vinda de NaCl: a primeira é nutrição, a segunda é apenas carga salina que compete com a absorção de potássio e cálcio e ainda se acumula no reservatório a cada recirculação. A [FAO, no Irrigation and Drainage Paper 29](https://www.fao.org/4/t0234e/t0234e00.htm), estabelece os limiares de tolerância à salinidade por cultura que servem de base para esse tipo de decisão. Por isso, quando a água é suspeita, uma análise laboratorial que discrimine os íons vale muito mais que qualquer leitura de caneta.

## TDS calculado versus resíduo seco de laboratório

Uma dúvida recorrente de quem manda a água para análise: o laudo do laboratório diz 480 mg/L de sólidos dissolvidos e a caneta diz 640 ppm. Quem errou?

Ninguém. São grandezas obtidas por métodos diferentes.

| Característica | TDS da caneta | Resíduo seco de laboratório |
| --- | --- | --- |
| Método | EC medida × fator de escala | Evaporação a 180 °C e pesagem (APHA 2540C) |
| O que captura | Apenas o que conduz corrente | Tudo o que resta sólido após evaporar |
| Sílica, açúcares, orgânicos não iônicos | Não detecta | Entra na pesagem |
| Bicarbonato | Conta integralmente | Parte se decompõe e volatiliza a 180 °C |
| Erro típico | 10% a 30% conforme composição | ±2% a 5% |

O TDS do medidor assume que sua água se comporta como o sal-padrão da escala. Solução nutritiva de hidroponia não é NaCl nem KCl: é uma mistura de nitratos, sulfatos, fosfatos e quelatos com condutividades individuais bem distintas. O número no visor é uma aproximação útil para acompanhamento diário, não um valor analítico.

Consequência prática: use o PPM da caneta para comparar sua própria solução ao longo do tempo, que é onde ele é confiável, e nunca para confrontar com laudo de laboratório ou com receita de outro produtor que usa aparelho diferente.

## Correção por temperatura: o erro invisível

A condutividade de uma solução aumenta com a temperatura, porque os íons se movem mais rápido em água quente. A variação é de aproximadamente **2% por grau Celsius**, e o padrão internacional de referência é 25 °C.

Um exemplo torna isso concreto. Uma solução de EC real 1,50 mS/cm a 25 °C, medida sem correção:

| Temperatura da solução | Leitura sem ATC | Erro |
| --- | --- | --- |
| 18 °C | ~1,29 mS/cm | −14% |
| 22 °C | ~1,41 mS/cm | −6% |
| 25 °C | 1,50 mS/cm | referência |
| 30 °C | ~1,65 mS/cm | +10% |
| 35 °C | ~1,80 mS/cm | +20% |

No verão brasileiro, com reservatório exposto e solução a 34 °C ou 35 °C, medir sem compensação faz o produtor enxergar uma solução 20% mais forte do que ela é, e diluir sem necessidade. Na manhã fria de inverno no Sul, o efeito se inverte e leva a reforçar uma solução que já estava certa.

Por isso, **ATC (Automatic Temperature Compensation) não é luxo, é requisito mínimo** para qualquer caneta de EC usada em hidroponia. Aparelhos com ATC medem a temperatura simultaneamente e reportam o valor corrigido para 25 °C, conforme o procedimento da APHA 2510. Se o seu medidor não tiver ATC, meça sempre no mesmo horário do dia e anote a temperatura junto com a leitura, para pelo menos manter a comparação interna coerente.

Um detalhe que engana: a compensação corrige a **leitura**, não a **planta**. Solução a 34 °C carrega menos oxigênio dissolvido e favorece patógenos de raiz, e isso continua sendo um problema real mesmo com o número no visor perfeitamente corrigido.

## O que a EC não diz

Esta é a limitação mais importante do instrumento, e a menos compreendida.

**A EC mede a soma dos íons em solução, não quais íons estão lá.** Um medidor não distingue nitrato de sódio, potássio de cloreto, cálcio de sulfato. Ele reporta um único número que agrega tudo.

Isso significa que uma solução com EC perfeita pode estar completamente desbalanceada. Alguns cenários que acontecem no dia a dia:

- **Depleção seletiva.** Em NFT recirculante, a planta absorve nitrogênio e potássio muito mais rápido que sulfato e sódio. Depois de duas semanas, a EC pode continuar em 1,5, mas a composição já é outra: menos do que a planta precisa, mais do que ela rejeita.
- **Reposição só com concentrado.** Completar o reservatório sempre com solução-mãe, sem nunca trocar, acumula os íons pouco absorvidos. A EC fica estável e mascara o desvio.
- **Água de origem carregada.** Uma EC de 1,5 em que 0,8 vem de sódio e cloreto entrega apenas 0,7 de nutrição real, e a planta apresentará carência mesmo com a leitura no alvo.

A consequência é clara: **EC estável não garante nutrição correta.** Ela indica que a carga iônica total está constante, e isso é útil como sinal de alerta, mas não substitui a troca periódica completa da solução nem a análise laboratorial em operação comercial. Quando as plantas mostram sintoma com EC e pH aparentemente corretos, o caminho é a leitura visual dos sinais, tratada na [galeria de sintomas de deficiência de nutrientes](/blog/sintomas-de-deficiencia-de-nutrientes-em-hortalicas-galeria), e a checagem dos erros de manejo mais frequentes reunidos no guia de [erros mais comuns na hidroponia](/blog/erros-mais-comuns-na-hidroponia-o-que-evitar-fonte-esalq).

## Quando a EC sobe ou desce sozinha no reservatório

A variação da EC ao longo dos dias é informação de diagnóstico, desde que interpretada corretamente. A chave é entender que a planta absorve água e sal em ritmos independentes.
![Reservatório de solução nutritiva em estufa de hidroponia com bomba de recirculação e raízes de alface](/blog/conversor-phecppmtds-para-hidroponia/reservatorio-de-solucao-nutritiva-em-estufa-de-hidropon-3.jpg)
*Em dias quentes a evaporação concentra a solução e a EC sobe, exigindo reposição com água pura*

| Comportamento | O que significa | Ação correta |
| --- | --- | --- |
| **EC sobe** | A planta consome mais água que sal, ou há evaporação por calor, vento e baixa umidade. O sal fica e a água vai embora, concentrando a solução | Repor com **água pura**, sem nutriente, até voltar à EC alvo. Se repetir todo dia, reduza a temperatura do reservatório e sombreie a tubulação |
| **EC desce** | A planta absorve nutriente mais rápido que água. Típico de cultura em crescimento vegetativo acelerado, dia nublado e ameno | Repor com **solução nutritiva** na concentração de trabalho, não com água pura |
| **EC estável mas pH subindo** | Absorção preferencial de ânions, sobretudo nitrato, que libera OH⁻ no meio. Comum em folhosas em pleno crescimento | Corrigir com ácido diluído em pequenas doses, monitorando. Se a subida for muito rápida, reveja a relação nitrato/amônio da formulação |
| **EC estável mas pH caindo** | Absorção preferencial de cátions ou excesso de amônio na fórmula | Corrigir com base diluída e reavaliar a fonte de nitrogênio |
| **EC e pH oscilando muito no mesmo dia** | Volume de reservatório pequeno demais para a área plantada, sem inércia química | Aumentar o volume do reservatório. É a correção estrutural mais eficaz |

O erro clássico, e caro, é **repor sempre com solução nutritiva independentemente do que a EC fez.** Quando a EC está subindo por evaporação e o produtor completa o nível com mais nutriente, a concentração escala rapidamente até níveis de estresse salino. A regra é simples: EC subiu, repõe água; EC caiu, repõe nutriente.

Vale também estabelecer uma rotina de troca completa. Em produção comercial de folhosas, trocar integralmente a solução a cada 30 a 45 dias evita o acúmulo de íons não absorvidos que nenhuma leitura de EC revela.

## Faixas de EC e pH por cultura

Estes valores são **ponto de partida**, não dogma. Cultivar, estação, intensidade luminosa e sistema alteram o ideal, e o ajuste fino vem da observação da sua própria cultura.

| Cultura e fase | EC (mS/cm) | ppm 500 | ppm 700 | pH |
| --- | --- | --- | --- | --- |
| Alface, mudas | 0,8 a 1,2 | 400 a 600 | 560 a 840 | 6,0 a 6,5 |
| Alface, crescimento e final | 1,2 a 1,8 | 600 a 900 | 840 a 1.260 | 5,8 a 6,2 |
| Rúcula e agrião | 1,8 a 2,5 | 900 a 1.250 | 1.260 a 1.750 | 5,0 a 6,0 |
| Manjericão | 1,0 a 1,6 | 500 a 800 | 700 a 1.120 | 5,5 a 6,5 |
| Microverdes | 0,8 a 1,4 | 400 a 700 | 560 a 980 | 5,8 a 6,2 |
| Morango | 1,3 a 1,5 | 650 a 750 | 910 a 1.050 | 5,5 a 6,2 |
| Pepino | 1,8 a 2,5 | 900 a 1.250 | 1.260 a 1.750 | 5,8 a 6,2 |
| Tomate, vegetativo | 2,0 a 2,5 | 1.000 a 1.250 | 1.400 a 1.750 | 5,5 a 6,5 |
| Tomate, frutificação | 2,5 a 3,5 | 1.250 a 1.750 | 1.750 a 2.450 | 5,5 a 6,5 |

Fontes: Furlani et al., *Cultivo hidropônico de plantas*, Boletim Técnico 180 do IAC (1999); [Embrapa Hortaliças, Circular Técnica sobre princípios de hidroponia](https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/769981/1/CNPHDOCUMENTOS22PRINCIPIOSDEHIDROPONIA.pdf); [FAO Irrigation and Drainage Paper 29](https://www.fao.org/4/t0234e/t0234e00.htm); e estudos brasileiros publicados na [SciELO sobre concentração de solução nutritiva em alface](https://www.scielo.br/j/hb/a/HsH735SySknvSv8QyBbFJXs/).

Duas leituras importantes dessa tabela. Primeiro, **mudas sempre pedem EC mais baixa** que planta adulta: raiz jovem e pouca área foliar não suportam a mesma carga salina. Segundo, **cultura de fruto tolera e frequentemente se beneficia de EC mais alta**, porque o estresse salino controlado no tomate concentra sólidos solúveis e melhora o sabor, contanto que não comprometa a absorção de cálcio, sob pena de podridão apical.

Sobre o pH, a faixa 5,5 a 6,5 aparece em toda a literatura porque é onde a maior parte dos nutrientes coexiste disponível. Vale lembrar que a escala é logarítmica: pH 5,0 não é "um pouco mais ácido" que pH 6,0, é **dez vezes mais ácido** em concentração de H⁺.

| pH | Concentração de H⁺ (mol/L) | Situação |
| --- | --- | --- |
| 5,0 | 1,0 × 10⁻⁵ | Excesso de ferro e manganês solúveis |
| 5,5 | 3,2 × 10⁻⁶ | Limite inferior recomendado |
| 6,0 | 1,0 × 10⁻⁶ | Ponto de equilíbrio geral |
| 6,5 | 3,2 × 10⁻⁷ | Limite superior recomendado |
| 7,0 | 1,0 × 10⁻⁷ | Ferro e fósforo começam a precipitar |

Isso explica por que corrigir pH exige dosagem cuidadosa: acertar de 7,0 para 6,0 significa multiplicar por dez a concentração de H⁺, e uma dose generosa de ácido derruba a solução para 4,5 com facilidade. Sempre diluir o ácido, adicionar em pequenas frações e reler após circulação completa.

## Escolha do medidor e vida útil do equipamento

Nem todo produtor precisa do mesmo aparelho, e nenhum aparelho dura para sempre.

| Tipo | Faixa de preço (Brasil, 2026) | Precisão típica | Para quem |
| --- | --- | --- | --- |
| Caneta simples pH ou EC | R$ 80 a R$ 350 | ±2% da leitura | Hobbyista e pequena bancada |
| Caneta combinada com ATC | R$ 200 a R$ 600 | ±2% | Pequeno produtor comercial |
| Medidor de bancada | R$ 1.500 e acima | ±1%, quatro eletrodos | Produção comercial, laboratório interno |
| Sonda inline com transmissor | R$ 800 a R$ 3.000 por canal | ±1% a ±2% | Automação e leitura contínua |

O que muda de verdade entre eles é menos a exatidão e mais a **estabilidade ao longo do tempo** e a manutenibilidade. Bancada e sonda inline geralmente aceitam troca de eletrodo; caneta barata costuma ser descartável por inteiro quando o sensor morre.

Sobre a sonda inline vale um alerta: leitura contínua é excelente para acompanhar tendência e disparar alarme, mas ela suja mais rápido, porque fica permanentemente imersa em solução com biofilme. Exige limpeza e recalibração mais frequentes, não menos. Quem monta [automação caseira com ESP32](/blog/arduino-iniciantes-primeiros-passos-automacao) precisa considerar que o custo real do sistema inclui manutenção periódica do sensor, e os critérios gerais de seleção estão reunidos no guia de [como escolher um sensor agrícola](/blog/sensores-agricultura-guia-escolha-implementacao).

### Calibração e conservação

Este é o item que separa quem confia na leitura de quem só olha para um número bonito.

**EC:** calibre com solução-padrão de 1.413 µS/cm (KCl 0,01 M) a cada 30 dias em uso regular, ou antes de qualquer decisão importante. Nunca reutilize solução-padrão: mergulhar o eletrodo já contamina o frasco. Separe uma pequena porção em copo limpo e descarte após o uso.

**pH:** calibre com dois pontos, buffer 7,00 e buffer 4,01, a cada 15 a 30 dias. Eletrodo de pH deriva mais rápido que o de EC e é o primeiro a mentir.

**Conservação do eletrodo de pH**, o ponto onde mais gente destrói equipamento novo sem saber: o bulbo de vidro deve ser guardado **sempre úmido, em solução de armazenamento própria** (tipicamente KCl 3M). Guardar em **água destilada é o erro clássico**, porque a água pura lixivia os íons da membrana por osmose e degrada o eletrodo em poucas semanas. Guardar seco também mata o bulbo, por desidratação da camada de gel.

E o ponto que praticamente nenhum vendedor menciona: **eletrodo de pH é consumível.** A membrana de vidro envelhece por uso, exposição química e simples passagem do tempo, mesmo bem conservada. A vida útil prática fica entre 12 e 24 meses em uso frequente, e o sinal de fim de vida aparece antes da falha total: resposta lenta (mais de 60 segundos para estabilizar), leitura que não fecha na calibração de dois pontos, ou desvio crescente entre calibrações sucessivas. Quando isso começa, troque o eletrodo ou a caneta. Insistir em calibrar um eletrodo morto só produz um número falso com aparência de dado.

O eletrodo de EC é mais durável, por não depender de membrana de vidro, mas sofre com incrustação de sais e biofilme. Limpeza com escova macia e, quando necessário, solução de limpeza específica mantém a resposta correta.

Vale registrar que, no Brasil, a calibração rastreável de condutivímetros é feita via Rede Brasileira de Calibração e tem caráter voluntário. Não existe portaria do INMETRO tornando obrigatória a calibração de condutivímetros para uso em hidroponia, o que transfere ao produtor toda a responsabilidade pela confiabilidade da própria medição.

## Perguntas frequentes

### Como converter EC para PPM em hidroponia?
Multiplique a EC em mS/cm pelo fator da escala do seu medidor: 500 na escala NaCl (Hanna, HM Digital), 640 na escala 442 (Myron L) ou 700 na escala KCl (Bluelab). Uma solução de EC 1,8 mS/cm corresponde a 900 ppm na escala 500, 1.152 ppm na 640 e 1.260 ppm na 700. Para o caminho inverso, divida o PPM pelo mesmo fator.

### Qual a diferença entre EC, PPM e TDS?
EC é a condutividade elétrica medida diretamente pelo aparelho, em mS/cm ou dS/m. TDS é a massa de sólidos dissolvidos em mg/L, cujo método oficial é a evaporação e pesagem do resíduo em laboratório. PPM é a unidade em que a caneta exibe uma estimativa de TDS calculada a partir da EC por um fator. Ou seja, EC é medida, PPM é conta.

### Por que dois medidores mostram valores diferentes na mesma solução?
Quase sempre porque usam escalas de conversão diferentes. Um Hanna em escala 500 marca 900 ppm exatamente onde um Bluelab em escala 700 marca 1.260 ppm, e ambos estão corretos para uma solução de EC 1,8 mS/cm. Para confirmar, coloque os dois em modo EC: se ainda assim divergirem mais de 5%, o problema é calibração, sujeira no eletrodo ou temperatura.

### mS/cm e dS/m são a mesma coisa?
Sim, são numericamente idênticos. EC de 1,5 mS/cm é exatamente EC de 1,5 dS/m, sem nenhuma conversão. A literatura agronômica brasileira e os artigos da SciELO costumam usar dS/m, enquanto as canetas comerciais exibem mS/cm. Já µS/cm é mil vezes menor: 1.500 µS/cm equivalem a 1,5 mS/cm.

### Preciso descontar a EC da água antes de preparar a solução?
Sim, sempre. A EC alvo da receita é o valor final da solução pronta, não um incremento sobre a água. Se a alface pede EC 1,5 e sua água de poço já mede 0,7, restam apenas 0,8 mS/cm de espaço para nutriente. Meça a água pura antes de qualquer adição e repita a medição a cada troca de estação, porque a fonte varia ao longo do ano.

### A temperatura afeta a leitura de EC?
Sim, cerca de 2% por grau Celsius, com referência internacional em 25 °C. Uma solução de EC real 1,50 lida a 35 °C sem compensação aparece como 1,80, um erro de 20% que leva o produtor a diluir sem necessidade. Use sempre medidor com ATC, a compensação automática de temperatura, e lembre que a correção ajusta o número no visor, não a temperatura real da solução, que continua importando para o oxigênio dissolvido na raiz.

### Manter a EC estável garante que a nutrição está correta?
Não. A EC mede a soma total dos íons e não distingue quais estão presentes. Em sistema recirculante, a planta absorve nitrogênio e potássio mais rápido que sulfato e sódio, então a solução pode manter EC 1,5 por semanas enquanto a composição se degrada. Por isso a troca completa periódica da solução, a cada 30 a 45 dias em folhosas, é indispensável mesmo com a EC no alvo.

### Como calibrar uma caneta de pH e EC?
Para EC, use solução-padrão de 1.413 µS/cm (KCl 0,01 molar) a cada 30 dias. Para pH, faça calibração de dois pontos com os buffers 7,00 e 4,01 a cada 15 a 30 dias. Nunca mergulhe o eletrodo diretamente no frasco de padrão: separe uma porção em copo limpo e descarte depois do uso.

### Posso guardar o eletrodo de pH em água destilada?
Não, esse é um dos erros mais comuns e mais caros. A água destilada retira os íons da membrana de vidro por osmose e degrada o eletrodo em poucas semanas. Guarde sempre na solução de armazenamento do fabricante, geralmente KCl 3M, com o bulbo úmido. Guardar seco também danifica o sensor.

### Por quanto tempo dura um eletrodo de pH?
Entre 12 e 24 meses em uso frequente, mesmo com conservação correta, porque a membrana de vidro é consumível e envelhece com o tempo. Os sinais de fim de vida são resposta lenta acima de 60 segundos, falha em fechar a calibração de dois pontos e desvio crescente entre calibrações. Nesse estágio, calibrar de novo apenas produz um número falso com aparência de dado confiável.

### O que significa CF nos medidores de hidroponia?
CF é o Conductivity Factor, usado principalmente em equipamentos britânicos como os da Bluelab. A conversão é direta: CF equivale à EC em mS/cm multiplicada por 10. Uma solução de EC 1,8 mS/cm corresponde a CF 18, e não há ambiguidade de escala nesse caso.

### Qual escala de PPM é a mais correta?
Nenhuma é mais correta que a outra: são padrões calibrados contra sais de referência diferentes, todos legítimos dentro da sua convenção. Por isso a recomendação técnica, inclusive da própria Bluelab, é trabalhar em EC, que é universal e não depende de fator nenhum, e usar PPM apenas quando o aparelho não oferecer leitura em EC.
