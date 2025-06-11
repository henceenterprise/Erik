import { SlashCommandBuilder } from 'discord.js';

/**
 * Define o comando `/ping`.
 * Quando ele for usado, o bot vai responder com "Pong" e mostrar o tempo de
 * resposta.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Responde com Pong e mostra a latência.');

/**
 * Função que roda quando alguém digita `/ping`.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const latency = Date.now() - interaction.createdTimestamp;
  await interaction.reply(`🏓 Pong! Tempo de resposta: ${latency}ms`);
}
