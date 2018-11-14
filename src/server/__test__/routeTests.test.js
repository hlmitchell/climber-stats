const request = require('supertest');
const { app, server, mongoose } = require('../index.js');

describe('Test the /signup route', () => {

  test('respond with 403 if user already exists', async () => {
    const response = await request(app)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'codesmith', 
        password: 'ilovetesting'
      })
    expect(response.statusCode).toBe(403);
  });

  afterAll((done) => {
    server.close();
    mongoose.connection.close()
  });
})

  
