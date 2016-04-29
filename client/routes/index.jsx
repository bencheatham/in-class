import React from 'react';
import { Route } from 'react-router';
//import { Provider } from 'react-redux';
import Home from '../containers/Home';
import Thumbs from '../containers/Thumbs';
import QuestionContainer from '../question/container';
import LoginView from '../views/LoginView';
import Quiz from '../containers/QuizPage';
// import axios from 'axios';



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
            component={LoginView} />
    <Route  path="/quiz"
            component={Quiz} />
    <Route  path="/thumbs"
            component={Thumbs} />
    <Route  path="/question"
            component={QuestionContainer} />
            
  </Route>
);


// onEnter={(nextState, replaceState, callback) => checkAuth(callback); }/>


// function checkAuthentication (callback) {
//   axios.get('http://localhost:8000/protected')
//   .then((response) => {
//     if (response.status === 200) console.log('is authorized'); callback();
//     else Promise.reject('not authorized');
//   })
//   .catch((error) => redirect('/'));
// }



