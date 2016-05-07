var pg = require('pg');
var conString = 'postgres://pxzaeueuxznomn:nIS-s5B_Ngpe9kCkhVrzj3yVz1@ec2-54-163-230-90.compute-1.amazonaws.com:5432/d4ema1c4gmv4im'
pg.defaults.ssl = true;

var clean = [
  'DROP TABLE IF EXISTS users_links_join',
  'DROP TABLE IF EXISTS users_quizzes_join',
  'DROP TABLE IF EXISTS links',
  'DROP TABLE IF EXISTS answers',
  'DROP TABLE IF EXISTS questions',
  'DROP TABLE IF EXISTS quizzes',
  'DROP TABLE IF EXISTS users'


];

var create = [
  'CREATE TABLE IF NOT EXISTS links (PRIMARY KEY(url), title TEXT, url TEXT UNIQUE, created TEXT)',
  'CREATE TABLE IF NOT EXISTS users (PRIMARY KEY(username), username TEXT UNIQUE, password TEXT, usertype TEXT, created TEXT)',
  'CREATE TABLE IF NOT EXISTS quizzes (PRIMARY KEY(title), username TEXT, title TEXT, created TEXT)',
  'CREATE TABLE IF NOT EXISTS answers (teachername TEXT, username TEXT, title TEXT, answers TEXT, created TEXT, FOREIGN KEY(teachername) REFERENCES users(username), FOREIGN KEY(username) REFERENCES users(username), FOREIGN KEY(title) REFERENCES quizzes(title))',
  'CREATE TABLE IF NOT EXISTS questions (username TEXT, title TEXT, index INTEGER, question TEXT, choices TEXT, answer TEXT, FOREIGN KEY(title) REFERENCES quizzes(title))',
  'CREATE TABLE IF NOT EXISTS users_links_join (PRIMARY KEY(username, url), username TEXT, url TEXT, FOREIGN KEY(username) REFERENCES users(username), FOREIGN KEY(url) REFERENCES links(url))',
  'CREATE TABLE IF NOT EXISTS users_quizzes_join (PRIMARY KEY(username, title), username TEXT, title TEXT, FOREIGN KEY(username) REFERENCES users(username), FOREIGN KEY(title) REFERENCES quizzes(title))'
];

function makeQueries (queries, client, done, callback) {
  client.query(queries.shift(), function (error, result) {
    if (error) { return void 0; }
    if (queries.length > 0) { return makeQueries(queries, client, done, callback); }
    done();
    callback();
  });
}


function initialize (drop, callback) {
  callback = typeof callback === 'function' ? callback : function () {};
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    if (drop) {
      makeQueries(clean.concat(create),client, done, callback);
    }
    else {
      makeQueries(create,client, done, callback);
    }
  });
}


initialize(true, function () {console.log('done');});

