import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

/**
 * Defines the `/help` command.
 * It shows a list with every command the bot knows.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Shows all available commands.');

/**
 * Called when someone uses `/help`.
 * Sends an embed containing each available command.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const cmds = interaction.client.commandsList || [];
  const embed = new EmbedBuilder()
    .setTitle('Available commands')
    .setColor(0x0099ff);

  for (const cmd of cmds) {
    embed.addFields({ name: `/${cmd.name}`, value: cmd.description, inline: false });
  }

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
