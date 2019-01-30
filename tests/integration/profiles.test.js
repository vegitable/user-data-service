const request = require('supertest');
const { Profile } = require('../../src/models/profile');

let server;

describe('/api/profiles', () => {
  beforeEach(() => { server = require('../../src/index'); })

  afterEach(async () => { 
    await server.close(); 
  });

  describe('POST /api/profiles/getRestaurants/:email', () => {
    it('should return a status of 200 when a new user is created', async () => {
      const profiles = [
        {
          userEmail: 'testing@testing.com',
          restaurants: [
            {
              name: 'testRestaurant',
              postcode: 'E14 7DX',
            }
          ]
        }
      ]

      await Profile.collection.insertMany(profiles);

      const res = await request(server).post('/api/profiles/getRestaurants').send({ userEmail: 'testing@testing.com' });

      expect(res.status).toBe(200);
      expect(res.body.restaurants[0]).toEqual({ 
        name: 'testRestaurant',
        postcode: 'E14 7DX',
      });
    });
  });
});
