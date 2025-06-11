import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

/**
 * Define o comando `/help`.
 * Ele mostra uma lista com todos os comandos que o bot conhece.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Mostra todos os comandos disponíveis.');

/**
 * Função chamada quando alguém digita `/help`.
 * Ela envia um embed contendo cada comando disponível.
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
