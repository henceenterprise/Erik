import { SlashCommandBuilder } from 'discord.js';

const memes = [
  'https://i.imgflip.com/1bij.jpg',
  'https://i.imgflip.com/26am.jpg',
  'https://i.imgflip.com/3vzej.jpg',
  'https://i.imgflip.com/30b1gx.jpg'
];

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
