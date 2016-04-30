
import React from 'react';
import { Route } from 'react-router';
//import { Provider } from 'react-redux';
import Home from '../containers/Home';
import Thumbs from '../containers/Thumbs';
import QuestionContainer from '../question/container';
import LoginView from '../views/LoginView';
import Login from '../login/Login';
import Quiz from '../containers/QuizPage';
import axios from 'axios';


function checkAuthentication (next, previous, callback) {
  return axios.get('http://localhost:8000/authentication')
  .then((response) => {
    if (response.status === 200) { callback(); console.log('authorized'); return Promise.resolve('authorized'); }
    else Promise.reject('not authorized');
    
  })
  .catch((error) => { console.log('not authorized'); previous('/login'); callback(); });
}

// let Wrapper = (component) => {
//   return (...props) => (
//     <Provider >
//       <component {...props} />
//     </Provider>
//   );
// };
 

export default (
  <Route>
    <Route  path="/" component={Home} />
    <Route  path="/login"
            component={Login} />
    <Route  path="/loginView"
            component={LoginView} />
    <Route  path="/quiz"
            component={Quiz} 
            onEnter={checkAuthentication}/>
    <Route  path="/thumbs"
            component={Thumbs} 
            onEnter={checkAuthentication}/>
    <Route  path="/question"
            component={QuestionContainer} 
            onEnter={checkAuthentication}/>
            
  </Route>
);
