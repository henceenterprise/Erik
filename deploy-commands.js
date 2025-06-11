// deploy-commands.js
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import { data as pingData } from './commands/ping.js';

const commands = [pingData.toJSON()];
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Atualizando comandos slash...');
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log(`Registrei ${data.length} comandos.`);
  } catch (err) {
    console.error(err);
  }
})();
