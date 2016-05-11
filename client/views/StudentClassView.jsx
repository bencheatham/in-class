import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentPanel from '../containers/StudentPanel';
import Header from '../login/Header';
import QuizModal from '../quiz/QuizModal';
import { initializeWebSockets as initThumbWebSockets } from '../thumbs/socket';
import { initializeWebSockets as initQuizWebSockets } from '../quiz/socket';
import * as quizActions from '../quiz/actions';
import * as thumbActions from '../thumbs/actions';
import StudentThumbsModal from '../thumbs/StudentThumbsModal';
import Drawer from '../containers/Drawer';
import * as UserSockets from '../users/socket';
import * as UserActions from '../actions/users';
import VideoContainer from '../modules/video/containers/VideoContainer';


class StudentClassview extends Component {

  constructor(props) {
    super(props);
    this.initThumbWebSockets = initThumbWebSockets.bind(this);
    this.initQuizWebSockets = initQuizWebSockets.bind(this);

    // list of user sockets call
    this.initializeWebSockets = UserSockets.initializeWebSockets.bind(this);
    this.emitGetAllUsersFromClass = UserSockets.emitGetAllUsersFromClass.bind(this);
    this.emitRemoveUserFromClass = UserSockets.emitRemoveUserFromClass.bind(this);
  }

  componentDidMount() {
    this.initThumbWebSockets();
    this.initQuizWebSockets();
    this.initializeWebSockets({
      userActions: this.props.userActions
    });

    let username = this.props.loginState.username;
    this.props.userActions.userLogin(username);
    this.emitGetAllUsersFromClass();

    window.addEventListener('beforeunload', () => {
      let username = this.props.loginState.username;
      this.emitRemoveUserFromClass(username);
    });
  };

  componentWillUnmount() {
    window.addEventListener('beforeunload', () => {
      let username = this.props.loginState.username;
      this.removeEventListener('beforeunload');
    });
  };



  render() {
    return (
      <div>
        <Header />
        <div>
            <VideoContainer />
        </div>

        <StudentPanel />
        <QuizModal />
        <StudentThumbsModal />
        <Drawer />
      </div>
    );

  };
}

function mapStateToProps(state) {
  return {
    loginState: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    quizActions: bindActionCreators(quizActions,dispatch),
    thumbActions: bindActionCreators(thumbActions,dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentClassview);
