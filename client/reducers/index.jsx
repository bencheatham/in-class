import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import drawer from './drawer';
import teacherQuiz from '../quiz/teacher-reducer';
import studentQuiz from '../quiz/student-reducer';
import Users from './user';
import questions from '../question/reducer';
import user from '../login/reducer';
import userVideoModal from './userVideoModal';
import questionModal from '../modules/questionModal/reducer'
import video from '../modules/video/reducers/reducer_sessions';
import {chatReducer as chat } from '../chat/reducer';
import thumbsReducer from '../thumbs/reducer'

const rootReducer = combineReducers({
  routing,
  teacherQuiz,
  Users,
  questions,
  drawer,
  user,
  video,
  userVideoModal,
  questionModal,
  studentQuiz,
  chat,
  thumbsReducer,
});

export default rootReducer;
