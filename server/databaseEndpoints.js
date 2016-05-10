// const fs = require('fs');
const jwt = require('jsonwebtoken');
const secret = 'when in class... do as the students do';
const db = require(__dirname + '/database/database.js')();
const dbTest = require(__dirname + '/database/database.js')('test');



function verifyUsername (request, response) {
  // console.log(request.cookies);
  var auth = request.cookies.authorization; 
  // console.log(auth);
  var token = auth ? auth.slice(7) : '';
  // console.log(token);
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) reject(error);
      if (!payload) reject(error);
      else resolve(payload.username);
    });
  });
  // .catch((error) => 'error');
}



function fetchManifest (db, username) {
  return db.fetch('users_quizzes_join', 'title', 'username=\'' + username + '\'')
  .then((results) => results.map((result) => result.title))
  .catch((error) => []);
}


//////////  //////////  //////////  //////////  
      //////////  //////////  //////////  //////////  
//////////  //////////  //////////  //////////  
      //////////  //////////  //////////  //////////        
//////////  //////////  //////////  //////////  


function insertQuestions (db, title, questions, username) {
var question = questions.shift();
  return db.insertInto('questions', {username: username, title: title, index: question.index, question: question.question, choices: question.choices.join('+++'), answer: question.answer})
  .then(() => {
    if (questions.length > 0) {
      return insertQuestions(db, title, questions, username);
    }
    return 'questions inserted';
  });
}


const saveQuiz = (request, response, username, quiz, update, database) => {

  // var directory = __dirname + '/../database/json/' + username + '/';
  // var filePath = directory + file + '.json';

  // console.log('directory: ', directory);

// file must be a string
// data must be an object
  
  if (quiz.title === 'manifest') { response.status(400).send('error: ' + 'manifest is a reserved filename'); return void 0; }
  return database.fetch('quizzes', '*', 'title=\'' + quiz.title + '\'')
  .catch((error) => [])
  .then((existing) => {
    // console.log('existing');
    if (existing.length > 0) {
      if (update) {
        return database.deleteFrom('answers', 'teachername=\'' + username + '\' and title=\'' + quiz.title + '\'')
        .then(() => database.deleteFrom('questions', 'title=\'' + quiz.title + '\''))
        .then(() => database.deleteFrom('users_quizzes_join', 'title=\'' + quiz.title + '\''))
        .then(() => database.deleteFrom('quizzes', 'title=\'' + quiz.title + '\''));
      }
      return Promise.reject('quiz name is not unique');
    }
    return 'quiz name is unique. So continue';
  })
  .then(() => database.insertInto('quizzes', {username: username, title: quiz.title, created: Date.now()}))
  .then(() => database.insertInto('users_quizzes_join', {username: username, title: quiz.title}))
  .then(() => insertQuestions(database, quiz.title, quiz.questions.slice(), username))
  .then(() => response.status(201).send('created'))
  .catch((error) => response.status(400).send('error: ' + 'some issue saving the quiz... Use the update flag to overwrite old quizzes'));


};

const fetchQuiz = (request, response, username, title, database) => {
  // console.log('hello');
  if (title === 'manifest') { 
    // console.log('fetch manifest');
    fetchManifest(database, username)
    .then((files) => response.status(200).send(files));
    return void 0;
  }
  return database.fetch('questions', '*', 'username=\'' + username + '\' and title=\'' + title + '\'')
  .then((results) => {
    var quiz = {title: results[0].title};
    quiz.questions = results.map((result) => { return {index: result.index, question: result.question, choices: result.choices.split('+++'), answer: result.answer};});
    return quiz;
  })
  .then((quiz) => response.status(200).send(quiz))
  .catch((error) => response.status(400).send('error: ' + 'some issue fetching the quiz...'));
};

