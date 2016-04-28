const db = require(__dirname + '/../database/database.js')(__dirname + '/../../database/authentication.sqlite3');
const dbTest = require(__dirname + '/../database/database.js')(__dirname + '/../../database/authentication-test.sqlite3');
const jwt = require('jsonwebtoken');
const hash = require('./hash.js');
const secret = 'when in class... do as the students do';

function handleLogin(req, res) {
  var username = req.body.username;
  var password =  req.body.password;
  var test = req.query.test;
  var database = test ? dbTest : db;
  // console.log();
  
  if (typeof username !== 'string' || typeof username !== 'string') {
    res.status(400).send('bad request');
    return void 0;
  }

  database.fetchTable('users', 'password', 'username="' + username + '"')
  .then(function (user) {
    if (user.length === 1) {
      user = user[0];
      return hash.checkHash(password, user.password);
    }
    return Promise.reject('username and password do not match');
  })
  .then(function (bool) {
    if (bool) {
      return Promise.resolve();
    }
    return Promise.reject('username and password do not match');
  })
  .then(function () {
    var token = jwt.sign({username: username}, secret);
    res.cookie('authorization', 'Bearer ' + token).status(200).send();
  })
  .catch(function (error){
    console.error(error);
    res.status(400).send(error);
  });
}

function handleSignup(req, res) {
  var username = req.body.username;
  var password =  req.body.password;
  var test = req.query.test;
  var database = test ? dbTest : db;

  if (typeof username !== 'string' || typeof username !== 'string') {
    res.status(400).send('bad request');
    return void 0;
  }


  // check if username is taken then create new user if the name is unique
  database.fetchTable('users', '*', 'username = "' + username + '"')
  .then(function (existingUser) {
    if (existingUser.length > 0) {
      return Promise.reject('username already exists');
    } else {
      return hash.makeHash(password);
    }
  })
  .then(function (hashed) {
    return database.insertInto('users', [username, hashed, Date.now()], true);
  })
  .then(function () {
    var token = jwt.sign({username: username}, secret);
    res.cookie('authorization', 'Bearer ' + token).status(200).send();
    return Promise.resolve();
  })
  .catch(function (error){
    console.error(error);
    res.status(400).send(error);
  });
}


module.exports =  {
                    login: handleLogin,
                    signup: handleSignup
                  };
