import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Glyphicon } from 'react-bootstrap';
import * as ModalActions from '../actions/userVideoModal';
import * as VideoActions from '../modules/video/actions';
import * as VideoService from '../modules/video/api/service';
require('../stylesheets/userListModal.scss');

class UserVideoModal extends React.Component {

  constructor(props){
    super(props);

    this.hide = this.hide.bind(this);
    this.getUserList = this.getUserList.bind(this);

    this.startClass = this.startClass.bind(this);
    this.videoCallUser = this.videoCallUser.bind(this);
    this.getUserVideo = this.getUserVideo.bind(this);
    this.getStartClassButton = this.getStartClassButton.bind(this);

    this.makeCall = VideoService.makeCall.bind(this);
  };

  hide() {
    this.props.actions.hide();
  };

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

    this.videoCallUser(user);
    this.hide();
  };

  getUserList() {
    let users = this.props.userState.users;
    let currentUser = this.props.userState.username;

    if (!users || users.length <= 1) {
      return (<div>Room is empty...</div>);
    }

    return users.map((user) => {
      if (user === currentUser) return;
      return (
        <li key={user} className="list-group-item" onClick={this.getUserVideo.bind(this, user)}>
          <span className="userIcon"><Glyphicon glyph="glyphicon glyphicon-user" /></span>
          <span className="userId">{user}</span>
        </li>
      )
    });
  };

  render() {

    function renderCurrentUser(){
      let currentUser = this.props.username;
      return (<strong>Current Login: {currentUser}</strong>);
    };

    const { visible } = this.props;
    return (
      <Modal show={visible}>
        <Modal.Header>
          <Modal.Title>User Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderCurrentUser.bind(this)()}
          <ul className="userList">
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
    username: state.user.username,
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
