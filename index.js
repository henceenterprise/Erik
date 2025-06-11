import 'dotenv/config';
import { Client, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import { readdir } from 'fs/promises';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const commands = [];
const handlers = new Map();
client.commandsList = commands;

async function loadCommands() {
  const files = await readdir('./commands');
  for (const file of files) {
    if (!file.endsWith('.js') || file.endsWith('.test.js')) continue;

    const mod = await import(`./commands/${file}`);
    const { data, execute } = mod;

    if (data && execute) {
      commands.push(data.toJSON());
      handlers.set(data.name, execute);
    }
  }
}

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

client.once(Events.ClientReady, () => console.log(`Bot pronto — ${client.user.tag}`));

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = handlers.get(interaction.commandName);
  if (command) {
    await command(interaction);
  }
});

(async () => {
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
