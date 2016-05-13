import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import HomeView from '../views/HomeView';
import Thumbs from '../containers/Thumbs';
import QuestionContainer from '../question/container';
import LoginView from '../views/LoginView';
import Login from '../login/Login';
import Quiz from '../containers/QuizPage';
import StudentClassView from '../views/StudentClassView';
import TeacherClassView from '../views/TeacherClassView';
import UserPage from '../containers/UserPage';
import axios from 'axios';
import CreateQuizContainer from '../quiz/CreateQuizContainer';
import StudentQuiz from '../quiz/StudentQuiz';
import TeacherQuiz from '../quiz/TeacherQuiz';
import RequireAuth from '../login/auth';
import SignUp from '../login/SignUp';
import SignOut from '../login/SignOut';
import About from '../login/About';
import SocketManager from '../common/SocketManager';
import Analytics from '../modules/analytics/containers/analytics_container';
import SingleQuizAnalytics from '../modules/analytics/containers/singleQuizAnalyticsContainer';
import EditContainer from '../quiz/EditContainer';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomeView}/>
    <Route path="/sign-in"
            component={RequireAuth(Login)} />
    <Route path="/sign-up"
            component={RequireAuth(SignUp)} />
    <Route path="/sign-out"
            component={RequireAuth(SignOut)} />
    <Route path="/video"
           component={LoginView} />
    <Route path="/quiz"
           component={RequireAuth(Quiz)}/>
    <Route path="/thumbs"
           component={RequireAuth(Thumbs)}/>
    <Route path="/question"
           component={QuestionContainer}/>
    <Route path="/classroom/student"
           component={RequireAuth(StudentClassView)}/>
    <Route path="/classroom/teacher"
           component={RequireAuth(TeacherClassView)}/>       
    <Route path="/user"
           component={UserPage}/>
    <Route path="/create-quiz"
           component={CreateQuizContainer}/>
    <Route path="/pop-quiz"
           component={StudentQuiz}/>
    <Route path="/send-quiz"
           component={TeacherQuiz} />
    <Route path="/analytics" 
           component={RequireAuth(Analytics)}/>
    <Route path="/analytics/quiz" 
           component={RequireAuth(SingleQuizAnalytics)}/>
    <Route path="/edit"
           component={EditContainer} />
  </Route>
);
