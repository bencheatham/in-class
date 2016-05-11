import { USER_CALL_USER } from '../constants/VideoConstants';
import { TEACHER_SELECT_STUDENT_VIDEO } from '../constants/VideoConstants';
import { ADD_VIDEO_SESSION, GET_USER_VIDEO, MAKE_CALL, SET_CONTROLLER_VISIBILITY } from '../constants/VideoConstants';
import * as types from '../constants/VideoConstants';
import extend from 'lodash/extend';

// helper method for add video session to state
function addVideoSession(videos, session) {
  let ret = extend({}, videos);
  if (!session) return;

  let username = session.number;
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
  makeCall: true,
  showCtrl: false,
  mute: false
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

    case MAKE_CALL:
      return Object.assign({}, state, {
        makeCall: action.isAllow
      });

    case SET_CONTROLLER_VISIBILITY:
      return Object.assign({}, state, {
        showCtrl: action.visible
      });

    case types.SET_MUTE:
      return Object.assign({}, state, {
        mute: action.mute
      });

    default:
      return state;
  }
}
