import * as types from '../constants/VideoConstants';
import initializeUsers from '../../../middleware/users';

const worker = initializeUsers();


export function addPhone(phone) {

 return {
   type: types.ADD_PHONE_FROM_WINDOW,
   payload: phone
 };
}

export function addVideoSession(session) {
 return {type: types.ADD_VIDEO_SESSION, payload: session};
}

export function allowMakeCall(isAllow) {
  return {
    type: types.MAKE_CALL,
    isAllow: isAllow
  };
}

export function switchVideoByUsername(username) {
  return {
    type: types.GET_USER_VIDEO, username
  };
}

export function addClassVideoSession(userPac) {

  return {
    type: types.ADD_CLASS_VIDEO_SESSION,
    payload: userPac
  }
}

export function userCallUser(callers) {

 console.log('I am HERE in userCallUser!');
 console.log(callers)

 return {
   type: types.USER_CALL_USER,
   payload: callers
 };
}

export function teacherSelectStudentVideo(selectionDetails) {
  return {
    type: types.TEACHER_SELECT_STUDENT_VIDEO,
    payload: selectionDetails
  };
}

export function emitTeacherVideoSession(classUserPac) {
  
  worker['teacherSelectedVideoUser'](classUserPac);

  return {
    type: types.EMIT_TEACHER_VIDEO_SESSION
  }
  

}

export function setControllerVisibility(visible){
  return { type: types.SET_CONTROLLER_VISIBILITY, visible: visible };
}

export function setMute(mute) {
  return { type: types.SET_MUTE, mute: mute };
}
