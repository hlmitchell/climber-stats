// this test stops jest from throwing an error for not executing tests here
describe('dummy', () => {
  it('has a dummy test', () => {
    expect(2+2).toBe(4);
  })
})

module.exports = function(app, server, mongoose, request) {

  describe('Test the /signup route', () => {

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