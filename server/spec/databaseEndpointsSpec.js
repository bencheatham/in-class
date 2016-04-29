const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

const axios = require('axios');
const db = require(__dirname + '/../database/database.js')(__dirname + '/../../database/authentication-test.sqlite3');

const data = {text: 'this is some text', color: 'orange'};
var cookie;

describe('Database Endpoint Unit Tests', function() {
  beforeEach(function (done) {
    done();
  });

  it('should wipe the test database before the following tests', function () {
    db.initialize(true); // reset the tables;
    expect(true).to.equal(true);
  });

   it('should create a session token and save it as a cookie', function () {
    return expect(
      axios.post('http://localhost:8000/signup?test=true', {username: 'louie', password: 'password123'})
      .then(function (res) { 
        cookie = res.headers['set-cookie'][0].split(';')[0];
        return Promise.resolve(res.status);
      })
    ).to.eventually.equal(200);
  });

  it('should use the cookie to access the protected page', function () {
    return expect(
      axios.get('http://localhost:8000/protected', {headers: {cookie: cookie}})
      .catch(function (val) {return Promise.resolve(val);})
      .then(function (res) { return Promise.resolve(res.status); })
    ).to.eventually.equal(200);
  });



  // it('should respond with 400 for a bad request to /save', function() {


  it('should save data to the database', function() {
    return expect(
      axios.post('http://localhost:8000/save', {file: 'test', data: data}, {headers: {cookie: cookie}})
      .then(function (res) { return Promise.resolve(res.status); })
    ).to.eventually.equal(201);
  });

  it('should fetch data from the database', function() {
    return expect(
      axios.get('http://localhost:8000/fetch', {params: {file: 'test'}, headers: {cookie: cookie}})
      .then(function (res) { return Promise.resolve({status: res.status, data: res.data}); })
    ).to.eventually.deep.equal({status: 200, data: data});
  });
  
});

