import axios from 'axios';
import _ from 'underscore';
import { START_QUIZ, ANSWER_QUESTION, ADD_QUIZFORM, QUIZ_SUBMISSION, QUIZ_FETCH, UPDATE_QUIZ } from './constants';

export function submitQuiz (quizTitle,formData) {
  
  return axios.post('/save', {file:quizTitle, data: formData}).then(function(response){
    console.log('response from API',response);
    if (response.status === 201){
      return {
        type: QUIZ_SUBMISSION, 
        form: formData, 
        title: quizTitle
      };
    }
  })
  .catch(function(response){
      console.log('error',response);
      return {
        type: QUIZ_SUBMISSION, 
        form: formData, 
        title: quizTitle
      }
  });
}

export function storePopQuiz (data){
  // student fetches list of all his or her quizzes
  return {
    type: QUIZ_FETCH,
    quiz: data,
  }
}

export function startQuiz (quizName) {
  
  return axios.get('/fetch', {params: {file: quizName}})
  .then(function(response){
    var downloadedQuizzes = response.data;
    return {
      type: START_QUIZ,
      storedQuizzes: downloadedQuizzes,
    }
  })
  .catch(function(response){
    console.log('fetch error',response);
    return {
      type: START_QUIZ,
    }
  })
}

export function addQuizForm () {
  return {
    type: ADD_QUIZFORM,
  }
}

export function updateQuiz (formData) {

 return {
  type: UPDATE_QUIZ,
  formData: formData,
 }
}

export function answerQuestion (answer,lastQuestion) {
  if (lastQuestion){
    //postAnswers
  }

  return {
    type: ANSWER_QUESTION,
    answer: answer
  }
}

export function postAnswers(){
  //   return axios.post('/save', {file:quizTitle, data: formData}).then(function(response){
    
  //   if (response.status === 201){
  //     return {
  //       type: QUIZ_SUBMISSION, 
  //       form: formData, 
  //       title: quizTitle
  //     };
  //   }
  // })
  // .catch(function(response){
  //     console.log('error',response);
  //     return {
  //       type: QUIZ_SUBMISSION, 
  //       form: formData, 
  //       title: quizTitle
  //     }
  // });
  console.log('api save answers')
}
