<Route path='/thumbs'
        component={Questions}
        onEnter{(nextState, replaceState,cb) => {
          checkAuth(cb);
        }}
/>

export const checkAuth = (cb) => {
  let token = localStorage.getItem('token');
  let redirect = () => window.location.hash = '#/login';

  return (dispatch,getState) => {
    if (token){
      // ping server
        // if wrong token
          // delete token from localStorage
          //redirect
        // if correct token
          // cb()
    } else {
      redirect();
    }
  }
}