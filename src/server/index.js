const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

//routers
const loginController = require('./controllers/loginController.js');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname +'./../../'))); //serves the index.html

// login info
app.post('/login', loginController.login);
app.get('/login', loginController.checkForLoggedInCookie);
app.get('/logout', loginController.logout);

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on 3000...');
})