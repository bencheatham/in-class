import axios from 'axios';
import _ from 'underscore';
import { ADD_QUIZFORM, QUIZ_SUBMISSION, QUIZ_FETCH, UPDATE_QUIZ } from './constants';

export function submitQuiz (quizTitle,formData) {
  
  return axios.post('/save', JSON.stringify(formData)).then(function(response){
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

export function fetchQuiz () {
  
  return axios.get('/fetch', {
    data: 'all'
  })
  .then(function(data){
    console.log(data);
    return {
      type: QUIZ_FETCH,
      message: data,
    }
  })
  .catch(function(response){
    console.log('fetch error',response);
    return {
      type: QUIZ_FETCH,
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