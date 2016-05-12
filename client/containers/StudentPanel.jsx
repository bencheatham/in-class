import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap';
import { show } from '../actions/userVideoModal';
import * as thumbActions from '../thumbs/actions';
import * as quizActions from '../quiz/actions';
import * as QuestionModalSockets from '../modules/questionModal/socket';
import * as QuestionModalActions from '../modules/questionModal/actions';
import QuizModal from '../quiz/QuizModal';
import StudentThumbsModal from '../thumbs/StudentThumbsModal';
import TeacherQuizModal from '../quiz/TeacherQuizModal';
import { bindActionCreators } from 'redux'
require('../stylesheets/styles.scss');

class StudentPanel extends React.Component {

  constructor(props) {
    super(props);
    this.displayModal = this.displayModal.bind(this);
    this.openThumbModal = this.openThumbModal.bind(this);
    this.openQuizModal = this.openQuizModal.bind(this);
    this.emitHandraiseUser = this.emitHandraiseUser.bind(this);

    // socket calls for QuestionModal
    this.emitAddNewUser = QuestionModalSockets.emitAddNewUser.bind(this);
  };

  componentWillMount() {
    QuestionModalSockets.initializeWebSockets.bind(this)({
      modalActions: this.props.questionModalActions,
    });
  }

  openQuizModal(){
    this.props.quizActions.openStudentQuizModal();
  }

  openThumbModal(){
    this.props.thumbActions.beginThumbCheck();
  }

  displayThumbButton(){
    var thumbCheckReady = this.props.thumbCheck;

    if (thumbCheckReady){
      return (
        <Button onClick={this.openThumbModal} className="btn-warning btn-circle btn-xl">
             <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />
        </Button>
      );
    }
  }

  displayQuizButton(){
    var quizLive = this.props.quizLive;
    if (quizLive){
      return (
        <Button onClick={this.openQuizModal}  className="btn-warning btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-question-sign" />
        </Button>
      )
    }
  }

  displayModal(){
    // return (<div>
    //     <StudentThumbsModal />
    //     <QuizModal />
    //     <TeacherQuizModal />
    //   </div>
    // );
  }

  emitHandraiseUser() {
    let username = this.props.username;
    this.emitAddNewUser(username);
  };

  displayHandraise() {
    return (
      <OverlayTrigger trigger="click" rootClose placement="top" overlay={
          <Popover title="Notification Sent!"></Popover>
        }>
        <Button onClick={this.emitHandraiseUser} className="btn-danger btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-flag" />
        </Button>
      </OverlayTrigger>

    );
  }

  render() {
    return(
      <div className="TeacherControlPanel">
        {this.displayHandraise()}
        {this.displayThumbButton()}
        {this.displayQuizButton()}
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    thumbCheck: state.thumbsReducer.thumbCheck,
    storedQuizzes: state.studentQuiz.storedQuizzes,
    quizLive: state.studentQuiz.quizLive,
    username: state.user.username,
  };
};

function mapDispatchToProps(dispatch){
  return {
    thumbActions: bindActionCreators(thumbActions,dispatch),
    quizActions: bindActionCreators(quizActions,dispatch),
    questionModalActions: bindActionCreators(QuestionModalActions, dispatch)
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(StudentPanel);
