import { USER_LOGIN } from '../constants/ActionTypes';
import { USER_JOINED_CLASS } from '../constants/ActionTypes';
import { USER_LEFT_CLASS } from '../constants/ActionTypes';
import * as types from '../constants/ActionTypes';


let initState = {
  users: [],
  username: ''
};


export default function(state = initState, action) {

  let userObj = {};
  userObj.users = [];

  let users = state.users;

  switch(action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        users: [action.payload, ...state.users],
        username: action.payload
      });

    case USER_JOINED_CLASS:
      if(action.payload !== state.username){
        return Object.assign({}, state, {
          users: [action.payload, ...state.users],
        });
      }
      return state;

    case USER_LEFT_CLASS:
      userObj.users = userObj.users.filter(function(user) {
        user !== action.payload;
      });
      return userObj;

    // set the state of users
    case types.USERS_SET_USERS:
      return Object.assign({}, state, {
        users: action.users
      });

    default:
      return state;
  }
}
