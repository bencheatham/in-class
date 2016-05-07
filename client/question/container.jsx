import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import QuestionBox from './QuestionBox'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'

class QuestionContainer extends Component {


 render() {
   return (
     <div>
      <QuestionBox />
    </div>
   );
 };
}


export default QuestionContainer;