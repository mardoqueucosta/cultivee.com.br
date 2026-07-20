---
titulo: 'Automação e IoT na Hidroponia com ESP32 [2026]'
resumo: >-
  Guia completo de ESP32 na hidroponia: sensores de pH e EC, relés, bombas
  dosadoras, plataformas IoT e custos reais em reais para automatizar sua horta.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-20'
dataModificacao: '2026-07-20'
leitura: '21 min'
tldr: >-
  Automatizar uma hidroponia com ESP32 significa medir pH, condutividade
  elétrica, temperatura, nível e luz de forma contínua e atuar em bombas e
  válvulas por Wi-Fi. Um sistema DIY essencial para 10 a 20 plantas custa entre
  R$ 625 e R$ 1.140 em hardware no Brasil, e a literatura registra redução de
  27,6% no desperdício de nutrientes com controle inteligente. O ponto crítico
  não é o código: é usar um ADC externo ADS1115 nas sondas analógicas e manter
  calibração mensal.
imagens:
  - src: /blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen/placa-esp32-em-caixa-hermetica-instalada-ao-lado-de-ban-1.jpg
    alt: 'Placa ESP32 em caixa hermética instalada ao lado de bancada hidropônica com alfaces em perfis brancos'
    caption: O nó de campo protegido em caixa hermética junto à bancada de folhosas
  - src: /blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen/maos-com-luva-calibrando-sonda-de-ph-bnc-em-frasco-de-s-2.jpg
    alt: 'Mãos com luva calibrando sonda de pH BNC em frasco de solução padrão sobre bancada hidropônica'
    caption: 'Calibração mensal da sonda de pH com soluções padrão é o que garante leitura confiável'
  - src: /blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen/bombas-peristalticas-dosando-solucao-em-reservatorio-de-3.jpg
    alt: 'Bombas peristálticas dosando solução em reservatório de hidroponia NFT com raízes brancas visíveis'
    caption: Bombas peristálticas dosando corretivos de pH no reservatório de recirculação
---
Automatizar uma hidroponia com ESP32 é substituir a rotina de medir pH e condutividade elétrica com caneta na mão, duas vezes por dia, por um nó de campo que lê essas variáveis a cada 30 segundos, registra o histórico e liga bombas dosadoras quando a solução sai da faixa. O hardware essencial para uma bancada de 10 a 20 plantas custa entre R$ 625 e R$ 1.140 em componentes vendidos no Brasil, valor que cabe no orçamento de um hobbyista sério e é irrisório para quem produz comercialmente.

