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
 
 return {
   type: types.ADD_VIDEO_SESSION,
   payload: session
 };
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

//  worker['teacherSelectedVideoUser'](classUserPac);

}






