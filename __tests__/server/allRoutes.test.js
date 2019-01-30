const request = require('supertest');
const { app, server, mongoose } = require('../../src/server/index.js');
const statsRouteTest = require('./routeTests/statsRoute.test.js');
const signupRouteTest = require('./routeTests/signupRoute.test.js');

describe('test all routes', () => {

  // all routes are being imported and run here because when
  // I ran them in individual files I received ECONNREFUSED error
  // weird downside is that I have to put a dummy test in all the 
  // route test files (that isn't being exported) or else jest
  // is unhappy with me
  signupRouteTest(app, server, mongoose, request);
  statsRouteTest(app, server, mongoose, request);

  afterAll(done => {
    // needed for jest to exit properly
    server.close();
    mongoose.connection.close()
  });

})