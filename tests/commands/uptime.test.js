import { jest } from '@jest/globals';
import { execute } from '../../src/commands/uptime.js';

describe('uptime command', () => {
  test('responds with uptime in seconds', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(5000);
    const interaction = {
      client: { startTime: 0 },
      reply: jest.fn()
    };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith('Bot uptime: 5 seconds.');
  });
});
