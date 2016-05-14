

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


const quizzes = [
  {quiz: {title: 'Survey', questions: [
    { index:0, question: 'What is your favorite color?', choices: ['red', 'blue', 'yellow', 'purple'], answer: 'red' },
    { index: 1, question: 'What is your favorite sport?', choices: ['basketball', 'football', 'baseball', 'golf'], answer: 'baseball' },
    { index: 2, question: 'What is your favorite drink?', choices: ['water', 'coffee', 'beer', 'wine'], answer: 'water'}
  ]}},
  {quiz: {title: 'Math Test', questions: [
    { index:0, question: 'What is 1 + 1?', choices: ['2', '1', '0', '-2'], answer: '2' },
    { index: 1, question: 'What (-1)^2?', choices: ['undefined', 'imaginary', 'real', 'fake'], answer: 'real' },
    { index: 2, question: '((-1)^1/2)^4 ?', choices: ['-1', '0', '-1', '10'], answer: '1'}
  ]}},
  {quiz: {title: 'Science Test', questions: [
    { index:0, question: 'What light?', choices: ['wave', 'particle', 'energy', 'all of the above'], answer: 'all of the above' },
    { index: 1, question: 'What is CH4?', choices: ['methane', 'ethane', 'water', 'salt'], answer: 'methane' },
    { index: 2, question: 'How can we see farther than other men?', choices: ['by standing on their shoulders', 'by standing on the shoulders of giants', 'by blinding them', 'only with improved technology'], answer: 'by standing on the shoulders of giants'}
  ]}},
  {quiz: {title: 'Makersquare IQ', questions: [
    { index:0, question: 'Do you gots it?', choices: ['I gots it', 'you don\'t gots it', 'gots it?', 'none of the above'], answer: 'you don\'t gots it' },
    { index: 1, question: 'Is that a bug?', choices: ['yes', 'no', 'no, it\'s a feature', 'yes a ladybug'], answer: 'no, it\'s a feature' },
    { index: 2, question: 'Is it me or my machine?', choices: ['me', 'machine', 'both', 'neither'], answer: 'me'}
  ]}}
];

