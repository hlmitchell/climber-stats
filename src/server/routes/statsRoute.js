const express = require('express');
const statsRouter = express.Router();

statsRouter.get('/getRoute', (req, res) => res.json({'it': 'worked'}));

module.exports = statsRouter;