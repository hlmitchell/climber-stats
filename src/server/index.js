const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// controllers
const loginController = require('./controllers/loginController.js');
const jwtController = require('./controllers/jwtController.js');

// setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname +'./../../'))); //serves the index.html

// login routes
app.post('/login', loginController.login, jwtController.createToken);
app.post('/signup', loginController.signup, jwtController.createToken);
// logging out will mean deleting the auth token on the client side and then refreshing the page?

// database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  else console.log('Connected to db');
})

// server connection
const server = app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on 3000...');
})

// for testing
module.exports = { app, server, mongoose };