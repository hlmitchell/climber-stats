// this test stops jest from throwing an error for not executing tests in this file
describe('dummy', () => {
  it('has a dummy test', () => {
    expect(2+2).toBe(4);
  })
})

module.exports = function(app, server, mongoose, request, jwt) {
  // id of newly added, updated, and deleted route
  let routeId;

  describe('Test the /stats route', () => {

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

    test('should get a climbing route', async () => {
      const response = await request(app)
        .get(`/stats/getRoute/${routeId}`)
        .set('Accept', 'application/json')
        .set('Cookie', `ssid=${jwt}`)
        .send()
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

    test('should delete a climbing route', async () => {
      const response = await request(app)
        .delete(`/stats/deleteRoute/${routeId}`)
        .set('Accept', 'application/json')
        .set('Cookie', `ssid=${jwt}`)
        .send()
      expect(response.statusCode).toBe(200);
    });
  })

}