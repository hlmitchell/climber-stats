const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// routes
const statsRoute = require('./routes/statsRoute.js');

// controllers
const userController = require('./controllers/userController.js');
const jwtController = require('./controllers/jwtController.js');

// setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname +'./../../'))); //serves the index.html

// login routes
app.post('/login', userController.login, jwtController.createToken, (req, res) => res.json(res.locals));
app.post('/signup', userController.signup, jwtController.createToken, (req, res) => res.json(res.locals));
app.delete('/deleteAccount', jwtController.extractToken, jwtController.verifyToken, userController.deleteUser, (req, res) => res.send());

// routers
app.use('/stats', statsRoute);

// error handling routes
app.use('/*', (req, res) => res.send('404 not found'));
app.use((err, req, res, next) => res.send(err.message));

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