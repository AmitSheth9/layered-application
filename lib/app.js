const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/2016', require('./controllers/routes16'));
app.use('/api/2019', require('./controllers/routes19'));


app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
