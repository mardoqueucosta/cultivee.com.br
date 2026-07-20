---
titulo: 'Monitoramento de Hidroponia com ESP32: Projeto DIY [2026]'
resumo: >-
  Tutorial passo a passo para montar monitoramento de hidroponia com ESP32,
  sensores de pH e EC, Blynk e ThingSpeak por cerca de R$ 595 em peças.
categoria: 'Agro'
categoriaVariant: 'agro'
data: '2026-07-20'
dataModificacao: '2026-07-20'
leitura: '18 min'
tldr: >-
  Montar um monitor de hidroponia com ESP32 custa a partir de R$ 595 no Brasil
  (ESP32 DevKit V1, sensor de pH DFRobot SEN0161-V2, sensor TDS SEN0244, DS18B20
  e buffers de calibração) e leva de 4 a 6 horas para um iniciante. O ESP32 lê
  pH, EC e temperatura, envia para o Blynk (dashboard no celular) e para o
  ThingSpeak (histórico gratuito de 3 milhões de mensagens por ano), avisando
  quando o pH sai da faixa 5,5 a 6,5 recomendada por Furlani (IAC, 1998).
imagens:
  - src: /blog/projeto-diy-monitoramento-de-hidroponia-com-esp32-blynk-e-th/sonda-de-sensor-mergulhada-no-reservatorio-de-um-sistem-1.jpg
    alt: 'Sonda de sensor mergulhada no reservatório de um sistema hidropônico NFT com alfaces ao fundo'
    caption: A sonda instalada no reservatório mede a solução que circula por toda a bancada
  - src: /blog/projeto-diy-monitoramento-de-hidroponia-com-esp32-blynk-e-th/montagem-do-circuito-esp32-em-protoboard-com-jumpers-co-2.jpg
    alt: 'Montagem do circuito ESP32 em protoboard com jumpers coloridos ligando os sensores de hidroponia'
    caption: Montagem em protoboard antes de migrar o circuito para a caixa de proteção
  - src: /blog/projeto-diy-monitoramento-de-hidroponia-com-esp32-blynk-e-th/eletrodo-de-ph-sendo-calibrado-em-copo-com-solucao-tamp-3.jpg
    alt: 'Eletrodo de pH sendo calibrado em copo com solução tampão azul sobre bancada de trabalho'
    caption: Calibração em dois pontos com soluções tampão, repetida a cada 30 dias
---
Monitorar uma hidroponia caseira em tempo real custa entre R$ 595 e R$ 1.090 em peças e cabe em uma tarde de garagem. Com um ESP32 DevKit V1 (R$ 60), sensores DFRobot Gravity de pH e TDS (R$ 430 juntos), um DS18B20 à prova d'água (R$ 25) e as nuvens gratuitas Blynk e ThingSpeak, você acompanha pH entre 5,5 e 6,5, condutividade elétrica de 1,0 a 1,5 dS/m e temperatura da solução de 18 a 22 °C pelo celular, de qualquer lugar, com alerta quando algo sai da faixa.

Este é um tutorial de montagem, não um panorama de tecnologia. Se você ainda está decidindo quais sensores existem, quais protocolos usar ou qual placa comprar, leia antes o nosso [guia conceitual de automação e IoT em hidroponia com ESP32](/blog/automacao-e-iot-em-hidroponia-com-esp32-guia-completo-de-sen), que cobre a teoria de sensores, protocolos de comunicação e comparação entre microcontroladores. Aqui a decisão já está tomada: ESP32, DFRobot Gravity, Blynk e ThingSpeak. O que segue é lista de compras com preço, ligação pino a pino, código comentado em português, calibração com solução tampão e o teste final.

| Fato-chave | Valor |
| --- | --- |
| Custo BR (stack mínimo) | ~R$ 595 |
| Custo BR (stack robusto) | ~R$ 1.090 |
| Parâmetros monitorados | pH, EC, temperatura da solução, temperatura e umidade do ar |
| Tempo de montagem (iniciante) | 4 a 6 h |
| Plataformas usadas | Blynk IoT (dashboard) + ThingSpeak (histórico) |

## O que este projeto faz e para quem serve

Este projeto é um nó de monitoramento hidropônico: um ESP32 alimentado por fonte, com três sondas mergulhadas no reservatório, que lê pH, condutividade elétrica e temperatura a cada 60 segundos e publica os valores simultaneamente em dois serviços de nuvem gratuitos. Ele não corrige nada sozinho na versão descrita aqui, ele avisa. A automação com bombas peristálticas aparece no fim do artigo como upgrade.
![Sonda de sensor mergulhada no reservatório de um sistema hidropônico NFT com alfaces ao fundo](/blog/projeto-diy-monitoramento-de-hidroponia-com-esp32-blynk-e-th/sonda-de-sensor-mergulhada-no-reservatorio-de-um-sistem-1.jpg)
*A sonda instalada no reservatório mede a solução que circula por toda a bancada*

A dor que ele resolve é concreta. Em um sistema NFT com 200 pés de alface e reservatório de 500 litros, uma queda de pH para 4,5 durante um fim de semana bloqueia a absorção de cálcio e a lavoura chega na segunda-feira com necrose de bordas. Quem mede uma vez por dia com caneta de bolso não vê a curva, vê o estrago. Quem mede a cada minuto vê a inclinação e intervém antes.

O público certo para este tutorial: quem já tem um sistema hidropônico rodando (nem que seja uma bancada de 6 perfis na varanda), sabe soldar ou pelo menos usar protoboard, e consegue gravar um sketch pela Arduino IDE. Se você ainda não montou o sistema, comece pelo nosso guia de [hidroponia caseira passo a passo](/blog/hidroponia-caseira-passo-a-passo-monte-seu-sistema-em-casa) e volte aqui depois. Se o sistema já está de pé mas você ainda não domina a química da solução, o [guia completo de solução nutritiva](/blog/solucao-nutritiva-para-hidroponia-guia-completo-calculadora) explica as faixas de pH e EC que este projeto vai vigiar.

