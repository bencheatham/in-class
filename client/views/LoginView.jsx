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
    this.videoCallUser = this.videoCallUser.bind(this);

    this.initQuestionModalSocket = questionModalSockets.initializeWebSockets.bind(this);
    this.emitAddNewUser = questionModalSockets.emitAddNewUser.bind(this);
    this.addUserToUserModal = this.addUserToUserModal.bind(this);
  }

  componentDidMount() {
    this.initQuestionModalSocket(this.props.userModalActions);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });

  }

  onFormSubmit(event) {
    const userActions = this.props.userActions;

    event.preventDefault();
    userActions.userLogin(this.state.term);
  }

  videoCallUser(user){
    const videoActions = this.props.videoActions;

    let ball = {
      calledUser: user,
      callingUser: this.props.username
    };

    videoActions.userCallUser(ball);
  }


  renderUserList(users) {
   console.log('HEREERERE', users)
    return users.map((user) => {
      return (
        <li
          key={user}
          onClick={() => this.videoCallUser(user)}
          className="list-group-item user-video-link">
          {user} Joined the Class.</li>
      );
    });
  };

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

        <ul>
          {this.renderUserList(this.props.users)}
        </ul>
        <div>
          <button onClick={this.addUserToUserModal}>Post Question</button>

          <Drawer />
          <TeacherPanel />
          <VideoContainer username={this.props.username} />
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {

  return {
    users: state.Users.users,
    username: state.Users.username,
    calledUser: state.video.calledUser
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
