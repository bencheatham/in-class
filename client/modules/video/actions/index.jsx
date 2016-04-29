import * as types from '../constants/VideoConstants';
import initializeUsers from '../../../middleware/users';

const worker = initializeUsers();

export function stundentCallStudent(callers) {


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