O ganho não é apenas conforto. Um estudo de sistema hidropônico com IoT e aprendizado profundo, testado em alface, reporta redução de 27,6% no desperdício de nutrientes e aumento de 19,3% na produtividade com controle inteligente de solução. Em paralelo, o mercado global de IoT aplicado à agricultura deve sair de US$ 28,63 bilhões em 2024 para US$ 62,72 bilhões em 2032, um CAGR de 10,3% segundo a [Credence Research](https://www.credenceresearch.com/report/iot-in-agriculture-market).

| Fato | Valor |
| --- | --- |
| Mercado IoT agro global em 2032 | US$ 62,72 bi (CAGR 10,3%) |
| Redução documentada de desperdício de nutrientes | 27,6% |
| Hardware DIY essencial no Brasil (jul/2026) | R$ 625 a R$ 1.140 |
| Custo do ADC externo que resolve o erro de leitura | R$ 25 a R$ 40 |

Este guia percorre o caminho completo: por que o ESP32 virou padrão na cena maker agrícola, quais são as seis camadas de um sistema instrumentado, como escolher e ligar cada sensor, como acionar bombas com segurança, qual plataforma IoT usar em cada perfil, quanto custa cada cenário e o que a ANATEL e a LGPD exigem de quem comercializa a produção.

## O que é hidroponia automatizada e por que o ESP32 dominou a cena

Hidroponia automatizada é o cultivo em solução nutritiva no qual microcontroladores e sensores executam a medição, o registro e o controle contínuos das variáveis críticas do sistema, ou seja, pH, condutividade elétrica, temperatura da solução e do ar, umidade relativa, nível do reservatório, luminosidade e oxigênio dissolvido, substituindo a leitura manual por telemetria e atuação remota. A literatura técnica formalizou o conceito como *smart hydroponics* em Abu Sneineh e Shabaneh (2023), publicado na *MethodsX*, que descreve arquiteturas em malha fechada com o ESP32 como nó de campo e uma plataforma em nuvem como camada de visualização e alerta ([DOI 10.1016/j.mex.2023.102401](https://doi.org/10.1016/j.mex.2023.102401)).
![Placa ESP32 em caixa hermética instalada ao lado de bancada hidropônica com alfaces em perfis brancos](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen/placa-esp32-em-caixa-hermetica-instalada-ao-lado-de-ban-1.jpg)
*O nó de campo protegido em caixa hermética junto à bancada de folhosas*

O ESP32 foi lançado pela Espressif em 2016 e resolveu de uma vez o problema que travava a automação amadora: conectividade. A placa integra processador Tensilica Xtensa LX6 dual-core de até 240 MHz, 520 KB de SRAM, Wi-Fi 802.11 b/g/n em 2,4 GHz, Bluetooth Classic e BLE 4.2, 34 GPIO, dois conversores analógico-digitais SAR de 12 bits distribuídos em até 18 canais, além de I2C, SPI, UART e RTC, conforme o [datasheet oficial da Espressif](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf).

A comparação com o Arduino Uno, que ainda aparece em muitos TCCs brasileiros de automação hidropônica, é desproporcional:

| Característica | ESP32 DevKit | Arduino Uno R3 |
| --- | --- | --- |
| Núcleos e clock | 2 núcleos, 240 MHz | 1 núcleo, 16 MHz |
| SRAM | 520 KB | 2 KB |
| Wi-Fi nativo | Sim | Não |
| Bluetooth | Classic e BLE | Não |
| Resolução do ADC | 12 bits | 10 bits |
| GPIO | 34 | 14 digitais, 6 analógicos |
| Preço BR (jul/2026) | R$ 30 a R$ 100 | R$ 50 a R$ 100 (original) |

Ou seja, a placa mais capaz é também a mais barata. Para quem nunca programou microcontrolador, vale começar pelos primeiros passos com Arduino e ESP32 antes de encarar sondas químicas.

Existem variantes e nem todas servem à hidroponia. O ESP32-S2 abre mão do Bluetooth e deve ser evitado. O ESP32-S3 traz aceleração para inferência de modelos e faz sentido em projetos de visão computacional. O ESP32-C3, baseado em RISC-V, é ótimo para nós pequenos de baixo consumo. E o ESP32-C6 traz Wi-Fi 6, BLE 5.3, Thread e Zigbee, o caminho natural para estufas densas em sensores e para integração com o padrão Matter.

**Atenção à homologação.** Todo equipamento com transmissor de radiofrequência comercializado no Brasil precisa de homologação ANATEL, exigência da Resolução nº 715/2019 atualizada pelo [Ato nº 9960 de 28/06/2024](https://informacoes.anatel.gov.br/legislacao/atos-de-certificacao-de-produtos/2024/1959-ato-9960). O módulo ESP32-WROOM-32D possui o ID ANATEL 02152-20-11541, conforme o [certificado publicado pela Espressif](https://www.espressif.com/sites/default/files/ESP32-WROOM-32D_ANATEL_Certification.pdf). Compre de revendedores estabelecidos, como FilipeFlop, Curto Circuito, MakerHero, Eletrogate ou RoboCore, e confira o módulo soldado na placa.

## Anatomia de um sistema hidropônico instrumentado: as seis camadas

Um sistema instrumentado não é um amontoado de sensores. Ele se organiza em seis camadas, e falhar em qualquer uma delas derruba o conjunto. O erro clássico do iniciante é investir 80% do orçamento na camada de sensoriamento e nada na camada de energia, aí o sistema reinicia toda vez que a bomba parte.

| Camada | Função | Componentes típicos | Custo BR aproximado |
| --- | --- | --- | --- |
| Sensoriamento | Medir variáveis físico-químicas | Sondas de pH e EC, DS18B20, BME280 ou SHT31, HC-SR04, BH1750 | R$ 300 a R$ 700 |
| Processamento | Ler o ADC, processar e decidir | ESP32 DevKit e ADS1115 | R$ 65 a R$ 120 |
| Atuação | Acionar bombas, válvulas e luzes | Relé de 4 a 8 canais, bombas peristálticas 12V, bomba submersa, solenoides | R$ 250 a R$ 500 |
| Comunicação | Levar dados à nuvem | Wi-Fi nativo, MQTT, HTTP REST | R$ 0 no free tier |
| Visualização | Painel e alertas | Blynk, ThingSpeak, Home Assistant, Grafana | R$ 0 a R$ 50 por mês |
| Energia | Alimentar tudo | Fonte 12V 5A mais regulador 5V | R$ 50 a R$ 150 |

O fluxo é direto: as sondas químicas entregam sinal analógico ao ADS1115, que converte com 16 bits e entrega ao ESP32 por I2C. Os sensores digitais (DS18B20 em 1-Wire, BME280 e BH1750 em I2C, HC-SR04 em GPIO comum) falam direto com a placa. O firmware compara as leituras com as faixas-alvo, aciona o módulo relé quando precisa corrigir e publica tudo por Wi-Fi. A plataforma armazena a série temporal e dispara alerta no celular quando algo sai do trilho.

Vale a regra de ouro de dimensionamento: **cada camada deve ser projetada para o pior caso, não para o caso médio.** Uma fonte de 12V 2A parece suficiente até o instante em que duas bombas peristálticas e a bomba submersa partem juntas e a tensão despenca abaixo do limiar de brownout do ESP32. Separe a alimentação lógica da alimentação de potência, use capacitor eletrolítico de 1000 µF no barramento de 12V e alimente o ESP32 por regulador dedicado.

Se você ainda não montou a estrutura hidráulica que vai instrumentar, comece pelo [sistema NFT: o que é, como funciona e como dimensionar](/blog/sistema-nft-de-hidroponia-o-que-e-como-funciona-e-como-dimen). Automação sobre hidráulica malfeita apenas registra o problema com precisão de 16 bits.

## Os seis sensores essenciais: escolha, ligação e cuidados

### pH: a variável mais crítica e a mais mal medida
![Mãos com luva calibrando sonda de pH BNC em frasco de solução padrão sobre bancada hidropônica](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen/maos-com-luva-calibrando-sonda-de-ph-bnc-em-frasco-de-s-2.jpg)
*Calibração mensal da sonda de pH com soluções padrão é o que garante leitura confiável*

O pH governa a disponibilidade dos nutrientes. Fora da faixa de 5,5 a 6,5, elementos como ferro, manganês e fósforo precipitam ou ficam indisponíveis mesmo estando presentes na solução. É a variável que mais compensa automatizar, porque é a que mais deriva ao longo do dia conforme a planta absorve cátions e ânions em proporções diferentes.

Duas classes de solução existem no mercado:

| Classe | Modelo | Precisão | Interface | Preço |
| --- | --- | --- | --- | --- |
| Entrada | PH-4502C com sonda BNC | ±0,1 após calibração | Analógico | R$ 90 a R$ 180 |
| Profissional | Atlas Scientific EZO-pH | ±0,002 | I2C ou UART | US$ 45,99 mais sonda de US$ 50 a US$ 85 ([Atlas Scientific](https://atlas-scientific.com/embedded-solutions/ezo-ph-circuit/)) |

O módulo PH-4502C atende bem o hobbyista e o pequeno produtor, **desde que não seja ligado diretamente no ADC do ESP32**. Esse é o erro mais disseminado nos tutoriais em português. O conversor interno do ESP32 apresenta não linearidade conhecida nas extremidades da escala, o que introduz erro de leitura e torna a medição pouco confiável para pH. A solução custa entre R$ 25 e R$ 40: um ADS1115, conversor de 16 bits com interface I2C, instalado entre a sonda e a placa. O blog da [Eletrogate documentou esse caminho](https://blog.eletrogate.com/monitorando-o-ph-de-liquidos-com-esp32-e-sensor-ph-4502c/) com código em PlatformIO e calibração passo a passo.

Calibração não é evento único. Sondas de pH degradam em 6 a 12 meses de uso contínuo em solução nutritiva. Recalibre mensalmente com soluções padrão de pH 4,0, 7,0 e 10,0, guarde a sonda em solução de armazenamento (nunca em água destilada, que lixivia o bulbo) e registre a data da última calibração no próprio firmware, gravada em NVS via biblioteca `Preferences`.

### Condutividade elétrica: EC, TDS e a confusão de escalas

A EC mede a concentração total de sais dissolvidos e é o indicador direto da força da solução nutritiva. A opção de entrada mais usada é o sensor DFRobot Gravity TDS SEN0244, de US$ 11,80 na [loja do fabricante](https://www.dfrobot.com/product-1662.html), com precisão de ±10% do fundo de escala. O nível profissional é a sonda Atlas Scientific K1.0, faixa de 0,07 a 50.000 µS/cm, entre US$ 109 e US$ 140.

Cuidado com a nomenclatura. EC é a grandeza física, medida em µS/cm ou mS/cm. TDS é uma estimativa derivada, em ppm, calculada como EC multiplicada por 0,5 (escala 500, padrão americano) ou por 0,7 (escala 700, padrão europeu). Comparar o TDS de um medidor com o de outro sem saber a escala produz divergências de 40% que parecem defeito de sensor e são só unidade diferente. Para alface, a faixa usual é EC de 1,2 a 1,8 mS/cm, o que dá de 600 a 900 ppm na escala 500. Os alvos por cultura e o cálculo dos sais estão detalhados no [guia completo de solução nutritiva](/blog/solucao-nutritiva-para-hidroponia-guia-completo-calculadora).

A sonda de EC exige compensação de temperatura. A condutividade de uma mesma solução varia cerca de 2% por grau Celsius, então uma leitura às 6h da manhã e outra às 14h podem diferir 15% sem que nada tenha mudado quimicamente. Por isso o DS18B20 não é opcional: ele é insumo do cálculo de EC.

### Temperatura da solução, ar e umidade

O DS18B20 na versão à prova d'água custa de R$ 15 a R$ 30, cobre de -55 °C a +125 °C com ±0,5 °C e conversa por 1-Wire, permitindo vários sensores no mesmo pino com as bibliotecas `OneWire` e `DallasTemperature`. Temperatura de solução acima de 28 °C reduz o oxigênio dissolvido e abre a porta para *Pythium*, tema tratado no guia de [pragas e doenças em hidroponia e cultivo protegido](/blog/pragas-e-doencas-em-hidroponia-e-cultivo-protegido).

Para o ar, o BME280 (R$ 35 a R$ 60) entrega temperatura, umidade e pressão com ±1 °C e ±3% de UR. O SHT31 (R$ 80 a R$ 130) é mais preciso, com ±0,3 °C e ±2% de UR, e traz aquecedor interno anti-condensação, diferencial real em estufa brasileira onde a umidade passa de 90% na madrugada. Com temperatura e umidade em mãos você calcula o VPD, variável central da climatização discutida no guia de [agricultura em ambiente controlado](/blog/cea-agricultura-em-ambiente-controlado-no-brasil).

### Nível do reservatório e luminosidade

O HC-SR04 ultrassônico (R$ 15 a R$ 30) mede o nível sem contato com a solução, o que elimina corrosão de eletrodo e falso contato de boia. Instale-o no topo do reservatório, apontado para a superfície, e converta a distância em volume conhecendo a geometria do tanque. O alerta de nível baixo é o que evita a queima da bomba submersa em uma noite de evapotranspiração alta.

O BH1750 (R$ 20 a R$ 40) mede iluminância em lux com interface I2C. Ele não substitui um quantômetro de PAR, porque lux é grandeza fotométrica ponderada pela visão humana e não pela fotossíntese, mas serve muito bem para confirmar fotoperíodo, detectar lâmpada queimada e registrar a curva diária. Para converter e planejar espectro de verdade, veja [iluminação LED para plantas: espectro, DLI e PPFD](/blog/iluminacao-led-para-plantas-espectro-dli-e-ppfd).

### Tabela consolidada e pinagem sugerida

| Variável | Sensor | Interface | GPIO sugerido | Preço BR |
| --- | --- | --- | --- | --- |
| pH | PH-4502C via ADS1115 | Analógico para I2C | 21 (SDA) e 22 (SCL) | R$ 90 a R$ 180 |
| EC/TDS | SEN0244 via ADS1115 | Analógico para I2C | 21 e 22 | R$ 70 a R$ 150 |
| Temperatura da solução | DS18B20 | 1-Wire | 4 | R$ 15 a R$ 30 |
| Temperatura e UR do ar | BME280 ou SHT31 | I2C | 21 e 22 | R$ 35 a R$ 130 |
| Nível | HC-SR04 | Digital | 5 (trig) e 18 (echo) | R$ 15 a R$ 30 |
| Luz | BH1750 | I2C | 21 e 22 | R$ 20 a R$ 40 |
| Relés | Módulo 4 canais | Digital | 25, 26, 27 e 33 | R$ 24 a R$ 42 |

**Pinos proibidos:** GPIO 6 a 11 estão ligados à memória flash interna e usá-los trava a placa. GPIO 34 a 39 são somente entrada e não acionam relé. GPIO 0, 2 e 15 têm função de boot e podem impedir a inicialização se estiverem em nível lógico errado na partida.

Para um panorama mais amplo de instrumentação agrícola além da hidroponia, vale o guia de escolha e implementação de sensores para agricultura.

Segundo a [Eletrogate](https://blog.eletrogate.com/monitorando-o-ph-de-liquidos-com-esp32-e-sensor-ph-4502c/), o ADC do ESP32 não é muito confiável para leitura de pH, o que justifica o uso do conversor externo ADS1115.

## Atuadores: relés, bombas dosadoras e a disciplina do fail-safe

Ler é barato e seguro. Atuar é onde o projeto pode alagar a casa ou queimar a bancada. Quatro atuadores cobrem quase toda a demanda de uma hidroponia de pequeno e médio porte:

| Atuador | Especificação | Preço BR (2026) | Função |
| --- | --- | --- | --- |
| Módulo relé 4 canais 5V | 10 A por canal | R$ 23,90 ([Curto Circuito](https://curtocircuito.com.br/modulos/modulo-rele)) | Liga bombas, LEDs e oxigenador |
| Módulo relé 8 canais 5V | 10 A por canal | R$ 27 a R$ 42 ([A2 Robotics](https://www.a2robotics.com.br/modulo-rele-08-canais-05v)) | Múltiplas zonas |
| Bomba peristáltica 12V | 100 ml/min, 350 mA | R$ 79 a R$ 80 ([WJ Componentes](https://www.wjcomponentes.com.br/motores/bomba-dosadora-peristaltica-12v)) | Dosagem de pH up, pH down, nutriente A e B |
| Solenoide 12V de 1/2" | Normalmente fechada, 0,02 a 0,8 MPa | R$ 30 a R$ 60 | Irrigação e dreno |
| Bomba submersa 12V | 240 a 800 L/h | R$ 40 a R$ 80 | Recirculação NFT e DFT |
| Contator AC | Até 25 A | R$ 50 a R$ 150 | Bombas de 220V |

Cinco regras não negociáveis de atuação segura:

1. **Use relé com optoacoplador.** O acoplamento óptico isola galvanicamente a lógica de 3,3V do circuito de potência. Módulos sem optoacoplador injetam ruído de chaveamento no barramento e resetam o ESP32.
2. **Nunca ligue bomba de 220V direto no relé do módulo.** A corrente de partida de um motor indutivo chega a várias vezes a corrente nominal e solda o contato do relé. Use o relé para acionar um contator, e o contator para acionar a bomba.
3. **Prefira o contato normalmente aberto (NA).** Se o ESP32 travar ou perder alimentação, tudo desliga. Bomba parada por 20 minutos é problema recuperável. Bomba dosando ácido por 20 minutos não é.
4. **Imponha timeout por ciclo de bomba.** Calcule quantos mililitros a bomba peristáltica entrega em 5 segundos e limite o firmware a essa dose por evento, com intervalo mínimo de 15 minutos entre doses para a solução homogeneizar. Dosagem sem tempo de mistura gera oscilação em torno do alvo, o clássico *overshoot* de quem controla pH sem paciência.
5. **Configure o watchdog.** Chame `esp_task_wdt_init()` e alimente o cão a cada laço. Sem isso, um travamento no cliente Wi-Fi congela o firmware com o último estado dos relés preservado, que é exatamente o cenário do item 3.

Sobre segurança elétrica, o painel de comando de uma hidroponia comercial está sujeito à NR-10, e as partes móveis das bombas à NR-12. Painel com disjuntor dedicado, DR de 30 mA e aterramento não é excesso de zelo em ambiente onde água e eletricidade convivem a 20 centímetros de distância.

## Plataformas IoT comparadas: onde seus dados vão morar

Escolher a plataforma antes de comprar o sensor é um erro comum e caro. A escolha depende de três perguntas: quantos dispositivos você terá, por quanto tempo precisa do histórico e se aceita depender de servidor de terceiro.

| Plataforma | Free tier | Protocolo | Hospedagem | Melhor para | Limite crítico |
| --- | --- | --- | --- | --- | --- |
| Blynk | 2 dispositivos, 20 datastreams, 10 widgets, 1 M datapoints/mês ([Blynk](https://www.blynk.io/pricing)) | API própria | Nuvem | App mobile rápido | Free curto para 2 bancadas |
| ThingSpeak | 4 canais, 3 milhões de mensagens por ano, intervalo mínimo de 15 s ([MathWorks](https://thingspeak.mathworks.com/pages/license_faq)) | HTTP REST | Nuvem | Análise e MATLAB | 15 s entre atualizações |
| Home Assistant com ESPHome | Gratuito e ilimitado | API ESPHome | Local | Integração casa e horta | Exige servidor local |
| Node-RED, InfluxDB e Grafana (stack MING) | Gratuito | MQTT | Local ou VPS | Produção comercial | Curva de aprendizado |
| Adafruit IO | 10 feeds, 30 pontos/min, 30 dias de retenção | MQTT e HTTP | Nuvem | Tutoriais maker | Retenção curta |
| Firebase RTDB | 1 GB e 10 GB/mês | WebSocket | Nuvem | App próprio | Sem painel pronto |
| HiveMQ Cloud Free | 100 conexões ([HiveMQ](https://www.hivemq.com/blog/hivemq-vs-mosquitto-an-mqtt-broker-comparison/)) | MQTT | Nuvem | Escalar broker | Sem SLA |

**Recomendação por perfil.** Para o hobbyista com uma bancada, Blynk resolve em uma tarde e entrega app no celular sem escrever front-end. Para quem quer histórico longo e análise estatística, ThingSpeak, com a ressalva de que o intervalo mínimo de 15 segundos entre atualizações inviabiliza telemetria de alta frequência. Para quem já tem automação residencial, ESPHome com Home Assistant é imbatível: você descreve o hardware em YAML, o compilador gera o firmware e os sensores aparecem no painel sem uma linha de C++. A [documentação oficial do ESPHome](https://esphome.io/index.html) cobre nativamente DS18B20, BME280, BH1750, ADS1115 e HC-SR04, e a comunidade publicou [template pronto para o kit hidropônico da Atlas Scientific](https://community.home-assistant.io/t/atlas-scientific-wi-fi-hydroponics-kit-example-yaml/538083).

Para produção comercial, a referência é a stack MING: MQTT como transporte, InfluxDB como banco de séries temporais, Node-RED como motor de regras e Grafana como painel. Cardoso e colaboradores validaram exatamente essa arquitetura em um NFT comercial com ESP32, publicado em 2025 nos *Engineering Proceedings* da MDPI ([mdpi.com/2673-4591/122/1/3](https://www.mdpi.com/2673-4591/122/1/3)). A vantagem sobre as nuvens gratuitas é que ninguém muda seus limites de uso de um dia para o outro e o dado histórico de três safras continua seu.

Sobre frequência de amostragem, o consenso prático é 15 a 60 segundos para pH e EC, e 1 a 5 minutos para temperatura e umidade. Amostrar pH a cada segundo apenas enche o banco de ruído: a inércia química do reservatório é de minutos, não de segundos.

## Protótipo em sete dias: do componente à bancada monitorada

Um roteiro realista para quem tem noção básica de eletrônica e nunca fez IoT agrícola.
![Bombas peristálticas dosando solução em reservatório de hidroponia NFT com raízes brancas visíveis](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen/bombas-peristalticas-dosando-solucao-em-reservatorio-de-3.jpg)
*Bombas peristálticas dosando corretivos de pH no reservatório de recirculação*

**Dia 1: bancada de teste.** Monte o ESP32 na protoboard, instale o PlatformIO no VS Code (a [documentação da plataforma espressif32](https://docs.platformio.org/en/latest/platforms/espressif32.html) cobre a configuração do `platformio.ini`) e faça piscar o LED. Conecte ao Wi-Fi e imprima o IP no monitor serial. Objetivo do dia: toolchain funcionando.

**Dia 2: sensores digitais.** Ligue o DS18B20 no GPIO 4 com resistor de pull-up de 4,7 kΩ, e o BME280 e o BH1750 no barramento I2C (GPIO 21 e 22). Rode um scanner I2C para confirmar os endereços (0x76 ou 0x77 para o BME280, 0x23 para o BH1750). Bibliotecas: `OneWire`, `DallasTemperature`, `Adafruit_BME280` e `BH1750`.

**Dia 3: ADS1115 e sonda de pH.** Instale o ADS1115 no mesmo barramento I2C (endereço 0x48) e ligue a saída analógica do PH-4502C na entrada A0. Com a biblioteca `Adafruit_ADS1X15`, leia a tensão bruta. Não tente converter em pH ainda.

**Dia 4: calibração.** Aqui está o dia que separa o projeto que funciona do que gera número bonito e errado. Mergulhe a sonda na solução padrão de pH 7,0, aguarde estabilizar por 2 minutos e anote a tensão. Repita com pH 4,0. Você tem dois pontos, então calcule a reta: `pH = a * tensao + b`. Grave `a` e `b` na NVS com `Preferences` para sobreviver ao reboot. Repita o procedimento com a sonda de EC usando solução padrão de 1413 µS/cm.

**Dia 5: telemetria.** Publique as leituras. Se optou por MQTT, use `PubSubClient` e organize os tópicos por hierarquia, como `hidroponia/bancada1/ph`. Se optou por Blynk, use a biblioteca oficial e mapeie cada variável a um datastream. Implemente `WiFi.setAutoReconnect(true)` e uma rotina de reconexão periódica.

**Dia 6: atuação.** Ligue o módulo relé de 4 canais nos GPIO 25, 26, 27 e 33. Canal 1 para a bomba submersa de recirculação, canais 2 e 3 para as bombas peristálticas de pH down e pH up, canal 4 reservado. Implemente a lógica com banda morta: só corrija pH se o desvio for maior que 0,2, dose por no máximo 5 segundos e espere 15 minutos antes de reavaliar.

**Dia 7: resiliência e painel.** Ative o watchdog, implemente buffer local em LittleFS para gravar leituras durante quedas de conexão e monte o painel com os gráficos de pH, EC, temperatura e nível. Configure alerta de pH fora da faixa e de nível baixo. Rode 48 horas em vazio, sem plantas, com a solução circulando, e só então transfira as mudas.

Bibliotecas indispensáveis, consolidadas: `OneWire`, `DallasTemperature`, `Adafruit_BME280` ou `Adafruit_SHT31`, `Adafruit_ADS1X15`, `BH1750`, `WiFiManager`, `PubSubClient`, `ESPAsyncWebServer` com `AsyncTCP`, e `Preferences` para persistência.

Se você vai instrumentar uma cultura específica, vale calibrar os alvos de pH e EC pela cultura antes de programar as faixas do firmware. O [guia completo de alface hidropônica](/blog/guia-completo-de-alface-hidroponica-do-plantio-caseiro-a-pro) traz as faixas da folhosa mais cultivada em NFT no Brasil, e quem trabalha com ciclos curtos encontra os parâmetros em [como iniciar o cultivo de microverdes em casa](/blog/como-iniciar-cultivo-microverdes-em-casa).

## O que acontece na escala comercial brasileira

A cena maker e o mercado profissional brasileiro raramente se encontram nos tutoriais, e isso empobrece os dois lados. Vale conhecer o que já roda em escala no país.

A **Pink Farms**, em São Paulo, opera a maior fazenda vertical da América Latina e reporta produtividade da ordem de 100 vezes a de um hectare de campo aberto por metro quadrado cultivado, segundo reportagem do [Brasilagro](https://www.brasilagro.com.br/conteudo/conheca-a-pink-farms-maior-fazenda-urbana-vertical-da-america-latina.html). A **BeGreen** instalou fazendas urbanas dentro de shoppings em parceria com a [ALLOS](https://allos.co/artigo/allos-e-begreen-uma-parceria-de-inovacao-e-sustentabilidade/), aproveitando a proximidade com o consumidor para eliminar a logística refrigerada. A **Fazenda Cubo** cultiva mais de 30 cultivares em cerca de 90 m² de área útil, conforme perfil publicado pela [StartSe](https://www.startse.com/artigos/fazenda-cubo-urbana-vertical/).

Do lado industrial, a **HidroGood** é o fabricante nacional de referência em estruturas e insumos e mantém [material técnico sobre controle nutricional por automação](https://hidrogood.com.br/artigos/hidroponia/controle-nutricional-atraves-da-automacao/). No IoT agrícola mais amplo, a **Agrosmart** captou US$ 5,8 milhões em Série A e atende clientes como Coca-Cola e Cargill em nove países ([AgFunderNews](https://agfundernews.com/brazils-agrosmart-raises-5-8m-series-a-for-digital-tool-serving-coca-cola-cargill)), e a **Solinftec**, de Araçatuba, opera com mais de 800 funcionários.

A pesquisa pública acompanha. A **Embrapa Agricultura Digital**, em Campinas, coordena o SitIoT, um sandbox aberto onde startups testam sensores em campo, com linhas de trabalho em aprendizado de máquina, visão computacional e blockchain ([Embrapa](https://www.embrapa.br/en/agricultura-digital)). O **LabHidro da UFSC**, coordenado pelo professor Jorge Luiz Barcelos Oliveira, organiza o Encontro Latino-Americano de Hidroponia, cuja XV edição ocorre em 24 e 25 de setembro de 2026 em Florianópolis ([encontrohidroponia.com.br](https://encontrohidroponia.com.br/)). UTFPR, UNESP e UFC acumulam TCCs de automação hidropônica com ESP32, entre eles o [trabalho da UFC sobre sistema hidropônico com antena embarcada](https://repositorio.ufc.br/bitstream/riufc/78439/1/2023_tcc_sjslima.pdf).

Sobre o tamanho do mercado nacional, os números são estimativas e convém dizer isso ao leitor:

> "A produção hidropônica já ocupa entre 1.500 e 3.000 hectares no Brasil."
> Estimativas da Embrapa citadas pela [Revista Cultivar](https://revistacultivar.com.br/noticias/producao-hidroponica-ja-ocupa-ate-tres-mil-hectares-no-brasil)

Não existe censo formal de produtores hidropônicos no país. Nem a CONAB nem o IBGE publicam série específica para o sistema, o que significa que qualquer número redondo que você encontrar por aí é extrapolação. Para o IoT agrícola brasileiro em geral, a projeção divulgada pelo [Data Center Dynamics](https://www.datacenterdynamics.com/br/an%C3%A1lises/iot-no-agroneg%C3%B3cio-novas-din%C3%A2micas-de-produ%C3%A7%C3%A3o-no-campo-brasileiro/) é de até US$ 21 bilhões em 2025.

## Regulação: ANATEL, LGPD e o selo que a hidroponia não pode usar

Três pontos regulatórios são sistematicamente ignorados pelos tutoriais e importam para quem vende a produção.

**ANATEL.** Todo transmissor de radiofrequência comercializado precisa de homologação. Para uso pessoal ou educacional, comprar placa com módulo já homologado resolve. Se você desenvolver um controlador para vender a terceiros, o produto final integrado passa a exigir processo próprio de certificação junto a organismo acreditado.

**LGPD.** A Lei 13.709/2018 alcança o agronegócio inclusive quando o produtor é pessoa física, como argumentam análises publicadas no [Conjur](https://www.conjur.com.br/2021-jan-10/opiniao-impactos-lgpd-cadeia-agronegocio/). Dados puramente técnicos (pH, EC, temperatura) não são dados pessoais e ficam fora do escopo. Passam a estar dentro quando o sistema registra biometria de ponto de funcionários, cadastro de clientes do e-commerce de hortaliças, imagens de câmeras com pessoas identificáveis ou geolocalização vinculada ao CPF do produtor. Nesses casos, é preciso base legal, política de privacidade e, dependendo do porte, encarregado nomeado. O nível de preparo do setor é baixo: estudo da ABES com a EY apontou apenas 31,13% das empresas do agronegócio em conformidade, conforme divulgado pelo [Banco do Nordeste](https://bnb.gov.br/agroinforma/-/asset_publisher/ji416hA780C3/content/agricultura-4.0-a-lgpd-como-prote%C3%A7%C3%A3o-de-dados-e-gera%C3%A7%C3%A3o-de-valor/45799).

**MAPA e o selo orgânico.** A [Portaria nº 52/2021](https://wikisda.agricultura.gov.br/dipoa_baselegal/port_52-2021_regulamento_org%C3%A2nicos.pdf) mantém a hidroponia fora do escopo da produção orgânica brasileira, porque o sistema utiliza solução nutritiva mineral. Você pode e deve comunicar "hidropônico", "cultivo protegido" e "livre de agrotóxicos" quando for verdade, mas não pode estampar o selo Orgânico Brasil. Automação nenhuma muda essa classificação.

## Custos reais: quatro cenários em reais

| Cenário | Escopo | Investimento | Observação |
| --- | --- | --- | --- |
| Manual | Caneta de pH e caneta de EC, medição 2x ao dia | R$ 150 a R$ 400 | Sem histórico, sem alerta, sem atuação |
| DIY essencial | ESP32, ADS1115, pH, EC, DS18B20, BME280, HC-SR04, relé 4 canais, 2 bombas peristálticas, fonte | R$ 625 a R$ 1.140 | Cobre bem de 10 a 20 plantas |
| DIY PRO | Sondas Atlas Scientific, oxigênio dissolvido, relé 8 canais, servidor local, nobreak | R$ 2.000 a R$ 4.000 | Precisão de laboratório, 50+ plantas |
| Comercial turnkey | Painel de fabricante com garantia e suporte | R$ 3.000 a R$ 15.000+ | Instalação e assistência inclusas |

A conta que interessa é a de retorno. Em uma bancada NFT de folhosas, a perda típica de um lote por descontrole de pH ou por bomba parada durante um fim de semana equivale a semanas de faturamento. O sistema DIY essencial se paga na primeira perda evitada. Para produtor comercial, o cálculo completo de CAPEX, OPEX e payback está no guia de [viabilidade econômica e ROI da hidroponia comercial](/blog/viabilidade-economica-e-roi-da-hidroponia-comercial).

Vale registrar onde o dinheiro costuma ser mal alocado: comprar sonda Atlas Scientific de US$ 140 e alimentá-la com fonte chaveada barulhenta de R$ 15 desperdiça a precisão que você pagou. A ordem racional de investimento é energia limpa e estável, depois ADC adequado, depois sonda melhor.

Um sistema hidropônico com IoT e aprendizado profundo, testado em alface, reduziu o desperdício de nutrientes em 27,6% e elevou a produtividade em 19,3% com controle inteligente da solução nutritiva, segundo estudo de monitoramento hidropônico com sensores.

## Para onde a tecnologia caminha até 2030

**AIoT.** A combinação de aprendizado de máquina com telemetria é a fronteira ativa. Baraskar e colaboradores (2025) publicaram na *MethodsX* um sistema hidropônico com classificação de doenças em espinafre por rede neural convolucional, atingindo 81,3% de acurácia com processamento na nuvem ([DOI 10.1016/j.mex.2025.103579](https://doi.org/10.1016/j.mex.2025.103579)). Acurácia dessa ordem ainda não substitui o olho do produtor, mas já serve como triagem para priorizar inspeção.

**ESP32-C6, Wi-Fi 6 e Matter.** Estufas com dezenas de nós sofrem com colisão em Wi-Fi 4. O Wi-Fi 6 melhora a densidade de dispositivos por ponto de acesso, e o suporte a Thread e Zigbee abre caminho para malha própria, útil quando o roteador está a 80 metros da bancada.

**Visão computacional embarcada.** Câmeras acopladas ao ESP32-S3 ou a um Raspberry Pi 5 já contam folhas e estimam área foliar em ambiente de pesquisa. A expectativa de maturidade comercial é entre 2027 e 2029.

**Stack open source profissionalizada.** A validação acadêmica da MING em 2025 reduziu o risco percebido de abandonar plataformas proprietárias. A tendência é o produtor médio migrar de Blynk para InfluxDB e Grafana à medida que o histórico vira ativo.

**Off-grid com energia solar.** Painel de 30 a 50 W, controlador de carga, bateria de 12V 7Ah e regulador buck sustentam um nó com cinco sensores. Com o modo *deep sleep* do ESP32, cujo consumo cai à ordem de dezenas de microampères, a amostragem a cada 5 a 15 minutos multiplica a autonomia. Somado a LoRa, viabiliza monitoramento onde não há Wi-Fi, cenário comum na agricultura familiar.

## Perguntas frequentes

### O ESP32 substitui o Arduino na automação de hidroponia?
Sim, na grande maioria dos projetos. O ESP32 traz Wi-Fi e Bluetooth integrados, CPU dual-core de 240 MHz e 520 KB de SRAM contra 16 MHz e 2 KB do Arduino Uno, e ainda custa menos no Brasil. O Uno continua adequado para projetos didáticos sem conectividade.

### Posso ligar o sensor de pH direto no pino do ESP32?
Pode, mas não deve. O conversor analógico-digital interno do ESP32 tem não linearidade conhecida nas extremidades da escala, o que introduz erro de leitura na medição de pH. Use um ADS1115 de 16 bits por I2C entre a sonda e a placa, componente que custa de R$ 25 a R$ 40.

### Qual plataforma IoT é melhor para começar, Blynk ou ThingSpeak?
Para um ou dois dispositivos com foco em aplicativo no celular, Blynk resolve mais rápido, com free tier de 2 dispositivos e 1 milhão de datapoints por mês. Para histórico longo e análise, ThingSpeak oferece 3 milhões de mensagens por ano com integração ao MATLAB. Para produção comercial, ESPHome com Home Assistant ou a stack MQTT, InfluxDB, Node-RED e Grafana entregam controle total sem custo de licença.

### Quanto custa montar uma hidroponia automatizada com ESP32 do zero?
Um sistema essencial para 10 a 20 plantas, com ESP32, ADS1115, sensores de pH, EC, temperatura, nível e ar, duas bombas peristálticas e módulo relé de 4 canais, sai entre R$ 625 e R$ 1.140 em hardware. Uma versão profissional com sondas Atlas Scientific e oxigênio dissolvido fica entre R$ 2.000 e R$ 4.000, e soluções comerciais prontas começam em R$ 3.000.

### O ESP32 precisa de homologação ANATEL?
Os módulos prontos como o ESP32-WROOM-32D já vêm homologados, com o ID ANATEL 02152-20-11541. Você só precisa de processo adicional se for fabricar e comercializar um produto final integrado contendo o módulo. Para uso pessoal ou educacional, basta comprar de revendedor estabelecido.

### A LGPD se aplica a quem tem hidroponia com IoT?
Sim, sempre que o sistema coletar dados pessoais, como biometria de ponto de funcionários, cadastro de clientes, imagens de câmeras ou geolocalização vinculada ao CPF do produtor. Dados puramente técnicos como pH, EC e temperatura não caracterizam dado pessoal e ficam fora do escopo da lei.

### Como faço o ESP32 continuar funcionando se o Wi-Fi cair?
Implemente três camadas: reconexão automática com `WiFi.setAutoReconnect(true)` mais tentativa periódica, buffer local em LittleFS ou cartão SD para gravar leituras durante a queda e sincronizar depois, e fail-safe nos atuadores que desliga bombas se a comunicação ficar offline além de um limite definido. A biblioteca `WiFiManager` facilita o provisionamento e a reconexão.

### Qual a diferença entre EC, TDS e PPM?
EC é a condutividade elétrica medida em µS/cm ou mS/cm e é a grandeza física fundamental. TDS é uma estimativa em partes por milhão derivada da EC, calculada multiplicando por 0,5 na escala 500 ou por 0,7 na escala 700, conforme o fabricante do medidor. A solução para alface fica tipicamente entre EC 1,2 e 1,8 mS/cm, o equivalente a 600 a 900 ppm na escala 500.

### O ESP32 com sensores de hidroponia pode funcionar com energia solar?
Sim. A configuração usual combina painel de 30 a 50 W, controlador de carga PWM ou MPPT, bateria de 12V 7Ah e regulador buck de 5V. Um nó com ESP32 e cinco sensores consome cerca de 80 a 150 mA contínuos, o que dá de 10 a 18 Wh por dia. Usando o modo deep sleep entre amostragens de 5 a 15 minutos, a autonomia se estende várias vezes.

### Existem papers acadêmicos comprovando que a automação aumenta a produtividade?
Sim. Um estudo de sistema hidropônico com IoT e aprendizado profundo, testado em alface, reporta redução de 27,6% no desperdício de nutrientes e aumento de 19,3% na produtividade com controle inteligente. Estudos anteriores na MethodsX e nos Engineering Proceedings da MDPI validaram arquiteturas com ESP32 em sistemas NFT, com código e hardware documentados em acesso aberto.

### Quais bibliotecas são indispensáveis para hidroponia com ESP32?
Para sensoriamento, `OneWire` e `DallasTemperature` para o DS18B20, `Adafruit_BME280` ou `Adafruit_SHT31` para o ar, `Adafruit_ADS1X15` para o conversor externo e `BH1750` para luz. Para conectividade, `WiFiManager`, `PubSubClient` para MQTT e `ESPAsyncWebServer` com `AsyncTCP`. Para persistência de calibração, `Preferences` ou LittleFS. Recomenda-se PlatformIO no VS Code em vez da IDE do Arduino em projetos com muitas dependências.

### Como integrar o ESP32 ao Home Assistant na minha hidroponia?
Use o framework ESPHome, no qual você descreve o hardware em um arquivo YAML e a ferramenta compila o firmware correspondente. Os componentes ADS1115, DS18B20, BME280, BH1750 e HC-SR04 têm suporte nativo, e a comunidade publicou templates prontos para kits hidropônicos comerciais. O Home Assistant roda em um Raspberry Pi 4 ou 5, com custo aproximado de R$ 600 a R$ 900, e oferece automações ilimitadas sem mensalidade.
