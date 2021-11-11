const request = require('superagent');
//const pool = require('../utils/pool');

async function data2016() {  
  const response = await request.get('https://datausa.io/api/data?drilldowns=State&measures=Population&year=2016');

  return (response.body.data);
}
async function data2019() {  
  const response = await request.get('https://datausa.io/api/data?drilldowns=State&measures=Population&year=2019');

  return (response.body.data);
}


module.exports = { data2016, data2019 };
