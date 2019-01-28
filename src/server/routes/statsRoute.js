const express = require('express');
const statsRouter = express.Router();
const statsController = require('../controllers/statsController.js');
const jwtController = require('../controllers/jwtController.js');

statsRouter.get('/getRoute/:_id', 
  // jwtController.verifyToken,
  statsController.getRoute,
  (req, res) => res.json(res.locals.data)
);

statsRouter.post('/addRoute', 
  // jwtController.verifyToken,
  statsController.addRoute, 
  (req, res) => res.json(res.locals.data)
);

statsRouter.patch('/updateRoute/:_id',
  // jwtController.verifyToken,
  statsController.updateRoute,
  (req, res) => res.json(res.locals.data)
)

statsRouter.delete('/deleteRoute/:_id',
  // jwtController.verifyToken,
  statsController.deleteRoute,
  (req, res) => res.json(res.locals.data)
)

module.exports = statsRouter;