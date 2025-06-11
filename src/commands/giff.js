import { SlashCommandBuilder } from 'discord.js';

const gifs = [
  'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif',
  'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
  'https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif'
];

/**
 * Defines the `/giff` command.
 * It picks a random GIF from the list and sends it to the chat.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('giff')
  .setDescription('Replies with a random GIF.');

/**
 * Runs when someone uses `/giff`.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const index = Math.floor(Math.random() * gifs.length);
  await interaction.reply(gifs[index]);
}
