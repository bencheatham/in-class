import { USER_CALL_USER } from '../constants/VideoConstants';
import { TEACHER_SELECT_STUDENT_VIDEO } from '../constants/VideoConstants';
import { ADD_VIDEO_SESSION, GET_USER_VIDEO } from '../constants/VideoConstants';
import extend from 'lodash/extend';

// helper method for add video session to state
function addVideoSession(videos, session) {
  let ret = extend({}, videos);
  let username = session.getAttribute('data-number');
  console.log('username', username);
  ret[username] = session;

  return ret;
}

let initState = {
  calledUser: null,
  callingUser: null,
  videoSession: null,
  videos: {}
}

export default function(state = initState, action) {

  console.log('HERE IN ACTIONS: ', action)

  switch(action.type) {
  case USER_CALL_USER:

    console.log('jason: call user');
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
    return Object.assign({}, state, {
      videoSession: action.payload,
      videos: addVideoSession(state.videos, action.payload)
    });
  case GET_USER_VIDEO:
    let username = action.username;
    console.log('get user video', username);
    // TODO select videos from state
    // TODO update the current session to selected video
    // TODO return state
  default:
    return state;
  }
}
