import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { show } from '../actions/userVideoModal';
import * as thumbActions from '../thumbs/actions';
import * as quizActions from '../quiz/actions';
import QuizModal from '../quiz/QuizModal';
import StudentThumbsModal from '../thumbs/StudentThumbsModal';
import TeacherQuizModal from '../quiz/TeacherQuizModal';

import { bindActionCreators } from 'redux'
require('../stylesheets/styles.scss');

class StudentPanel extends React.Component {

  constructor(props) {
    super(props);
    this.displayModal = this.displayModal.bind(this);
    this.displayTeacherThumbButton = this.displayTeacherThumbButton.bind(this);
    this.displayThumb = this.displayThumb.bind(this);
  };

  displayQuiz(){
    // this.props.quizActions.displayQuiz();
  }

  displayThumb(){
    this.props.thumbActions.beginThumbCheck();
  }

  displayStudentThumbButton(){
    if (this.props.thumbCheck !== true){
      return (
        <Button onClick={this.displayThumb} className="btn-warning btn-circle btn-xl">
             <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />
        </Button>
      );
    }
  }

  displayTeacherThumbButton(){
    // if (this.props.thumbCheck !== true){
      return (
        <Button onClick={this.displayThumb}>
             <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />
        </Button>
      );
    //}
  }

  displayThumbCheckMessage () {
  }

  displayQuizButton(){
    //if (!(this.props.storedQuizzes.length > 0)){
      return (
        <Button className="btn-warning btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-question-sign" />
        </Button>
      )
    //}
  }

  displayModal(){
    return (<div>
        <StudentThumbsModal />
        <QuizModal />
        <TeacherQuizModal />
      </div>
    );
  }
  render() {
    

    return(
      <div>
        {this.displayModal()}
        {this.displayStudentThumbButton()}
        {this.displayQuizButton()}
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    thumbCheck: state.thumbsReducer.thumbCheck,
    storedQuizzes: state.studentQuiz.storedQuizzes,
  };
};

function mapDispatchToProps(dispatch){
  return {
    thumbActions: bindActionCreators(thumbActions,dispatch),
    quizActions: bindActionCreators(quizActions,dispatch)  
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(StudentPanel);
