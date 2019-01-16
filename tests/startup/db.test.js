const mongoose = require('mongoose');

describe('db', () => {
  it('should connect to the mongo instance set in config', async () => {
    expect(mongoose.connection.readyState).toEqual(0);
    await require('../../src/startup/db')();
    expect(mongoose.connection.readyState).toEqual(2);
  });
});