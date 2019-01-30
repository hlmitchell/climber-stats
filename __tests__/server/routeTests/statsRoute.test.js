// this test stops jest from throwing an error for not executing tests here
describe('dummy', () => {
  it('has a dummy test', () => {
    expect(2+2).toBe(4);
  })
})

module.exports = function(app, server, mongoose, request) {

  describe('Test the /signup route', () => {

    // create a user to ensure token verification works with routes
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

    test('should add a route', async () => {
      const response = await request(app)
        .post('/stats/updateRoute')
        .set('Accept', 'application/json')
        .send({
          "location": "Boulderdash",
          "type": "Top Rope",
          "rating": "5.10c"
        })
      expect(response.statusCode).toBe(200);
    });

    // test('should delete a route', async () => {
    //   const response = await request(app)
    //     .post('stats/addRoute')
    //     .set('Accept', 'application/json')
    //     .send({
    //       "location": "Boulderdash",
    //       "type": "Top Rope",
    //       "rating": "5.10c"
    //     })
    //   expect(response.statusCode).toBe(200);
    // });

    // delete the user after statsRoutes all checked
    test('delete the user', async () => {
      const response = await request(app)
      .delete('/deleteAccount')
      .set('Accept', 'application/json')
      .set('Cookie', `ssid=${process.env.TEST_JWT}`)
      .send({
        username: "codesmith"
      })
      expect(response.statusCode).toBe(200);
    })

    // afterAll((done) => {
    //   // needed for jest to exit properly
    //   server.close();
    //   mongoose.connection.close()
    // });
  })

}