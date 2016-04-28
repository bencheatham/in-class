import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import drawer from './drawer';
import quiz from './quiz';
import Users from './user';

const rootReducer = combineReducers({
 routing,
 quiz,
 Users,
  drawer
});

export default rootReducer;
