const User = require('../schemas/userSchema.js');

module.exports = {
  login: (req, res, next) => {
    // body must have username and password attached
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
      // query the db by the username because we will need to decrypt the password
      User.findOne({'username': req.body.username}) 
      .then(user => {
        // check if user actually exists first
        if (user) {
          // then compare passwords
          user.checkPassword(req.body.password)
          .then((isAMatch) => {
            if (isAMatch) {
              res.locals = user;
              // next middleware creates jwt
              next();
            } else {
              res.sendStatus(401) // invalid password
            }
          })
          .catch(err => {
            res.sendStatus(500) // server error
          })
        } else res.sendStatus(401); // invalid username
      })
      .catch(err => {
        res.sendStatus(500); // server error
      })
    } else res.sendStatus(400); // no username and password keys
  },

  signup: (req, res, next) => {
    // body must have username and password attached
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
      // query the db for the username to see it already exists
      User.findOne({'username': req.body.username}) 
      .then(user => {
        // if the user doesn't exist create the new account
        if (!user) {
          User.create({'username': req.body.username, 'password': req.body.password})
          .then(user => {
            // next middleware creates user session
            res.locals = user;
            next();
          })
          .catch(err => {
            res.sendStatus(500); // server error
          })
        } else res.sendStatus(403); // username already exists
      })
      .catch(err => {
        res.sendStatus(500); // server error
      })
    } else res.sendStatus(400); // no username and password keys on req.body
  },

  deleteUser: (req, res) => {
    // usernames are unique so we can delete by username
    if (req.body.hasOwnProperty('username')) {
      User.findOneAndDelete({ 'username': req.body.username })
      .then(user => {
        if (user) res.send(res.locals.authData);
        else res.sendStatus(404); // not found
      })
      .catch(err => {
        res.sendStatus(500); // server error
      })
    } else {
      res.sendStatus(401) // username not sent in body
    }
  }
}