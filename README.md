# Erik Discord Bot

This project contains a small Discord bot. It responds to a few simple commands that you type beginning with `/`.

## Requirements

- Node.js 18 or newer
- A Discord bot token

## Getting Started

1. Download the code and install the packages:
   ```bash
   npm install
   ```
2. Create a file called `.env` in the project root and add your keys:
   ```env
   DISCORD_TOKEN=your-bot-token
   CLIENT_ID=your-application-id
   GUILD_ID=testing-server-id
   ```
3. Start the bot:
   ```bash
   npm start
   ```

While developing you can run `npm run dev` so the bot restarts automatically whenever you change a file.

## Commands

- `/ping` – the bot replies "Pong!" and shows how long the response took.
- `/help` – sends a list with all commands.
- `/giff` – posts a random GIF just for fun.

Have fun creating new commands!
