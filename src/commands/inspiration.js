import { SlashCommandBuilder } from 'discord.js';

const quotes = [
  'Believe in yourself and all that you are.',
  'The only limit to our realization of tomorrow is our doubts of today.',
  'You are never too old to set another goal or to dream a new dream.',
  'Every day may not be good, but there is something good in every day.'
];

/**
 * Defines the `/inspiration` command.
 * It sends a random inspirational quote.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('inspiration')
  .setDescription('Replies with an inspirational quote.');

/**
 * Runs when someone uses `/inspiration`.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const index = Math.floor(Math.random() * quotes.length);
  await interaction.reply(quotes[index]);
}
