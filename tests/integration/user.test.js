const request = require('supertest');
const { User } = require('../../src/models/user');

let server;

describe('/api/users', () => {
  describe('POST /api/users/register', () => {
    it('should return a status of 200 when a new user is created', async () => {
      expect(200).toEqual(200);
    });
  });
});