import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../login/Login';
import EditItem from '../quiz/EditItem';
import Drawer from '../containers/Drawer';
import * as quizActions from './actions';
import Header from '../login/Header';

class EditContainer extends Component {
  constructor (props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.renderQuizItems = this.renderQuizItems.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
  }

  handleClick (){
    this.props.quizActions.addNewQuestion();
  }

  handleSubmission (){
    this.props.quizActions.saveQuizInDatabase(this.refs.title.value,this.props.quizToEdit,true);
  }

  renderQuizItems(){
    var questions = this.props.quizToEdit.questions;
    var quizForms = [];
    for (var i = 0; i < questions.length; i++){
      quizForms.push(<EditItem quizData={questions[i]} index={i} key={i}/>);
    }
    return quizForms;
  }
  
  changeTitle(e){
    this.props.quizActions.changeTitle(e.target.value);
  }

  render() {
    console.log(this.props.quizToEdit);
    return (
      <div>
        <Header />        
        <span><h1>Save Quiz</h1></span>
        <span>Quiz title:</span>
        <input type="text" onChange={this.changeTitle} value={this.props.quizToEdit.title} ref="title"></input>
        <button onClick={this.handleSubmission}> Save Quiz</button>
        {this.renderQuizItems()}
        <div onClick={this.handleClick}>[ + + + + +]</div>
      </div>
     );
 };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quizToEdit: state.teacherQuiz.quizToEdit,
  }
}

function mapDispatchToProps(dispatch){
  return {
    quizActions: bindActionCreators(quizActions,dispatch)  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditContainer);