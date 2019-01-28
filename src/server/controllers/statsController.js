const Stats = require('../schemas/statsSchema.js');

module.exports = {
  addRoute: (req, res, next) => {
    Stats.create(req.body)
    .then(data => {
      res.locals.data = data;
      next();
    })
    .catch(err => res.send(err)) // 500 server error
  },

  getRoute: (req, res, next) => {
    const { _id } = req.params;
    Stats.findById(_id)
    .then(data => {
      res.locals.data = data;
      next();
    })
    .catch(err => res.send(err)) // 500 server error
  }
}