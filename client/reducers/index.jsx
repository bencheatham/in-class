import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import drawer from './drawer';
import quiz from './quiz';
import Users from './user';
import questions from '../question/reducer'
import user from '../login/reducer'

const rootReducer = combineReducers({
 routing,
 quiz,
 Users,
 questions,
  drawer,
  user,
});

export default rootReducer;
