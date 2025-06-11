import { jest } from '@jest/globals';
import { execute } from '../../src/commands/general/status.js';

describe('status command', () => {
  test('responds with online message and ping', async () => {
    const interaction = {
      client: { ws: { ping: 123 } },
      reply: jest.fn()
    };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith('Online \u2705 Ping: 123ms');
  });
});
