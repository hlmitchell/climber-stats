// this test stops jest from throwing an error for not executing tests in this file
describe('dummy', () => {
  it('has a dummy test', () => {
    expect(2+2).toBe(4);
  })
})

module.exports = function(app, server, mongoose, request) {
  // id of newly added, updated, and deleted route
  let routeId;
  // jwt for test user
  let jwt;

  describe('Test the /stats route', () => {
    // login ensure token verification works with routes
    test('respond with 200 if logged in successfully', async () => {
      const response = await request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({
          username: 'Cody_Smith', 
          password: 'ilovetesting'
        })
      expect(response.statusCode).toBe(200);
      
      let ssidString = response.headers['set-cookie'][0];
      let startIndex = ssidString.indexOf('=') + 1;
      let endIndex = ssidString.indexOf(';');
      jwt = ssidString.slice(startIndex, endIndex);
    });

    test('should add a climbing route', async () => {
      const response = await request(app)
        .post('/stats/addRoute')
        .set('Accept', 'application/json')
        .set('Cookie', `ssid=${jwt}`)
        .send({
          "location": "Boulderdash",
          "type": "Top Rope",
          "rating": "5.10c"
        })
      expect(response.statusCode).toBe(200);
      let responseObj = JSON.parse(response.text);
      expect(responseObj.hasOwnProperty('_id')).toBeTruthy();
      routeId = responseObj._id;
    });

    test('should update a climbing route', async () => {
      const response = await request(app)
        .patch(`/stats/updateRoute/${routeId}`)
        .set('Accept', 'application/json')
        .set('Cookie', `ssid=${jwt}`)
        .send({
          "setting": true
        })
      expect(response.statusCode).toBe(200);
    });
  })

}