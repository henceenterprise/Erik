import { SlashCommandBuilder } from 'discord.js';
import { connectDb } from '../../database.js';

/**
 * Defines the `/leaderboard` command.
 * Shows the top users by XP in the server.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Shows the server XP leaderboard.');

/**
 * Runs when someone uses `/leaderboard`.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const db = await connectDb();
  const users = db.collection('users');
  const top = await users
    .find({ guildId: interaction.guildId })
    .sort({ xp: -1 })
    .limit(10)
    .toArray();

  if (top.length === 0) {
    await interaction.reply('No leaderboard data available.');
    return;
  }

  const lines = top.map((u, i) => {
    const level = Math.floor(u.xp / 100);
    return `${i + 1}. <@${u.userId}> - level ${level} (${u.xp} XP)`;
  });

  await interaction.reply(lines.join('\n'));
}
