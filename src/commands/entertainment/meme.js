import { readFileSync } from 'fs';
import { SlashCommandBuilder } from 'discord.js';

/** Meme image URLs loaded from a JSON file. */
const memes = JSON.parse(
  readFileSync(new URL('./memes.json', import.meta.url), 'utf8')
);

/**
 * Defines the `/meme` command.
 * It sends a random meme image URL.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('meme')
  .setDescription('Replies with a random meme.');

/**
 * Runs when someone uses `/meme`.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const index = Math.floor(Math.random() * memes.length);
  await interaction.reply(memes[index]);
}
