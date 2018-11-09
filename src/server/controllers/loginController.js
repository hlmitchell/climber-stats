const Session = require('../schemas/sessionSchema.js');
const User = require('../schemas/userInfoSchema.js');

module.exports = {
  login: (req, res, next) => {
    // body must have username and password attached
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
      // query the db just for the username because we will need to decrypt the password
      User.findOne({'username': req.body.username}) 
      .then(user => {
        // check if user exists first then decrypt the password to proceed
        if (user && user.checkPassword(req.body.password)) {
          // create a session which has a default date column
          Session.create({})
          .then(session => {
            // use the unique database session id to create a cookie
            res.cookie('ssid ', session._id, { httpOnly: true }).send();
          })
          .catch(err => {
            res.sendStatus(500); // server error
          })
        } else res.sendStatus(401); // invalid username or password
      })
      .catch(err => {
        res.sendStatus(500); // server error
      })
    } else res.sendStatus(400); // no username and password keys
  },

  checkForLoggedInCookie: (req, res, next) => {
    // check if session cookie exists
    if (req.cookies.hasOwnProperty('ssid')) {
      // query db by cookie id
      Session.findById(req.cookies.ssid)
      .then(session => {
        res.sendStatus(200);
        // next();
      })
      .catch(err => {
        res.sendStatus(401);
      })
    }
    else res.sendStatus(401);
  },

  logout: (req, res, next) => {
    // delete session from db
    Session.findByIdAndDelete(req.cookies.ssid)
    .then(session => {
      res.clearCookie('ssid').send();
    })
    .catch(err => {
      res.sendStatus(500);
    })
  }
}