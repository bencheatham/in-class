import { USER_CALL_USER } from '../constants/VideoConstants';
import { TEACHER_SELECT_STUDENT_VIDEO } from '../constants/VideoConstants';
import { ADD_VIDEO_SESSION } from '../constants/VideoConstants';
import { EMIT_TEACHER_VIDEO_SESSION } from '../constants/VideoConstants';
import { ADD_CLASS_VIDEO_SESSION } from '../constants/VideoConstants';


export default function(state = {
  calledUser: null, 
  callingUser: null,
  videoSession: null,
  classVideoSession: null,
  classVideoSpeaker: null,
  classVideoTeacher: null

}, action) {


  console.log('HERE IN ACTIONS: ', action)

  switch(action.type) {
  case USER_CALL_USER:
    console.log("USER_CALL_USER in reducer", action)

    return Object.assign({}, state, {
      calledUser: action.payload.calledUser,
      callingUser: action.payload.callingUser,
    });

  case TEACHER_SELECT_STUDENT_VIDEO:
    console.log("TEACHER_SELECT_STUDENT_VIDEO in reducer", action)

    return Object.assign({}, state, {
      teacherSelectedUser: action.payload.teacherSelectedUser,
      teacherCall: true,
      teacherName: action.payload.teacherName
    });

  case ADD_VIDEO_SESSION:
    console.log("ADD_VIDEO_SESSION in reducer", action)

    return Object.assign({}, state, {
      videoSession: action.payload
    });

  case EMIT_TEACHER_VIDEO_SESSION:

    return state;

  case ADD_CLASS_VIDEO_SESSION:

    if(state.classVideoSession === null){
      let obj = Object.assign({}, state, {
            classVideoSession: action.payload.videoSession,
            classVideoSpeaker: action.payload.presenter,
            classVideoTeacher: action.payload.teacher
          });

      return obj;
    }
    return state;


  }

  return state;
}