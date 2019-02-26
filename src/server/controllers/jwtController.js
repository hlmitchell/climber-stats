const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (req, res, next) => {
    // payload, secret key, expiration, callback
    jwt.sign({ username: req.body.username }, process.env.JWT_KEY, /*, { expiresIn: 120 }*/ (err, token) => {
      if (err) res.sendStatus(500); // jwt not created successfully
      else {
        res.cookie('ssid', token);
        res.locals = { id: res.locals.id };
        next();
      }
    });
  },

  extractToken: (req, res, next) => {
    if (req.cookies.hasOwnProperty('ssid')) {
      res.locals = { ssid: req.cookies.ssid };
      next();
    } else {
      res.sendStatus(403); // forbidden
    }
  },

  verifyToken: (req, res, next) => {
    jwt.verify(res.locals.ssid, process.env.JWT_KEY, (err, authData) => {
      if (err) res.sendStatus(403); // forbidden
      else {
        res.locals.authData = { authData };
        next();
      }
    })
  }
}