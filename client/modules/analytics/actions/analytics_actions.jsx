import * as types from '../constants/analytics_constants';


export function addResult(blah) {

 return {
   type: types.UPDATE_QUIZ_RESULTS,
   payload: blah
 };
}