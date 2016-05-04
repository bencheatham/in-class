
var initialState = {
  username: null,
  authenticated: null,
  errorMessage: null,
  usertype: null,
}

function userReducer(state = {}, action){
  switch (action.type){
    case 'LOGIN':
      return { 
        username: state.username,
        authenticated: state.authenticated,
        errorMessage: state.errorMessage,
        usertype: state.usertype,
      };
    case 'AUTH_USER':
      return { 
        username: action.username,
        authenticated: true,
        errorMessage: state.errorMessage,
        usertype: state.usertype,
      };
    case 'UNAUTH_USER':   
      return { 
        username: null,
        authenticated: false,
        errorMessage: state.errorMessage,
        usertype: state.usertype,
      };
    case 'CHECK_AUTH': 
      return {
        username: state.username,
        authenticated: true,
        errorMessage: state.errorMessage,
        usertype: state.usertype,
      }
    case 'AUTH_ERROR':   
      return { 
        username: state.username,
        authenticated: state.authenticated,
        errorMessage: action.errorMessage,
        usertype: state.usertype,
      };
  }
  return state;
};

export default userReducer;