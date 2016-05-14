
var initialState = {
  username: null,
  authenticated: null,
  errorMessage: null,
  usertype: null,
  credentials: {username: '', password: ''},
  isSignUpATeacher: false,
}

function userReducer(state = initialState, action){
  switch (action.type){
    case 'UPDATE_LOGIN_FORM':
      var credentials = action.credentials   
      var newCredentials; 
      if (credentials.username === null){
        newCredentials = { 
          username: state.credentials.username,
          password: credentials.password
        }
      } else if (credentials.password === null){
        newCredentials = { 
          username: credentials.username,
          password: state.credentials.password
        };
      }
      console.log(newCredentials);
      return {
        ...state,
        credentials: newCredentials,
      }
    case 'LOGIN':
      return {
        ...state,
        credentials: {},
      };
    case 'TOGGLE_USERTYPE':
      var isSignUpATeacher = !state.isSignUpATeacher;
      return {
        ...state,
        isSignUpATeacher: isSignUpATeacher,
        
      };
    case 'AUTH_USER':
      return {
        ...state,
        credentials: {},
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
