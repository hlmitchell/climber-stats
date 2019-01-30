const request = require('supertest');
const { app, server, mongoose } = require('../../src/server/index.js');
const statsRouteTest = require('./statsRoute.test.js');
const signupRouteTest = require('./signupRoute.test.js');

describe('test all routes', () => {

  signupRouteTest(app, server, mongoose, request);
  statsRouteTest(app, server, mongoose, request);

  afterAll((done) => {
    // needed for jest to exit properly
    server.close();
    mongoose.connection.close()
  });

})