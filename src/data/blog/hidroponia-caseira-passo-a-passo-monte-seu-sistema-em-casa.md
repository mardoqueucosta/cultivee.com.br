---
titulo: 'Hidroponia Caseira Passo a Passo: Monte Seu Sistema em Casa [2026]'
resumo: >-
  Guia completo de hidroponia caseira com Kratky, DWC e NFT mini, da escolha do
  sistema ao manejo, com receita Furlani/IAC adaptada para 30 litros e payback
  inferior a 12 meses em apartamento.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-05-09'
dataModificacao: '2026-07-10'
leitura: '20 min'
tldr: >-
  Hidroponia caseira deixou de ser hobby de geek e virou resposta concreta a
  comida fresca dentro de apartamento. Com R$ 30 (Kratky em garrafa) a R$ 1.500
  (NFT mini smart), qualquer pessoa monta um sistema que entrega 14 a 80 alfaces
  por mês em 1 a 3 m². Este guia cobre a escolha do sistema, a lista de
  materiais, a receita Furlani/IAC residencial, o manejo semanal, os 9 erros
  mais comuns e a viabilidade econômica, com base científica recente
  (Gumisiriza 2022, Anpo 2024) e a Lei 14.935/2024 da Política Nacional de
  Agricultura Urbana.
imagens:
  - src: /blog/hidroponia-caseira-passo-a-passo-monte-seu-sistema-em-casa/sistema-nft-mini-caseiro-com-alfaces-verdes-em-tubos-pv-1.jpg
    alt: 'Sistema NFT mini caseiro com alfaces verdes em tubos PVC brancos em varanda urbana'
    caption: 'NFT mini caseiro em varanda, com tubos PVC, bomba submersa e 8 alfaces em fase final.'
  - src: /blog/hidroponia-caseira-passo-a-passo-monte-seu-sistema-em-casa/preparo-de-solucao-nutritiva-furlani-caseira-com-caneta-2.jpg
    alt: Preparo de solução nutritiva Furlani caseira com canetas digitais de pH e EC
    caption: 'Preparo da solução Furlani residencial, com canetas de pH e EC para monitoramento.'
  - src: /blog/hidroponia-caseira-passo-a-passo-monte-seu-sistema-em-casa/comparativo-entre-raizes-hidroponicas-saudaveis-e-raize-3.jpg
    alt: 'Comparativo entre raízes hidropônicas saudáveis e raízes contaminadas por Pythium'
    caption: 'À esquerda, raiz branca saudável; à direita, raiz marrom indicando contaminação por Pythium.'
