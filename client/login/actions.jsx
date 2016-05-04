import { LOGIN } from './constants';
import { routerMiddleware, push } from 'react-router-redux'
import { returnStore } from '../main';
import { hashHistory } from 'react-router';
import axios from 'axios';
const SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://in-class.herokuapp.com/authentication' : 'http://localhost:8000/authentication' ; 

export function signinUser(username, password,url){
  
  return function(dispatch, getState){
    
    axios.post(url, {username: username, password: password})
    .then(response => {
      dispatch({ type: 'AUTH_USER', username: response.data.username });
      // localStorage.setItem(response.data);
      hashHistory.push('/quiz');
    })
    .catch((error)=>{
    console.log('login error',error)    
      dispatch(authError(error.data));
    });
  }
}

export function authError(error){
  return {
    type: 'AUTH_ERROR',
    errorMessage: error,
  }
}

export function signOutUser () {
  // localStorage.setItem('token');
  return {
    type: 'UNAUTH_USER',

  }
}

export function checkAuth() {
  
  return axios.get(SERVER_URL)
  .then((response) => {
    console.log('check auth',response.status)
    if (response.status === 200) {
      return { type: 'AUTH_USER', username: response.data.username }
    }
    else {
      return { type: 'UNAUTH_USER' } 
    }
  })
  .catch((error) => { type: 'UNAUTH_USER' } );
}

