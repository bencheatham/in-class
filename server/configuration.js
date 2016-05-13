
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var app = express();
module.exports = app;


/////*****/////*****/////*****/////*****/////*****
// middleware
/////*****/////*****/////*****/////*****/////*****

app.use(
  // function (req, res, next) {
  //   console.log(req.headers.cookie);
  //   next();
  // },
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  cookieParser()  
);

require(__dirname + '/authentication/authentication.js')(app); // initialize the JWT App
var authenticationHandler = require(__dirname + '/authentication/authenticationHandler.js');

// use express static to set the statically hosted files to the serve from the client directory
app.use('/', express.static(__dirname + '/../dist/'));



if (process.env.NODE_ENV !== 'production') { require('./webpack.js')(app); }




app.post('/signup', authenticationHandler.signup);
app.post('/login', authenticationHandler.login);
app.post('/logout', authenticationHandler.logout);

require('./databaseEndpoints.js')(app);

