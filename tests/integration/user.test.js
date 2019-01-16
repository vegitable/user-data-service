const request = require('supertest');
const { User } = require('../../src/models/user');

let server;

describe('/api/users', () => {
  beforeEach( async () => {
    server = require('../../src/index');
    await User.collection.insertMany([
      { name: 'Danny Dyer',
        email: 'dannydyer@gmail.com',
        password: 'testingpassword'
      },
      {
        name: 'Keith',
        email: 'keith@hvar.com',
        password: 'keithlikey'
      }
    ]);
  });

  afterEach(async () => {
    server.close();
    await User.remove({});
  });

  describe('POST /api/users/register', () => {
    it('should return a status of 200 when a new user is created', async () => {
      const res = await request(server).post('/api/users/register');
      expect(res.status).toBe(200);
    });
  });
});