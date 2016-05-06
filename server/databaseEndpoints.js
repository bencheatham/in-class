// const fs = require('fs');
const jwt = require('jsonwebtoken');
const secret = 'when in class... do as the students do';
const db = require(__dirname + '/database/database.js')();
const dbTest = require(__dirname + '/database/database.js')('test');



// db.initialize(true);
// dbTest.initialize(true);


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

// function makeDirectory (path) {
//   return new Promise((resolve, reject) => {
//     // console.log('make directory');
//     fs.mkdir(path, (error, folder) => {
//       if (error) reject(error);
//       resolve(true);
//     });
//   });
//   // let errors fall through to a later catch    
// }

// function directoryExists (path) {
//   return new Promise((resolve, reject) => {
//     fs.stat(path, (error, stats) => {
//       if (error) reject(error);
//       else resolve(stats.isDirectory());
//     });
//   })
//   .catch((error) => {console.log(error); Promise.resolve(false);});  
// }

// function fileExists (path) {
//   return new Promise((resolve, reject) => {
//     fs.stat(path, (error, stats) => {
//       if (error) reject(error);
//       else resolve(stats.isFile());
//     });
//   })
//   .catch((error) => Promise.resolve(false));
// }

function fetchManifest (db, username) {
  return db.fetch('users_quizzes_join', 'title', 'username=\'' + username + '\'')
  .then((results) => results.map((result) => result.title))
  // return new Promise((resolve, reject) => {
  //   fs.readdir(__dirname + '/../database/json/' + username, (error, files) => { 
  //     if (error) reject(error); 
  //     else resolve(files.map((file) => file.slice(0,-5))); 
  //   });
  // })
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


module.exports = (app) => {

  app.post('/delete', (request, response) => {
    var title = request.body.title;
    var test = request.body.test;
    var database = test ? dbTest : db;
    return database.deleteFrom('questions', 'title=\'' + title + '\'')
    .then(() => database.deleteFrom('users_quizzes_join', 'title=\'' + title + '\''))
    .then(() => database.deleteFrom('quizzes', 'title=\'' + title + '\''))
    .then(() => response.status(200).send('deleted quiz'))
    .catch(() => response.status(400).send('error: ' + 'some issue deleting the quiz...'));
  });

  app.post('/save', (request, response) => {

    var quiz = request.body.quiz;
    var update = request.body.update;

    var test = request.body.test;

    var database = test ? dbTest : db;


    // console.log(file);

    verifyUsername(request,response)
    .catch((error) => response.status(400).send('error: ' + 'invalid token...'))
    .then((username) => {
      

      // var directory = __dirname + '/../database/json/' + username + '/';
      // var filePath = directory + file + '.json';

      // console.log('directory: ', directory);

  // file must be a string
  // data must be an object
      
      if (quiz.title === 'manifest') { response.status(400).send('error: ' + 'manifest is a reserved filename'); return void 0; }
      database.fetch('quizzes', '*', 'title=\'' + quiz.title + '\'')
      .catch((error) => [])
      .then((existing) => {
        // console.log('existing');
        if (existing.length > 0) {
          if (update) {
            return database.deleteFrom('questions', 'title=\'' + quiz.title + '\'')
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


    });
        
  });

  app.get('/fetch', (request, response) => {
    var title = request.query.title;
    var test = request.query.test;
    var database = test ? dbTest : db;
// file must be a string


    verifyUsername(request,response)
    .catch((error) => response.status(400).send('error: ' + 'invalid token...'))
    .then((username) => {
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
      .then((quiz) => response.status(200).send(quiz));
    })
    .catch((error) => response.status(400).send('error: ' + 'some issue fetching the quiz...'));

  });

};