const request = require('supertest');
const app = require('../../src/index');

describe('/api/users', () => {
  describe('POST /api/users/register', () => {
    it('should return a status of 200 when a new user is created', (done) => {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200, {
          message: 'vegitable session started!',
        }, done);
    });
  });
});
