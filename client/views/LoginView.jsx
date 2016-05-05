import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../actions/users';
import { selectUser } from '../actions/users';
import * as UserActions from '../actions/users';
import * as VideoActions from '../modules/video/actions';
import Drawer from '../containers/Drawer';
import TeacherPanel from '../containers/TeacherPanel';
import VideoContainer from '../modules/video/containers/VideoContainer';
import * as UserModalActions from '../modules/questionModal/actions';
import * as questionModalSockets from '../modules/questionModal/socket';
import { Button } from 'react-bootstrap';
import * as UserSockets from '../users/socket';
require('../stylesheets/styles.scss');


class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = { term: '' };

    // question modal actions
    this.initQuestionModalSocket = questionModalSockets.initializeWebSockets.bind(this);
    this.emitAddNewUser = questionModalSockets.emitAddNewUser.bind(this);

    // list of user sockets call
    this.initializeWebSockets = UserSockets.initializeWebSockets.bind(this);
    this.emitGetAllUsersFromClass = UserSockets.emitGetAllUsersFromClass.bind(this);
    this.emitRemoveUserFromClass = UserSockets.emitRemoveUserFromClass.bind(this);
  }

  componentDidMount() {
    // TODO: disable the question queue for now
    // this.initQuestionModalSocket({
    //   modalActions: this.props.userModalActions,
    //   videoActions: this.props.videoActions
    // });

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
        <Drawer />
        <TeacherPanel />
        <VideoContainer />

      </div>
    );
  };
}

function mapStateToProps(state) {

  return {
    users: state.Users.users,
    username: state.Users.username,
    calledUser: state.video.calledUser,
    loginState: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
   userActions: bindActionCreators(UserActions, dispatch),
   videoActions: bindActionCreators(VideoActions, dispatch),
   userModalActions: bindActionCreators(UserModalActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
