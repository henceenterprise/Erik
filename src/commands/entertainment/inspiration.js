import { readFileSync } from 'fs';
import { SlashCommandBuilder } from 'discord.js';

/** List of inspirational quotes loaded from JSON. */
const quotes = JSON.parse(
  readFileSync(new URL('./quotes.json', import.meta.url), 'utf8')
);

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
