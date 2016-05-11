const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

const axios = require('axios');
const db = require(__dirname + '/../database/database.js')('test');

const quiz = {title:'test', questions: [
  {index: 0, question: 'How are you?', choices:['fine, thanks', 'ok', 'bad', 'good'], answer: 'good'},
  {index: 0, question: 'Who are you?', choices:['me', 'you', 'her', 'god'], answer: 'you'}
]};
var cookie = 'authorization=Bearer%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImxvdWllIiwiaWF0IjoxNDYxOTQxMDk2fQ.gXOajV8KhpJRWocRBnfIrFBvJG6ZbNpWvF1QWurlvQU';

describe('Database Endpoint Unit Tests', function() {
  beforeEach(function (done) {
    done();
  });

  it('should wipe the test database before the following tests', function (done) {
    db.initialize(true, done); // reset the tables;
  });

  it('should use the cookie to access the protected page', function () {
    return expect(
      axios.post('http://localhost:8000/signup?test=true', {username: 'louie', password: 'password123', usertype: 'student'})
      .then(function (res) { 
        return cookie = res.headers['set-cookie'][0].split(';')[0];
      })
      .then((cookie) => axios.get('http://localhost:8000/authentication', {headers: {cookie: cookie}}))
      .catch(function (val) {return Promise.resolve(val);})
      .then(function (res) { return Promise.resolve(res.status); })
    ).to.eventually.equal(200);
  });


  // it('should respond with 400 for a bad request to /save', function() {


  it('should save data to the database', function() {
    return expect(
      axios.post('http://localhost:8000/save', {quiz: quiz, update: true, test: true}, {headers: {cookie: cookie}})
      .then(function (res) { return Promise.resolve(res.status); })
    ).to.eventually.equal(201);
  });

  it('should fetch data from the database', function() {
    return expect(
      axios.get('http://localhost:8000/fetch', {params: {title: quiz.title, test: true}, headers: {cookie: cookie}})
      .then(function (res) { return Promise.resolve({status: res.status, quiz: res.data}); })
    ).to.eventually.deep.equal({status: 200, quiz: quiz});
  });

  it('should delete data from the database', function() {
    return expect(
      axios.post('http://localhost:8000/delete', {title: quiz.title, test: true}, {headers: {cookie: cookie}})
      .then(function (res) { return Promise.resolve({status: res.status, message: res.data}); })
    ).to.eventually.deep.equal({status: 200, message: 'deleted quiz'});
  });
  
});

