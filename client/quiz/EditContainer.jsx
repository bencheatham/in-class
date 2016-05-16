import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../login/Login';
import EditItem from '../quiz/EditItem';
import Drawer from '../containers/Drawer';
import * as quizActions from './actions';
import Header from '../login/Header';
import { Button, Glyphicon, Table } from 'react-bootstrap';
import {hashHistory} from 'react-router';
require('../stylesheets/sidebar.scss');

class EditContainer extends Component {
  constructor (props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.renderQuizItems = this.renderQuizItems.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
  }

  componentDidMount(){
  }

  handleClick (){
    this.props.quizActions.addNewQuestion();
  }

  handleSubmission (){
    this.props.quizActions.saveQuizInDatabase(this.props.quizToEdit.title,this.props.quizToEdit.questions,true);
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
    
    return (
      <div>
        <Header /> 

        <h3>Quiz Title: <input type="text" onChange={this.changeTitle} value={this.props.quizToEdit.title} ref="title"></input> <Button onClick={this.handleSubmission} bsStyle="primary">Save Quiz</Button>
        </h3>
        <Table bordered>
          <tbody>
          <tr className="edit-top-row">
            <td>Question</td>
            <td>Answer</td>
            <td>Option 1</td>
            <td>Option 2</td>
            <td>Option 3</td>
          </tr>
          {this.renderQuizItems()}
          </tbody>
        </Table>
        <Button onClick={this.handleClick} className="btn-warning btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-plus" />
        </Button>
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