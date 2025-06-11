import 'dotenv/config';
import { Client, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import { readdir } from 'fs/promises';

/**
 * Arquivo principal que inicia o bot. As explicações abaixo usam uma linguagem
 * simples para que qualquer pessoa possa entender o que acontece.
 */

/**
 * Cria o cliente do Discord, que é o nosso bot. Os "intents" dizem ao Discord
 * que tipo de mensagens o bot quer receber.
 * @type {import('discord.js').Client}
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

/** Lista de comandos que o bot conhece. */
const commands = [];
/** Guarda as funções que executam cada comando. */
const handlers = new Map();
// Deixamos a lista acessível para o comando /help mostrar tudo
client.commandsList = commands;

/**
 * Procura na pasta `src/commands` e carrega cada arquivo de comando.
 * Assim o bot sabe o que fazer quando usamos as barras.
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
 * Envia para o Discord a lista de comandos para que apareçam no servidor.
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

// Quando o bot termina de iniciar, avisamos no console
client.once(Events.ClientReady, () =>
  console.log(`Bot pronto — ${client.user.tag}`)
);

// Toda vez que alguém usar um comando, procuramos a função correta
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = handlers.get(interaction.commandName);
  if (command) {
    await command(interaction);
  }
});

(async () => {
  // Carrega os comandos e avisa o Discord antes de fazer login
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
