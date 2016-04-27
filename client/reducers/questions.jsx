//import _ from 'underscore';
var _ = require('underscore')

export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const QUESTION = 'QUESTION';

var dummy_chatMessage = 
{
  username : 'stephen',
  text: 'Hey everyone',
  timestamp: 1461619497989,
}

var dummy_question = 
{
  id: 12,
  username : 'stephen',
  text: 'I dont understand anything',
  timestamp: 1461619497989,
  upvotes: 3,
  downvotes: 4
}

var initialState = {
  questions: [dummy_question],
}

export function questions(state = initialState, action){

  switch (action.type) {
    case QUESTION:
      
      var newQuestions = state.questions.concat(action.question)
      
      return {
        questions: newQuestions,
      }
    case DOWNVOTE: 
      var updatedQuestions = _.map(state.questions.slice(), (question) => {
        if (question.id === action.question_id){
          question.downvotes++;
        }
        return question; 
      });
      return {
        questions: updatedQuestions,
      }
    case UPVOTE: 
      var updatedQuestions = _.map(state.questions.slice(), (question) => {
        if (question.id === action.question_id){
          question.upvotes++;
        }
        return question; 
      });
      return {
        questions: updatedQuestions,
      }
    default: 
      return state;
  }
} 

export default questions;