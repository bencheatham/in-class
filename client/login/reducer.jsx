
var initialState = {
  username: null,
  authenticated: null,
  errorMessage: null,
  userType: null,
}

function userReducer(state = initialState, action){
  switch (action.type){
    case 'LOGIN':
      return { 
        username: state.username,
        authenticated: state.authenticated,
        errorMessage: state.errorMessage,
        userType: state.userType,
      };
    case 'AUTH_USER':
      return { 
        username: action.username,
        authenticated: true,
        errorMessage: state.errorMessage,
        userType: state.userType,
      };
    case 'UNAUTH_USER':   
      return { 
        username: null,
        authenticated: false,
        errorMessage: state.errorMessage,
        userType: state.userType,
      };
    case 'CHECK_AUTH': 
      return {
        username: state.username,
        authenticated: true,
        errorMessage: state.errorMessage,
        userType: state.userType,
      }
    case 'AUTH_ERROR':   
      return { 
        username: state.username,
        authenticated: state.authenticated,
        errorMessage: action.errorMessage,
        userType: state.userType,
      };
  }
  return state;
};

export default userReducer;