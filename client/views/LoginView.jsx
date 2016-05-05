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
require('../stylesheets/styles.scss');


class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.initQuestionModalSocket = questionModalSockets.initializeWebSockets.bind(this);
    this.emitAddNewUser = questionModalSockets.emitAddNewUser.bind(this);
    this.addUserToUserModal = this.addUserToUserModal.bind(this);

    this.initializeWebSockets = UserActions.initializeWebSockets.bind(this);
  }

  componentDidMount() {
    this.initQuestionModalSocket({
      modalActions: this.props.userModalActions,
      videoActions: this.props.videoActions
    });
    console.log('here 0.5');

    this.initializeWebSockets({
      userActions: this.props.userActions
    });
    console.log('here 0');

    // TODO make a socket call to inform others you're online
    let username = this.props.loginState.username;
    console.log('here 1');
    this.props.userActions.userLogin(username);
    console.log('here 2');
    this.props.userActions.getOnlineUsers();
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    const userActions = this.props.userActions;

    event.preventDefault();
    userActions.userLogin(this.state.term);
  }

  addUserToUserModal() {
    if (!this.props.username.trim()) return;
    this.emitAddNewUser(this.props.username);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Username"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>

        <div>
          <VideoContainer username={this.props.username} />
        </div>

        <Drawer />
        <TeacherPanel />

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
