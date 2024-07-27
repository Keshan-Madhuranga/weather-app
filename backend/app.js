const express = require('express');
const routes = require('./api/routes/main');

const app = express();

app.use('/api/v1', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

module.exports = app;