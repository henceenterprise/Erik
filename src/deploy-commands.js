/**
 * Simple script to register the bot commands.
 */
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import { data as pingData } from './commands/ping.js';
/** Commands to be registered */
const commands = [pingData.toJSON()];
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
// Register the commands and exit

(async () => {
  // Send the commands and exit this script
  try {
    console.log('Updating slash commands...');
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log(`Registered ${data.length} commands.`);
  } catch (err) {
    console.error(err);
  }
})();