const saveAnswers = (request, response, username, answers) => {
  return db.fetch('answers', '*', 'username=\'' + username + '\' and title=\'' + answers.title + '\'')
  .then((results) => {
    if (results.length > 0) { return Promise.reject('not a unique student answer'); }
    return 'continue';
  })
  .then(() => db.insertInto('answers', {teachername: answers.teachername, username: username, title: answers.title, answers: answers.answers.map(function (ans) { return '' + ans.index + ':' + ans.answer;}).join('+++'), created: Date.now()}))
  .then(() => response.status(201).send('created'))
  .catch((error) => response.status(400).send('error: ' + 'some issue saving the answers...'));
};

const fetchAnswers = (request, response, username, title) => {
  //username is actually the teachername in this case
  return db.fetch('answers', 'answers, username', 'teachername=\'' + username + '\' and title=\'' + title + '\'')
  .then((answers) => {
    var data = {title: title};
    answers = answers.map((studentAnswers) => {
      var studentname = studentAnswers.username; delete studentAnswers.username; studentAnswers.studentname = studentname;
      studentAnswers.answers = 
        studentAnswers
        .answers
        .split('+++')
        .map((val) => { val = val.split(':'); return {val: val[1], index: val[0]};});
        return studentAnswers;
    });
      data.answers = answers;
    return Promise.resolve(data);
  })
  .then((answers) => response.status(200).send(answers))
  .catch((error) => response.status(400).send('error: ' + 'some issue fetching the answers...'));
  
};

const deleteQuiz = (request, response, username, title, database) => {
  //username is actually the teachername in this case
  return database.deleteFrom('answers', 'teachername=\'' + username + '\' and title=\'' + title + '\'')
  .then(() => database.deleteFrom('questions', 'title=\'' + title + '\''))
  .then(() => database.deleteFrom('users_quizzes_join', 'title=\'' + title + '\''))
  .then(() => database.deleteFrom('quizzes', 'title=\'' + title + '\''))
  .then(() => response.status(200).send('deleted quiz'))
  .catch(() => response.status(400).send('error: ' + 'some issue deleting the quiz...'));
};

module.exports = (app) => {

  app.post('/delete', (request, response) => {
    var title = request.body.title;
    var test = request.body.test;
    var database = test ? dbTest : db;
    verifyUsername(request,response)
    .catch((error) => response.status(400).send('error: ' + 'invalid token...'))
    .then((username) => {
      // console.log('username: ', username);
      return deleteQuiz(request, response, username, title, database);
    });
  });

  app.post('/save', (request, response) => {



    var quiz = request.body.quiz;
    var update = request.body.update;

    var answers = request.body.answers;

    var test = request.body.test;

    var database = test ? dbTest : db;

    var requestForQuiz = !!quiz;
    var requestForAnswers = !!answers;

    if ((requestForQuiz*1 + requestForAnswers*1) !== 1) {
      return response.status(400).send('error: ' + 'bad request...');
    }

    // console.log(file);

    verifyUsername(request,response)
    .catch((error) => response.status(400).send('error: ' + 'invalid token...'))
    .then((username) => {
      if (requestForQuiz){
       return saveQuiz(request, response, username, quiz, update, database);
      }
      if (requestForAnswers) {
        return saveAnswers(request, response, username, answers);
      }
    });
        
  });

  app.get('/fetch', (request, response) => {
    var title = request.query.title;
    var answers = request.query.answers;
    var test = request.query.test;
    var database = test ? dbTest : db;
    
    var requestForQuiz = !answers;
    var requestForAnswers = !!answers;

    if ((requestForQuiz*1 + requestForAnswers*1) !== 1) {
      return response.status(400).send('error: ' + 'bad request...');
    }


// file must be a string


    verifyUsername(request,response)
    .catch((error) => response.status(400).send('error: ' + 'invalid token...'))
    .then((username) => {
      if (requestForQuiz){
        return fetchQuiz(request, response, username, title, database);
      }
      if (requestForAnswers) {
        return fetchAnswers(request, response, username, title);
      }
    });

  });

};