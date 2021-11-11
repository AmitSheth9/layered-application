const pool = require('../utils/pool');
const request = require('superagent');


module.exports = class State16 {id;
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

  static async postSeedData2016() {
    await pool.query('DELETE FROM sixteen');
    const data16 = await request
      .get('https://datausa.io/api/data?drilldowns=State&measures=Population&year=2016');
    const d16 = data16.body.data;
    // console.log(d16.length);

    for (let i = 0; i < d16.length; i++) {
  
      await pool.query('INSERT INTO sixteen (state, population, year, idapi) VALUES ($1, $2, $3, $4) Returning *',
        [d16[i].State, d16[i].Population, d16[i].Year, d16[i]['ID State']]);
    }
    console.log(d16.length);
    return d16;

  }
  static async getAll () {
    const response = await pool.query('SELECT * FROM sixteen');
    console.log(response.rows.length);
    return response.rows;
  }  
};


