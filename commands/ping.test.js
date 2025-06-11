import { jest } from '@jest/globals';
import { execute } from './ping.js';

describe('ping command', () => {
  test('responds with latency information', async () => {
    const replyMessage = { createdTimestamp: 150 };
    const interaction = {
      createdTimestamp: 100,
      reply: jest.fn().mockResolvedValue(replyMessage),
      editReply: jest.fn()
    };
    await execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith({ content: '🏓 Pong!', fetchReply: true });
    expect(interaction.editReply).toHaveBeenCalledWith('🏓 Pong! Tempo de resposta: 50ms');
  });
});
