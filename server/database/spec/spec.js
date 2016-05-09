
require('dotenv').config({path: '.envDevelopment'});

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
chai.use(chaiAsPromised);


var db = require(__dirname + '/../database.js')('test');


describe('Database Unit Tests', function() {
  beforeEach(function (done) {
    db.initialize(true, function () {
      done();
    }); // reset the tables
  });

  it('should insert items into the database', function() {
    return expect(db.insertInto('users', {username: 'louie', password: 'pass', usertype: 'student', created: String(Date.now())}))
    .to.eventually.equal('saved');
  });

  it('should delete items from the database', function() {
    return expect(
      db.insertInto('users', {username: 'louie', password: 'pass', created: String(Date.now())})
      .then(() => db.deleteFrom('users', 'username=\'louie\''))
    ).to.eventually.equal('delete successful');
  });

  it('should insert quizzes into and fetch quizzes from the database', function() {
    var username = 'louie';
    var quiz = {title: 'myQuiz', questions: [
      {
        index: 0,
        question: 'What is your favorite color?',
        choices: ['red', 'blue', 'yellow', 'purple'],
        answer: 'red'
      },
      {
        index: 1,
        question: 'What is your favorite sport?',
        choices: ['basketball', 'football', 'baseball', 'golf'],
        answer: 'baseball'
      },
      {
        index: 2,
        question: 'What is your favorite drink?',
        choices: ['water', 'coffee', 'beer', 'wine'],
        answer: 'water'
      }
    ]};

    return expect(
      db.insertInto('users', {username: username, password: 'pass', created: String(Date.now())})
      .then(function () { return db.insertInto('quizzes', {title: quiz.title, created: Date.now()}); })
      .then(function () { return db.insertInto('users_quizzes_join', {username: username, title: quiz.title}); })
      .then(function () { return db.insertInto('questions', {title: quiz.title, index: quiz.questions[0].index, question: quiz.questions[0].question, choices: quiz.questions[0].choices.join('+++'), answer: quiz.questions[0].answer}); })
      .then(function () { return db.insertInto('questions', {title: quiz.title, index: quiz.questions[1].index, question: quiz.questions[1].question, choices: quiz.questions[1].choices.join('+++'), answer: quiz.questions[1].answer}); })
      .then(function () { return db.insertInto('questions', {title: quiz.title, index: quiz.questions[2].index, question: quiz.questions[2].question, choices: quiz.questions[2].choices.join('+++'), answer: quiz.questions[2].answer}); })
      .then(function () {
        return db.join('users_quizzes_join', 'quizzes', 'users_quizzes_join.username=\'' + username + '\'', 'INNER', 'quizzes.title')
        .then(function (results) { return results[0].title; });
      })
      .then(function (title) {
        var Q = {title: title}
        return db.fetch('questions', 'index, question, choices, answer', 'title=\'' + title + '\'')
        .then(function (questions) {
          questions = questions.map(function (question) { question.choices = question.choices.split('+++'); return question; })
          Q.questions = questions;
          return Q;
        })
      })
    ).to.eventually.deep.equal(quiz);
  });

  it('should insert answers into and fetch answers from the database', function() {
    var username = 'louie'; var teachername = 'james'
    var answers = {title: 'myQuiz', answers: [ 
      {index: 0, answer: 'red'}, 
      {index: 1, answer: 'baseball'}, 
      {index: 2, answer: 'water'}
    ]};

    return expect(
      db.insertInto('users', {username: username, password: 'pass', created: String(Date.now())})
      .then(function () { return db.insertInto('users', {username: teachername, password: 'pass', created: String(Date.now())}); })
      .then(function () { return db.insertInto('quizzes', {title: answers.title, created: Date.now()}); })
      .then(function () { return db.insertInto('answers', {teachername: teachername, username: username, title: answers.title, answers: answers.answers.map(function (ans) { return '' + ans.index + ':' + ans.answer;}).join('+++'), created: Date.now()}); })
      .then(function () {
        return db.fetch('answers', 'answers', 'teachername=\'' + teachername + '\' and username=\'' + username + '\' and title=\'' + answers.title + '\'')
        .then(function (answers) { return answers[0].answers.split('+++'); });
      })
      .then(function (answers) {
        return A = answers.map(function (ans, index) {return {index: index, answer: ans.split(':')[1]}; });
      })
    ).to.eventually.deep.equal(answers.answers);
  });


  it('should fetch items from the database', function() {
    return expect(db.insertInto('users', {username: 'louie', password: 'pass', created: String(Date.now())})
    .then(function () {
      return db.fetch('users', 'password', 'username=\'louie\'');
    }))
    .to.eventually.deep.equal([ { password: 'pass' } ]);
  });
  it('should join items from the database', function() {
    return expect(db.insertInto('users', {username: 'louie', password: 'pass', created: String(Date.now())})
    .then(function () { return db.insertInto('links', {title: 'Google', url: 'https://www.google.com', created: String(Date.now())}); })
    .then(function () { return db.insertInto('links', {title:'Amazon', url: 'https://www.amazon.com', created: String(Date.now())}); })
    .then(function () { return db.insertInto('links', {title: 'Facebook', url: 'https://www.facebook.com', created: String(Date.now())}); })
    .then(function () { return db.insertInto('links', {title: 'YouTube', url: 'https://www.youtube.com', created: String(Date.now())}); })
    .then(function () { return db.insertInto('users_links_join', {username: 'louie', url: 'https://www.google.com'}); })
    .then(function () { return db.insertInto('users_links_join', {username: 'louie', url: 'https://www.facebook.com'}); })
    .then(function () { return db.join('users_links_join', 'links', 'users_links_join.username=\'louie\' and users_links_join.url=links.url', 'INNER', 'title'); })
    ).to.eventually.deep.equal([ { title: 'Google' }, { title: 'Facebook' } ]);
  });
});




