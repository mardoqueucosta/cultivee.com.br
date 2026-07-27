---
titulo: 'Trator Robô Aplica Herbicida Só na Planta Certa [2026]'
resumo: >-
  Retrofit de autonomia integrado à pulverização planta a planta chega ao debate
  agro. Entenda o anúncio Sabanto e o que muda para soja e milho no Brasil.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-27'
dataModificacao: '2026-07-27'
leitura: '17 min'
tldr: >-
  Em 30/06/2026, as americanas Sabanto e Verdant Robotics integraram um kit de
  autonomia para tratores usados a um sistema de pulverização planta a planta:
  o trator dirige sozinho enquanto o implemento decide, em tempo real, onde
  aplicar herbicida. Importa ao Brasil porque defensivos respondem por cerca de
  28% do custo variável da soja 2025/26 e 68% dos tratores nacionais têm mais de
  11 anos, o que torna o retrofit mais realista que comprar máquina nova. Ainda
  não há piloto confirmado no país.
imagens:
  - src: /blog/trator-robo-aplica-herbicida-so-na-planta-certa/trator-autonomo-com-barra-de-pulverizacao-e-sensores-ap-1.jpg
    alt: 'Trator autônomo com barra de pulverização e sensores aplicando herbicida em fileira de soja'
    caption: 'Kit de retrofit converte o trator existente em máquina autônoma que aplica insumo planta a planta'
  - src: /blog/trator-robo-aplica-herbicida-so-na-planta-certa/barra-de-pulverizacao-seletiva-com-cameras-acionando-bi-2.jpg
    alt: 'Barra de pulverização seletiva com câmeras acionando bico sobre planta daninha isolada na lavoura'
    caption: 'A visão computacional distingue cultura de daninha e aciona apenas o bico sobre o alvo'
  - src: /blog/trator-robo-aplica-herbicida-so-na-planta-certa/produtor-rural-supervisiona-com-tablet-um-trator-autono-3.jpg
    alt: 'Produtor rural supervisiona com tablet um trator autônomo operando ao fundo na lavoura de grão'
    caption: 'A autonomia desloca o trabalho da cabine para a supervisão remota de várias máquinas'
---
Duas empresas americanas, a Sabanto e a Verdant Robotics, anunciaram em 30 de junho de 2026 a integração técnica entre um sistema de retrofit de autonomia para tratores já existentes e um sistema de pulverização planta a planta. Na prática, o trator navega sozinho pela lavoura enquanto o implemento identifica cada planta e decide, em tempo real, onde aplicar herbicida e onde não aplicar. Nem o trator autônomo nem a pulverização seletiva são novidade isolada, ambos já operam no Brasil separadamente. A novidade é os dois sistemas conversarem em tempo real, apontando para onde a agricultura de precisão caminha: não trocar a frota, e sim agregar autonomia e visão computacional ao trator que o produtor já tem.

Três números explicam por que isso interessa ao produtor brasileiro de grão:

| Fato | Número | Fonte |
|---|---|---|
| Peso dos defensivos no custo variável da soja 2025/26 | ~28% | Agroadvance/Aprosoja-MS (2025) |
| Frota nacional de tratores com mais de 11 anos | 68% | Cogo Inteligência / ANFAVEA (2025) |
| Crescimento do uso de herbicida no Brasil (2010 a 2020) | +128% | Procópio et al. (2024) |

Este artigo trata do tema pela ótica da grande lavoura de soja e milho, não do cultivo protegido. Para automação de sensores e monitoramento em hidroponia, o guia canônico do site é [automação e IoT com ESP32](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen).

## O que a Sabanto e a Verdant Robotics anunciaram, de fato

