import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import * as UserVideoModalActions from '../actions/userVideoModal';
import * as quizActions from '../quiz/actions';
import * as thumbActions from '../thumbs/actions';
import QuestionModal from '../modules/questionModal/QuestionModal';
import UserVideoModal from './UserVideoModal';
import TeacherThumbModal from '../thumbs/TeacherThumbModal';
import { emitThumbCheck, initializeWebSockets as initThumbWebSockets} from '../thumbs/socket'
import { hashHistory } from 'react-router';

require('../stylesheets/styles.scss');

class TeacherPanel extends React.Component {

  constructor(props) {
    super(props);
    this.showStudentVideo = this.showStudentVideo.bind(this);
    this.openQuizModal = this.openQuizModal.bind(this);
    this.openThumbModal = this.openThumbModal.bind(this);
    this.displayThumbsButton = this.displayThumbsButton.bind(this);
    this.displayQuizButton = this.displayQuizButton.bind(this);
    this.displayVideoButton = this.displayVideoButton.bind(this);
    this.emitThumbCheck = emitThumbCheck.bind(this);
    this.initThumbWebSockets = initThumbWebSockets.bind(this);
    this.openAnalytics = this.openAnalytics.bind(this);
  };

  componentWillMount() {
    this.initThumbWebSockets();
  }
  showStudentVideo() {
    this.props.userVideoModalActions.show();
  };

  openQuizModal() {
    this.props.quizActions.openTeacherQuizModal();
  };

  openThumbModal() {
    this.emitThumbCheck(this.props.username);
  };

  openAnalytics() {
    hashHistory.push('/analytics');
  };

  displayThumbsButton (){
    return (
      <Button onClick={this.openThumbModal} className="btn-success btn-circle btn-xl">
        <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />
      </Button>
    );
  }

  displayQuizButton (){
    return (
      <Button onClick={this.openQuizModal} className="btn-success btn-circle btn-xl">
        <Glyphicon glyph="glyphicon glyphicon-question-sign" />
      </Button>
    );
  }

  displayVideoButton (){
    return (
      <Button className="btn-success btn-circle btn-xl" onClick={this.showStudentVideo}>
        <Glyphicon glyph="glyphicon glyphicon-film" />
      </Button>
    );
  }

  displayAnalyticsButton (){
    return (
      <Button onClick={this.openAnalytics} className="btn-success btn-circle btn-xl">
        <Glyphicon glyph="glyphicon glyphicon-signal" />
      </Button>
    );
  }

  render() {
    return(
      <div className="TeacherControlPanel">
        {this.displayVideoButton()}
        {this.displayThumbsButton()}
        {this.displayQuizButton()}
        {this.displayAnalyticsButton()}
        <UserVideoModal />
        <QuestionModal />
        <TeacherThumbModal />
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    userVideoState: state.userVideoModal,
    username: state.user.username,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    userVideoModalActions: bindActionCreators(UserVideoModalActions, dispatch),
    quizActions: bindActionCreators(quizActions, dispatch),
    thumbActions: bindActionCreators(thumbActions, dispatch),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherPanel);
