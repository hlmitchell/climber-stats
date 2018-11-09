const Session = require('../schemas/sessionSchema.js')

module.exports = {
  login: (req, res, next) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
      //query db
      if (req.body.username === 'hannah' && req.body.password === 'metaco') {
        // create a session which has a default date column
        Session.create({})
        .then(session => {
          // use the unique database session id to create a cookie
          res.cookie('ssid ', session._id, { httpOnly: true }).send();
        })
        .catch(err => {
          res.sendStatus(500);
        })
      }
      else res.sendStatus(401);
    } else res.sendStatus(400);
  },

  checkForLoggedInCookie: (req, res, next) => {
    // check if session cookie exists
    if (req.cookies.hasOwnProperty('ssid')) {
      // query db by cookie id
      Session.findOne({'_id': req.cookies.ssid})
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
    Session.findOneAndDelete({'_id': req.cookies.ssid})
    .then(session => {
      res.clearCookie('ssid').send();
    })
    .catch(err => {
      res.sendStatus(500);
    })
  }
}