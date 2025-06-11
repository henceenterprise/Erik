// commands/ping.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Responde com Pong e mostra a latência.');

export async function execute(interaction) {
  const reply = await interaction.reply({ content: '🏓 Pong!', fetchReply: true });
  const latency = reply.createdTimestamp - interaction.createdTimestamp;
  await interaction.editReply(`🏓 Pong! Tempo de resposta: ${latency}ms`);
}
