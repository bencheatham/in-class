import * as types from '../constants/VideoConstants';
import initializeUsers from '../../../middleware/users';

const worker = initializeUsers();


export function addVideoSession(session) {


 return {
   type: types.ADD_VIDEO_SESSION,
   payload: session
 };
}



export function studentCallStudent(callers) {


 return {
   type: types.STUDENT_CALL_STUDENT,
   payload: callers
 };
}

export function teacherSelectStudentVideo(userPac) {

 worker['teacherSelectedVideoUser'](userPac);

 return {
   type: types.TEACHER_SELECT_STUDENT_VIDEO,
   payload: userPac
 };
}






