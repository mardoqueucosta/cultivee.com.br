# /dados: repositório de dados do cultivee.com.br

Esta pasta é o **repositório padrão** dos dados que o Cultivee publica. Tudo aqui é
versionado no git do site, servido como URL pública e **é a fonte da verdade**: quem consome
(as páginas do próprio site, a série diária de redes sociais, terceiros e agentes de IA) lê
daqui, e não de uma cópia dentro de um projeto de geração.

Decidido pelo dono em 2026-08-14. Ver
`Projeto-gerador-artigos-e-posts/07-cotacoes-site/CLAUDE.md`.

## Por que aqui, e não numa API

O `nginx.conf` do site já serve qualquer arquivo estático por `try_files $uri $uri.html =404`
com `Cache-Control: no-cache`, e o `public/` já publica `llms.txt`, `feed.xml` e
`image-sitemap.xml`. Um JSON aqui vira URL pública no próximo deploy, sem worker, sem
servidor e sem chave.

| Arquivo | URL pública |
|---|---|
| `public/dados/cotacoes/ultimo.json` | `https://cultivee.com.br/dados/cotacoes/ultimo.json` |
| `public/dados/cotacoes/series/cafe-arabica-2026.json` | `https://cultivee.com.br/dados/cotacoes/series/cafe-arabica-2026.json` |

## Conjuntos

| Pasta | Conteúdo | Quem escreve | Cadência |
|---|---|---|---|
| `cotacoes/` | indicadores de commodity, snapshot do dia e série histórica | `03-gerador-post-redes-sociais/social_gen/cotacao_fetch.py` | dia útil, 05:30 |

Conjunto novo entra como pasta irmã, com a sua própria seção neste README. **Contrato de
formato mora aqui, junto com o dado**, e não na documentação do projeto que o produz: o
consumidor não deveria precisar achar o produtor para saber ler o arquivo.

## Regras da casa

1. **Atribuição não é opcional.** Todo arquivo carrega `fonte`, `licenca` e a data de
   apuração, e todo consumidor tem que exibir o crédito. Não existe flag para desligar.
2. **Um arquivo por ano nas séries**, nunca um rolante único. O `.git` do site já passa de
   97 MB, e arquivo reescrito todo dia gera uma versão nova por dia para sempre. Quebrado por
   ano, a série de 2026 para de ser tocada em janeiro de 2027.
3. **Commit automatizado usa `git add public/dados/` específico.** `git add .` é proibido
   neste repositório, que carrega pendências não relacionadas.
4. **Dado histórico não se apaga nem se trunca.** A fonte primária de cotação publica só os
   últimos 15 pregões: ponto que sair daqui não volta.

---

## Conjunto `cotacoes/`

```
cotacoes/
  ultimo.json                    snapshot do dia, o que a página e o post leem
  fontes.json                    fonte, licença, cobertura e periodicidade por indicador
  series/
    <commodity>-<ano>.json       série do ano, um arquivo por commodity
```

### `ultimo.json`

```jsonc
{
  "gerado_em": "2026-08-13T11:30:04",   // quando o coletor rodou
  "data_carrossel": "12/08/2026",       // referência predominante da edição
  "fonte": "CEPEA/ESALQ",
  "fonte_url": "https://cepea.org.br",
  "licenca": "CC BY-NC 4.0",
  "itens": [
    {
      "key": "boi-gordo",               // identificador estável, usado no nome da série
      "nome": "Boi gordo",
      "unidade": "@", "moeda": "R$",
      "valor": 346.5, "valor_fmt": "346,50",
      "data_ref": "12/08/2026",         // a que pregão o número se refere
      "periodicidade": "diaria",        // diaria | mensal
      "defasagem_dias": 1,
      "var_pct": -0.26,                 // null quando não há base para comparar
      "var_base": "11/08/2026",
      "sequencia": { }                  // null = série curta demais para afirmar tendência
    }
  ]
}
```

⚠️ **`data_ref` é por linha, não do arquivo.** Boi, café, soja, milho e trigo são diários;
**leite é mensal** e sai com um a dois meses de defasagem. Tratar leite como movimento do dia
é erro de leitura, não de dado.

⚠️ **`var_pct: null` significa "não medido", nunca zero.** Estabilidade que não foi apurada
não pode ser afirmada.

⚠️ **`sequencia: null` proíbe frase de tendência.** O campo é apurado pelo código sobre a
série da fonte, justamente porque quem escreve o texto não tem como conferir.

### `series/<commodity>-<ano>.json`

```jsonc
{
  "commodity": "cafe-arabica",
  "ano": "2026",
  "fonte": "CEPEA/ESALQ",
  "licenca": "CC BY-NC 4.0",
  "atualizado_em": "2026-08-14T06:00:11",
  "pontos": [
    { "data_ref": "10/07/2026", "valor": 1722.48 }
  ]
}
```

`pontos` é cronológico, sem duplicata de `data_ref`. A série começa em **10/07/2026**, que é
quando a coleta local passou a guardar histórico. Antes disso não existe e não é
reconstituível: a página da fonte publica só os últimos 15 pregões.

### Cobertura atual

Boi gordo, café arábica, soja, milho, trigo e leite. **Cacau ainda não**, e é a segunda maior
demanda de busca do agro brasileiro. Café robusta está mapeado no coletor e desligado.
