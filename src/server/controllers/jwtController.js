const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (req, res) => {
    // payload, secret key, expiration, callback
    jwt.sign({ username: req.body.username }, process.env.JWT_KEY, /*, { expiresIn: 120 }*/ (err, token) => {
      if (err) res.sendStatus(500); // jwt not created successfully
      else res.locals = { token, id: res.locals.id };
    });
  },

  extractToken: (req, res, next) => {
    //get auth header val
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // split, the key is at index 1
      const bearer = authHeader.split(' ')[1];
      res.locals = { bearer };
      // goes to verify token
      next();
    } else {
      res.sendStatus(403); // forbidden
    }
  },

  verifyToken: (req, res, next) => {
    jwt.verify(res.locals.bearer, process.env.JWT_KEY, (err, authData) => {
      if (err) res.sendStatus(403); // forbidden
      else {
        res.locals = { authData };
        // goes to delete user
        next();
      }
    })
  }
}