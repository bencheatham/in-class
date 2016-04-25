// var path = require('path');
var sqlite3 = require('sqlite3');
// var hash = require('./hash.js');


// database located at: __dirname + '/../database/authentication.sqlite3';
// test-database located at: __dirname + '/../database/authentication-test.sqlite3';

var openDatabase = function (path) {
  // console.log(path);
  var db = new sqlite3.Database(path, function(err) {
    if(err) { console.error('Database connection error: ', err); }
  });


  db.initialize = function initialize (drop) {
    if (drop === true) {
      // Uncomment to drop tables when restarting the server
      // db.run('DROP TABLE IF EXISTS links');
      // db.run('DROP TABLE IF EXISTS users');
      // db.run('DROP TABLE IF EXISTS users_links_join');
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




// db.saveUrlUserJoin = function (userId, linkId) {
//   // console.log('call of saveUrlUserJoin', userId, linkId)
//  return db.insertInto('users_links_join', [userId, linkId], true);
// };



// db.fetchLinksForUser = function (username) {
//   // console.log('fetch links for username: ', username);
//   return db.joinTable(
//     'users', 
//     'users_links_join', 
//     ' users.username="' + username + '" and users.id = users_links_join.userId',
//     'INNER', 
//     'linkId')
//   .then(function (data) {
//     console.log('data: ', data);
//     if(data.length === 0) {
//       return Promise.resolve('1=0');
//     }
//     return Promise.resolve(
//       data.map(function (element) {return element.linkId;})
//       .map(function (id) {return 'id = ' + id;})
//       .join(' or ')
//     );
//   })
//   .then(function (where) {
//     // console.log('where: ', where);
//     return db.fetchTable('links', 'title, url', where);
//   });
// };



// // var hash = function (password, salt) {
// //   // hash the password here
// //   return salt + password;
// // };


// db.saveUsers = function (users) {
//   return new Promise(function (resolve) {
//     users.forEach(function (user, index) {
//       hash.makeHash(user.password)
//       .then(function (hash) {
//         // var salt = 'tabsSalt';
//         db.insertInto('users', [user.username, /*salt,*/ hash, Date.now()], true)
//         .then(function () {
//          if (index === users.length - 1) {
//            resolve('' + users.length + ' users were saved');
//          }
//         });
        
//       });

//     });
//   });
// };



// db.fetchUsers = function () {
//   return db.fetchTable('users');
// };

// db.fetchUserId = function (username) {
//   return db.fetchTable('users', 'id', 'username="' + username + '"');
// };

// db.fetchUser = function (username) {
//   console.log('attempt to fetch data for user: ', username);
//   return db.fetchTable('users', '*', 'username="' + username + '"');
// };


// db.saveUrls = function (urls) {
//   if (!(Array.isArray(urls))) {
//     throw new Error('expected urls argument to be an array. Instead typeof urls === ' + typeof urls);
//   } else if (urls.length === 0) {
//     return Promise.resolve('' + urls.length + ' urls were saved');
//   }


//   return new Promise(function (resolve) {
//     urls.forEach(function (url, index) {
//      db.insertInto('links', ['Title ' + index, url, Date.now()], true)
//      .then(function () {
//       if (index === urls.length - 1) {
//         // console.log('' + (index + 1) + ' urls were saved');
//         resolve('' + urls.length + ' urls were saved');
//       }
//      });
//     });
//   });
// };

// db.saveLinks = function (links, username) {
//     // console.log('username:', username);
//   if (!(Array.isArray(links))) {
//     throw new Error('expected links argument to be an array. Instead typeof links === ' + typeof links);
//   } else if (links.length === 0) {
//     return Promise.resolve('' + links.length + ' users were saved');
//   }


//   return new Promise(function (resolve) {
//     db.fetchUserId(username)
//     .then(function (userId) {
//       // console.log('userId:', userId);
//       links.forEach(function (link, index) {
//         db.fetchTable('links', 'id', 'url="' + link.url + '"')
//         .then(function (ids) {
//           // console.log('ids: ', ids);
//           // console.log('link:', link);
//           if (ids.length === 0) {
//            return db.insertInto('links', [link.title, link.url, Date.now()], true);
//           }
//           return Promise.resolve();
//         })
//         .then(function () {
//           return db.fetchLinkId(link.url);
//         })
//         .then(function (linkId) {
//           // console.log('linkId:', linkId);
//           // console.log('userId:', userId);
//           return db.saveUrlUserJoin(userId[0].id, linkId[0].id);
//         })
//         // .then(log)
       

//         .then(function () {
//           // console.log('index:', index);
//           if (index === links.length - 1) {
//             // console.log('' + (index + 1) + ' links were saved');
//             resolve('' + links.length + ' links were saved');
//           }
//         });
//       });
//     });
//   });

// };




// // this can be cahnged to just return the urls instead of all the data if that is desired
// db.fetchUrls = function () {
//   return db.fetchTable('links');
// };

// db.fetchLinkId = function (url) {
//   return db.fetchTable('links', 'id', 'url="' + url + '"');
// };





module.exports = openDatabase;

