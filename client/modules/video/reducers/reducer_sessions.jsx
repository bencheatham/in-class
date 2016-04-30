import { STUDENT_CALL_STUDENT } from '../constants/VideoConstants';
import { TEACHER_SELECT_STUDENT_VIDEO } from '../constants/VideoConstants';
import { ADD_VIDEO_SESSION } from '../constants/VideoConstants';


export default function(state = {
  calledUser: null, 
  callingUser: null,
  videoSession: null
}, action) {


  console.log('HERE IN ACTIONS: ', action)

  switch(action.type) {
  case STUDENT_CALL_STUDENT:
    console.log("STUDENT_CALL_STUDENT in reducer", action)

    return Object.assign({}, state, {
      calledUser: action.payload.calledUser,
      callingUser: action.payload.callingUser,
    });

  case TEACHER_SELECT_STUDENT_VIDEO:
    console.log("TEACHER_SELECT_STUDENT_VIDEO in reducer", action)

    return Object.assign({}, state, {
      teacherSelectedUser: action.payload.teacherSelectedUser
    });

  case ADD_VIDEO_SESSION:
    console.log("ADD_VIDEO_SESSION in reducer", action)

    return Object.assign({}, state, {
      videoSession: action.payload
    });

  } 
  return state;
}