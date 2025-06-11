import { SlashCommandBuilder } from 'discord.js';
import { connectDb } from '../../database.js';

/**
 * Defines the `/level` command.
 * Shows your current XP and level.
 * @type {import('discord.js').SlashCommandBuilder}
 */
export const data = new SlashCommandBuilder()
  .setName('level')
  .setDescription('Shows your current level.');

/**
 * Executes the command.
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export async function execute(interaction) {
  const db = await connectDb();
  const users = db.collection('users');
  const record = await users.findOne({
    userId: interaction.user.id,
    guildId: interaction.guildId
  });
  const xp = record?.xp ?? 0;
  const level = Math.floor(xp / 100);
  await interaction.reply(
    `${interaction.user.username}, you are level ${level} with ${xp} XP.`
  );
}

