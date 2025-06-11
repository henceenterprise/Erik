import { SlashCommandBuilder } from 'discord.js';

/**
 * Slash command definition for `ping`.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Responde com Pong e mostra a latência.');

/**
 * Handler for the `ping` command.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const latency = Date.now() - interaction.createdTimestamp;
  await interaction.reply(`🏓 Pong! Tempo de resposta: ${latency}ms`);
}
