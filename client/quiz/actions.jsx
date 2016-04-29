import axios from 'axios';
import _ from 'underscore';
import { QUIZ_SUBMISSION, QUIZ_FETCH } from './constants';

export function submitQuiz (formData) {
  
  // axios.post('/save', JSON.stringify(formData)).then(function(data)){
  //   console.log(data);
  //   if (data.response.status === 201){
  //     return _.extend(formData,{type: 'QUIZ'});
  //   }
  // }
  // _.extend(formData,{type: QUIZ_SUBMISSION});
}

export function fetchQuiz (id) {
  
  // axios.get('/fetch').then(function(data)){
  //   return {
  //     type: QUIZ_FETCH,
  //     message: data,
  //   }
  // }
}