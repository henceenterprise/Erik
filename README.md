# Erik Discord Bot

This repository contains a small Discord bot built with [`discord.js`](https://discord.js.org/).

## Prerequisites

- Node.js 18 or newer
- A Discord application with a bot token

## Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with the following variables:
   ```env
   DISCORD_TOKEN=your-bot-token
   CLIENT_ID=your-application-id
   GUILD_ID=your-testing-server-id
   ```
3. Start the bot (commands are deployed automatically):
   ```bash
   npm start
   ```

## Development with nodemon

For a smoother workflow during development you can use
[nodemon](https://github.com/remy/nodemon) to automatically restart the bot
whenever you change the source files.

Install it as a dev dependency:

```bash
npm install --save-dev nodemon
```

Then run the bot in watch mode with:

```bash
npm run dev
```

This uses the provided `nodemon.json` configuration to redeploy the slash
commands and restart the bot whenever files in the `commands/` directory or
`index.js` are modified.

The bot currently supports the `/ping` and `/help` commands. `/ping` replies
with `🏓 Pong!` followed by the response time while `/help` shows an
embed listing all available commands.
