import { jest } from '@jest/globals';
import { execute } from '../../src/commands/help.js';

describe('help command', () => {
  test('responds with an embed containing commands', async () => {
    const interaction = {
      client: {
        commandsList: [
          { name: 'ping', description: 'desc ping' },
          { name: 'help', description: 'desc help' }
        ]
      },
      reply: jest.fn()
    };

    await execute(interaction);

    expect(interaction.reply).toHaveBeenCalledTimes(1);
    const arg = interaction.reply.mock.calls[0][0];
    expect(arg.ephemeral).toBe(true);
    expect(Array.isArray(arg.embeds)).toBe(true);
    const fields = arg.embeds[0].data.fields;
    expect(fields).toEqual([
      { name: '/ping', value: 'desc ping', inline: false },
      { name: '/help', value: 'desc help', inline: false }
    ]);
  });
});
