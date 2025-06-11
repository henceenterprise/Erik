import { readFileSync } from 'fs';
import { SlashCommandBuilder } from 'discord.js';

/** List of GIF URLs loaded from a JSON file. */
const gifs = JSON.parse(
  readFileSync(new URL('./gifs.json', import.meta.url), 'utf8')
);

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
