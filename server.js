// |Chocolate|Satisfaction Level|
// |---------|-|
// |Dark chocolate|8|
// |Couverture|5|
// |Milk chocolate|10|
// |Hershey|7|
// |White chocolate|8|
// |Unsweetened chocolate|5|
// |Gianduja|6|
// |Cacao|4|

// Create a new DB using a Sequelize model
// Create an express / handlebars / node.js / sequelize app
// With only 1 route and display all the chocolate names and their satisfaction level.

// express setup
var express = require('express');
var app = express();
var PORT = process.env.NODE_ENV || 3000;

// database setup
var Sequelize = require('sequelize');
var connection = new Sequelize('chocolate_db', 'root');

// handlbars setup
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var Chocolate = connection.define('chocolate', { // This creates a table called Chocolates - Sequelize pluralizes correctly using a pluralizing library
  name:  Sequelize.STRING,
  satisfactionLevel: Sequelize.INTEGER
});

Chocolate.bulkCreate([
  {name: 'Dark Chocolate', satisfaction: 8 },
  {name: 'Couverture', satisfaction: 5 },
  {name: 'Milk Chocolate', satisfaction: 10 }
]);

// routes
app.get('/', function(req, res) {
  res.render('chocolate', {chocolates});
});

var mysql = require('mysql');

var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  Chocolate.findAll({}).then(function(chocolates) {
    res.render('chocolate', {chocolate});
  });
});

// database connection via sequelize
connection.sync().then(function() {
  app.listen(PORT, function() {
    console.log('Listening on %s ', PORT);
  });
});
