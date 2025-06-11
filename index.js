import 'dotenv/config';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import { execute as pingExecute } from './commands/ping.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => console.log(`Bot pronto — ${client.user.tag}`));

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {
    await pingExecute(interaction);
  }
});

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log('Bot iniciado.');
  })
  .catch(err => {
    console.error('Falha ao iniciar o bot:', err);
  });
