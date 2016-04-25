var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var app = express();
module.exports = app;

var handler = require('./requestHandler.js');



/////*****/////*****/////*****/////*****/////*****
// middleware
/////*****/////*****/////*****/////*****/////*****

// use the body parser to recognize json and url data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(function (req, res, next) {
  // console.log(req.headers.authorization);
  var auth = req.cookies.Authorization;
  // replace '%20' with ' '
  if (typeof auth === 'string' && auth.slice(6,9) === '%20') { auth = auth.slice(0,6) + ' ' + auth.slice(9); }
  req.headers.authorization = auth;
  // req.headers.Authorization = req.headers.Authorization || req.cookies.Authorization;
  // console.log(req.headers.authorization);
  // console.log(req.cookies);
	next();
})


require('./authentication.js')(app); // initialize the JWT App
var authenticationHandler = require('./authenticationHandler.js');

// use express static to set the statically hosted files to the serve from the client directory
app.use('/', express.static(__dirname + '/../client/'));

app.post('/signup', authenticationHandler.signup);
app.post('/login', authenticationHandler.login);


// app.use(authenticationHandler.authenticate);