---
A hidroponia caseira é, hoje, o caminho mais rápido para colocar comida fresca dentro de um apartamento sem precisar de quintal, terra ou agrotóxicos. Em três horas de montagem e R$ 80 a R$ 1.500 de investimento inicial, é possível ter um sistema que entrega de **14 a 80 pés de alface, manjericão, rúcula e agrião por mês** em 1 a 3 metros quadrados. O conhecimento técnico já está consolidado: o Brasil produz hidroponicamente entre 1.500 e 3.000 hectares, com economia de até 60% no consumo de água frente ao cultivo no solo, segundo levantamentos da [Embrapa Hortaliças](https://www.embrapa.br/en/hortalica-nao-e-so-salada/hortalicas-hidroponicas).

| Fato-chave | Valor | Fonte |
|---|---|---|
| Economia de água frente ao solo | até 60% (até 95% em fazendas verticais) | [Embrapa Hortaliças](https://www.embrapa.br/en/hortalica-nao-e-so-salada/hortalicas-hidroponicas) |
| Payback do sistema Kratky urbano | inferior a 12 meses | [Gumisiriza et al. (2022)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9596717/), *MethodsX* |
| Mercado BR de hidroponia em 2030 | USD 111,5 milhões (CAGR 9,6%) | [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/hydroponics-market/brazil) |

Este guia foi pensado para quem está começando do zero e nunca encostou em nutrientes minerais. Vamos do caso mais simples (um pé de alface em pote de sorvete pelo método Kratky) até a montagem de um NFT mini com bomba submersa, sensores ESP32 e iluminação LED para apartamentos sem janela com sol.

## O que é hidroponia caseira

Se você chegou até aqui, provavelmente já sabe o que é hidroponia: cultivo de plantas em solução nutritiva, sem terra. Se quiser a definição completa, os tipos de sistema e as vantagens frente ao cultivo no solo, veja o [guia definitivo de hidroponia](/blog/o-que-e-hidroponia-guia-definitivo-vantagens-tipos-e-como-co). Aqui o foco é mão na massa: montar e manter um sistema dentro de casa.

No nível residencial, qualquer reservatório que mantenha as raízes em contato com solução nutritiva oxigenada já é um sistema hidropônico, desde uma garrafa PET com pé de alface no método Kratky até um kit NFT de 96 furos. Na prática, hidroponia caseira é trazer o método Kratky ou NFT para a escala de uma caixa plástica de 30 litros em qualquer varanda ou cozinha. A vantagem que interessa ao iniciante é concreta: ciclo mais rápido que na terra (alface em 30 a 45 dias após o transplante, contra 60 a 70 dias no solo), mais plantas por metro quadrado e dispensa de defensivos em sistema fechado e bem manejado.

> Leia também: [como funciona o sistema NFT em pequenos espaços](/blog/sistema-nft-de-hidroponia-o-que-e-como-funciona-e-como-dimen)

## Escolha do sistema: Kratky, DWC, NFT mini e variantes

O ponto de decisão mais importante para o iniciante é o sistema. Cada arquitetura tem combinação distinta de custo, complexidade e escala. A tabela abaixo resume as variantes que cabem em apartamento brasileiro e ajuda a decidir por onde começar.
![Sistema NFT mini caseiro com alfaces verdes em tubos PVC brancos em varanda urbana](/blog/hidroponia-caseira-passo-a-passo-monte-seu-sistema-em-casa/sistema-nft-mini-caseiro-com-alfaces-verdes-em-tubos-pv-1.jpg)
*NFT mini caseiro em varanda, com tubos PVC, bomba submersa e 8 alfaces em fase final.*


| Sistema | Princípio | CAPEX típico (BR, 2026) | Energia | Manejo semanal | Plantas adequadas |
|---|---|---|---|---|---|
| **Kratky (passivo)** | Reservatório fechado, raiz parcial em ar e parcial em solução, sem bomba | R$ 30 a 150 | Zero | 5 a 10 min | Alface, manjericão, rúcula, agrião |
| **DWC (Deep Water Culture)** | Raiz totalmente submersa, com bomba de ar oxigenando a solução | R$ 80 a 300 | 2 a 5 W contínuos | 10 a 15 min | Alface, espinafre, folhosas em geral |
| **Wick (pavio)** | Capilaridade de pavio leva a solução do reservatório ao substrato | R$ 20 a 100 | Zero | 5 a 10 min | Manjericão, hortelã, ervas pequenas |
| **NFT mini (caseiro)** | Lâmina fina de solução circula em tubo PVC inclinado, com bomba submersa intermitente | R$ 200 a 1.500 | 25 a 40 W | 15 a 20 min | Alface, rúcula, manjericão, morango, tomate-cereja |
| **Floating (DFT)** | Placa de isopor com plantas flutuando sobre lâmina profunda, com bomba | R$ 150 a 500 | 10 a 25 W | 10 a 15 min | Alface, agrião, rúcula |
| **Aeroponia caseira** | Raízes pulverizadas com névoa de solução em câmara fechada | R$ 400 a 2.000 | 30 a 80 W | 20 a 30 min | Alface premium, ervas finas, morango |
| **Vertical com tubos PVC** | Tubos de 100 mm na vertical com furos laterais, com bomba ao topo | R$ 300 a 1.200 | 25 a 50 W | 15 a 25 min | Folhosas, morango |

A recomendação por perfil é direta:

1. **Iniciante absoluto, sem experiência anterior.** Comece com Kratky em caixa plástica de 30 a 50 litros. Custo abaixo de R$ 150, sem bomba, sem energia, sem ruído. Coloque uma placa de isopor com 6 a 8 furos de 50 mm, encaixe net cups com mudas de alface ou manjericão e pronto. O ciclo é único, sem reposição de solução.

2. **Entusiasta com tempo e curiosidade técnica.** Pule para um NFT mini de tubo único, com bomba submersa de 500 a 1.000 L/h, timer digital programando 15 minutos ligado e 15 minutos desligado, e 6 a 8 furos para folhosas. Custo entre R$ 600 e R$ 1.200 com kit pronto da [Hidrogood](https://hidrogood.com.br) ou [Todo Hidro](https://todohidro.com).

3. **Hobby tech com automação.** Adicione sensores de pH e EC conectados a um ESP32 ou Arduino, conforme o protocolo SMART GROW descrito em [HardwareX (2023)](https://www.sciencedirect.com/science/article/pii/S2468067223000639). O ticket técnico entrou abaixo de R$ 1.500 em DIY, com possibilidade de monitoramento remoto via Wi-Fi e alertas no celular.

> "Kratky vive uma segunda onda desde 2020, puxada por TikTok, Reels e por papers que mostram payback inferior a 12 meses em contexto urbano."
> Fonte: [Gumisiriza et al. (2022)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9596717/), em *MethodsX*

Para quem ainda não decidiu entre Kratky e NFT, a regra prática é simples: se o objetivo é colher de 6 a 12 pés de folhosas por mês, sem bomba e sem manutenção, Kratky resolve. Se o objetivo é produzir continuamente, com ciclos sucessivos e maior número de plantas, NFT mini é o caminho.

## Lista completa de materiais e custo

Vamos detalhar o que comprar para os dois sistemas mais populares: Kratky em caixa plástica e NFT mini de tubo único. Os preços referenciam o varejo brasileiro em abril de 2026, com fontes como Hidrogood, Todo Hidro, MercadoLivre e Leroy Merlin.

**Kratky em caixa plástica (CAPEX total entre R$ 80 e R$ 180):**

- Caixa plástica opaca alimentícia, 30 a 50 litros, em PEAD ou polipropileno: R$ 35 a 70.
- Placa de isopor de 25 mm de espessura, cortada para encaixar na boca da caixa: R$ 10 a 20.
- Net cups de 50 mm, pacote com 10 a 20 unidades: R$ 15 a 30.
- Espuma fenólica em cubos de 25 mm, pacote com 50 a 100 unidades: R$ 25 a 50.
- Sementes peletizadas de alface (Vera, Vanda, Samira) ou rúcula: R$ 15 a 40.
- Solução nutritiva pronta A+B (kit para 200 litros): R$ 50 a 90.
- Caneta digital de pH (0 a 14, ±0,1): R$ 80 a 150.
- Caneta digital de EC ou TDS (0 a 10 mS/cm): R$ 80 a 150.

**NFT mini em tubo único de 1,5 metro (CAPEX total entre R$ 600 e R$ 1.200):**

- Tubo de PVC food grade de 75 mm, 1,5 metro de comprimento: R$ 60 a 120.
- Cap de PVC nas extremidades, dois unidades: R$ 15 a 30.
- Niple de saída com vedação, dois unidades: R$ 20 a 40.
- Mangueira flexível transparente, 5 metros: R$ 30 a 60.
- Bomba submersa de 500 a 1.000 L/h, 24 V: R$ 90 a 180.
- Reservatório de 30 a 50 litros opaco: R$ 35 a 70.
- Timer digital 24 horas com programação por minuto: R$ 50 a 110.
- Estrutura suporte com cavaletes ajustáveis (madeira ou metalon): R$ 80 a 200.
- Net cups de 50 mm, oito a doze unidades: R$ 12 a 25.
- Espuma fenólica e sementes (mesmas do Kratky): R$ 40 a 90.
- Solução nutritiva A+B: R$ 50 a 90.
- Canetas digitais de pH e EC: R$ 160 a 300.

**OPEX recorrente (ambos os sistemas):**

- Reposição de solução nutritiva A+B a cada três a quatro semanas: R$ 12 a 25 por mês.
- Energia elétrica para bomba e iluminação LED, em apartamento sem janela: R$ 15 a 50 por mês, conforme tarifa local.
- Sementes para próximas safras: R$ 5 a 15 por mês.

A soma do OPEX fica entre R$ 32 e R$ 90 por mês, dependendo do sistema, da escala e da iluminação. Comparado ao gasto médio de uma família urbana brasileira em alfaces, manjericão e rúcula no varejo (entre R$ 60 e R$ 120 por mês), o sistema paga a si mesmo em três a quinze meses, conforme o cenário.

## Passo a passo de montagem

A montagem do Kratky em caixa plástica é literalmente um trabalho de meia hora. A do NFT mini, com furação e instalação da bomba, leva entre uma e duas horas, contando o tempo de aguardar a cola PVC secar.

**Kratky em 30 minutos:**

1. **Lave a caixa plástica** com água e detergente neutro, depois com solução de água sanitária a 1% (10 mL por litro) e enxágue três vezes com água potável.
2. **Recorte a placa de isopor** para encaixar na boca da caixa, deixando aproximadamente 1 cm de folga em todos os lados.
3. **Marque os furos** na placa de isopor com 25 cm entre centros, em padrão alternado para folhosas. Use serra copo de 50 mm ou estilete bem afiado.
4. **Encaixe os net cups** nos furos. Eles devem ficar com a borda apoiada na placa, e o fundo penetrando entre 2 e 3 cm na solução.
5. **Prepare a solução nutritiva** seguindo as instruções do kit A+B comprado, ou a receita Furlani indicada na seção de solução nutritiva mais adiante. Volume final: a caixa cheia até 5 cm da placa de isopor.
6. **Posicione a placa com os net cups** sobre a caixa cheia. Verifique que os fundos dos net cups estão tocando a solução.
7. **Transfira as mudas** já germinadas em espuma fenólica (com 2 a 4 folhas verdadeiras) para os net cups.
8. **Tampe lateralmente com fita adesiva opaca** se houver entrada de luz. Algas verdes na solução roubam nitrogênio das plantas e devem ser evitadas.

**NFT mini em uma hora e meia:**

1. **Marque a inclinação** do tubo de PVC sobre o suporte. A inclinação ideal é entre 2% e 4%, ou seja, 3 a 6 cm de queda em 1,5 metro de comprimento.
2. **Furação dos buracos** com serra copo de 50 mm, espaçados a 25 cm entre centros, no topo do tubo. Para folhosas, 6 a 8 furos cabem em 1,5 metro.
3. **Cole os caps de PVC** nas duas extremidades, com cola PVC. Espere 30 minutos para secar antes de continuar.
4. **Instale o niple de saída** na ponta inferior do tubo, com vedação de teflon. A mangueira flexível conecta o niple ao reservatório.
5. **Instale a bomba submersa** dentro do reservatório, conectando a mangueira de recalque ao topo do tubo. Verifique vedação.
6. **Configure o timer digital** para ciclos de 15 minutos ligado e 15 minutos desligado, ou contínuo nos primeiros dias após o transplante.
7. **Encha o reservatório** com 25 a 30 litros de solução nutritiva preparada. Ligue a bomba e verifique que a solução escorre uniforme pelo tubo, sem vazamentos.
8. **Encaixe os net cups** com mudas nos furos. As raízes ficarão expostas à lâmina de solução circulante.

> Leia também: [automatize bombas e sensores com Arduino e ESP32](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen)

A automação opcional, com ESP32 ou Arduino lendo sensores de pH e EC e acionando a bomba via relé, é o próximo passo natural para quem se interessa por eletrônica e quer evoluir para um manejo "smart". O protocolo SMART GROW de [Cambra-López et al. (2023)](https://www.sciencedirect.com/science/article/pii/S2468067223000639) detalha esse setup com componentes que somam abaixo de R$ 200, considerando ESP32 (R$ 50), sonda pH analógica (R$ 80), sonda EC (R$ 60) e relé.

## Solução nutritiva: pronta ou pela receita

A solução nutritiva é, na prática, o solo da hidroponia, e o montador tem dois caminhos. Para começar sem erro, use um **kit pronto A+B** do tipo "Hidrogood Folhosas A+B", que custa entre R$ 50 e R$ 90 para preparar 200 litros: basta diluir conforme o rótulo, sem manipular reagentes em pó. É mais caro que comprar os sais separados, mas é a opção recomendada para a primeira safra.
![Preparo de solução nutritiva Furlani caseira com canetas digitais de pH e EC](/blog/hidroponia-caseira-passo-a-passo-monte-seu-sistema-em-casa/preparo-de-solucao-nutritiva-furlani-caseira-com-caneta-2.jpg)
*Preparo da solução Furlani residencial, com canetas de pH e EC para monitoramento.*


Quando quiser baixar o custo e ajustar a fórmula, prepare a solução a partir dos sais seguindo a receita Furlani/IAC. Não vamos repetir aqui a tabela de gramas por litro e a química dos nutrientes: isso está detalhado, com a formulação completa, no nosso [guia completo de solução nutritiva](/blog/solucao-nutritiva-para-hidroponia-guia-completo-calculadora) e no [passo a passo com tabelas para diferentes volumes](/blog/como-preparar-solucao-nutritiva-passo-a-passo-tabelas-para-1), que trazem inclusive a divisão proporcional para 30 litros domésticos.

**Uma regra que vale para qualquer receita caseira:** dissolva os sais em **dois recipientes separados**, a solução A (nitrato de cálcio e ferro quelatizado) e a solução B (demais sais). Misturar nitrato de cálcio com fosfato no mesmo concentrado provoca precipitação de fosfato de cálcio (sólido branco no fundo), tirando esses dois nutrientes de disponibilidade.

**Faixas operacionais que você precisa monitorar:**

| Parâmetro | Folhosas (alface, rúcula, agrião, manjericão) | Frutos (tomate-cereja, morango, pimenta) |
|---|---|---|
| pH | 5,5 a 6,5 (ideal 6,0) | 5,5 a 6,5 |
| EC inicial | 1,2 a 1,8 mS/cm | 1,8 a 2,8 mS/cm |
| Temperatura da solução | 18 a 26 °C, limite 28 °C | 18 a 28 °C |
| Oxigênio dissolvido | igual ou superior a 5 mg/L | igual ou superior a 5 mg/L |

A medição de pH e EC pode ser feita com canetas digitais de R$ 80 a R$ 150 cada, marca Akso, Hanna ou Mileenium. Em sistemas mais simples, kits colorimétricos com gota e fita servem para começar, mas a precisão é insuficiente para diagnóstico fino. A medição é diária para ambos os parâmetros nas primeiras semanas, podendo cair para a cada três dias depois que o produtor ganhar confiança no manejo.

A renovação completa da solução é feita a cada 15 a 21 dias, ou quando o monitoramento indicar acúmulo de sódio ou desbalanço entre macronutrientes. A desinfecção do reservatório, com hipoclorito de sódio a 1% e enxágue triplo, é obrigatória entre safras para reduzir risco de patógenos como *Pythium aphanidermatum*.

## Iluminação artificial para apartamento sem sol

Apartamentos sem janela voltada para o sol direto, ou em andares baixos sombreados por edifícios vizinhos, exigem iluminação artificial para que folhosas atinjam produção comercial. A literatura recente é precisa sobre os parâmetros mínimos.

A medida que importa é o PPFD (*Photosynthetic Photon Flux Density*), que mede a quantidade de fótons na faixa de 400 a 700 nanômetros por segundo por metro quadrado. Para alface em hidroponia indoor, a faixa recomendada é entre 200 e 400 µmol·m⁻²·s⁻¹ na altura das folhas, com fotoperíodo de 14 a 16 horas, conforme [Tarakanov et al. (2023)](https://www.nature.com/articles/s41598-023-36997-2) em *Scientific Reports* e [Paz et al. (2019)](https://acsess.onlinelibrary.wiley.com/doi/abs/10.2134/urbanag2019.03.0001) em *Urban Agriculture*.

O DLI (*Daily Light Integral*), que integra o PPFD ao longo do dia, deve ficar entre 11 e 17 mol·m⁻²·dia⁻¹ para alface. Acima desse valor, o risco de tip-burn (queima das bordas das folhas internas) cresce. Abaixo, a planta estiola e produz folhas finas e amargas.

Em termos práticos, painéis LED full spectrum de 30 a 60 watts por metro quadrado entregam o PPFD necessário para folhosas, pendurados a 30 a 40 cm das plantas. Modelos comerciais brasileiros começam em R$ 150 e chegam a R$ 600 para sistemas de 60 watts com tunable spectrum. O consumo mensal fica entre 12 e 30 quilowatts-hora, ou R$ 8 a R$ 20 na conta de luz com tarifa residencial padrão.

A relação Vermelho-Azul próxima de 3 para 1 é a recomendação mais consensual para folhosas. Excesso de luz na faixa do far-red (acima de 700 nm) causa alongamento e cabeça frouxa em alface. Espectro full ou ajustável em três canais (azul, vermelho, branco) é o melhor custo-benefício para iniciantes.

## Manejo semanal e calendário de cultivo

A rotina de manejo de uma hidroponia caseira é simples quando o sistema está estabelecido. O calendário abaixo cobre o ciclo completo de uma safra de alface crespa em NFT mini.

| Período | Ações | Tempo estimado |
|---|---|---|
| **Diário** | Conferir nível do reservatório, completar com água. Inspecionar planta visualmente. | 1 a 3 minutos |
| **A cada 2 a 3 dias** | Medir pH e ajustar com ácido fosfórico (1 mL por 10 L) ou hidróxido de potássio diluído. Medir EC e repor solução A+B se EC cair mais de 0,3 mS/cm. | 5 a 10 minutos |
| **Semanal** | Inspeção visual de raízes (cor branca é sinal de saúde, marrom indica *Pythium*, preto indica anaerobiose). Limpar bomba submersa. | 10 a 15 minutos |
| **A cada 15 a 21 dias** | Troca completa da solução nutritiva. Desinfecção do reservatório com hipoclorito a 1% e enxágue triplo. | 30 a 45 minutos |
| **A cada colheita (30 a 45 dias)** | Limpeza profunda com peróxido de hidrogênio a 3%. Inspeção de mangueiras e bomba. | 60 a 90 minutos |

**Cronograma de uma safra de alface crespa em NFT mini:**

- **Dia 0:** semente peletizada em cubo de espuma fenólica, em câmara úmida e escura.
- **Dia 1 a 2:** germinação visível, casca da semente rompida.
- **Dia 3 a 12:** bancada de mudas, com solução diluída a 50% e iluminação suave.
- **Dia 12 a 15:** transplante para o NFT mini, com solução em concentração plena (EC 1,2 mS/cm) e pH 5,8 a 6,2.
- **Dia 15 a 35:** crescimento vegetativo, com aumento progressivo da EC para 1,5 a 1,8 mS/cm.
- **Dia 35 a 45:** colheita, preferencialmente nas primeiras horas do dia, com a planta hidratada.

A colheita é feita arrancando a planta inteira com o cubo de espuma fenólica, que pode ser separado e descartado, ou mantido para venda da alface "viva" em hortifrutis especializados. O torrão preserva a integridade radicular e estende a durabilidade na geladeira para até dez dias.

## 9 erros mais comuns e como evitar

Em sete entre dez consultas que iniciantes brasileiros fazem em fóruns e comunidades de hidroponia caseira, três temas se repetem: contaminação por fungos, erros de pH ou EC, e iluminação insuficiente. A lista abaixo organiza os nove erros mais comuns por gravidade real, com solução prática para cada.
![Comparativo entre raízes hidropônicas saudáveis e raízes contaminadas por Pythium](/blog/hidroponia-caseira-passo-a-passo-monte-seu-sistema-em-casa/comparativo-entre-raizes-hidroponicas-saudaveis-e-raize-3.jpg)
*À esquerda, raiz branca saudável; à direita, raiz marrom indicando contaminação por Pythium.*


1. **Solução nutritiva acima de 28 °C.** A temperatura alta favorece a proliferação de *Pythium aphanidermatum*, oomiceto que apodrece raízes em 3 a 5 dias e pode matar 100% das mudas, conforme reportado por [Patekoski et al. na SciELO PAB](http://www.scielo.br/scielo.php?script=sci_arttext&pid=S0100-204X2010000800005). Solução: refrigerar com chillers ou recirculação noturna, manter pH entre 5,5 e 5,8 em verão, considerar uso preventivo de *Trichoderma* spp.

2. **Reservatório transparente.** A luz que atinge a solução causa proliferação de algas verdes que consomem nitrogênio e fósforo, derrubam a EC e competem com as raízes. Solução: usar caixa opaca, cobrir lateralmente com fita adesiva escura ou tinta acrílica preta.

3. **pH não monitorado.** Fora da faixa de 5,5 a 6,5, o ferro e o cálcio ficam bloqueados, gerando clorose internerval (folhas amarelas com nervuras verdes). Solução: medir a cada 2 a 3 dias e ajustar com ácido fosfórico para baixar e hidróxido de potássio para subir.

4. **Apartamento com luz insuficiente, abaixo de 200 µmol·m⁻²·s⁻¹.** A planta estiola, com caule alongado e folhas finas, e a alface fica amarga. Solução: adicionar painel LED full spectrum de 30 a 60 watts por metro quadrado.

5. **Excesso de sal A+B na crença de "mais é melhor".** EC acima de 3 mS/cm queima raízes (necrose marginal das folhas) e reduz absorção de água. Solução: respeitar a faixa de 1,2 a 1,8 mS/cm para folhosas e 1,8 a 2,8 para frutos.

6. **Falta de oxigenação em DWC.** Raízes 100% submersas sem aeração ficam pretas e apodrecem. Solução: instalar bomba de ar de 2 a 5 L/min com pedra difusora.

7. **Misturar sais A e B concentrados no mesmo recipiente.** Provoca precipitação de fosfato de cálcio (sólido branco no fundo) e perda de nutrientes. Solução: sempre dissolver em recipientes separados, adicionar primeiro a solução A ao reservatório, depois a B.

8. **Usar água de torneira sem desclorar.** O resíduo de cloro entre 0,5 e 2 mg/L mata bactérias úteis e queima raízes jovens. Solução: deixar a água descansar 24 horas em recipiente aberto, usar filtro de carvão ativado, ou tiossulfato de sódio em quantidades calculadas.

9. **Reaproveitar solução por mais de 4 semanas.** Provoca desbalanço entre potássio, cálcio e magnésio, e em frutos induz blossom-end rot. Solução: trocar a solução completa a cada 15 a 21 dias.

## Plantas recomendadas e o que evitar

A hidroponia caseira não atende todas as culturas com a mesma facilidade. A tabela abaixo organiza as opções por dificuldade, ciclo e EC alvo.

| Cultura | Dificuldade | Ciclo após transplante | EC ideal | Notas |
|---|---|---|---|---|
| Alface crespa | Fácil | 30 a 45 dias | 1,2 a 1,8 mS/cm | Cultivar Vera, Vanda, Samira |
| Rúcula | Fácil | 30 a 40 dias | 1,2 a 1,8 mS/cm | Tolerante a calor |
| Manjericão | Fácil | 35 a 50 dias | 1,2 a 1,8 mS/cm | Aroma intenso, gourmet |
| Agrião | Fácil | 30 a 40 dias | 1,0 a 1,4 mS/cm | Prefere temperaturas amenas |
| Hortelã | Fácil | 35 a 45 dias | 1,2 a 1,6 mS/cm | Crescimento exuberante |
| Salsa e cebolinha | Média | 50 a 70 dias | 1,4 a 2,0 mS/cm | Ciclo mais lento |
| Espinafre | Média | 40 a 55 dias | 1,4 a 1,8 mS/cm | Sensível a calor |
| Morango | Média | 60 a 90 dias até flor | 1,8 a 2,2 mS/cm | Requer ajuste de fotoperíodo |
| Tomate-cereja | Avançado | 70 a 90 dias até fruto | 2,0 a 2,8 mS/cm | Precisa de tutoramento |
| Pimenta | Avançado | 80 a 120 dias | 2,0 a 2,8 mS/cm | Calor é necessário |

**O que evitar em hidroponia caseira:**

- **Hortaliças de raiz** como cenoura, beterraba e batata-doce: exigem profundidade de substrato e desenvolvimento radicular vertical, incompatíveis com NFT e Kratky.
- **Cucurbitáceas grandes** como abóbora, melancia e melão: porte excessivo para apartamento.
- **Brássicas pesadas** como repolho e couve-flor: ciclo longo, exigência de espaço e nutrientes que torna o custo-benefício baixo em casa.
- **Milho e leguminosas** como feijão e ervilha: arquitetura da planta não favorece NFT residencial.

> Leia também: [como iniciar cultivo de microverdes em casa](/blog/como-iniciar-cultivo-microverdes-em-casa)

Para diversificar a colheita, microverdes são complemento natural à hidroponia caseira: ciclo de 7 a 21 dias, alta densidade nutricional e preços de mercado entre R$ 160 e R$ 400 por quilo no atacado, especialmente em restaurantes gourmet. Brócolis, rabanete, ervilha e girassol são as variedades mais procuradas.

## Vale a pena? Custo, payback e regulamentação

A pergunta que todo iniciante faz é "compensa montar?". A resposta depende do sistema, da escala e do preço da alface no seu hortifruti de bairro.

**Cenário 1: Kratky doméstico simples (CAPEX R$ 80).** Produção de 6 a 10 alfaces por ciclo de 35 dias. Considerando alface convencional de varejo a R$ 4 a R$ 6 por unidade, a economia mensal é de R$ 25 a R$ 50. Payback: 2 a 4 meses. Excelente custo-benefício para começar.

**Cenário 2: kit Hidrogood Caseiro NFT (CAPEX R$ 600).** Produção de 14 a 20 alfaces por mês. Economia mensal entre R$ 60 e R$ 100. Payback: 6 a 10 meses. Boa relação para quem quer investir um pouco mais e ter colheita contínua.

**Cenário 3: NFT mini smart com IoT (CAPEX R$ 1.500).** Produção de 25 a 40 alfaces por mês, com manjericão e rúcula em rotação. Economia mensal entre R$ 100 e R$ 180. Payback: 9 a 14 meses. Indicado para entusiastas tech.

**Cenário 4: rack vertical Kratky comunitário (CAPEX R$ 400).** Conforme [Gumisiriza et al. (2022)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9596717/), produção anual de cerca de 360 alfaces em 6 metros quadrados de rack, com VPL de US$ 16,37 e TIR de 12,57%. Payback inferior a 12 meses.

**Regulamentação para quem quer vender o excedente:**

A [Lei nº 14.935, de 29 de julho de 2024](https://www12.senado.leg.br/noticias/materias/2024/07/29/lei-cria-a-politica-nacional-de-agricultura-urbana-e-periurbana), criou a Política Nacional de Agricultura Urbana e Periurbana (PNAU), que define agricultura urbana, prevê assistência técnica, linhas especiais de crédito e ocupação de espaços urbanos ociosos para produção de alimentos. A regulamentação operacional está em curso e deve abrir editais via Banco do Brasil, BNDES e MDA até 2026.

Para comercializar o excedente em feiras, hortifrutis ou restaurantes, é necessário formalizar como microempreendedor individual e seguir a [RDC ANVISA nº 14/2014](https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2014/rdc0014_28_03_2014.pdf), que dispõe sobre matérias estranhas em alimentos, e a RDC nº 216/2004, que regula boas práticas de manipulação. A vigilância sanitária local é o órgão de referência para licenciamento.

Cabe destacar que **hidroponia não pode ser rotulada como orgânica no Brasil**, mesmo quando dispensa defensivos. A IN MAPA nº 46/2011 exige solo vivo, o que exclui sistemas hidropônicos do enquadramento orgânico. O Ibrahort articula uma proposta de selo "Cultivo Sustentável Sem Solo" que reconheceria a hidroponia em chave própria, mas a discussão regulatória segue em aberto.

## Perguntas frequentes

### Dá para fazer hidroponia caseira em apartamento sem varanda com sol?
Sim, desde que use iluminação artificial. Painéis LED full spectrum de 30 a 60 watts por metro quadrado entregam o PPFD necessário (200 a 400 µmol·m⁻²·s⁻¹) e DLI de 11 a 17 mol·m⁻²·dia⁻¹, com fotoperíodo de 14 a 16 horas diárias, conforme literatura recente em *Scientific Reports* (2023) e *Urban Agriculture* (2019).

### Qual o sistema mais barato e simples para começar?
Kratky em caixa plástica opaca de 30 litros, com placa de isopor com 6 a 8 furos de 50 mm, net cups e espuma fenólica. CAPEX entre R$ 30 e R$ 150. Não precisa de bomba, energia, nem manutenção complexa. Ideal para a primeira experiência.

### Qual a diferença entre Kratky e NFT?
Kratky é passivo: você adiciona toda a solução uma vez e o nível baixa conforme a planta consome, criando uma zona aerada ao redor da raiz superior. NFT recircula uma lâmina fina de solução com bomba submersa intermitente. Kratky é ideal para folhosas em ciclo curto e iniciantes; NFT permite mais plantas e cultivos sucessivos.

### Onde compro a solução nutritiva?
Em lojas especializadas como Hidrogood, Todo Hidro, Hidroponia 360º e MercadoLivre. Você pode comprar pó pronto A+B (R$ 50 a 90 para 200 litros) ou os sais separados (nitrato de cálcio, nitrato de potássio, MAP, sulfato de magnésio, mix de micros) e seguir a fórmula Furlani/IAC.

### Quais plantas crescem em hidroponia caseira?
Folhosas como alface, rúcula, agrião, espinafre, manjericão, hortelã, salsa e cebolinha são as mais fáceis. Com mais luz, EC maior e mais espaço, é possível produzir morango, tomate-cereja, pimenta e mostarda. Hortaliças de raiz, cucurbitáceas grandes e brássicas pesadas não são adequadas.

### Quanto tempo demora a primeira colheita?
Alface e rúcula entre 30 e 45 dias após a transferência da muda para o sistema. Manjericão entre 35 e 50 dias. Morango leva de 60 a 90 dias até a primeira flor, com frutos a partir de 90 dias.

### Hidroponia caseira é orgânica?
Não. Pela regulamentação brasileira (MAPA IN nº 46/2011), o cultivo orgânico exige solo vivo. Hidroponia usa nutrientes minerais sintéticos. Existe debate regulatório em curso sobre criar uma categoria "hidropônico sustentável" no MAPA, mas ainda não há definição oficial.

### Quanto custa a conta de luz de uma hidroponia em apartamento?
NFT mini com bomba de 25 a 40 watts em ciclo intermitente consome cerca de 5 a 15 quilowatts-hora por mês. Iluminação LED full spectrum de 30 a 60 watts por 14 a 16 horas diárias consome de 12 a 30 quilowatts-hora. Total esperado entre R$ 15 e R$ 50 por mês na conta de energia.

### Posso usar água da torneira?
Sim, mas deixe descansar 24 horas em recipiente aberto para evaporar o cloro residual, ou use filtro de carvão ativado. Idealmente, meça a EC da água antes de usar (água de torneira saudável tem EC entre 0,1 e 0,5 mS/cm).

### Como evitar que a planta pegue fungo, especialmente Pythium?
Mantenha a solução abaixo de 28 °C, troque a cada 15 a 21 dias, mantenha o reservatório sempre opaco e desinfete o sistema entre ciclos com hipoclorito a 1% e enxágue triplo. Como controle biológico preventivo, *Trichoderma harzianum* ou *Clonostachys rosea* reduzem a incidência de *Pythium aphanidermatum*, conforme literatura SciELO PAB.

### Posso vender a alface que sobrar da minha hidroponia caseira?
Sim, desde que formalizado como microempreendedor individual. Deve seguir a RDC ANVISA 14/2014 para matérias estranhas, boas práticas de manipulação e atender à vigilância sanitária local. A Lei 14.935/2024 (PNAU) abre linhas de crédito específicas para agricultura urbana comercial.

### Quanto produzo em um kit caseiro de 1 metro quadrado?
Um kit Hidrogood 1×1 m gera de 14 a 20 plantas por mês de folhosas. Um kit Todo Hidro N4 NFT (96 furos, aproximadamente 2,5 × 1,2 m) chega a 60 a 80 pés de alface por ciclo de 35 dias. Em rack vertical com 3 níveis, conforme demonstrado por Gumisiriza et al. 2022, 6 metros quadrados produzem cerca de 360 alfaces por ano.
