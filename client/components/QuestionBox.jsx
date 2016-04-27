import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actions/question';
import Question from './Question';



class QuestionBox extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);  
  }

  componentWillMount() {

  }
  
  handleEnter(e) {
    if (e.keyCode === 13){
      this.props.actions.submitQuestion(e.target.value);
      e.target.value = '';
    }
    
  };

  render(){
    // var questions = this.props.questions.map((question) => {
    //   return <div>{question.username}: {question.text} upvotes: {question.upvotes} downvotes: {question.downvotes}</div>
    // });
    var questions = this.props.questions.sort((a,b) => b.upvotes - a.upvotes)
    .map((question,idx)=>{
      return <Question key={idx} index={idx} question={question} />;
    })

    
    

    return (
      <div>
        <input type="text" onKeyDown={this.handleEnter}></input>
        {questions}
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions.questions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionBox);
