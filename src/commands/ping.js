import { SlashCommandBuilder } from 'discord.js';

/**
 * Defines the `/ping` command.
 * When invoked, the bot replies with "Pong" and shows the response time.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong and shows latency.');

/**
 * Runs when someone uses `/ping`.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const latency = Date.now() - interaction.createdTimestamp;
  await interaction.reply(`🏓 Pong! Response time: ${latency}ms`);
}
