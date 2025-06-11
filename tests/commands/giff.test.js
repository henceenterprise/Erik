import { jest } from '@jest/globals';
import { execute } from '../../src/commands/giff.js';

// The GIF list is not exported, so we rely on the reply content
const GIF_REGEX = /^https:\/\/media\.giphy\.com\/media\/.+\.gif$/;

describe('giff command', () => {
  test('responds with a gif url', async () => {
    // Mock Math.random to return deterministic value
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const interaction = { reply: jest.fn() };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledTimes(1);
    const url = interaction.reply.mock.calls[0][0];
    expect(GIF_REGEX.test(url)).toBe(true);
  });
});
