
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;
chai.use(chaiAsPromised);

var db = require(__dirname + '/../database.js')(__dirname + '/../../../database/authentication-test.sqlite3');


describe('Database Unit Tests', function() {
  beforeEach(function (done) {
    db.initialize(true); // reset the tables
    done();
  });

  it('should insert items into the database', function() {
    return expect(db.insertInto('users', ['louie', 'pass', Date.now()], true))
    .to.eventually.equal('saved');
  });
  it('should fetch items from the database', function() {
    return expect(db.insertInto('users', ['louie', 'pass', Date.now()], true)
    .then(function () {
      return db.fetchTable('users', 'password', 'username = "louie"');
    }))
    .to.eventually.deep.equal([ { password: 'pass' } ]);
  });
  it('should join items from the database', function() {
    return expect(db.insertInto('users', ['louie', 'pass', Date.now()], true)
    .then(function () { return db.insertInto('links', ['Google', 'https://www.google.com', Date.now()], true); })
    .then(function () { return db.insertInto('links', ['Amazon', 'https://www.amazon.com', Date.now()], true); })
    .then(function () { return db.insertInto('links', ['Facebook', 'https://www.facebook.com', Date.now()], true); })
    .then(function () { return db.insertInto('links', ['YouTube', 'https://www.youtube.com', Date.now()], true); })
    .then(function () { return db.insertInto('users_links_join', [1, 1], true); })
    .then(function () { return db.insertInto('users_links_join', [1, 3], true); })
    .then(function () { return db.joinTable('users_links_join', 'links', 'users_links_join.userId=1 and users_links_join.linkId=links.id', 'INNER', 'title'); })
    ).to.eventually.deep.equal([ { title: 'Google' }, { title: 'Facebook' } ]);
  });
});




