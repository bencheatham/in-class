import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import Quiz from './quiz';
import Users from './user';

const rootReducer = combineReducers({
 routing,
 Quiz,
 Users
});

export default rootReducer;
