import { USER_LOGIN } from '../constants/ActionTypes';
import { USER_JOINED_CLASS } from '../constants/ActionTypes';
import { USER_LEFT_CLASS } from '../constants/ActionTypes';


export default function(state = {users: [], username: "a"}, action) {
  
  console.log('HERE IN ACTIONS: ', action)

  let userObj = {};
  userObj.users = [];

  switch(action.type) {
  case USER_LOGIN:
    console.log("USER_LOGIN in reducer", action)

    return Object.assign({}, state, {
      users: [action.payload, ...state.users],
      username: action.payload
    });

  case USER_JOINED_CLASS:
    console.log("USER_JOINED_CLASS in reducer", action)

    if(action.payload !== state.username){
      return Object.assign({}, state, {
        users: [action.payload, ...state.users],
      });
    }
    return state;

  case USER_LEFT_CLASS:
    console.log('USER_LEFT_CLASS in reducer', action)
    //state.username = action.username
    userObj.users = userObj.users.filter(function(user) {
      user !== action.payload;
    })

    return userObj;


  } 
  //state.username = 'username';
  return state;
}