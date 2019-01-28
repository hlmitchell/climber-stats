const express = require('express');
const statsRouter = express.Router();
const statsController = require('../controllers/statsController.js');
const jwtController = require('../controllers/jwtController.js');

statsRouter.get('/getRoute', (req, res) => res.json({'it': 'worked'}));

statsRouter.post('/addRoute', 
  // jwtController.verifyToken,
  statsController.addRoute, 
  (req, res) => res.json({'it': 'stored'}));

module.exports = statsRouter;