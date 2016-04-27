
const sqlite3 = require('sqlite3');

// database located at: __dirname + '/../database/authentication.sqlite3';
// test-database located at: __dirname + '/../database/authentication-test.sqlite3';

var openDatabase = function (path) {
  // console.log(path);
  var db = new sqlite3.Database(path, function(err) {
    if(err) { console.error('Database connection error: ', err); }
  });


  db.initialize = function initialize (drop) {
    if (drop === true) {
      db.run('DROP TABLE IF EXISTS links');
      db.run('DROP TABLE IF EXISTS users');
      db.run('DROP TABLE IF EXISTS users_links_join');
    }
    db.run('CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY ASC, title TEXT, url TEXT UNIQUE, created INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY ASC, username TEXT UNIQUE, password TEXT,created INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS users_links_join (id INTEGER PRIMARY KEY ASC, userId INTEGER, linkId INTEGER, FOREIGN KEY(userId) REFERENCES users(id), FOREIGN KEY(id) REFERENCES links(id))');
  };

  db.serialize(function() { db.initialize() });




  function toStatementKey (val, index) {return '$' + index;}
  function toKeyString (hold, current) {return hold + ', ' + current;}
  function toStatementData (hold, current, index) { hold['$' + index] = current; return hold; } // this function expects the initial hold value to be an object

  db.insertInto = function (table, data, includePrimaryKey) {
    // table should be a string, data should be an array of data in the order of table columns
    // example: table = 'users'; data = [userId, linkId];
    if (typeof table !== 'string' || !(Array.isArray(data))) { throw new Error('expected argument types string and array instead received ' + typeof table + ' and ' + typeof data); }

    return new Promise(function (resolve, reject) {
      var keys = data.map(toStatementKey);
      var keyString = ( includePrimaryKey ? '$primary, ' : '') + keys.reduce(toKeyString);
      var statement = db.prepare('INSERT INTO ' + table + ' VALUES (' + keyString + ')');
      var statementData = data.reduce(toStatementData, {});
      statement.run(statementData, function (error) {
        if (error) { reject(error); }
        resolve('saved');
      });
    });
  };

  db.fetchTable = function (table, columns, where) {
    // table should be a string of the table name
    // columns should be a string of the column names
    // where should be a sql string of the conditional options
    return new Promise(function (resolve, reject) {
      db.all( 'SELECT ' + ( columns ? columns : '*' ) + ' FROM ' + table + ' WHERE ' + ( where ? where : '1 = 1'), 
        function(error, data) { if (error) { reject(error); } resolve(data); }
      );
    });
  };

  db.joinTable = function (table1, table2, conditional, joinType, columns) {
    // table should be a string of the table name
    // columns should be a string of the column names
    // where should be a sql string of the conditional options
    return new Promise(function (resolve, reject) {
      // SELECT ... FROM table1 [INNER] JOIN table2 ON conditional_expression ...
      db.all( 'SELECT ' + ( columns ? columns : '*' ) + ' FROM ' + table1 + ' ' + ( joinType ? joinType : '' ) + ' JOIN ' + table2 + ' ON ' + ( conditional ? conditional : '1=1' ), 
        function(error, data) { if (error) { reject(error); } resolve(data); }
      );
    });
  };
  
  return db;
};


module.exports = openDatabase;

