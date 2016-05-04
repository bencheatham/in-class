function userReducer(state = {username: ''}, action){
  switch (action.type){
    case 'LOGIN':
      return { 
        username: state.username,
        authenticated: state.authenticated,
        errorMessage: state.errorMessage,
      };
    case 'AUTH_USER':
      return { 
        username: action.username,
        authenticated: true,
        errorMessage: state.errorMessage,
      };
    case 'UNAUTH_USER':   
      return { 
        username: state.username,
        authenticated: false,
        errorMessage: state.errorMessage,
      };
    case 'CHECK_AUTH': 
      return {
        username: state.username,
        authenticated: true,
        errorMessage: state.errorMessage,
      }
    case 'AUTH_ERROR':   
      return { 
        username: state.username,
        authenticated: state.authenticated,
        errorMessage: action.errorMessage,
      };
  }
  return state;
};

export default userReducer;