const { Router } = require('express');
const pool = require('../utils/pool');
const { data2019 } = require('../utils/data-api');
const State19 = require('../models/model19');
const StateDifference = require('../models/pop-change');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const states = await State19.postSeedData2019();
      //res.send(await data2019());
      res.send(states);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try{
      const allStates = await State19.getAll();
      res.send(allStates);
    } catch(err) {
      next(err);
    }
  })
  .post('/populationchange', async(req, res, next) => {
    try{
      const allStates = await StateDifference.popDifference();
      res.send(allStates);
    } catch(err) {
      next(err);
    }
  })
  .get('/populationchange', async(req, res, next) => {
    try{
      const popDiff = await StateDifference.getAllDiff();
      res.send(popDiff);
    } catch(err) {
      next(err);
    }
  })
  .get('/populationchange/:state', async(req, res, next) => {
    try{
      const state = req.params.state;
      const response = await StateDifference.getState(state);
      res.send(response.rows);
    } catch(err) {
      next(err);
    }
  })
  .delete('/populationchange/:state', async(req, res, next) => {
    try{
      const state = req.params.state;
      const response = await StateDifference.deleteState(state);
      res.send(response);
    } catch (err) {
      next(err);
    }
  })
  .post('/population/addstate', async(req, res, next) => {
    try{
      const state = req.params.state;
      const stateObject = req.body;
      const response = await StateDifference.postState(state, stateObject);
      res.send(stateObject);
    } catch(err) {
      next(err);
    }
  });
