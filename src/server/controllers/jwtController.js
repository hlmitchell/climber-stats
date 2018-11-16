const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (req, res) => {
    // payload, secret key, expiration, callback
    jwt.sign({ username: req.body.username }, 'supersecretkey', /*, { expiresIn: 120 }*/ (err, token) => {
      if (err) res.sendStatus(500); // jwt not created successfully
      else res.json({
        token: token,
        id: res.locals.id
      });
    });
  },

  extractToken: (req, res, next) => {
    //get auth header val
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // split, the bearer is at index 2
      const bearer = authHeader.split(' ')[1];
      res.locals = { bearer };
      // goes to verify token
      next();
    } else {
      res.sendStatus(403); // forbidden
    }
  },

  verifyToken: (req, res, next) => {
    jwt.verify(res.locals.bearer, 'supersecretkey', (err, authData) => {
      if (err) res.sendStatus(403); // forbidden
      else {
        res.locals = { authData };
        next();
      }
    })
  }
}