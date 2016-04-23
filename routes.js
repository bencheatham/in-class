import React from 'react';
import { Route } from 'react-router';
import Home from './client/containers/Home';
import Thumbs from './client/containers/Thumbs';
import UserPage from './client/containers/UserPage';
import Quiz from './client/containers/Quiz'
import App from './client/containers/App';

export default (
  <Route path="/" component={Home}>
    <Route path="/login"
           component={UserPage} />
    <Route path="/quiz"
           component={Quiz} />
    <Route path="/thumbs/"
           component={Thumbs} />

  </Route>
);