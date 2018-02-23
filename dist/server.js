// eslint-disable
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
app.use(serveStatic(__dirname));

app.get('/api/:problem', function (req, res) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: 'postgres://vvrvipfefhondb:59b1d674a96deaffdf2e7b10660697f053fa65952e6828bca1fab61887714db7@ec2-184-73-202-179.compute-1.amazonaws.com:5432/dbhb0lcuq5o9kg',
    ssl: true,
  });

  client.connect();
  client.query(`SELECT * FROM instances WHERE problem_link='${req.params.problem}';`, (err, response) => {
    if (err) throw err;
    // for (let row of response.rows) {
    //   console.log(JSON.stringify(row));
    // }
    res.send(response.rows);
    client.end();
  });
})
const port = process.env.PORT || 5000;
app.listen(port);
console.log(process.env.DATABASE_URL);
console.log(`Server started on port + ${port}`);
