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
    // search for specific route
    if (req.params._id !== 'all') {
      const { _id } = req.params;
      Stats.findById(_id)
      .then(data => {
        res.locals.data = data;
        next();
      })
      .catch(err => res.send(err)) // 500 server error
    } 
    // search for every route (temporary)
    else {
      Stats.find({})
      .then(data => {
        res.locals.data = data;
        next();
      })
      .catch(err => res.send(err)) // 500 server error
    }
  },

  updateRoute: (req, res, next) => {
    const { _id } = req.params;
    Stats.findByIdAndUpdate(_id, req.body, { new: true })
    .then(data => {
      res.locals.data = data;
      next();
    })
    .catch(err => res.send(err)) // 500 server error
  },

  deleteRoute: (req, res, next) => {
    const { _id } = req.params;
    Stats.findByIdAndRemove(_id)
    .then(data => {
      res.locals.data = data;
      next();
    })
    .catch(err => res.send(err)) // 500 server error
  }
}