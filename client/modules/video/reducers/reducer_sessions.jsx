import { USER_CALL_USER } from '../constants/VideoConstants';
import { TEACHER_SELECT_STUDENT_VIDEO } from '../constants/VideoConstants';
import { ADD_VIDEO_SESSION, GET_USER_VIDEO, MAKE_CALL } from '../constants/VideoConstants';
import { EMIT_TEACHER_VIDEO_SESSION } from '../constants/VideoConstants';
import { ADD_CLASS_VIDEO_SESSION } from '../constants/VideoConstants';
import extend from 'lodash/extend';

// helper method for add video session to state
function addVideoSession(videos, session) {
  let ret = extend({}, videos);
  let username = session.getAttribute('data-number');
  ret[username] = session;

  return ret;
}

function getVideoByUsername(videos, username) {
  return videos[username];
}

let initState = {
  calledUser: null,
  callingUser: null,
  videoSession: null,
  videos: {},
  makeCall: true
}



export default function(state = initState, action) {

  switch(action.type) {
    case USER_CALL_USER:

      return Object.assign({}, state, {
        calledUser: action.payload.calledUser,
        callingUser: action.payload.callingUser,
      });

    case TEACHER_SELECT_STUDENT_VIDEO:
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
      var _session = getVideoByUsername(state.videos, username);

      return Object.assign({}, state, {
        videoSession: _session
      });

    // return Object.assign({}, state, {
    //   videoSession: action.payload
    // });

  case EMIT_TEACHER_VIDEO_SESSION:

    return state;

  case ADD_CLASS_VIDEO_SESSION:

    return Object.assign({}, state, {
      classVideoSession: action.payload.videoSession,
      classVideoSpeaker: action.payload.presenter,
      classVideoTeacher: action.payload.teacher
    });

      
    default:
      return state;
  }
}
