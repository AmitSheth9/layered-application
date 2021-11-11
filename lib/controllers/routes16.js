const { Router } = require('express');
const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const pool = require('../utils/pool');
const d16 = require('../utils/data-api');
const State16 = require('../models/model16');

//make a post route that posts something into our sql database
//on post we arent sure yet
//on get we want to return all 2016 state data
module.exports = Router()

  .post('/', async(req, res, next) => {
    try {
      const states = await State16.postSeedData2016();
      res.send(states);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try{
      const states = await State16.getAll();
      res.send(states);
    } catch(err) {
      next(err);
    }
  });
