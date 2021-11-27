const pool = require('../utils/pool');
const stateObject = require('superagent');

module.exports = class StateDifference {
  id;
  state;
  population;
  constructor(row) {
    this.state = row.State;
  }
  static async popDifference() {
    await pool.query('DELETE FROM difference');
    const data19 = await stateObject
      .get('https://datausa.io/api/data?drilldowns=State&measures=Population&year=2019');
    const d19 = data19.body.data;
    const data16 = await stateObject
      .get('https://datausa.io/api/data?drilldowns=State&measures=Population&year=2016');
    const d16 = data16.body.data;

    for(let i = 0; i < d19.length; i++) {
      console.log(d19[i]);
      await pool.query('INSERT INTO difference (state, sixteen_pop, nineteen_pop, pop_difference, pct_difference, idapi) VALUES ($1, $2, $3, $4, $5, $6) Returning *',
        [d19[i]['Slug State'], d16[i].Population, d19[i].Population, d19[i].Population - d16[i].Population, ((d19[i].Population - d16[i].Population) / (d19[i].Population)) * 100, d19[i]['ID State']]); 
    }
    return d19;
  }

  static async getAllDiff() {
    const response = await pool.query('SELECT * FROM difference');
    return response.rows;
  }
  static async getState(usa_state) {
    const response = await pool.query('SELECT * FROM difference WHERE difference.state = $1', [usa_state]);
    console.log(response);
    return response;
  }
  static async deleteState(usa_state) {
    const response = await pool.query('DELETE FROM difference WHERE difference.state = $1', [usa_state]);
    return response.rows;
  }
  static async postState(usa_state, stateObj) {
    await pool.query('INSERT INTO difference (state, sixteen_pop, nineteen_pop, pop_difference, pct_difference, idapi) VALUES ($1, $2, $3, $4, $5, $6) Returning *', [stateObj.state, stateObj.sixteen_pop, stateObj.nineteen_pop, stateObj.pop_difference, stateObj.pct_difference, stateObj.idapi]);
    return stateObj;
  }
};
