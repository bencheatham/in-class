import { UPVOTE, DOWNVOTE, QUESTION } from './constants';

export function upvote(id,username) {  
  return {
    type: UPVOTE,
    id: id,
    username: username
  };
}

export function downvote(question_id) {
  return {
    type: DOWNVOTE,
    question_id: question_id
  }
}

export function submitQuestion(question) {
    
  return {
    type: QUESTION,
    question: question,
  }
}