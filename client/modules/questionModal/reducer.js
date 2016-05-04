import * as actions from './constants';
import merge from 'lodash/merge';

const initState = {
  visible: false,
  users: []
};

function userVideoModal(state=initState, action){
  let users = state.users.slice();

  switch(action.type) {
    case actions.QUESTION_MODAL_SHOW:
      return merge({}, state, { visible: true });
    case actions.QUESTION_MODAL_HIDE:
      return merge({}, state, { visible: false });
    case actions.QUESTION_MODAL_ADD_USER:
      if (users.indexOf(action.username) === -1) users.push(action.username);
      return merge({}, state, { users: users });
    case actions.QUESTION_MODAL_ADD_USERS:
      return merge({}, state, { users: action.users });
    default:
      return state;
  };
};

export default userVideoModal;
