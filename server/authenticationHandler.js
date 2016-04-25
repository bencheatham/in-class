var db = require('./database.js')(__dirname + '/../database/authentication.sqlite3');

var jwt = require('jsonwebtoken');

var hash = require('./hash.js');

const secret = 'when in class... do as the students do';

function handleLogin(req, res) {
  var username = req.body.username;
  var password =  req.body.password;


  db.fetchTable('users', 'password', 'username="' + username + '"')
  .then(function (user) {
    console.log(user);
    if (user.length === 1) {
      user = user[0];
      return hash.checkHash(password, user.password);
    }
    // if (hash.checkHash(password, user.password)) {
      // return Promise.resolve();
    // }
    return Promise.reject('username and password do not match');
  })
  .then(function (bool) {
    if (bool) {
      return Promise.resolve()
    }
    return Promise.reject('username and password do not match');
  })
  .then(function () {
    var token = jwt.sign({username: username}, secret);
    res.cookie('Authorization', 'Bearer ' + token).status(200).send();
  })
  .catch(function (error){
    console.error(error);
    res.status(400).send(error);
  });








  // db.fetchUser(username).then(function(users) {
  //   // do check password
  //   if(users.length === 1) {
  //     console.log('users: ', users);

  //     var user = users[0];
  //     return hash.checkHash(password, user.password).then(function (bool) {
  //       if (bool) {
          // var token = jwt.sign({username: username}, 'keepingTabsIsTheBoss');
          // res.status(200).send({token: token});
  //       } else {
  //         console.warn('User '+ username + ' and password doesn\'t exist');
  //         res.status(401).send('User '+ username + ' doesn\'t exist');
  //       }
  //     });

  //   } else {
  //     console.warn('User '+ username + ' and password doesn\'t exist');
  //     res.status(401).send('User '+ username + ' doesn\'t exist');
  //   }
  // }).catch(function(reason) {
  //   res.sendStatus(500);
  //   console.log('Login failed: ', reason);
  // });
  }

  function handleSignup(req, res) {
    var username = req.body.username;
    var password =  req.body.password;

    // check if username is taken then create new user if the name is unique
    db.fetchTable('users', '*', 'username = "' + username + '"')
    .then(function (existingUser) {
      if (existingUser.length > 0) {
        return Promise.reject('username already exists');
      } else {
        return hash.makeHash(password);
      }
    })
    .then(function (hashed) {
      return db.insertInto('users', [username, hashed, Date.now()], true);
    })
    .then(function () {
      var token = jwt.sign({username: username}, secret);
      res.cookie('Authorization', 'Bearer ' + token).status(200).send();
      return Promise.resolve();
    })
    .catch(function (error){
      console.error(error);
      res.status(400).send(error);
    });



    // res.send(201);

    // // query db for the username
    // db.fetchUserId(username).then(function(users) {
      
    //   if(users.length > 0) { // check if user exist
    //     console.warn('User '+ username + ' already exist');
        
    //     res.sendStatus(422);

    //   } else {
    //     db.saveUsers([{username: username, password: password}]).then(function() {
    //       console.log('User '+ username + ' created');

    //       var token = jwt.sign({username: username}, 'keepingTabsIsTheBoss');

    //       console.log('attempt to set token');
          
    //       res.status(201).send({token: token});

    //     });
    //   }
    // }).catch(function(reason) {
    //   res.sendStatus(500);
    //   console.error('Signup failed: ', reason);
    // });
  }


module.exports =  {
                    login: handleLogin,
                    signup: handleSignup
                  }

