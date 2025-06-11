# Bot do Discord Erik

Este projeto traz um bot bem pequeno para o Discord. Ele responde a alguns comandos simples que você digita começando com `/`.

## Você vai precisar

- Node.js 18 ou mais novo
- Um token de bot do Discord

## Como colocar para funcionar

1. Baixe o código e instale os pacotes:
   ```bash
   npm install
   ```
2. Crie um arquivo chamado `.env` na pasta principal e coloque suas chaves nele:
   ```env
   DISCORD_TOKEN=seu-token-do-bot
   CLIENT_ID=seu-id-da-aplicacao
   GUILD_ID=id-do-servidor-para-testes
   ```
3. Inicie o bot:
   ```bash
   npm start
   ```

Enquanto estiver programando, você pode usar `npm run dev` para que o bot reinicie sozinho sempre que você mudar um arquivo.

## Comandos

- `/ping` – o bot responde "Pong!" e mostra quanto tempo levou para responder.
- `/help` – envia uma lista com todos os comandos.
- `/giff` – manda um GIF aleatório só para animar.

Divirta-se criando novos comandos!
