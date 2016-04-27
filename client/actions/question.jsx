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

var dummy_question = 
{
  id: 12,
  username : 'stephen',
  text: 'I dont understand anything',
  timestamp: 1461619497989,
  upvotes: 3,
  downvotes: 4
}

export function submitQuestion(text) {
  return (dispatch, getState) => {
    var user = getState().user.username;
    var id = getState().questions.questions.length;
    console.log(user);

    return dispatch({
      type: QUESTION,
      question: {
        username: user,
        id: id++,
        text: text,
        timestamp: Date.now(),
        upvotes: 0,
        downvotes: 0
      }
    });
  };
}
