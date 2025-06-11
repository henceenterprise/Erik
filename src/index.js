import 'dotenv/config';
import { Client, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import { readdir } from 'fs/promises';

/**
 * Main file that starts the bot. The explanations below use simple language so
 * anyone can understand what is happening.
 */

/**
 * Creates the Discord client, which is our bot. The intents tell Discord what
 * kind of messages the bot wants to receive.
 * @type {import('discord.js').Client}
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

/** List of commands the bot knows. */
const commands = [];
/** Stores the functions that execute each command. */
const handlers = new Map();
// Expose the list so the /help command can show everything
client.commandsList = commands;

/**
 * Looks in the `src/commands` folder and loads each command file so the bot
 * knows what to do when using slash commands.
 * @returns {Promise<void>}
 */
async function loadCommands() {
  const dir = new URL('./commands/', import.meta.url);
  const files = await readdir(dir);
  for (const file of files) {
    if (!file.endsWith('.js') || file.endsWith('.test.js')) continue;

    const mod = await import(new URL(`./commands/${file}`, import.meta.url));
    const { data, execute } = mod;

    if (data && execute) {
      commands.push(data.toJSON());
      handlers.set(data.name, execute);
    }
  }
}

/**
 * Sends the command list to Discord so they appear in the server.
 * @returns {Promise<void>}
 */
async function deployCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  try {
    console.log('Updating slash commands...');
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log(`Registered ${data.length} commands.`);
  } catch (err) {
    console.error('Failed to register commands:', err);
  }
}

// When the bot finishes starting, log it to the console
client.once(Events.ClientReady, () =>
  console.log(`Bot ready — ${client.user.tag}`)
);

// Every time someone uses a command, find the correct handler
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = handlers.get(interaction.commandName);
  if (command) {
    await command(interaction);
  }
});

(async () => {
  // Load the commands and tell Discord before logging in
  await loadCommands();
  await deployCommands();

  client
    .login(process.env.DISCORD_TOKEN)
    .then(() => {
      console.log('Bot started.');
    })
    .catch(err => {
      console.error('Failed to start the bot:', err);
    });
})();
