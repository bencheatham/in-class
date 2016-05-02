import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import drawer from './drawer';
import quiz from '../quiz/teacher-reducer';
import studentQuiz from '../quiz/student-reducer';
import Users from './user';
import questions from '../question/reducer';
import user from '../login/reducer';
import userVideoModal from './userVideoModal';
import video from '../modules/video/reducers/reducer_sessions';
import {chatReducer as chat } from '../chat/reducer';
  

const rootReducer = combineReducers({
  routing,
  quiz,
  Users,
  questions,
  drawer,
  user,
  video,
  userVideoModal,
  studentQuiz,
  chat,
});

export default rootReducer;
