const helmet = require('helmet');
const express = require('express');
const app = express();

app.disable("x-powered-by"); /* added just in case necessary */
var fs = require("fs");
var path = require("path");

// Route to access package[.]json
app.get("/package.json", function (req, res, next) {
  fs.readFile(__dirname + "/package.json", function (err, data) {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

// Route to access package[.]json
app.get("/_api/package.json", function (req, res, next) {
  fs.readFile(__dirname + "/package.json", function (err, data) {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

// Route to access index[.]html
app.get("/views/index.html", function (req, res, next) {
  fs.readFile(__dirname + "/views/index.html", function (err, data) {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

// boilerplate below

const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
//app.use('/_api', api); 
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port - ${port}`);
});

// boilerplate above

app.use(function (req, res, next) {
  res.status(404).type("txt").send("Not Found");
});

module.exports = app;
