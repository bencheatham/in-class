
import React from 'react';
import { Route } from 'react-router';
import Home from '../containers/Home';
import Thumbs from '../containers/Thumbs';
import QuestionContainer from '../question/container';
import LoginView from '../views/LoginView';
import Login from '../login/Login';
import Quiz from '../containers/QuizPage';
import StudentClassView from '../views/StudentClassView';
import UserPage from '../containers/UserPage';
import axios from 'axios';
import QuizContainer from '../quiz/container';


export const SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://in-class.herokuapp.com/authentication' : 'http://localhost:8000/authentication' ; 


function checkAuthentication (next, previous, callback) {
  console.log(SERVER_URL);
  return axios.get(SERVER_URL)
  .then((response) => {
    if (response.status === 200) { callback(); console.log('authorized'); return Promise.resolve('authorized'); }
    else Promise.reject('not authorized');
    
  })
  .catch((error) => { console.log('not authorized'); previous('/login'); callback(); });
}

export default (
  <Route>
    // <Route path="/" component={Home} />
    <Route path="/" component={Login}/>
    <Route  path="/login"
            component={Login} />
    <Route path="/video"
           component={LoginView} 
           onEnter={checkAuthentication}/>
    <Route path="/quiz"
           component={Quiz} 
           onEnter={checkAuthentication}/>
    <Route path="/thumbs"
           component={Thumbs} 
           onEnter={checkAuthentication}/>
    <Route path="/question"
           component={QuestionContainer} 
           onEnter={checkAuthentication}/>
    <Route path="/student-class"
           component={StudentClassView} 
           onEnter={checkAuthentication}/>
    <Route path="/user"
           component={UserPage} 
           onEnter={checkAuthentication}/>
     <Route path="/create-quiz"
           component={QuizContainer}
           onEnter={checkAuthentication}/>
  </Route>
);
