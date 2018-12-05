
const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('Should generate correct message object', () => {
      
    const from = 'Friend';
    const text = 'Some message';
    const message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
});
