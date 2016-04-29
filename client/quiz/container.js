import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from '../login/Login'
import QuizForm from '../quiz/QuizForm'
import Drawer from '../containers/Drawer'

class QuizContainer extends Component {


 render() {
   return (
     <div>
      <span><h1>Create a quiz</h1></span>
      <QuizForm />
    </div>
   );
 };
}

export default QuizContainer;