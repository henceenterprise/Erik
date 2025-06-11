import { jest } from '@jest/globals';
import { execute } from './ping.js';

describe('ping command', () => {
  test('responds with latency information', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(150);
    const interaction = {
      createdTimestamp: 100,
      reply: jest.fn()
    };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith('🏓 Pong! Tempo de resposta: 50ms');
  });
});
