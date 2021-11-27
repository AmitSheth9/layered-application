const pool = require('../utils/pool');
const request = require('superagent');



module.exports = class State19 {
  id;
  state;
  population;
  year;
  idapi;

  constructor(row) {
    this.state = row.State;
    this.population = row.Population;
    this.year = row.Year;
    this.idapi = row['ID State'];
  }

  static async postSeedData2019() {
    await pool.query('DELETE FROM nineteen');
    const data19 = await request
      .get('https://datausa.io/api/data?drilldowns=State&measures=Population&year=2019');
    const d19 = data19.body.data;
    const promises = d19.map(async (st) => {
      const state = new State19(st);
      console.log(state);
      await pool.query('INSERT INTO nineteen (state, population, year, idapi) VALUES ($1, $2, $3, $4) Returning *',
        [state.state, state.population, state.year, state.idapi]);
    });
    const result = await Promise.all(promises);
    /*
    for (let i = 0; i < d19.length; i++) {
  
      await pool.query('INSERT INTO nineteen (state, population, year, idapi) VALUES ($1, $2, $3, $4) Returning *',
        [d19[i].State, d19[i].Population, d19[i].Year, d19[i]['ID State']]);
    }
*/
    return result;

  }
  static async getAll() {
    const response = await pool.query('SELECT * FROM nineteen');
    console.log(response.rows.length);
    return response.rows;
  }  
 
};
