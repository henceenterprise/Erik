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
3. Deploy slash commands to your server:
   ```bash
   node deploy-commands.js
   ```
4. Start the bot:
   ```bash
   node index.js
   ```

The bot currently supports a single `/ping` command that replies with `Pong!` and
shows how long it took to respond.
