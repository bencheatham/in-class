export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const QUESTION = 'QUESTION';

export function upvote(question_id) {
  return (dispatch, getState) => {
     
    return dispatch({
      type: UPVOTE,
      question_id: question_id
    });
  };
}

export function downvote(question_id) {
  return (dispatch, getState) => {
     
    return dispatch({
      type: DOWNVOTE,
      question_id: question_id
    });
  };
}

export function submitChatMessage(chatMessage) {
  return (dispatch, getState) => {
     
    return dispatch({
      type: CHAT_MESSAGE,
      chatMessage: chatMessage
    });
  };
}

export function submitQuestion(question_id) {
  return (dispatch, getState) => {
     
    return dispatch({
      type: QUESTION,
      question: question
    });
  };
}
