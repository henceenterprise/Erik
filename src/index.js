import 'dotenv/config';
import { Client, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import { readdir } from 'fs/promises';

/**
 * Discord client instance configured with basic intents.
 * @type {import('discord.js').Client}
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

/** List of slash command data objects. */
const commands = [];
/** Map of command names to handler functions. */
const handlers = new Map();
client.commandsList = commands; // exposed for the help command

/**
 * Dynamically loads all command modules under src/commands.
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
 * Registers slash commands with the Discord API for a single guild.
 * @returns {Promise<void>}
 */
async function deployCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  try {
    console.log('Atualizando comandos slash...');
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log(`Registrei ${data.length} comandos.`);
  } catch (err) {
    console.error('Falha ao registrar comandos:', err);
  }
}

// Log when the bot becomes ready
client.once(Events.ClientReady, () =>
  console.log(`Bot pronto — ${client.user.tag}`)
);

// Route incoming slash command interactions to their handlers
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = handlers.get(interaction.commandName);
  if (command) {
    await command(interaction);
  }
});

(async () => {
  // Load command modules and register them before logging in
  await loadCommands();
  await deployCommands();

  client
    .login(process.env.DISCORD_TOKEN)
    .then(() => {
      console.log('Bot iniciado.');
    })
    .catch(err => {
      console.error('Falha ao iniciar o bot:', err);
    });
})();
