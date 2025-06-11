import { jest } from '@jest/globals';
import { execute } from '../../src/commands/meme.js';

const MEME_REGEX = /^https:\/\/i\.imgflip\.com\/.+\.(jpg|png)$/;

describe('meme command', () => {
  test('responds with a meme url', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const interaction = { reply: jest.fn() };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledTimes(1);
    const url = interaction.reply.mock.calls[0][0];
    expect(MEME_REGEX.test(url)).toBe(true);
  });
});
