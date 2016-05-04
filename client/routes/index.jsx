
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
import RequireAuth from '../login/auth'

function checkAuthentication (a,b,cb){ cb()}

export default (
  <Route>
    // <Route path="/" component={Home} />
    <Route path="/" component={Login}/>
    <Route  path="/login"
            component={Login} />
    <Route  path="/sign-out"
            component={Login} />  
    <Route path="/video"
           component={LoginView}
           onEnter={checkAuthentication}/>
    <Route path="/quiz"
           component={Quiz} 
           />
    <Route path="/thumbs"
           component={RequireAuth(Thumbs)} 
           />
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
     <Route path="/pop-quiz"
           component={StudentQuiz}
           onEnter={checkAuthentication}/>
      <Route path="/send-quiz"
           component={TeacherQuiz} />
           onEnter={checkAuthentication}/>
      <Route path="/chat"
           component={ChatContainer} />
           onEnter={checkAuthentication}/>
  </Route>
);
