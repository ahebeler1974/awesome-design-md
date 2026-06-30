# 📝 Artigos reescritos — novo template editorial

Os **13 posts publicados** do Guia Casa Inteligente reescritos do zero no **template novo** (TL;DR com veredito, tabela comparativa, "melhor escolha"/"custo-benefício", prós/contras, nota por critério, FAQ, "leia também", veredito final e selo "Atualizado em"). Junto com o flagship **Alexa vs Google Nest** (em [`../05-template-artigo.md`](../05-template-artigo.md)), fecham os 14 publicados.

> **Como foram escritos:** como o conteúdo original não é acessível daqui (site dá HTTP 403 para nuvem e o repo-fonte está fora do escopo desta sessão), estes são textos **novos, limpos e honestos**, escritos a partir dos títulos + das listas reais de produtos do [`../../MASTERINFRAHANDOFF.md`](../../MASTERINFRAHANDOFF.md). Eles **substituem** os artigos antigos (que tinham placeholders e prompts de IA vazados).

## ✅ Padrão de qualidade (verificado nos 13)

- Estrutura completa do template, com **disclosure de afiliado dentro do TL;DR**, logo acima do 1º botão.
- **Sem preço fixo inventado**, sem "testei pessoalmente", sem especificação fabricada — specs que variam por vendedor remetem a *"confira no anúncio"*.
- Botões com o marcador **`[INSERIR LINK DE AFILIADO: Nome do produto]`** (nenhuma URL/MLB inventada) — você troca pelo link oficial.
- **6 perguntas de FAQ** e **tabela comparativa** em cada artigo; **0** links de vitrine `/social/`.
- Alertas de segurança onde pertinente (câmera/privacidade, gás/fumaça, fechadura/instalação, carga elétrica do ar-condicionado).
- Meta title (≤60) e meta description (≤155) ao fim de cada arquivo.

## 📂 Os 13 artigos

### Segurança e Câmeras
- **[Melhor Fechadura Digital com Biometria para Apartamento até R$ 500 (2026)](fechadura-digital-biometria-apartamento.md)** — `/fechadura-digital-biometria-apartamento/`
- **[Fechadura Digital com Senha e Cartão Vale a Pena para Escritório? (Guia 2026)](fechadura-digital-senha-cartao-escritorio.md)** — `/fechadura-digital-senha-cartao-escritorio/`
- **[Melhor Câmera Wi-Fi para Vigiar seu Pet Sozinho em Casa (2026)](camera-wifi-vigiar-pet-em-casa.md)** — `/camera-wifi-vigiar-pet-em-casa/`
- **[As 5 Melhores Câmeras de Segurança Wi-Fi até R$ 300 (2026)](comparativo-cameras-seguranca-wifi-ate-300.md)** — `/comparativo-cameras-seguranca-wifi-ate-300/`
- **[Campainha com Câmera Wi-Fi Vale a Pena para Apartamento? (Análise 2026)](campainha-camera-wifi-apartamento.md)** — `/campainha-camera-wifi-apartamento/`
- **[Sensor de Fumaça e Gás Inteligente que Avisa no Celular (2026)](sensor-fumaca-gas-inteligente-celular.md)** — `/sensor-fumaca-gas-inteligente-celular/`

### Robôs e Limpeza
- **[Robô Aspirador Que Vale a Pena para Casa com Pelo de Cachorro (2026)](robo-aspirador-casa-com-pelo-de-cachorro.md)** — `/robo-aspirador-casa-com-pelo-de-cachorro/`
- **[Melhores Robôs Aspiradores com Mapeamento até R$ 1500 (2026)](comparativo-robos-aspiradores-ate-1500.md)** — `/comparativo-robos-aspiradores-ate-1500/`

### Iluminação Inteligente
- **[Melhores Lâmpadas Inteligentes até R$ 100 com Alexa (Comparativo 2026)](comparativo-lampadas-inteligentes-ate-100.md)** — `/comparativo-lampadas-inteligentes-ate-100/`
- **[Lâmpada Inteligente que Funciona com Alexa SEM Hub: Vale a Pena? (2026)](lampada-inteligente-alexa-sem-hub.md)** — `/lampada-inteligente-alexa-sem-hub/`

### Assistentes e Controle / Ofertas
- **[Tomada Inteligente para Desligar o Ar-Condicionado pelo Celular: Funciona? (Guia Honesto 2026)](tomada-inteligente-desligar-ar-condicionado.md)** — `/tomada-inteligente-desligar-ar-condicionado/`
- **[Echo Dot Vale a Pena em 2026? Review Honesto + Qual Modelo Comprar](echo-dot-vale-a-pena-promo.md)** — `/echo-dot-vale-a-pena-promo/`

### Guias e Comparativos
- **[Melhor Kit de Casa Inteligente para Iniciantes (Guia 2026)](kit-casa-inteligente-para-iniciantes.md)** — `/kit-casa-inteligente-para-iniciantes/`

### Assistentes e Controle (flagship, já no kit)
- **Alexa vs Google Nest: Qual o Melhor Assistente de Voz (2026)** — ver [`../05-template-artigo.md`](../05-template-artigo.md) · `/alexa-vs-google-nest-comparativo/`

## ▶️ Como publicar cada artigo

1. Abra o `.md` e copie o conteúdo para o post correspondente no WordPress (o post já existe — atualize o conteúdo, não crie outro, para preservar o slug e o SEO).
2. Os blocos com `class="gci-*"` vão num bloco **HTML personalizado** (já estilizados pelo [`../02-css-premium.css`](../02-css-premium.css)). O texto corrido vai em blocos de parágrafo normais.
3. **Troque cada `[INSERIR LINK DE AFILIADO: Produto]`** pelo link oficial do Mercado Livre (direto no produto `/p/MLB…`, nunca `/social/`) — método em [`../../execucao-links/GUIA-EXECUCAO.md`](../../execucao-links/GUIA-EXECUCAO.md).
4. Defina a **imagem destacada 16:9** (sugestão de alt no fim de cada arquivo) e cole o **meta title/description** no Rank Math.
5. **Confira as especificações e a disponibilidade** de cada produto no anúncio antes de publicar (modelos saem de linha).
6. Purgue o cache LiteSpeed.

> Publique por **silos** (review + comparativo da mesma categoria juntos) para ativar a linkagem interna — ver [`../07-estrategia-viral.md`](../07-estrategia-viral.md).
