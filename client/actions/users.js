import * as types from '../constants/ActionTypes';
import initializeUsers from '../middleware/users';

const worker = initializeUsers();


export function userLogin(user) {

 worker['set username'](user);

 return {
   type: types.USER_LOGIN,
   payload: user
 };
}

export function selectUser(user){

 return {
   type: types.SELECT_USER,
   payload: user
 };
}

export function userJoinedClass(data) {

  console.log('user joined action: ', data)

  return {
    type: types.USER_JOINED_CLASS,
    payload: data.username
  };
}

export function userLeftClass(data) {

  console.log('user left action: ', data)

  return {
   type: types.USER_LEFT_CLASS,
   payload: data
  };
}

// import axios from 'axios';


// export default function(user) {

//   axios.post('/user', {
//     username: 'Fred',
//     password: 'Flintstone'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (response) {
//     console.log(response);
//   });






//   return {
//     type: LOGIN_USER,
//     payload: request
//   }

// }




