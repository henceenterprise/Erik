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
   MONGO_URI=mongodb://localhost:27017/your-db
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
- `/meme` – replies with a random meme image.
- `/quote` – shares an inspirational quote.
- `/uptime` – shows how long the bot has been running.
- `/status` – displays a simple online status with ping information.
- `/level` – shows your current level based on message activity.
- `/leaderboard` – lists the top users by level in the server.

Have fun creating new commands!
