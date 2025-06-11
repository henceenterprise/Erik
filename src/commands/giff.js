import { SlashCommandBuilder } from 'discord.js';

const gifs = [
  'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif',
  'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
  'https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif'
];

/**
 * Slash command definition for `giff`.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('giff')
  .setDescription('Responde com um GIF aleatório.');

/**
 * Handler for the `giff` command.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const index = Math.floor(Math.random() * gifs.length);
  await interaction.reply(gifs[index]);
}
