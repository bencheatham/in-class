import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Glyphicon } from 'react-bootstrap';
import * as ModalActions from '../actions/userVideoModal';
import * as VideoActions from '../modules/video/actions';


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

  startClass() {
    let users = this.props.userState.users;
    let currentUser = this.props.userState.username;

    users.forEach((user) => {
      if(currentUser === user) return;
      this.videoCallUser(user);
    });
  };

  getUserVideo(user) {
    let currentUser = this.props.userState.username;
    let videos = this.props.videoState.videos;
    if (videos[user] && currentUser !== user) {
      this.props.videoActions.switchVideoByUsername(user);
    }
  };

  getUserList() {
    let users = this.props.userState.users;
    if (!users) return;
    return users.map((user) => {
      return (
        <li className="list-group-item" onClick={this.getUserVideo.bind(this, user)}>
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
          <Button bsStyle="success" onClick={this.startClass}>Start Class</Button>
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
