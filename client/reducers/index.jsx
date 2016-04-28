import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import drawer from './drawer';
import quiz from './quiz';
<<<<<<< 017cb3fdeea687cd053a4f984db6dd63b81a5b50
import Users from './user';
=======
import questions from '../question/reducer'
import user from '../login/reducer'

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }
  return state;
}

>>>>>>> Deleted unnecessary files, fixed bug with login socket events

const rootReducer = combineReducers({
 routing,
 quiz,
 Users,
  drawer
});

export default rootReducer;