A validação acadêmica desse formato de projeto existe. Sneineh e Shabaneh publicaram em 2023 na *MethodsX* o artigo [Design of a smart hydroponics monitoring system using an ESP32 microcontroller and the Internet of Things](https://doi.org/10.1016/j.mex.2023.102401), descrevendo exatamente essa arquitetura (ESP32, sensores de pH e EC, aplicativo Blynk, três bombas auxiliares) e reportando manutenção de pH entre 6,8 e 7,0 e EC entre 1.296 e 1.779 ppm ao longo do ciclo de alface. No Brasil, o TCC de Mangueira no [IFPB Cajazeiras](https://repositorio.ifpb.edu.br/jspui/handle/177683/2954) documenta um sistema equivalente para hidroponia de pequeno porte.

## Lista de compras (BOM) com preços no Brasil

A tabela abaixo é a lista completa do stack robusto. Os itens marcados como opcionais podem ficar de fora sem prejuízo para o funcionamento básico. Preços de referência de julho de 2026 em lojas nacionais como [Eletrogate](https://www.eletrogate.com/) e FilipeFlop, sujeitos a variação cambial porque a maioria dos sensores é importada.

| # | Componente | Modelo recomendado | Preço (R$) | Onde comprar | Função |
| --- | --- | --- | --- | --- | --- |
| 1 | Microcontrolador | ESP32 DevKit V1 (38 pinos) | 60 | Eletrogate, FilipeFlop, Baú da Eletrônica | Cérebro do sistema |
| 2 | Sensor de pH | DFRobot Gravity SEN0161-V2 | 250 | Eletrogate, AliExpress | Mede pH da solução |
| 3 | Sensor TDS/EC | DFRobot Gravity SEN0244 | 180 | Eletrogate, AliExpress | Mede condutividade |
| 4 | Temperatura da solução | DS18B20 à prova d'água + resistor 4,7 kΩ | 25 | Eletrogate | Compensa a leitura de EC |
| 5 | Temperatura e umidade do ar | DHT22 ou BME280 | 35 | Eletrogate | Microclima da estufa |
| 6 | Nível do reservatório (opcional) | A02YYUW ultrassônico UART | 110 | AliExpress | Avisa quando a água baixa |
| 7 | ADC externo (opcional) | ADS1115 16 bits I²C | 30 | Eletrogate | Melhora a leitura analógica |
| 8 | Display (opcional) | OLED SSD1306 0,96" I²C | 25 | Eletrogate | Status local sem celular |
| 9 | Módulo relé | Relé 5 V de 4 canais opto-isolado | 35 | Eletrogate | Aciona bombas na fase 2 |
| 10 | Bomba peristáltica (opcional) | Dosadora DC 12 V | 120 | AliExpress, Mercado Livre | Dosa pH-down e A+B |
| 11 | Fonte 12 V 2 A | Chaveada com plugue P4 | 30 | Eletrogate | Alimenta bombas |
| 12 | Conversor DC-DC | Buck LM2596 (12 V para 5 V) | 12 | Eletrogate | Alimenta ESP32 e sensores |
| 13 | Caixa de proteção | Plástica IP65 | 50 | Eletrogate | Protege a eletrônica na estufa |
| 14 | Soluções tampão | pH 4,01 + 6,86 + 9,18 | 80 | [Bruno Palma Hidroponia](https://brunopalmahidroponia.com.br/) | Calibração do eletrodo |
| 15 | Solução padrão de EC | 1.413 µS/cm (≈707 ppm) | 50 | Bruno Palma Hidroponia | Calibração do TDS |
| | **Total do stack robusto** | | **~1.090** | | |

**Stack mínimo funcional (R$ 595):** ESP32 + sensor de pH DFRobot + sensor TDS + DS18B20 + soluções tampão + fonte + conversor buck. É o suficiente para ler os três parâmetros que mais importam e mandar tudo para a nuvem.

**Stack econômico (R$ 420):** troque o sensor DFRobot de pH pelo módulo PH-4502c (R$ 80 a R$ 150) somado a um ADS1115 (R$ 30) e dispense o display. O ADS1115 compensa o ADC ruidoso do ESP32 nessa configuração. O [blog da Eletrogate](https://blog.eletrogate.com/monitorando-o-ph-de-liquidos-com-esp32-e-sensor-ph-4502c/) tem um tutorial dedicado a essa combinação em português.

**Onde economizar e onde não economizar.** Pode economizar no display, no sensor de nível, na caixa e na placa (protoboard funciona bem para testes de bancada). Não economize no eletrodo de pH: sondas genéricas de menos de R$ 60 no marketplace costumam vir com bulbo de vidro fino, deriva rápida e sem certificado de faixa. E não economize nas soluções tampão. Calibrar com vinagre ou bicarbonato, receita que circula em vídeos de YouTube, é matematicamente inútil porque nenhum dos dois é tamponado com valor conhecido e estável.

Para quem quer comparar antes de decidir se vale a pena o DIY: controladores comerciais brasileiros como o [Cultlight pHEC-B2](https://cultlight.com.br/loja/automacao/controlador-automatico-nutrientes-phec-b2/) custam R$ 4.500 no PIX (R$ 5.000 no cartão), e o [Wi-Fi Hydroponics Kit da Atlas Scientific](https://atlas-scientific.com/kits/wi-fi-hydroponics-kit/) sai por US$ 600 a US$ 900. O DIY custa de um quarto a um oitavo disso, em troca do seu tempo e da sua responsabilidade sobre a calibração.

## Esquema de ligação pino a pino

O ESP32 DevKit V1 tem dois blocos de ADC. O ADC1 (GPIOs 32 a 39) funciona sempre. O ADC2 (GPIOs 0, 2, 4, 12 a 15, 25 a 27) **deixa de funcionar quando o Wi-Fi está ligado**, porque o rádio usa o mesmo periférico. Como este projeto vive conectado, todos os sensores analógicos vão obrigatoriamente no ADC1. Essa é a armadilha número um de quem copia esquema de tutorial de Arduino UNO.
![Montagem do circuito ESP32 em protoboard com jumpers coloridos ligando os sensores de hidroponia](/blog/projeto-diy-monitoramento-de-hidroponia-com-esp32-blynk-e-th/montagem-do-circuito-esp32-em-protoboard-com-jumpers-co-2.jpg)
*Montagem em protoboard antes de migrar o circuito para a caixa de proteção*

| Sensor / módulo | Pino do ESP32 | Tipo | Observação |
| --- | --- | --- | --- |
| Sinal do sensor de pH (SEN0161-V2) | GPIO 35 | ADC1_CH7, entrada | Somente entrada, sem pull-up interno |
| Sinal do sensor TDS (SEN0244) | GPIO 34 | ADC1_CH6, entrada | Somente entrada |
| Dados do DS18B20 | GPIO 4 | Digital 1-Wire | Resistor 4,7 kΩ entre dado e 3,3 V |
| Dados do DHT22 | GPIO 15 | Digital | Resistor 10 kΩ de pull-up |
| SDA do OLED / ADS1115 | GPIO 21 | I²C | Barramento compartilhado |
| SCL do OLED / ADS1115 | GPIO 22 | I²C | Barramento compartilhado |
| IN1 do módulo relé | GPIO 13 | Digital de saída | Relé opto-isolado, lógica invertida |
| RX do A02YYUW (nível) | GPIO 16 | UART2 RX | Sensor transmite em 9600 baud |
| Alimentação dos sensores Gravity | pino 3V3 | Alimentação | Gravity V2 aceita de 3,3 a 5,5 V |
| Terra comum | GND | Referência | Ver ressalva sobre ground loop abaixo |

**Alimentação.** A fonte de 12 V 2 A entra no conversor buck LM2596, ajustado para 5 V com multímetro antes de conectar qualquer coisa (gire o trimpot com a saída medida e sem carga). Os 5 V vão para o pino VIN do ESP32 e para o módulo relé. Os sensores Gravity de pH e TDS ficam nos 3,3 V do próprio ESP32, porque a versão V2 já tem regulador interno e entregar 5 V no sinal analógico com o ADC de 3,3 V queima a entrada. Se o seu sensor for uma versão antiga só de 5 V, use divisor resistivo de dois resistores iguais na saída de sinal.

**O ground loop, explicado.** Eletrodo de pH e sonda de EC são, ambos, células eletroquímicas mergulhadas no mesmo líquido. Quando os dois compartilham o terra e leem ao mesmo tempo, a corrente de excitação do sensor de EC atravessa a solução e aparece como ruído na leitura de pH. O sintoma clássico é o pH oscilar meio ponto sempre que a bomba liga. Há três saídas: usar isoladores analógicos (DFRobot SEN0345 ou equivalente) entre cada sonda e o ADC; multiplexar no tempo, lendo o pH com a excitação do EC desligada e vice-versa; ou alimentar bomba e eletrônica com fontes fisicamente separadas. A segunda opção é gratuita e está implementada no código abaixo.

**Aterramento e instalação.** Se o painel fica em estufa, use caixa IP65 conforme a [ABNT NBR IEC 60529](https://www.abnt.org.br/) e siga a NBR 5410 para a parte de 127/220 V da fonte. Cabo de sonda passando junto de cabo de bomba capta ruído: separe fisicamente, e se não der, use cabo blindado com a malha aterrada em uma ponta só.

## O código comentado, bloco por bloco

O sketch completo tem cerca de 200 linhas. Vou apresentá-lo em blocos, do topo para baixo, para você montar no seu editor com entendimento e não por copiar e colar.

**Bibliotecas a instalar pela Arduino IDE** (Ferramentas → Gerenciar Bibliotecas): `Blynk` (versão 1.3.x ou superior, da Volodymyr Shymanskyy), `OneWire` (Paul Stoffregen), `DallasTemperature` (Miles Burton), `GravityTDS` (DFRobot) e `DHT sensor library` (Adafruit). A biblioteca de pH vem do fork [DFRobot_ESP_PH da GreenPonik](https://github.com/GreenPonik/DFRobot_ESP_PH_BY_GREENPONIK), que precisa ser instalada manualmente pelo ZIP porque adapta a EEPROM do ESP32. Na placa, selecione "DOIT ESP32 DEVKIT V1".

### Bloco 1: credenciais e includes

```cpp
// secrets.h -- este arquivo entra no .gitignore, NUNCA no GitHub público
#define BLYNK_TEMPLATE_ID   "TMPLxxxxxxxx"
#define BLYNK_TEMPLATE_NAME "Hidroponia"
#define BLYNK_AUTH_TOKEN    "seu_token_de_32_caracteres"
#define WIFI_SSID           "SuaRede2G"
#define WIFI_PASS           "sua_senha"
#define TS_API_KEY          "SUA_WRITE_API_KEY"
```

```cpp
#include "secrets.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <BlynkSimpleEsp32.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <EEPROM.h>
#include "DFRobot_ESP_PH.h"
#include "GravityTDS.h"

#define PINO_PH    35   // ADC1_CH7
#define PINO_TDS   34   // ADC1_CH6
#define PINO_DS18  4    // 1-Wire
#define TENSAO_REF 3300 // mV do ADC do ESP32

DFRobot_ESP_PH sensorPH;
GravityTDS      sensorTDS;
OneWire          barramento(PINO_DS18);
DallasTemperature sensorTemp(&barramento);
BlynkTimer       cronometro;

float phAtual = 0, ecAtual = 0, tempAtual = 25.0;
```

O `secrets.h` separado não é preciosismo. Token do Blynk vazado em repositório público dá a qualquer pessoa controle sobre o seu dispositivo, incluindo os relés.

### Bloco 2: leitura com mediana, não com média

```cpp
// Lê 'n' amostras do ADC, ordena e devolve a mediana.
// A mediana descarta picos de ruído que a média simples carregaria.
int lerMediana(int pino, int n) {
  int amostras[n];
  for (int i = 0; i < n; i++) {
    amostras[i] = analogRead(pino);
    delay(10);
  }
  // ordenação por bolha: n é pequeno (10), custo irrelevante
  for (int i = 0; i < n - 1; i++)
    for (int j = i + 1; j < n; j++)
      if (amostras[j] < amostras[i]) {
        int tmp = amostras[i]; amostras[i] = amostras[j]; amostras[j] = tmp;
      }
  return amostras[n / 2];
}
```

Média aritmética de dez leituras ainda incorpora o pico de ruído que a bomba injeta. A mediana joga fora os extremos. Essa troca de três linhas costuma valer mais que qualquer filtro capacitivo no hardware.

### Bloco 3: as funções de leitura de cada grandeza

```cpp
void lerTemperatura() {
  sensorTemp.requestTemperatures();
  float t = sensorTemp.getTempCByIndex(0);
  if (t > -50 && t < 90) tempAtual = t;  // descarta leitura inválida (-127)
}

void lerPH() {
  float mv = (float)lerMediana(PINO_PH, 10) / 4095.0 * TENSAO_REF;
  // readPH aplica offset e slope gravados na EEPROM pela calibração
  phAtual = sensorPH.readPH(mv, tempAtual);
}

void lerEC() {
  sensorTDS.setTemperature(tempAtual);   // compensação: EC varia ~2 %/°C
  sensorTDS.setAdcRange(4096);           // ADC de 12 bits do ESP32
  sensorTDS.update();
  float ppm = sensorTDS.getTdsValue();
  ecAtual = ppm / 500.0;                 // ppm(escala 500) -> dS/m aproximado
}
```

A conversão de ppm para dS/m depende da escala do aparelho. O TDS Gravity usa fator 0,5 (escala NaCl 500), então dividir por 500 dá a EC em dS/m. Se você compara com uma caneta que usa fator 0,7 (escala 700), os números não vão bater e não é defeito de nenhum dos dois.

### Bloco 4: dois envios em ritmos diferentes

Este é o ponto em que a maioria dos tutoriais escorrega. As duas nuvens têm limites bem diferentes, então elas não podem ser alimentadas pelo mesmo timer. Separe: um ciclo rápido, que lê os sensores e publica no ThingSpeak a cada 60 segundos, e um ciclo lento, que só espelha os últimos valores no Blynk a cada 5 minutos.

```cpp
void enviarThingSpeak() {
  if (WiFi.status() != WL_CONNECTED) return;
  HTTPClient http;
  String url = "https://api.thingspeak.com/update?api_key=" + String(TS_API_KEY)
             + "&field1=" + String(phAtual, 2)
             + "&field2=" + String(ecAtual, 2)
             + "&field3=" + String(tempAtual, 1);
  http.begin(url);
  int codigo = http.GET();
  Serial.printf("ThingSpeak HTTP %d
", codigo);
  http.end();
}

// CICLO RÁPIDO: roda a cada 60 s. Lê os sensores e manda só para o ThingSpeak.
void cicloDeLeitura() {
  lerTemperatura();
  lerPH();
  delay(200);          // separa no tempo a excitação das duas sondas
  lerEC();

  if (phAtual > 6.5 || phAtual < 5.5)
    Blynk.logEvent("ph_fora", String("pH em ") + String(phAtual, 2));
  if (ecAtual > 2.5)
    Blynk.logEvent("ec_alta", String("EC em ") + String(ecAtual, 2) + " dS/m");

  enviarThingSpeak();
}

// CICLO LENTO: roda a cada 5 min. Só espelha os últimos valores no Blynk,
// que tem cota mensal de mensagens bem mais apertada (ver adiante).
void enviarBlynk() {
  Blynk.virtualWrite(V1, phAtual);
  Blynk.virtualWrite(V2, ecAtual);
  Blynk.virtualWrite(V3, tempAtual);
}
```

O `delay(200)` entre pH e EC é a multiplexação temporal citada no esquema elétrico: nunca leia as duas sondas no mesmo instante. Repare também que os `Blynk.logEvent` continuam no ciclo rápido de propósito: alarme é evento raro e você quer ser avisado no minuto em que o valor sai da faixa, não cinco minutos depois. Se a sua solução vive oscilando em torno do limite, coloque uma trava simples para não disparar o mesmo evento repetidamente.

### Bloco 5: setup e loop

```cpp
void setup() {
  Serial.begin(115200);
  EEPROM.begin(32);          // espaço para offset e slope do pH
  sensorPH.begin();
  sensorTDS.setPin(PINO_TDS);
  sensorTDS.setAref(3.3);
  sensorTDS.begin();
  sensorTemp.begin();

  Blynk.begin(BLYNK_AUTH_TOKEN, WIFI_SSID, WIFI_PASS);

  // 60 s: leitura + ThingSpeak (1.440 envios/dia, folgado nos 3 milhões/ano)
  cronometro.setInterval(60000L, cicloDeLeitura);
  // 5 min: Blynk. São 3 valores x 288 ciclos/dia = 864 mensagens/dia,
  // cerca de 26 mil/mês, dentro das 100 mil do plano gratuito.
  cronometro.setInterval(300000L, enviarBlynk);
}

void loop() {
  Blynk.run();
  cronometro.run();
  // trata comandos de calibração digitados no monitor serial
  if (Serial.available() > 0) {
    char buffer[16]; memset(buffer, 0, 16);
    Serial.readBytesUntil('
', buffer, 15);
    sensorPH.calibration(
      (float)lerMediana(PINO_PH, 10) / 4095.0 * TENSAO_REF, tempAtual, buffer);
  }
}
```

Repare no que **não** está no `loop()`: nenhum `delay()` longo e nenhuma leitura de sensor. Quem coloca `delay(60000)` dentro do loop derruba a conexão Blynk, que precisa de heartbeat frequente. O `BlynkTimer` resolve isso agendando as duas funções sem bloquear.

**Por que 60 segundos para um e 5 minutos para o outro.** O plano gratuito do Blynk permite 100 mil mensagens por mês, segundo a [página de preços da Blynk](https://www.blynk.io/pricing). Se você mandasse as três grandezas a cada 60 segundos, seriam 4.320 mensagens por dia, cerca de 130 mil por mês, ou seja, a cota estouraria antes do fim do mês e o dashboard simplesmente pararia de atualizar. A cada 5 minutos o consumo cai para cerca de 26 mil mensagens mensais, com folga confortável. Já o ThingSpeak libera 3 milhões de mensagens por ano para uso não comercial, com intervalo mínimo de 15 segundos, conforme o [FAQ de licenciamento da MathWorks](https://thingspeak.mathworks.com/pages/license_faq): um envio por minuto dá cerca de 526 mil por ano, folgado. Se você preferir um timer só, por simplicidade, use 2 minutos para os dois envios, o que também cabe nas duas cotas.

## Calibração dos sensores, o passo que ninguém pode pular

Sem calibração, o sensor de pH entrega uma tensão arbitrária, não um pH. O eletrodo de vidro segue a equação de Nernst (E = E₀ − 59,16 mV por unidade de pH a 25 °C), mas o ganho real de cada eletrodo fica tipicamente entre 95 % e 99 % do teórico e cai com o uso. Calibrar é dizer ao firmware qual é o E₀ e qual é o slope daquele eletrodo específico, naquele mês específico.
![Eletrodo de pH sendo calibrado em copo com solução tampão azul sobre bancada de trabalho](/blog/projeto-diy-monitoramento-de-hidroponia-com-esp32-blynk-e-th/eletrodo-de-ph-sendo-calibrado-em-copo-com-solucao-tamp-3.jpg)
*Calibração em dois pontos com soluções tampão, repetida a cada 30 dias*

### Calibração do pH em dois pontos

1. Grave o sketch e abra o monitor serial em 115200 baud, com terminação de linha "Nova linha".
2. Enxágue a sonda com água destilada e seque encostando papel absorvente na lateral do bulbo, nunca esfregando a ponta.
3. Mergulhe na solução tampão pH 7,01 (ou 6,86, que é o padrão NIST comum no Brasil) e espere 60 segundos para a leitura estabilizar.
4. Digite `enterph` e pressione Enter. O firmware entra em modo de calibração.
5. Digite `calph`. A biblioteca detecta sozinha que aquele valor corresponde ao tampão neutro e grava o offset.
6. Enxágue de novo com água destilada. Este passo evita contaminação cruzada: uma gota de tampão 7 dentro do frasco de tampão 4 estraga o frasco inteiro.
7. Mergulhe no tampão pH 4,01, espere estabilizar, digite `calph` de novo.
8. Digite `exitph`. Offset e slope vão para a EEPROM e sobrevivem a quedas de energia.

Trabalhe com o tampão em copos pequenos separados, nunca dentro do frasco original, e descarte o que sobrou. Cada frasco aberto dura cerca de 6 meses; fechado, cerca de 2 anos.

### Calibração do TDS em um ponto

Mergulhe a sonda na solução padrão de 1.413 µS/cm (equivalente a aproximadamente 707 ppm na escala 500), espere estabilizar e envie pelo serial `enter`, depois `cal:707`, depois `exit`. A biblioteca GravityTDS grava o fator de correção. Um ponto é suficiente porque a resposta do sensor de condutividade é praticamente linear na faixa de trabalho da hidroponia, diferente do eletrodo de pH.

### Frequência e cuidados

| Item | Frequência | Motivo |
| --- | --- | --- |
| Recalibrar pH | a cada 30 dias | Deriva de aproximadamente 0,05 pH por mês |
| Recalibrar TDS/EC | a cada 60 a 90 dias | Resposta mais estável que o eletrodo de vidro |
| Trocar solução de armazenamento | a cada 3 meses | KCl 3 M ou solução própria do fabricante |
| Substituir eletrodo de pH | 12 a 24 meses | Vida útil do bulbo de vidro |

A regra mais violada é a mais simples: **o bulbo do eletrodo de pH nunca pode secar**. Guardar a sonda no ar, mesmo por duas semanas, desidrata a camada de gel do vidro e mata o sensor de forma irreversível. Guarde sempre com a capa cheia de KCl 3 M ou, na falta dela, de solução tampão pH 4. Água destilada, contra a intuição, também danifica porque lixivia os íons do bulbo.

## Configurando o dashboard no Blynk

O Blynk IoT entrega app mobile pronto sem programar interface. O caminho é console web primeiro, celular depois.

1. Crie a conta em [blynk.cloud](https://blynk.cloud) e vá em **Developer Zone → Templates → New Template**. Nome "Hidroponia", hardware "ESP32", conexão "WiFi". O `TEMPLATE_ID` e o `TEMPLATE_NAME` gerados vão para o seu `secrets.h`.
2. Na aba **Datastreams**, crie três do tipo Virtual Pin: V1 (pH, double, mín. 0, máx. 14, 2 decimais), V2 (EC, double, mín. 0, máx. 5, unidade dS/m), V3 (Temperatura, double, mín. 0, máx. 50, unidade °C).
3. Na aba **Web Dashboard**, arraste três widgets **Gauge** e amarre a V1, V2 e V3. Configure a faixa verde do pH entre 5,5 e 6,5 e a do EC entre 1,0 e 1,5. Adicione um widget **Chart** com as três séries.
4. Na aba **Events**, crie dois eventos com os códigos exatos `ph_fora` e `ec_alta` (os mesmos strings do `Blynk.logEvent` no código), marcando "Notifications → Push notification" e "E-mail".
5. Em **Devices → New Device → From template**, escolha "Hidroponia". O `AUTH_TOKEN` aparece aqui, copie para o `secrets.h`.
6. Instale o app Blynk IoT no celular, faça login com a mesma conta, abra o dispositivo e monte o layout mobile arrastando os mesmos widgets.

O plano gratuito cobre 5 dispositivos, 1 usuário e retenção de histórico de 1 semana. Para o histórico longo, entra o ThingSpeak.

## Configurando o canal no ThingSpeak

1. Crie uma conta MathWorks em [thingspeak.mathworks.com](https://thingspeak.mathworks.com/) e vá em **Channels → New Channel**.
2. Nomeie "Hidroponia NFT" e ative três campos: Field 1 = pH, Field 2 = EC (dS/m), Field 3 = Temperatura (°C). Se você adicionou o DHT22, use Field 4 e Field 5 para temperatura e umidade do ar.
3. Salve e vá na aba **API Keys**. Copie a **Write API Key** para o `TS_API_KEY` do `secrets.h`.
4. Grave o sketch de novo e observe o monitor serial: `ThingSpeak HTTP 200` confirma o envio aceito. Um `0` no lugar do 200 quase sempre é intervalo menor que 15 segundos entre requisições, e um `-1` é falha de conexão.
5. Na aba **Private View**, ajuste cada gráfico para janela de 7 dias e tipo "line". A curva de pH ao longo de uma semana mostra o padrão que a leitura pontual esconde: o pH tende a subir conforme as plantas absorvem ânions, e a inclinação dessa subida é o melhor indicador de que a solução precisa ser renovada.

Vale usar as duas plataformas ao mesmo tempo porque elas resolvem problemas diferentes. Blynk entrega notificação push imediata e gauge bonito, mas guarda pouco histórico no plano grátis. ThingSpeak guarda o ano inteiro e permite análise em MATLAB, mas não tem app nativo nem alerta push decente.

| Critério | Blynk IoT (grátis) | ThingSpeak (grátis, não comercial) | Home Assistant + ESPHome |
| --- | --- | --- | --- |
| Limite de envio | 100 mil mensagens/mês | 3 milhões/ano, mín. 15 s | Sem limite |
| Dispositivos | 5 | 4 canais | Ilimitado |
| Retenção de histórico | 1 semana | Anos | Depende do disco |
| App mobile nativo | Sim, drag-and-drop | Não, apenas web | Sim (HA Companion) |
| Notificação push | Sim | Não nativa | Sim |
| Funciona sem internet | Não | Não | Sim, rede local |
| Custo real | R$ 0 | R$ 0 | R$ 0 + Raspberry Pi |

## Teste de aceitação antes de confiar no sistema

Antes de deixar o painel rodando sozinho no fim de semana, faça três testes.

**Teste 1, exatidão.** Meça a solução do reservatório com o seu sistema e, em seguida, com uma caneta de pH calibrada no mesmo instante. Diferença aceitável: até 0,2 pH. Acima disso, recalibre.

**Teste 2, resposta a degrau.** Tire 500 ml da solução em um balde, adicione algumas gotas de pH-down e mergulhe a sonda. O valor no dashboard tem que cair em menos de 90 segundos. Se demorar mais, o bulbo está envelhecido ou sujo (limpe com solução de limpeza para eletrodo, nunca com detergente comum).

**Teste 3, resiliência de rede.** Desligue o roteador por 10 minutos. O ESP32 deve reconectar sozinho quando a rede voltar, sem precisar de reset físico. Se ele travar, adicione um watchdog simples: guarde `millis()` na última conexão bem sucedida e chame `ESP.restart()` se passar de 15 minutos sem sucesso.

Documente na primeira semana quantas leituras chegaram por dia. Um sistema saudável enviando a cada 60 segundos entrega em torno de 1.440 pontos diários no ThingSpeak. Buraco recorrente no mesmo horário costuma ser interferência de forno micro-ondas ou congestionamento do canal 2,4 GHz, e a solução é fixar o roteador em outro canal.

## Quando as leituras ficam malucas: diagnóstico rápido

| Sintoma | Causa provável | O que fazer |
| --- | --- | --- |
| pH oscila meio ponto quando a bomba liga | Ground loop entre as sondas | Multiplexar no tempo (o `delay(200)` do código) ou usar isolador analógico |
| Leitura de pH sempre 0 ou sempre 14 | Sensor ligado no ADC2 com Wi-Fi ativo | Mover para GPIO 32 a 39 (ADC1) |
| EC lê 10 % a mais em dia quente | Falta de compensação térmica | Conferir se o DS18B20 responde e se `setTemperature()` é chamado antes do `update()` |
| Temperatura retorna −127 °C | DS18B20 sem resistor de pull-up ou mal conectado | Colocar 4,7 kΩ entre o pino de dados e 3,3 V |
| pH responde muito devagar | Bulbo ressecado ou sujo de biofilme | Reidratar 24 h em KCl 3 M; se não voltar, trocar o eletrodo |
| Wi-Fi não conecta de jeito nenhum | Rede em 5 GHz | ESP32 só fala 2,4 GHz, criar SSID dedicado nessa banda |
| Blynk desconecta a cada poucos minutos | `delay()` longo no `loop()` | Migrar toda leitura para `BlynkTimer` |
| ThingSpeak devolve HTTP 0 | Envio mais rápido que 15 s | Aumentar o intervalo do timer |
| Leituras param depois de dias | Travamento por falha de reconexão | Implementar watchdog com `ESP.restart()` |

Um problema que não aparece no código e derruba muito projeto é a incrustação biológica na sonda. Em reservatório com luz, o biofilme cresce sobre o bulbo em duas ou três semanas e amortece a resposta. Reservatório opaco e limpeza quinzenal da sonda resolvem. O mesmo biofilme, aliás, é porta de entrada para patógenos de raiz; o assunto está detalhado no guia de [pragas e doenças em hidroponia e cultivo protegido](/blog/pragas-e-doencas-em-hidroponia-e-cultivo-protegido).

## Ajustando os limiares para a sua cultura

Os alarmes do código estão em pH 5,5 a 6,5 e EC até 2,5 dS/m, faixa boa para folhosas segundo a fórmula de Furlani (IAC, Boletim Técnico 168, 1998), a referência de fato da hidroponia brasileira. Mas fruto não é folha, e a tabela abaixo serve para ajustar as constantes antes de gravar o sketch.

| Cultura | pH alvo | EC alvo (dS/m) | Aproximado em ppm (fator 0,5) |
| --- | --- | --- | --- |
| Alface e folhosas | 5,5 a 6,5 | 1,0 a 1,4 | 500 a 700 |
| Microverdes | 5,5 a 6,5 | 0,8 a 1,2 | 400 a 600 |
| Manjericão e ervas | 5,5 a 6,5 | 1,2 a 1,8 | 600 a 900 |
| Morango | 5,5 a 6,2 | 1,2 a 1,5 | 600 a 750 |
| Tomate | 5,5 a 6,0 | 2,0 a 3,5 | 1.000 a 1.750 |

Acima de aproximadamente 2,5 dS/m em folhosas, o potencial osmótico da solução passa a dificultar a absorção de água pela raiz e a planta murcha mesmo com o reservatório cheio. Para cultivos específicos, o [guia completo de alface hidropônica](/blog/guia-completo-de-alface-hidroponica-do-plantio-caseiro-a-pro) e o [guia de tomate hidropônico](/blog/como-plantar-tomate-hidroponico-guia-do-iniciante-ao-produto) trazem as faixas por fase fenológica, que mudam entre muda, crescimento e produção.

## Próximo passo: fechar a malha com bombas dosadoras

Monitorar é medir e avisar. Automatizar é medir e agir. A transição pede três coisas: bombas peristálticas de 12 V (R$ 80 a R$ 200 cada), o módulo relé opto-isolado já previsto na lista e uma lógica de controle mais cuidadosa do que parece.

A lógica ingênua "se pH > 6,5, liga a bomba de pH-down por 2 segundos" oscila com facilidade, porque a solução leva minutos para homogeneizar e o sistema dosa de novo antes de ver o efeito da dose anterior. Três salvaguardas mínimas:

- **Tempo morto obrigatório.** Depois de qualquer dose, bloqueie novas dosagens por 15 a 20 minutos e só releia o valor depois da recirculação completa do reservatório.
- **Dose máxima diária.** Conte os mililitros dosados; se passar de um teto definido, pare tudo e mande alerta. Isso impede que um sensor descalibrado despeje ácido no reservatório a noite inteira.
- **Faixa morta.** Não corrija entre 5,8 e 6,2. Corrigir ruído é o caminho mais curto para desperdiçar reagente e estressar a planta.

Sneineh e Shabaneh (2023) implementaram esse modelo com três bombas (água, NPK e ácido fosfórico) e mantiveram o pH entre 6,8 e 7,0 durante todo o ciclo de alface, o que serve como prova de conceito publicada.

Do ponto de vista de arquitetura, o caminho de evolução é claro: protótipo em Blynk, produção em Home Assistant com ESPHome (self-hosted, sem depender de nuvem externa e sem limite de mensagens), e escala industrial em CLP com supervisório, que é o que rodam operações como a [Pink Farms](https://pinkfarms.com.br/), fazenda vertical de São Paulo com 750 m² e produção da ordem de 4,5 toneladas por mês. Se o seu horizonte é comercial, vale ler o guia de [viabilidade econômica e ROI da hidroponia comercial](/blog/viabilidade-economica-e-roi-da-hidroponia-comercial) antes de escalar o hardware, e o panorama de [CEA no Brasil](/blog/cea-agricultura-em-ambiente-controlado-no-brasil) para entender onde a automação entra no custo total.

Vale a menção de contexto de mercado: segundo a [DataM Intelligence](https://www.datamintelligence.com/research-report/brazil-agricultural-iot-market), o mercado brasileiro de IoT agrícola movimentou US$ 758,31 milhões em 2024 com projeção de US$ 2,1 bilhões em 2032 (CAGR de 13,58 %), enquanto a [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/agriculture-iot-market/brazil) projeta US$ 2,25 bilhões já em 2030. O mesmo levantamento da DataM aponta que apenas 23 % das áreas agrícolas brasileiras têm conectividade estável, limitação que praticamente não afeta hidroponia urbana e periurbana, justamente o nicho deste projeto.

> Leia também: [Horta vertical hidropônica residencial: como montar a sua](/blog/horta-vertical-hidroponica-residencial-como-montar-a-sua)

## Perguntas frequentes

### Posso usar Arduino UNO em vez de ESP32 para monitorar minha hidroponia?
Tecnicamente sim, mas o ESP32 é bem superior para este caso. O ADC do UNO tem 10 bits (1.024 níveis) contra 12 bits (4.096 níveis) do ESP32, quatro vezes mais resolução para ler pH e EC. Além disso o ESP32 traz Wi-Fi nativo (o UNO precisa de shield à parte) e custa menos no Brasil, entre R$ 50 e R$ 90 contra R$ 80 a R$ 120 do UNO. Esse ganho de resolução é uma vantagem geral do ESP32 sobre o UNO; Sneineh e Shabaneh (2023, MethodsX) usaram o ESP32 nesse tipo de projeto, mas o artigo não apresenta justificativa explícita para essa escolha, apenas lista as especificações do microcontrolador utilizado.

### Qual a diferença entre Blynk e ThingSpeak e qual escolher?
Blynk é melhor para dashboard mobile, com app iOS e Android pronto por drag-and-drop e plano grátis de 5 dispositivos, 1 usuário e 100 mil mensagens por mês. ThingSpeak é melhor para histórico longo e análise, com 3 milhões de mensagens por ano, 4 canais e integração MATLAB, mas sem app mobile nativo. Para iniciante a recomendação é usar as duas ao mesmo tempo, já que o ESP32 envia para ambas no mesmo ciclo de leitura.

### Quanto custa montar o sistema completo no Brasil?
O stack mínimo com ESP32, sensor de pH DFRobot, sensor TDS, DS18B20 e soluções tampão sai por cerca de R$ 595. O stack robusto com sensor de nível ultrassônico, display OLED, módulo relé e bombas peristálticas chega a aproximadamente R$ 1.090. Para comparação, controladores comerciais brasileiros como o Cultlight pHEC-B2 custam R$ 4.500 no PIX (R$ 5.000 no cartão).

### De quanto em quanto tempo preciso calibrar os sensores?
O eletrodo de pH deriva cerca de 0,05 pH por mês, então recalibre a cada 30 dias com soluções tampão 4,01 e 7,01 do padrão NIST. O sensor de TDS/EC aguenta de 60 a 90 dias entre calibrações quando você usa sempre a mesma solução nutritiva. Soluções tampão abertas duram aproximadamente 6 meses e fechadas cerca de 2 anos.

### Qual a faixa ideal de pH e EC para alface hidropônica?
Conforme a fórmula de Furlani (IAC, Boletim Técnico 168, 1998), o pH ideal fica entre 5,5 e 6,5 e a condutividade elétrica entre 1,0 e 1,5 dS/m, o equivalente a aproximadamente 500 a 750 ppm na escala de fator 0,5. Acima de 2,5 dS/m a planta passa a ter dificuldade osmótica para absorver água, condição que merece alerta imediato no seu sistema.

### Posso controlar o sistema sem internet, totalmente offline?
Sim. Use Home Assistant com ESPHome rodando em um Raspberry Pi na sua rede local, ou Node-RED com broker MQTT Mosquitto. Ambos são gratuitos, self-hosted e sem limite de mensagens, e o app HA Companion acessa de fora por VPN. A troca é que você assume a manutenção do servidor em vez de terceirizar para a nuvem.

### Meus sensores de pH e EC dão leituras malucas quando a bomba liga, o que está errado?
Quase certamente é ground loop, com a corrente da bomba retornando pelo caminho do sensor. Há três soluções: instalar isoladores analógicos entre cada sonda e o ADC do ESP32, multiplexar a leitura no tempo lendo pH e EC em instantes diferentes (é o que o `delay(200)` do código deste tutorial faz), ou alimentar a bomba e a eletrônica com fontes fisicamente separadas.

### O Wi-Fi da minha estufa é instável, como evitar perda de dados?
Ataque por três frentes. Primeiro, implemente buffer local no ESP32 com LittleFS ou SPIFFS, guardando as leituras enquanto a rede está fora e reenviando quando ela volta. Segundo, confirme que o roteador transmite em 2,4 GHz, porque o ESP32 não enxerga redes de 5 GHz. Terceiro, se a estufa está longe do roteador, use um módulo ESP32-WROOM com conector IPEX e antena externa.

### Posso adicionar bombas peristálticas para corrigir pH e EC automaticamente?
Sim, é o passo natural depois do monitoramento. Use bombas peristálticas DC de 12 V, entre R$ 80 e R$ 200 cada, acionadas por módulo relé opto-isolado, e nunca dose sem tempo morto de 15 a 20 minutos entre uma dosagem e outra, sem teto de dose diária e sem faixa morta em torno do alvo. Sem essas três salvaguardas o sistema oscila e pode despejar ácido demais no reservatório.

### Onde compro soluções tampão e de calibração no Brasil?
A Bruno Palma Hidroponia vende kits com tampões pH 4,01, 6,86 e 9,18 e solução padrão de EC 1.413 µS/cm. Lojas de aquarismo também costumam ter, na faixa de R$ 50 a R$ 100 por frasco de 250 ml, assim como a Amazon Brasil. Nunca use vinagre ou bicarbonato como calibração caseira, porque não são soluções tamponadas com valor estável e vão calibrar o sensor errado.

### Esse projeto serve para microverdes também?
Serve, com adaptações. Microverdes têm ciclo de 7 a 14 dias e trabalham com EC mais baixa, entre 0,8 e 1,2 dS/m, para evitar queima. Nesse cultivo a temperatura do ar, a umidade relativa e a luz importam mais que pH e EC, então o combo mais útil passa a ser DHT22 ou BME280 somado a um sensor de luz BH1750, como detalhamos no guia de [como iniciar o cultivo de microverdes em casa](/blog/como-iniciar-cultivo-microverdes-em-casa).

### Como dimensionar a bateria se eu instalar o sistema longe de uma tomada?
O ESP32 consome cerca de 10 µA em deep sleep e aproximadamente 120 mA ativo. Lendo por 5 segundos a cada 60 segundos, o consumo médio fica em torno de 10 mA, o que dá cerca de 12 dias com uma célula 18650 de 3.000 mAh. Somando painel solar de 5 W e controlador de carga TP4056, o nó fica autônomo, mas as bombas de 12 V exigem banco separado porque puxam da ordem de 500 mA cada.
