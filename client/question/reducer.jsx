//import _ from 'underscore';
var _ = require('underscore')

import { UPVOTE, QUESTION, INITIALIZE_QUESTIONS } from './constants';

var initialState = {
  questions: [],
}

export function questions(state = initialState, action){

  switch (action.type) {
    case QUESTION:
      var newQuestions = state.questions.concat(action.question)  
      return {
        questions: newQuestions,
      }
    case UPVOTE: 
      var updatedQuestions = _.map(state.questions.slice(), (question) => {
        if (question.id === action.id){
          question.upvotes.push(action.username);
        }
        return question; 
      });
      return {
        questions: updatedQuestions,
      }
    case INITIALIZE_QUESTIONS:
      var updatedQuestions = action.questionLog;
      return {
        questions: updatedQuestions,
      }
    default: 
      return state;
  }
} 

export default questions;