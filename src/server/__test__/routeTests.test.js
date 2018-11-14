const loginController = require('../controllers/loginController.js');
const superTest = require('supertest');
const app = require('../index.js');

describe('POST /login', function() {
  test('respond with json', function(done) {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({name: 'john'})
      .expect(200, done);
  });
});