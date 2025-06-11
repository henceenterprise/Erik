import { jest } from '@jest/globals';
import { execute } from './ping.js';

describe('ping command', () => {
  test('responds with 🏓 Pong!', async () => {
    const interaction = { reply: jest.fn() };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith('🏓 Pong!');
  });
});
