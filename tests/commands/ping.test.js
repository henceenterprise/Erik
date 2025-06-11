import { jest } from '@jest/globals';
import { execute } from '../../src/commands/ping.js';

describe('ping command', () => {
  test('responds with latency information', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(150);
    const interaction = {
      createdTimestamp: 100,
      reply: jest.fn()
    };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith('🏓 Pong! Response time: 50ms');
  });
});
