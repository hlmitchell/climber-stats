const request = require('supertest');
const { app, server, mongoose } = require('../index.js');

describe('Test user routes', () => {
  describe('Test /signup route', () => {
    test('respond with 200 if new user', async () => {
      const response = await request(app)
        .post('/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'codesmith', 
          password: 'ilovetesting'
        })
      expect(response.statusCode).toBe(200);
    });

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

    test('respond with 400 if wrong body sent', async () => {
      const response = await request(app)
        .post('/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'wrong' 
        })
      expect(response.statusCode).toBe(400);
    });
  });
  
  describe('test /login route', () => {
    test('try to login with improper body', async () => {
      const response = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'codesmith'
      })
      expect(response.statusCode).toBe(400);
    })
    test('try to login with non existing user', async () => {
      const response = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: " ",
        password: " "
      })
      expect(response.statusCode).toBe(401);
    })
    test('try to login to existing user with wrong password', async () => {
      const response = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'codesmith',
        password: 'taco'
      })
      expect(response.statusCode).toBe(401);
    })
    test('try to login with correct username and password', async () => {
      const response = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'codesmith',
        password: 'ilovetesting'
      })
      expect(response.body.token).toBeTruthy();
      expect(response.statusCode).toBe(200);
    })
  })

  describe('test /deleteAccount route', () => {
    test('try to delete user with incorrect jwt', async () => {
      const key = 'Bearer wrongJwt';
      const response = await request(app)
      .delete('/deleteAccount')
      .set('Accept', 'application/json')
      .set('Authorization', key)
      .send({
        username: "codesmith"
      })
      expect(response.statusCode).toBe(403);
    })

    test('try to delete user with no jwt', async () => {
      const response = await request(app)
      .delete('/deleteAccount')
      .set('Accept', 'application/json')
      .send({
        username: "codesmith"
      })
      expect(response.statusCode).toBe(403);
    })

    test('try to delete user with nonexisting username', async () => {
      const response = await request(app)
      .delete('/deleteAccount')
      .set('Accept', 'application/json')
      .send({
        taco: 'taco'
      })
      expect(response.statusCode).toBe(403);
    })

    test('delete the user', async () => {
      const key = `Bearer ${process.env.TEST_JWT}`;
      const response = await request(app)
      .delete('/deleteAccount')
      .set('Accept', 'application/json')
      .set('Authorization', key)
      .send({
        username: "codesmith"
      })
      expect(response.statusCode).toBe(200);
    })
  })

  afterAll((done) => {
    // needed for jest to exit properly
    server.close();
    mongoose.connection.close()
  });
})

  
