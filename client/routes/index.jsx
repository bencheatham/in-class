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
import StudentQuiz from '../quiz/StudentQuiz';
import TeacherQuiz from '../quiz/TeacherQuiz';
import ChatContainer from '../chat/container';
import RequireAuth from '../login/auth';
import SignUp from '../login/SignUp';
import SignOut from '../login/SignOut';
import About from '../login/About';
import SocketManager from '../common/SocketManager';
import SimplePie from '../modules/analytics/components/pieChart';
import SimpleBar from '../modules/analytics/components/barChart';

export default (
  <Route>
    <Route path="/" component={RequireAuth(About)}/>
    <Route path="/sign-in"
            component={RequireAuth(Login)} />
    <Route path="/sign-up"
            component={RequireAuth(SignUp)} />
    <Route path="/sign-out"
            component={RequireAuth(SignOut)} />  
    <Route path="/about"
            component={RequireAuth(About)} />  
    <Route path="/video"
           component={LoginView} />
    <Route path="/quiz"
           component={RequireAuth(Quiz)}/>
    <Route path="/thumbs"
           component={RequireAuth(Thumbs)}/>
    <Route path="/question"
           component={QuestionContainer}/>
    <Route path="/student-class"
           component={StudentClassView}/>
    <Route path="/user"
           component={UserPage}/>
     <Route path="/create-quiz"
           component={QuizContainer}/>
     <Route path="/pop-quiz"
           component={StudentQuiz}/>
      <Route path="/send-quiz"
           component={TeacherQuiz} />
      <Route path="/chat"
           component={ChatContainer} />
      <Route path="/hello" 
           component={SimpleBar}/>

  </Route>
);
