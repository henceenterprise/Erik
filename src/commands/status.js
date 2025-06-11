import { SlashCommandBuilder } from 'discord.js';

/**
 * Defines the `/status` command.
 * It displays a basic status message with the bot's ping.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('status')
  .setDescription('Shows the bot status.');

/**
 * Runs when someone uses `/status`.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const ping = interaction.client.ws.ping ?? 0;
  await interaction.reply(`Online \u2705 Ping: ${ping}ms`);
}
