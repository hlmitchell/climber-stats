const express = require('express');
const statsRouter = express.Router();

climbRouter.get('/getRoute', (req, res) => res.json({'it': 'worked'}));

module.exports = statsRouter;