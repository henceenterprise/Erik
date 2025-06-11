import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Mostra todos os comandos dispon\u00edveis.');

export async function execute(interaction) {
  const cmds = interaction.client.commandsList || [];
  const embed = new EmbedBuilder()
    .setTitle('Comandos dispon\u00edveis')
    .setColor(0x0099ff);

  for (const cmd of cmds) {
    embed.addFields({ name: `/${cmd.name}`, value: cmd.description, inline: false });
  }

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
