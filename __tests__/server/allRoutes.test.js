const request = require('supertest');
const { app, server, mongoose } = require('../../src/server/index.js');
const statsRouteTest = require('./routeTests/statsRoute.test.js');
const signupRouteTest = require('./routeTests/signupRoute.test.js');

describe('test all routes', () => {

  // jwt to use when testing routes
  let jwt;

  // login to test account to use jwt for remaining tests
  test('respond with 200 if logged in successfully', async () => {
    const response = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'Cody_Smith', 
        password: 'ilovetesting'
      })
    expect(response.statusCode).toBe(200);
    expect(response.headers.hasOwnProperty('set-cookie'));
    expect(response.headers['set-cookie'][0].slice(0, 4)).toBe('ssid');
    
    let ssidString = response.headers['set-cookie'][0];
    let startIndex = ssidString.indexOf('=') + 1;
    let endIndex = ssidString.indexOf(';');
    jwt = ssidString.slice(startIndex, endIndex);
  });

  // all routes are being imported and run here because when
  // I ran them in individual files I received ECONNREFUSED error
  // weird downside is that I have to put a dummy test in all the 
  // route test files (that isn't being exported) or else jest
  // is unhappy with me
  signupRouteTest(app, server, mongoose, request);
  statsRouteTest(app, server, mongoose, request, jwt);

  // logout when all tests are done 
  test('respond with 200 on successful logout', async () => {
    const response = await request(app)
      .post('/logout')
      .set('Accept', 'application/json')
      .send()
    expect(response.statusCode).toBe(200);
    expect(!response.headers.hasOwnProperty('set-cookie'));
  })

  afterAll(done => {
    // needed for jest to exit properly
    server.close();
    mongoose.connection.close()
  });

})