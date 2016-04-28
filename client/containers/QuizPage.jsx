
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { show } from '../actions/quiz';

import Drawer from '../containers/Drawer';
import TeacherControlPanel from '../containers/TeacherControlPanel';

class QuizPage extends Component {
  render() {
   return (
     <div>
       <Drawer />
       <TeacherControlPanel />
     </div>
   );
 };
};

export default QuizPage;