Retrofit de autonomia agrícola é a instalação de um kit de hardware e software sobre um trator já existente, transformando-o em máquina autônoma sem substituir o chassi, o motor ou a transmissão original. Esse kit reúne posicionamento por satélite de alta precisão (GNSS), câmeras, sensores de detecção de obstáculo, uma unidade de controle veicular e um software de planejamento de rota. A própria Sabanto define seu sistema como um conjunto que combina GNSS de alta precisão, câmeras e detecção de obstáculos com operação veicular proprietária e planejamento de trajeto, permitindo operação autônoma 24 horas por dia, segundo a [Sabanto Inc.](https://sabantoag.com).
![Trator autônomo com barra de pulverização e sensores aplicando herbicida em fileira de soja](/blog/trator-robo-aplica-herbicida-so-na-planta-certa/trator-autonomo-com-barra-de-pulverizacao-e-sensores-ap-1.jpg)
*Kit de retrofit converte o trator existente em máquina autônoma que aplica insumo planta a planta*

A integração anunciada conecta o Sabanto Autonomy System ao implemento SharpShooter, da Verdant Robotics, por meio do barramento CAN, o padrão de comunicação eletrônica que já existe dentro de qualquer trator moderno. O SharpShooter enxerga planta a planta, distingue cultura de daninha e alimenta o sistema de navegação em tempo real, que então ajusta velocidade e altura do implemento sem intervenção humana.

> "Nosso objetivo sempre foi tornar a autonomia plena acessível e imediatamente valiosa para todos no agronegócio, produtores, fornecedores de implementos, revendedores, fornecedores de insumos e fabricantes de tratores. Ao unir nosso sistema de autonomia retrofit, já comprovado, com a tecnologia SharpShooter da Verdant, entregamos aos produtores mais uma solução completa que funciona no equipamento que eles já têm. Os produtores podem rodar operações de precisão 24 horas por dia, enfrentando de frente a escassez de mão de obra e cortando drasticamente os custos com insumos."
> Craig Rupp, fundador e CEO da Sabanto, em [comunicado PR Newswire (30/06/2026)](https://www.prnewswire.com/news-releases/sabanto-inc-and-verdant-robotics-announce-technical-integration-of-autonomous-tractor-operation-with-sharpshooter-plant-level-precision-application-302813834.html)

Segundo a fabricante, o SharpShooter cobre até 7 acres por hora, cerca de 2,8 hectares por hora, com 99% de precisão dentro de 5 milímetros do alvo, mirando desde plântulas de 2 milímetros até plantas de 24 polegadas de diâmetro ([Verdant Robotics](https://www.verdantrobotics.com/product)). Não existe, até esta apuração, nenhum caso comercial documentado publicamente da combinação Sabanto e SharpShooter, em nenhuma cultura ou país. O case de referência que a própria Sabanto divulga, a Bethel Farms, produtora de grama em placas na Flórida, com mais de 9.900 acres, cerca de 4.008 hectares, e 1.147 horas operados de forma autônoma, usa apenas o sistema de autonomia da Sabanto em roçada, semeadura e gradagem, sem o SharpShooter e sem nenhuma aplicação de herbicida ([Sabanto Inc.](https://sabantoag.com/toolbox/customer-spotlight-bethel-farms)).

## Retrofit ou trator novo: por que essa é a rota mais realista para o Brasil

O argumento central do retrofit é econômico, e ele encaixa como uma luva no perfil da máquina brasileira. A frota nacional é velha: a idade média do trator no Brasil é de 11 anos, e 68% dos tratores e 72% das colheitadeiras têm mais de 11 anos de uso, segundo estudo da Cogo Inteligência citado no relatório [Caminhos da Tecnologia no Agronegócio, da ANFAVEA](https://anfavea.com.br/site/wp-content/uploads/2024/03/Relatorio-completo.pdf). Trocar essa frota inteira por máquinas novas já autônomas de fábrica seria inviável no cenário atual de juros e margem apertada, ainda mais quando as vendas no atacado de tratores de rodas somaram cerca de 45,6 mil unidades em 2024, uma queda de 15,2% frente a 2023.

A proposta do retrofit é justamente evitar o desembolso da máquina nova. Um trator zero no Brasil custa entre R$ 45 mil, nos modelos de entrada, e mais de R$ 300 mil, nos modelos com tecnologia avançada. A Sabanto cita um caso em que o produtor evitou cerca de US$ 2 milhões em upgrade de equipamento ao optar pelo kit em vez da máquina nova. A filosofia, nas palavras da própria empresa, é operar várias máquinas menores em vez de investir em poucas máquinas de alta potência e alto custo.

O Brasil já tem movimentos concretos nessa direção, ainda que separados da integração americana. A PTx, braço de tecnologia da AGCO que atua no país via Fendt, colocou em validação em São Paulo o kit OutRun, um retrofit para operação sem condutor na cabine, com venda comercial prevista apenas para 2027. A John Deere, que fabrica em Horizontina, Montenegro (RS) e Catalão (GO), já disponibiliza kits de retrofit de autonomia para os modelos 8R e 9R, herança da aquisição da Bear Flag Robotics por US$ 250 milhões em 2021, embora o trator totalmente autônomo ainda não tenha data para o mercado brasileiro. Essa camada de decisão embarcada, que lê o campo e comanda a máquina, é uma versão sofisticada da mesma lógica de automação que começa em kits acessíveis de [sensores e controle com ESP32](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen).

Vale notar que o segmento que mais cresce dentro do mercado de tratores autônomos é justamente o das fazendas médias, de 100 a 500 hectares, com CAGR de 23,9% entre 2026 e 2031, porque kits de retrofit e modelos por assinatura reduzem o piso de adoção para esse porte, segundo a Mordor Intelligence. É um recorte que descreve boa parte da propriedade média brasileira de grão fora dos grandes grupos do Centro-Oeste.

## Pulverização seletiva: o que já existe e funciona no Brasil hoje

Pulverização seletiva de precisão é o conjunto de tecnologias que ajustam o tratamento à distribuição irregular das plantas daninhas no campo, usando câmeras, imageamento multiespectral e algoritmos de decisão para aplicar o insumo apenas sobre a planta ou a mancha-alvo. A revisão acadêmica de Gerhards et al. (2022, *Weed Research*, [DOI 10.1111/wre.12526](https://doi.org/10.1111/wre.12526)) consolida a definição. O ponto importante para o leitor é que essa camada já está no Brasil, comercial e funcionando, com nomes conhecidos. O que muda com o anúncio americano é a promessa de acoplar essa camada de aplicação a uma camada de navegação autônoma de terceiros.
![Barra de pulverização seletiva com câmeras acionando bico sobre planta daninha isolada na lavoura](/blog/trator-robo-aplica-herbicida-so-na-planta-certa/barra-de-pulverizacao-seletiva-com-cameras-acionando-bi-2.jpg)
*A visão computacional distingue cultura de daninha e aciona apenas o bico sobre o alvo*

A tabela abaixo compara os principais sistemas de pulverização seletiva e onde cada um está em relação ao mercado brasileiro:

| Sistema | Fabricante | Como detecta a daninha | Economia reportada | Status no Brasil |
|---|---|---|---|---|
| WEEDit | Rometron (Holanda) | Fluorescência de clorofila | 62% em caso real de 322 ha na BA | Comercial, barras de até 32 m |
| WeedSeeker | Trimble (EUA) | Reflectância em duas bandas espectrais | Variável conforme infestação | Comercial |
| See & Spray Select | John Deere | Visão computacional, verde no marrom | Até 90% em pré-emergência | Comercial, feito em Catalão (GO) |
| See & Spray Gen 1/2 | John Deere (EUA) | Câmeras e IA, verde no verde | Média de 77%, acerta 98% das daninhas | Sem data confirmada no Brasil |
| Solix Sprayer | Solinftec (BR) | IA embarcada, robô solar planta a planta | Até 95% (dado da empresa) | Nacional, ~40 unidades em campo |
| SharpShooter | Verdant Robotics (EUA) | Câmeras, IA e bico mirado | >96% de corte em hortaliças (empresa) | Sem distribuidor confirmado |

O caso brasileiro mais concreto é o do WEEDit instalado em Luís Eduardo Magalhães, na Bahia, que atingiu 62% de economia em uma aplicação de dessecação em 322 hectares, segundo reportagem da [Revista Cultivar (2025)](https://revistacultivar.com.br/noticias/agricultura-de-precisao-no-combate-e-reducao-de-custos-no-manejo-de-plantas-daninhas). No campo nacional autônomo, a referência é a Solinftec, de Araçatuba (SP), com o robô Solix, que faz varredura, pulverização seletiva e caça de pragas com cerca de 40 unidades operando em Bahia, Mato Grosso, Goiás, Mato Grosso do Sul e São Paulo em 2024, e quase 200 unidades no mundo.

A economia possível é grande, mas depende muito da infestação. A própria Embrapa, no documento técnico [Aplicação Localizada de Herbicidas](https://www.infoteca.cnptia.embrapa.br/bitstream/doc/568141/1/doc91.pdf), consolida décadas de estudos que apontam economia de 51% a 94% em milho, 40% em trigo e 72% em soja, além da faixa mais conservadora de 20% a 75% de redução no volume de calda que costuma ser citada por fabricantes de insumo. Nenhum desses números, é importante frisar, foi publicado de forma independente para a integração Sabanto e SharpShooter especificamente.

## Por que o herbicida pesa tanto no bolso do produtor

A economia de herbicida deixou de ser bandeira ambiental para virar questão de sobrevivência de margem. Na safra de soja 2025/26, o custo do herbicida ficou em R$ 292,80 por hectare, uma queda de 26,5% frente aos R$ 398,15 por hectare de 2024/25, mas os defensivos somados (herbicida, fungicida e inseticida) ainda representam cerca de 28% do custo variável total, segundo levantamento do Agroadvance com base em dados da Aprosoja-MS. No agregado, o mercado brasileiro de defensivos movimentou R$ 98,7 bilhões em 2024/25 e deve crescer cerca de 8% em 2025/26, girando a casa dos R$ 106 bilhões, conforme a Kynetec, citada pela [CNN Brasil](https://www.cnnbrasil.com.br/agro/valor-de-mercado-de-defensivos-deve-crescer-cerca-de-8-na-safra-2025-26).

A raiz do problema tem nome: resistência de plantas daninhas ao glifosato. O uso de herbicida no Brasil cresceu 128% entre 2010 e 2020, saltando de 157,5 mil para 329,7 mil toneladas de ingrediente ativo, enquanto a área plantada cresceu apenas 24% no mesmo período. Esse descolamento entre o consumo de veneno e a área é o retrato de daninhas cada vez mais difíceis de controlar com a molécula que sustentou o plantio direto por décadas. É esse o achado central do estudo de Procópio et al. (*Agriculture*, 2024, [DOI 10.3390/agriculture14122315](https://doi.org/10.3390/agriculture14122315)): o crescimento no volume de herbicidas comercializados no Brasil superou muito a expansão da área agrícola no mesmo período, o que os autores associam à pressão da resistência ao glifosato.

O estudo é da Embrapa Meio Ambiente, de Jaguariúna (SP), em parceria com a UniRV, de Rio Verde (GO), e é o tipo de fonte que dá lastro à discussão. Aplicar menos herbicida, e só onde a daninha está, ataca ao mesmo tempo o custo por hectare e a pressão de seleção que gera mais resistência. É por isso que a pulverização planta a planta interessa como estratégia econômica, e não apenas como vitrine tecnológica.

## Mão de obra: a outra dor que a autonomia tenta resolver

Existe um segundo problema que a autonomia promete atacar, e que raramente aparece nas notícias sobre robôs agrícolas: falta gente qualificada para operar as máquinas. No Mato Grosso, 70% dos produtores rurais relatam dificuldade significativa para recrutar profissionais qualificados, com destaque para operadores de máquinas, segundo estudo do IMEA em parceria com o Senar-MT. O operador de máquinas no Centro-Oeste é remunerado acima de R$ 3.000 por mês, muitas vezes com percentual de produtividade sobre a safra, e mesmo assim está em falta.

A proposta da autonomia é permitir que um único gestor supervisione várias máquinas ao mesmo tempo, de forma remota, em vez de precisar de um operador por trator. O marketing da Sabanto vende exatamente essa ideia, operar mais equipamento com menos gente. Convém, porém, ler isso com cuidado: a autonomia não elimina a necessidade de mão de obra qualificada, ela redistribui. O operador que dirigia o trator dá lugar a um técnico capaz de supervisionar frota, interpretar mapas de aplicação e resolver falhas de sensor. É uma competência diferente e, no Brasil, ainda sem trilha de formação específica consolidada. Não foi localizada, nesta apuração, uma formação nacional dedicada à operação de frota autônoma agrícola, o que é uma lacuna de mercado a registrar.

## Quem mais está de olho: mercado e ecossistema

O tamanho desse mercado depende muito de como se define o escopo, e é honesto dizer isso em vez de cravar um único número. O mercado específico de tratores autônomos foi avaliado em US$ 2,20 bilhões em 2025, com projeção de US$ 6,09 bilhões em 2031 e CAGR de 18,47%, segundo a Mordor Intelligence. Já o mercado mais amplo de robôs agrícolas varia de US$ 15 bilhões a US$ 134 bilhões conforme a projeção, porque alguns relatórios incluem drones e robôs de ordenha e outros contam apenas máquinas terrestres. Como base conservadora, a faixa de US$ 15 a 18 bilhões para 2025/26 é a mais defensável.

No ecossistema, o padrão internacional é comprar quem já sabe fazer autonomia em vez de desenvolver do zero. A John Deere adquiriu a Bear Flag Robotics por US$ 250 milhões em 2021, segundo o [The Robot Report](https://www.therobotreport.com/john-deere-acquiring-bear-flag-robotics-250m), e antes já havia comprado a Blue River Technology por US$ 305 milhões em 2017, a origem da tecnologia See & Spray. É plausível que a onda de consolidação se repita com startups de autonomia e visão como a própria Sabanto e a Verdant Robotics.

No Brasil, o campo de pesquisa e produto existe, ainda que jovem. Segundo painel do III Workshop Semear Digital, da Embrapa Agricultura Digital, o país conta com cerca de oito empresas atuando no desenvolvimento de robôs para a agricultura, a maioria em fase de protótipo. A Embrapa Instrumentação, de São Carlos (SP), mantém em parceria com a EESC-USP o desenvolvimento de uma plataforma robótica modular para aquisição de dados em agricultura de precisão. A referência madura de produto nacional é a Solinftec. Para quem quer entender se essa conta fecha na propriedade, a lógica de retorno é a mesma da hidroponia comercial, detalhada no guia de [viabilidade econômica e ROI](/blog/viabilidade-economica-e-roi-da-hidroponia-comercial), e vale a mesma disciplina de calcular payload antes de investir.

Um fator de infraestrutura merece atenção especial no Brasil: conectividade. A John Deere prevê conectar centenas de milhares de máquinas no país e afirma que o Brasil pode liderar a adoção global de maquinário autônomo, mas estima que retrofitar máquinas antigas com conexão via satélite, como Starlink, deve levar até cinco anos, segundo o [Valor International (jan/2025)](https://valorinternational.globo.com/agribusiness/news/2025/01/10/john-deere-predicts-brazil-will-lead-adoption-of-autonomous-farm-machinery.ghtml). Sem sinal confiável no talhão, não há autonomia que se sustente.

## O que ainda falta: regulação, segurança e as ressalvas do próprio anúncio

Aqui está o ponto que a imprensa costuma ignorar. Operar um trator sem ninguém na cabine levanta uma pergunta de segurança que a regulação brasileira ainda não respondeu. A referência internacional é a norma ISO 18497, cuja edição de 2018 foi reescrita em quatro partes em 2024 e trata de projeto seguro, sistemas de proteção contra obstáculos e zonas de operação autônoma, conforme a [ISO 18497-1:2024](https://www.iso.org/standard/82684.html). No Brasil, não existe regulamentação nacional específica para veículo agrícola sem condutor. A NR-31.12 do Ministério do Trabalho cobre máquinas e implementos agrícolas de forma geral, mas foi concebida para operação convencional, com um humano no comando, e o Inmetro, responsável pelos regulamentos técnicos de máquinas importadas, também não trata de autonomia. O produtor que adotar essa tecnologia hoje o faz apoiado em normas voluntárias internacionais, não em uma exigência ou proteção legal brasileira.

Além da lacuna regulatória, o próprio anúncio merece leitura crítica, e ignorar isso seria fazer jornalismo de release requentado. Três ressalvas precisam estar claras:

- **Não há case documentado da combinação, em nenhuma cultura.** O único case comercial público da Sabanto é a Bethel Farms, produtora de grama em placas na Flórida, mas esse case usa só o sistema de autonomia da Sabanto, sem o SharpShooter e sem nenhuma aplicação de herbicida. Não existe, até esta apuração, nenhum caso documentado da integração Sabanto e SharpShooter, nem em grama, nem em grão, nem no Brasil.
- **Não há número auditado de economia.** O comunicado usa expressões como redução drástica, mas não divulga percentual específico e independente de economia de insumo para a integração conjunta.
- **Não há piloto no Brasil.** Até 27 de julho de 2026, não existe distribuidor, piloto de campo ou data de chegada confirmada da integração Sabanto e SharpShooter ao país.

Confundir autônomo com pulverização seletiva também é armadilha comum. São duas camadas tecnológicas distintas que, no Brasil, evoluíram separadas: de um lado, sistemas de aplicação seletiva como WEEDit, WeedSeeker e See & Spray; de outro, o retrofit de navegação como o PTx OutRun. O anúncio americano é relevante porque promete costurar as duas camadas em um único fluxo de dados, algo que ainda ninguém provou em escala na lavoura de grão.

## O que o produtor brasileiro de soja e milho deveria observar antes de investir

A síntese prática é simples: essa é uma tendência a acompanhar de perto, não um produto para comprar amanhã. Antes de considerar qualquer retrofit de autonomia acoplado a pulverização seletiva, três frentes merecem monitoramento.
![Produtor rural supervisiona com tablet um trator autônomo operando ao fundo na lavoura de grão](/blog/trator-robo-aplica-herbicida-so-na-planta-certa/produtor-rural-supervisiona-com-tablet-um-trator-autono-3.jpg)
*A autonomia desloca o trabalho da cabine para a supervisão remota de várias máquinas*

Primeiro, o que já existe e é comprável agora. Pulverização seletiva no Brasil hoje significa See & Spray Select da John Deere, feito em Catalão, o robô Solix da Solinftec, ou barras com WEEDit e WeedSeeker. Esses sistemas têm assistência técnica no país, o que a integração americana ainda não tem. Segundo, a conta do retorno. A economia de herbicida só compensa o investimento se a infestação for irregular o bastante para justificar aplicar planta a planta, e se a área tiver conectividade confiável para sustentar operação autônoma. Terceiro, a régua de risco. Sem regulação nacional específica e sem seguro claramente definido para máquina sem condutor, a responsabilidade por qualquer incidente no campo recai integralmente sobre o produtor.

O caminho mais provável para o Brasil não é o trator novo autônomo de fábrica, e sim o retrofit por camadas: primeiro autosteer e piloto automático, depois autonomia supervisionada, e só então a integração plena com aplicação seletiva. Quem já domina a gestão de dados da própria lavoura, com sensores e monitoramento bem calibrados, chega melhor preparado quando essa tecnologia amadurecer no país. É a mesma disciplina de instrumentação que sustenta qualquer sistema controlado, do talhão de soja ao ambiente protegido descrito no guia de [agricultura em ambiente controlado](/blog/cea-agricultura-em-ambiente-controlado-no-brasil).

## Perguntas frequentes

### O que muda na prática com a integração entre Sabanto e Verdant Robotics?
O trator passa a operar sem ninguém na cabine, sob navegação autônoma da Sabanto, enquanto o implemento SharpShooter, da Verdant Robotics, identifica cada planta e daninha individualmente e aplica insumo só onde é necessário. Os dois sistemas trocam dados em tempo real pelo barramento CAN, segundo o comunicado conjunto de 30 de junho de 2026.

### Essa tecnologia já está disponível no Brasil?
Não. Até 27 de julho de 2026 não há distribuidor, piloto de campo ou data de chegada confirmada da integração Sabanto e SharpShooter ao Brasil. Já operam no país, de forma separada, sistemas de pulverização seletiva como WEEDit, WeedSeeker, See & Spray e o Solix da Solinftec, além do retrofit de autonomia parcial PTx OutRun, em validação em São Paulo com venda comercial só em 2027.

### Quanto de herbicida a pulverização seletiva realmente economiza?
A literatura mostra faixa ampla e dependente da infestação. A Embrapa reporta de 20% a 75% de redução no volume de calda, a John Deere reporta média de 77% na primeira geração do See & Spray e até 90% em pré-emergência, e um caso real com WEEDit em Luís Eduardo Magalhães, na Bahia, chegou a 62% de economia em 322 hectares. Não há número independente publicado para a integração Sabanto e SharpShooter especificamente.

### Por que retrofit e não um trator novo de fábrica já autônomo?
Porque a frota brasileira é majoritariamente antiga, com idade média de 11 anos e 68% dos tratores acima disso, e trocar a frota inteira exigiria capital indisponível no cenário atual de juros altos. Um caso citado pela Sabanto evitou cerca de US$ 2 milhões em upgrade de equipamento ao optar pelo kit de retrofit em vez da máquina nova.

### Isso resolve o problema de falta de mão de obra no campo?
Ajuda a mitigar, mas não elimina. No Mato Grosso, 70% dos produtores relatam dificuldade para contratar operador de máquinas qualificado, segundo IMEA e Senar-MT. A autonomia permite que um único gestor supervisione várias máquinas remotamente, porém exige uma capacitação técnica diferente, o que apenas redistribui a demanda por mão de obra qualificada.

### Qual o principal motivo do aumento do uso de herbicida no Brasil?
A resistência de plantas daninhas ao glifosato. O uso de herbicida no Brasil cresceu 128% entre 2010 e 2020, de 157,5 mil para 329,7 mil toneladas de ingrediente ativo, muito acima da expansão de 24% da área plantada no período, segundo estudo da Embrapa Meio Ambiente com a UniRV (Procópio et al. 2024).

### Existe caso equivalente em soja ou milho, ou só em grama?
Não existe, até esta apuração, nenhum caso comercial documentado publicamente da integração entre Sabanto e SharpShooter, em nenhuma cultura ou país. O único case público da Sabanto, a Bethel Farms, produtora de grama em placas na Flórida, usa apenas o sistema de autonomia da empresa em roçada, semeadura e gradagem, sem o SharpShooter e sem aplicação de herbicida.

### Que segurança existe para operar um trator sem condutor?
A referência internacional é a norma ISO 18497, de 2018, atualizada em quatro partes em 2024, que trata de projeto seguro, proteção contra obstáculos e zonas de operação autônoma. No Brasil não há regulamentação nacional específica para veículo agrícola sem condutor. A NR-31.12 cobre máquinas agrícolas de forma geral, mas foi concebida para operação convencional com operador humano.

### Quanto custa um sistema desse tipo comparado a um trator novo?
Não foi localizado preço público do kit Sabanto ou do SharpShooter para o mercado brasileiro. Como referência, um trator novo no Brasil custa entre R$ 45 mil, nos modelos de entrada, e mais de R$ 300 mil, nos modelos avançados. A proposta do retrofit é justamente evitar esse desembolso, aproveitando a máquina que o produtor já tem.

### Quem mais oferece pulverização seletiva no Brasil hoje?
John Deere, com o See & Spray Select fabricado em Catalão, Goiás; a Solinftec, com o robô nacional Solix, que tinha cerca de 40 unidades em campo no país em 2024; e sistemas importados como WEEDit e WeedSeeker, já instalados em barras de pulverização de até 32 metros.
