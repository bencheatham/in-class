import React from 'react';
import { Route } from 'react-router';
//import { Provider } from 'react-redux';
import Home from '../containers/Home';
import Thumbs from '../containers/Thumbs';
import LoginView from '../views/LoginView';
import Quiz from '../containers/QuizPage';


// let Wrapper = (component) => {
//   return (...props) => (
//     <Provider >
//       <component {...props} />
//     </Provider>
//   );
// };
 

export default (
  <Route>
    <Route path="/" component={Home} />
    <Route path="/login"
           component={LoginView} />
    <Route path="/quiz"
           component={Quiz} />
    <Route path="/thumbs"
           component={Thumbs} />

  </Route>
);


