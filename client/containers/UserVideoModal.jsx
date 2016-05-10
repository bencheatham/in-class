import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Glyphicon } from 'react-bootstrap';
import * as ModalActions from '../actions/userVideoModal';
import * as VideoActions from '../modules/video/actions';

require('../stylesheets/userVideoModal.scss');

class UserVideoModal extends React.Component {

  constructor(props){
    super(props);

    this.hide = this.hide.bind(this);
    this.teacherVideoCallUser = this.teacherVideoCallUser.bind(this);
    this.getUserList = this.getUserList.bind(this);

    this.startClass = this.startClass.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.videoCallUser = this.videoCallUser.bind(this);
    this.getUserVideo = this.getUserVideo.bind(this);
    this.getStartClassButton = this.getStartClassButton.bind(this);
  };

  hide() {
    this.props.actions.hide();
  };

  teacherVideoCallUser(user){
    const videoActions = this.props.videoActions;

    let ball = {
      teacherSelectedUser: user,
      teacherName: this.props.username,
    };

    videoActions.teacherSelectStudentVideo(ball);

    setTimeout(this.hide, 1500);
  }

  makeCall(user) {
    if (!window.phone) {
      alert("Login First!");
    } else {
      window.phone.dial(user);
    }
  }

  videoCallUser(user){
    const videoActions = this.props.videoActions;

    let ball = {
      calledUser: user,
      callingUser: this.props.username
    };

    videoActions.userCallUser(ball);
    this.makeCall(user);
  }

  // TODO need to investigate, it's fairly buggy
  startClass() {
    let users = this.props.userState.users;
    let currentUser = this.props.userState.username;

    users.forEach((user) => {
      if(currentUser === user) return;
      this.videoCallUser(user);
    });
    this.hide();
  };

  getStartClassButton() {
    let users = this.props.userState.users;
    if(!users || users.length === 0) return;

    return (
      <Button bsStyle="success" onClick={this.startClass}>Start Class</Button>
    );
  };

  getUserVideo(user) {
    let currentUser = this.props.userState.username;
    let videos = this.props.videoState.videos;

    // shouldn't make a call to yourself
    if (user === currentUser) return;

    // if (videos[user]) {
    //   this.props.videoActions.switchVideoByUsername(user);
    // } else {
    //   this.videoCallUser(user);
    // }

    this.videoCallUser(user);
    this.hide();
  };

  getUserList() {
    let users = this.props.userState.users;
    if (!users || users.length === 0) {
      return (<div>Room is empty...</div>);
    }

    return users.map((user) => {
      return (
        <li key={user} className="list-group-item" onClick={this.getUserVideo.bind(this, user)}>
          <span className="userIcon"><Glyphicon glyph="glyphicon glyphicon-user" /></span>
          <span className="userId">{user}</span>
        </li>
      )
    });
  };


  render() {
    const { visible } = this.props;
    return (
      <Modal show={visible}>
        <Modal.Header>
          <Modal.Title>User Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {this.getUserList()}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hide}>Close</Button>
          {this.getStartClassButton()}
        </Modal.Footer>
      </Modal>
    );
  };
};

function mapStateToProps(state) {
  return {
    visible: state.userVideoModal.visible,
    session: state.video.videoSession,
    username: state.Users.username,
    userState: state.Users,
    videoState: state.video
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch),
    videoActions: bindActionCreators(VideoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserVideoModal);
