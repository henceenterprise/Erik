import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

/**
 * Slash command definition for `help`.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Mostra todos os comandos disponíveis.');

/**
 * Handler for the `help` command.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const cmds = interaction.client.commandsList || [];
  const embed = new EmbedBuilder()
    .setTitle('Comandos disponíveis')
    .setColor(0x0099ff);

  for (const cmd of cmds) {
    embed.addFields({ name: `/${cmd.name}`, value: cmd.description, inline: false });
  }

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
