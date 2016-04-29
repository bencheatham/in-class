import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'underscore'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'
import { submitQuiz } from './actions'

class QuizForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    var form = {
      title: this.refs.title.value,
      answer: this.refs.answer.value,
      choice1: this.refs.choice1.value,
      choice2: this.refs.choice2.value,
      choice3: this.refs.choice3.value,    
    }

    this.props.actions.submitQuiz(form);

    this.refs.title.value = '';
    this.refs.answer.value = '';
    this.refs.choice1.value = '';
    this.refs.choice2.value = '';
    this.refs.choice3.value = '';
  }

  render() {
   return (
     <div>
      Question: <input ref="title" type="text"></input>
      Answer: <input ref="answer" type="text"></input>
      Choice 1: <input ref="choice1" type="text"></input>
      Choice 2: <input ref="choice2" type="text"></input>
      Choice 3: <input ref="choice3" type="text"></input>
      <button onClick={this.handleSubmit}>Submit</button>
    </div>
   );
  };
}

function mapStateToProps(state){
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({ submitQuiz },dispatch)  
  }
  
  
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizForm);
