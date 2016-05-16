import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as UserVideoModalActions from '../actions/userVideoModal';
import * as quizActions from '../quiz/actions';
import * as thumbActions from '../thumbs/actions';
import * as QuetionModalActions from '../modules/questionModal/actions';
import * as AnalyticsActions from '../modules/analytics/actions/analytics_actions';
import * as QuestionModalSockets from '../modules/questionModal/socket';
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
    this.openHandraise = this.openHandraise.bind(this);
  };

  componentWillMount() {
    this.initThumbWebSockets();
    QuestionModalSockets.initializeWebSockets.bind(this)({
      modalActions: this.props.questionModalActions,
    });
  };

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
    this.props.analyticsActions.getQuizAndAnalyze();
    //hashHistory.push('/analytics');
  };

  openHandraise() {
    this.props.questionModalActions.show();
  }

  displayThumbsButton (){
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-thumbs">Thumbs</Tooltip>}>
        <Button onClick={this.openThumbModal} className="btn-success btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />
        </Button>
      </OverlayTrigger>
    );
  };

  displayQuizButton (){
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-quiz">Quiz</Tooltip>}>
        <Button onClick={this.openQuizModal} className="btn-success btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-question-sign" />
        </Button>
      </OverlayTrigger>
    );
  };

  displayVideoButton (){
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-video">Video</Tooltip>}>
        <Button className="btn-success btn-circle btn-xl" onClick={this.showStudentVideo}>
          <Glyphicon glyph="glyphicon glyphicon-film" />
        </Button>
      </OverlayTrigger>
    );
  };

  displayAnalyticsButton (){
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-analytics">Analytics</Tooltip>}>
        <Button onClick={this.openAnalytics} className="btn-success btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-signal" />
        </Button>
      </OverlayTrigger>
    );
  };

  displayHandraise() {
    let handraiseUsers = this.props.handraiseUsers;
    if (!handraiseUsers || handraiseUsers.length <= 0) return;

    return (
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-notification">Notification</Tooltip>}>
        <Button onClick={this.openHandraise} className="btn-danger btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon glyphicon-flag" />
        </Button>
      </OverlayTrigger>
    );
  };

  render() {
    return(
      <div className="TeacherControlPanel">
        {this.displayVideoButton()}
        {this.displayThumbsButton()}
        {this.displayQuizButton()}
        {this.displayAnalyticsButton()}
        {this.displayHandraise()}

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
    handraiseUsers: state.questionModal.users,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    userVideoModalActions: bindActionCreators(UserVideoModalActions, dispatch),
    quizActions: bindActionCreators(quizActions, dispatch),
    thumbActions: bindActionCreators(thumbActions, dispatch),
    questionModalActions: bindActionCreators(QuetionModalActions, dispatch),
    analyticsActions: bindActionCreators(AnalyticsActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherPanel);