const answers = {
  Survey: {
    student1: {answers: {title:'Survey', teachername: 'teacher1', answers: [{index: 0, answer: 'blue'}, {index: 1, answer: 'golf'}, {index: 2, answer: 'water'}]}},
    student2: {answers: {title:'Survey', teachername: 'teacher1', answers: [{index: 0, answer: 'red'}, {index: 1, answer: 'baseball'}, {index: 2, answer: 'coffee'}]}},
    student3: {answers: {title:'Survey', teachername: 'teacher1', answers: [{index: 0, answer: 'red'}, {index: 1, answer: 'football'}, {index: 2, answer: 'beer'}]}},
    student4: {answers: {title:'Survey', teachername: 'teacher1', answers: [{index: 0, answer: 'yellow'}, {index: 1, answer: 'baseball'}, {index: 2, answer: 'water'}]}},
    student5: {answers: {title:'Survey', teachername: 'teacher1', answers: [{index: 0, answer: 'purple'}, {index: 1, answer: 'football'}, {index: 2, answer: 'wine'}]}}
  },
  'Math Test': {
    student1: {answers: {title:'Math Test', teachername: 'teacher1', answers: [{index: 0, answer: '2'}, {index: 1, answer: 'imaginary'}, {index: 2, answer: '-1'}]}},
    student2: {answers: {title:'Math Test', teachername: 'teacher1', answers: [{index: 0, answer: '1'}, {index: 1, answer: 'real'}, {index: 2, answer: '1'}]}},
    student3: {answers: {title:'Math Test', teachername: 'teacher1', answers: [{index: 0, answer: '2'}, {index: 1, answer: 'real'}, {index: 2, answer: '1'}]}},
    student4: {answers: {title:'Math Test', teachername: 'teacher1', answers: [{index: 0, answer: '0'}, {index: 1, answer: 'undefined'}, {index: 2, answer: '1'}]}},
    student5: {answers: {title:'Math Test', teachername: 'teacher1', answers: [{index: 0, answer: '1'}, {index: 1, answer: 'imaginary'}, {index: 2, answer: '-1'}]}}
  },
  'Science Test': {
    student1: {answers: {title:'Science Test', teachername: 'teacher1', answers: [{index: 0, answer: 'wave'}, {index: 1, answer: 'methane'}, {index: 2, answer: 'by standing on their shoulders'}]}},
    student2: {answers: {title:'Science Test', teachername: 'teacher1', answers: [{index: 0, answer: 'particle'}, {index: 1, answer: 'water'}, {index: 2, answer: 'only with improved technology'}]}},
    student3: {answers: {title:'Science Test', teachername: 'teacher1', answers: [{index: 0, answer: 'all of the above'}, {index: 1, answer: 'methane'}, {index: 2, answer: 'by standing on the shoulders of giants'}]}},
    student4: {answers: {title:'Science Test', teachername: 'teacher1', answers: [{index: 0, answer: 'all of the above'}, {index: 1, answer: 'ethane'}, {index: 2, answer: 'by standing on the shoulders of giants'}]}},
    student5: {answers: {title:'Science Test', teachername: 'teacher1', answers: [{index: 0, answer: 'energy'}, {index: 1, answer: 'methane'}, {index: 2, answer: 'only with improved technology'}]}}
  },
<<<<<<< HEAD

  'Makersquare IQ': {
    student1: {answers: {title:'Makersquare IQ', teachername: 'teacher1', answers: [{index: 0, answer: 'you don\'t gots it'}, {index: 1, answer: 'no, it\'s a feature'}, {index: 2, answer: 'me'}]}},
    student2: {answers: {title:'Makersquare IQ', teachername: 'teacher1', answers: [{index: 0, answer: 'I gots it'}, {index: 1, answer: 'no, it\'s a feature'}, {index: 2, answer: 'me'}]}},
    student3: {answers: {title:'Makersquare IQ', teachername: 'teacher1', answers: [{index: 0, answer: 'you don\'t gots it'}, {index: 1, answer: 'yes'}, {index: 2, answer: 'me'}]}},
    student4: {answers: {title:'Makersquare IQ', teachername: 'teacher1', answers: [{index: 0, answer: 'gots it?'}, {index: 1, answer: 'no, it\'s a feature'}, {index: 2, answer: 'machine'}]}},
    student5: {answers: {title:'Makersquare IQ', teachername: 'teacher1', answers: [{index: 0, answer: 'you don\'t gots it'}, {index: 1, answer: 'no'}, {index: 2, answer: 'both'}]}}
=======
  Makersquare: {
    student1: {answers: {title:'Makersquare', teachername: 'teacher1', answers: [{index: 0, answer: 'you don\'t gots it'}, {index: 1, answer: 'no, it\'s a feature'}, {index: 2, answer: 'me'}]}},
    student2: {answers: {title:'Makersquare', teachername: 'teacher1', answers: [{index: 0, answer: 'I gots it'}, {index: 1, answer: 'no, it\'s a feature'}, {index: 2, answer: 'me'}]}},
    student3: {answers: {title:'Makersquare', teachername: 'teacher1', answers: [{index: 0, answer: 'you don\'t gots it'}, {index: 1, answer: 'yes'}, {index: 2, answer: 'me'}]}},
    student4: {answers: {title:'Makersquare', teachername: 'teacher1', answers: [{index: 0, answer: 'gots it?'}, {index: 1, answer: 'no, it\'s a feature'}, {index: 2, answer: 'machine'}]}},
    student5: {answers: {title:'Makersquare', teachername: 'teacher1', answers: [{index: 0, answer: 'you don\'t gots it'}, {index: 1, answer: 'no'}, {index: 2, answer: 'both'}]}}
>>>>>>> f34225c12f36bac40e2bacc027208daaf63f79a8
  }
};

const saveAnswers = () => {
  return axios.post('http://localhost:8000/save', answers.Survey['student1'], {headers: {cookie: cookies['student1']}})
  .catch(() => 'answer already exists')
  .then(() => axios.post('http://localhost:8000/save', answers.Survey['student2'], {headers: {cookie: cookies['student2']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers.Survey['student3'], {headers: {cookie: cookies['student3']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers.Survey['student4'], {headers: {cookie: cookies['student4']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers.Survey['student5'], {headers: {cookie: cookies['student5']}}))
  .catch(() => 'answer already exists')

  .then(axios.post('http://localhost:8000/save', answers['Math Test']['student1'], {headers: {cookie: cookies['student1']}}))
  .catch(() => 'answer already exists')
  .then(() => axios.post('http://localhost:8000/save', answers['Math Test']['student2'], {headers: {cookie: cookies['student2']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Math Test']['student3'], {headers: {cookie: cookies['student3']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Math Test']['student4'], {headers: {cookie: cookies['student4']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Math Test']['student5'], {headers: {cookie: cookies['student5']}}))
  .catch(() => 'answer already exists')

  .then(axios.post('http://localhost:8000/save', answers['Science Test']['student1'], {headers: {cookie: cookies['student1']}}))
  .catch(() => 'answer already exists')
  .then(() => axios.post('http://localhost:8000/save', answers['Science Test']['student2'], {headers: {cookie: cookies['student2']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Science Test']['student3'], {headers: {cookie: cookies['student3']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Science Test']['student4'], {headers: {cookie: cookies['student4']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Science Test']['student5'], {headers: {cookie: cookies['student5']}}))
  .catch(() => 'answer already exists')

  .then(axios.post('http://localhost:8000/save', answers['Makersquare IQ']['student1'], {headers: {cookie: cookies['student1']}}))
  .catch(() => 'answer already exists')
  .then(() => axios.post('http://localhost:8000/save', answers['Makersquare IQ']['student2'], {headers: {cookie: cookies['student2']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Makersquare IQ']['student3'], {headers: {cookie: cookies['student3']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Makersquare IQ']['student4'], {headers: {cookie: cookies['student4']}}))
  .catch(() => 'answer already exists')  
  .then(() => axios.post('http://localhost:8000/save', answers['Makersquare IQ']['student5'], {headers: {cookie: cookies['student5']}}))
  .catch(() => 'answer already exists')
};


const saveQuizzes = () => {
  return axios.post('http://localhost:8000/save', quizzes[0], {headers: {cookie: cookies['teacher1']}})
  .catch(() => 'quiz already exists')
  .then(() => axios.post('http://localhost:8000/save', quizzes[1], {headers: {cookie: cookies['teacher1']}}))
  .catch(() => 'quiz already exists')
  .then(() => axios.post('http://localhost:8000/save', quizzes[2], {headers: {cookie: cookies['teacher1']}}))
  .catch(() => 'quiz already exists')
  .then(() => axios.post('http://localhost:8000/save', quizzes[3], {headers: {cookie: cookies['teacher1']}}))
  .catch(() => 'quiz already exists')
};


const setToyData = () => {
  createUsers()
  .then(saveQuizzes)
  .then(saveAnswers)
  
  .then(() => axios.get('http://localhost:8000/fetch?title=manifest', {headers: {cookie: cookies['teacher1']}}))
  .then((results) => console.log(JSON.stringify(results.data)))

  .then(() => axios.get('http://localhost:8000/fetch?title=Survey', {headers: {cookie: cookies['teacher1']}}))
  .then((results) => console.log(JSON.stringify(results.data)))

  .then(() => axios.get('http://localhost:8000/fetch?title=Survey&answers=true', {headers: {cookie: cookies['teacher1']}}))
  .then((results) => console.log(JSON.stringify(results.data)))
  .then(() => console.log('complete'));

};

setToyData();


