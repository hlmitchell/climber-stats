const Stats = require('../schemas/statsSchema.js');

module.exports = {
  addRoute: (req, res, next) => {
    console.log(req.body);
    next();
  }
}