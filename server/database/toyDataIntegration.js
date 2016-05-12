

require('dotenv').config({path: '.envDevelopment'});

// require('dotenv').config({path: '.envProduction'});

const axios = require('axios');

// const db = require('./database.js')();
// db.fetch('users', '*', 'username=\'teacher2\'')
// .then((results) => console.log(results));
// db.initialize(true, () => setToyData);

var cookies = {};
const setToken = (username, response) => {
  cookies[username] = response.headers['set-cookie'];
};


const createAccountAndSaveToken = (username, usertype) => {
  return axios.post('http://localhost:8000/signup', {username: username, password: 'password', usertype: usertype, created: Date.now()})
  .then((response) => { setToken(username, response); return false; })
  .catch((error) => { console.log(error.data); return true; })
  .then((usernameExists) => {
    if (usernameExists) {
      console.log('username exists');
      return axios.post('http://localhost:8000/login', {username: username, password: 'password'})
      .then((response) => { setToken(username, response); return false; })
      .catch((error) => { console.log(error.data); return true; })
    }
  })
  .then((withError)=>console.log(username + ' was initialized' + (withError ? ' with an error.' : '.')));
};


const createUsers = () => {
  return createAccountAndSaveToken('teacher1','teacher')
  .then(() => createAccountAndSaveToken('student1','student'))
  .then(() => createAccountAndSaveToken('student2','student'))
  .then(() => createAccountAndSaveToken('student3','student'))
  .then(() => createAccountAndSaveToken('student4','student'))
  .then(() => createAccountAndSaveToken('student5','student'))
};


const quiz = {
  quiz: {title: 'myQuiz', questions: [
    { index:0, question: 'What is your favorite color?', choices: ['red', 'blue', 'yellow', 'purple'], answer: 'red' },
    { index: 1, question: 'What is your favorite sport?', choices: ['basketball', 'football', 'baseball', 'golf'], answer: 'baseball' },
    { index: 2, question: 'What is your favorite drink?', choices: ['water', 'coffee', 'beer', 'wine'], answer: 'water'}
  ]}
};

const answers = {
  student1: {answers: {title:'myQuiz', teachername: 'teacher1', answers: [{index: 0, answer: 'blue'}, {index: 1, answer: 'golf'}, {index: 2, answer: 'water'}]}},
  student2: {answers: {title:'myQuiz', teachername: 'teacher1', answers: [{index: 0, answer: 'red'}, {index: 1, answer: 'baseball'}, {index: 2, answer: 'coffee'}]}},
  student3: {answers: {title:'myQuiz', teachername: 'teacher1', answers: [{index: 0, answer: 'red'}, {index: 1, answer: 'football'}, {index: 2, answer: 'beer'}]}},
  student4: {answers: {title:'myQuiz', teachername: 'teacher1', answers: [{index: 0, answer: 'yellow'}, {index: 1, answer: 'baseball'}, {index: 2, answer: 'water'}]}},
  student5: {answers: {title:'myQuiz', teachername: 'teacher1', answers: [{index: 0, answer: 'purple'}, {index: 1, answer: 'football'}, {index: 2, answer: 'wine'}]}}
}

const saveAnswers = () => {
  return axios.post('http://localhost:8000/save', answers['student1'], {headers: {cookie: cookies['student1']}})
  .catch(() => 'answer already exists')
  .then(() => axios.post('http://localhost:8000/save', answers['student2'], {headers: {cookie: cookies['student2']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['student3'], {headers: {cookie: cookies['student3']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['student4'], {headers: {cookie: cookies['student4']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['student5'], {headers: {cookie: cookies['student5']}}))
  .catch(() => 'answer already exists')  
}






const setToyData = () => {
  createUsers()
  .then(() => axios.post('http://localhost:8000/save', quiz, {headers: {cookie: cookies['teacher1']}}))
  .catch(() => 'quiz already exists')
  .then(saveAnswers)
  
  .then(() => axios.get('http://localhost:8000/fetch?title=manifest', {headers: {cookie: cookies['teacher1']}}))
  .then((results) => console.log(JSON.stringify(results.data)))

  .then(() => axios.get('http://localhost:8000/fetch?title=myQuiz', {headers: {cookie: cookies['teacher1']}}))
  .then((results) => console.log(JSON.stringify(results.data)))

  .then(() => axios.get('http://localhost:8000/fetch?title=myQuiz&answers=true', {headers: {cookie: cookies['teacher1']}}))
  .then((results) => console.log(JSON.stringify(results.data)))
  .then(() => console.log('complete'));

};

setToyData();


