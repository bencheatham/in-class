import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { show } from '../actions/quiz';
import Header from '../login/Header';
import Drawer from '../containers/Drawer';
import TeacherPanel from '../containers/TeacherPanel';
import StudentPanel from '../containers/StudentPanel';

class QuizPage extends Component {
  render() {
   return (
     <div>
      <Header />
      <Drawer />
      <StudentPanel />
      
     </div>
   );
 };
};

export default QuizPage;
