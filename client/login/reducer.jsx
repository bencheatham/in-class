
var initialState = {
  username: null,
  authenticated: null,
  errorMessage: null,
  usertype: null,
}

function userReducer(state = initialState, action){
  switch (action.type){
    case 'LOGIN':
      return {
        ...state,
      };
    case 'AUTH_USER':
      return {
        ...state,
        username: action.username,
        usertype: action.usertype,
        authenticated: true,
      };
    case 'UNAUTH_USER':
      return {
        ...state,
        username: null,
        authenticated: false,
      };
    case 'CHECK_AUTH':
      return {
        ...state,
        authenticated: true,
      }
    case 'AUTH_ERROR':
      return {
        ...state,     
        errorMessage: action.errorMessage,
      };
  }
  return state;
};

export default userReducer;
