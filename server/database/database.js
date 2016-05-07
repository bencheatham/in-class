
module.exports = function (test) {
  var pg = require('pg');


  if (process.env.NODE_ENV === 'production') {
    pg.defaults.ssl = true;
    var conString = 
      process.env.POSTGRES_DB_TYPE + '://' + 
      process.env.POSTGRES_DB_USER + ':' +
      process.env.POSTGRES_DB_PASSWORD + ':' + 
      process.env.POSTGRES_DB_LOCATION;
  }
  if (process.env.NODE_ENV === 'development') {
    var conString = 
      process.env.POSTGRES_DB_TYPE + '://' + 
      process.env.POSTGRES_DB_USER + ':' +
      process.env.POSTGRES_DB_PASSWORD + '@' + 
      process.env.POSTGRES_DB_LOCATION;
  } 
  if (test === 'test') {
    var conString = 'postgres://postgres:inclassDatabasePassword611@localhost/test'
  }
      

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

  function insertInto (table, data) {
    // table should be a string,
    // data should be an object with keys corresponding to column names and values corresponding to data values
    var keyCount = 0;

    var columns = Object.keys(data);
    var columnKeys = columns.join(',');
    var values = columns.map(function (column) { return data[column]; });
    var valueKeys = values.map(function () { return '$' + (++keyCount); });

    var statement = 'INSERT INTO ' + table + ' (' + columnKeys + ') VALUES (' + valueKeys + ')';

    return new Promise(function (resolve, reject) {
      pg.connect(conString, function(error, client, done) {
        if(error) {
          reject('error: ' + error);
          return console.error('error fetching client from pool', error);
        }
        client.query(statement, values, function (error, results) {
          if (error) { return reject('error: ' + error); }
          done();
          resolve('saved');
        });
      });
    });
  }


  function fetch (table, columns, where) {
    // table should be a string of the table name
    // columns should be a string of the column names
    // where should be a sql string of the conditional options
    var statement = 'SELECT ' + ( columns ? columns : '*' ) + ' FROM ' + table + ' WHERE ' + ( where ? where : '1 = 1');
// console.log(statement);
    return new Promise(function (resolve, reject) {
      pg.connect(conString, function(error, client, done) {
        if(error) {
          reject('error: ' + error);
          return console.error('error fetching client from pool', error);
        }
        client.query(statement, function (error, results) {
          if (error) { return reject('error: ' + error); }
          done();
          resolve(results.rows);

        });
      });
    });
  };

  function deleteFrom (table, where) {
    // table should be a string of the table name
    // columns should be a string of the column names
    // where should be a sql string of the conditional options
    var statement = 'DELETE FROM ' + table + ' WHERE ' + ( where ? where : '1 = 1');

    return new Promise(function (resolve, reject) {
      pg.connect(conString, function(error, client, done) {
        if(error) {
          reject('error: ' + error);
          return console.error('error fetching client from pool', error);
        }
        client.query(statement, function (error, results) {
          if (error) { return reject('error: ' + error); }
          done();
          resolve('delete successful');

        });
      });
    });    
  }

  function join (table1, table2, conditional, joinType, columns) {
    // table should be a string of the table name
    // columns should be a string of the column names
    // where should be a sql string of the conditional options
    return new Promise(function (resolve, reject) {
      // SELECT ... FROM table1 [INNER] JOIN table2 ON conditional_expression ...
      var statement = 'SELECT ' + ( columns ? columns : '*' ) + ' FROM ' + table1 + ' ' + ( joinType ? joinType : '' ) + ' JOIN ' + table2 + ' ON ' + ( conditional ? conditional : '1=1' );
      pg.connect(conString, function(error, client, done) {
        if(error) {
          reject('error: ' + error);
          return console.error('error fetching client from pool', error);
        }
        client.query(statement, function (error, results) {
          if (error) { return reject('error: ' + error); }
          done();
          resolve(results.rows);

        });
      });      
    });
  };

  return db = {
    initialize: initialize,
    insertInto: insertInto,
    fetch: fetch,
    deleteFrom: deleteFrom,
    join: join
  }
}



