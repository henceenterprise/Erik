import { jest } from '@jest/globals';
import { execute } from '../../src/commands/inspiration.js';

describe('inspiration command', () => {
  test('responds with an inspirational quote', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const interaction = { reply: jest.fn() };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledTimes(1);
    const quote = interaction.reply.mock.calls[0][0];
    expect(typeof quote).toBe('string');
    expect(quote.length).toBeGreaterThan(0);
  });
});
