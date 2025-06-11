import { SlashCommandBuilder } from 'discord.js';

/**
 * Defines the `/uptime` command.
 * It shows how long the bot has been running in seconds.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('uptime')
  .setDescription('Shows how long the bot has been running.');

/**
 * Runs when someone uses `/uptime`.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const started = interaction.client.startTime ?? Date.now();
  const uptime = Math.floor((Date.now() - started) / 1000);
  await interaction.reply(`Bot uptime: ${uptime} seconds.`);
}
