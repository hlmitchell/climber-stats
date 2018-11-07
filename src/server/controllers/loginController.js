module.exports = {
  login: (req, res, next) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
      //query db
      if (req.body.username === 'hannah' && req.body.password === 'metaco') {
        // need an encrypted cookie
        res.cookie('status ', 'valid', { httpOnly: true });
        res.send();
      }
      else res.sendStatus(401);
    } else res.sendStatus(400);
  },
  checkForLoggedInCookie: (req, res, next) => {
    if (req.cookies.status === 'valid') res.sendStatus(200);
    else res.sendStatus(401);
  },
  logout: (req, res, next) => {
    res.clearCookie('status');
    res.send();
  }
}