import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button } from 'react-bootstrap';
import * as ModalActions from '../actions/userVideoModal';
import * as VideoActions from '../modules/video/actions';


class UserVideoModal extends React.Component {

  constructor(props){
    super(props);

    this.hide = this.hide.bind(this);
    this.teacherVideoCallUser = this.teacherVideoCallUser.bind(this);
  };

  hide() {
    console.log('hiding')
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


  render() {
    const { visible } = this.props;

    return (
      <Modal show={visible} onBlur={this.hide} >
        <Modal.Header>
          <Modal.Title>User Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li
              key={"Fred"}
              onClick={() => this.teacherVideoCallUser("Fred")}
              className="list-group-item">
              Fred</li>
            <li              
              key={"Mary"}
              onClick={() => this.teacherVideoCallUser("Mary")}
              className="list-group-item">
              Mary</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
};

function mapStateToProps(state) {
  return {
    visible: state.userVideoModal.visible,
    session: state.video.videoSession,
    username: state.Users.username
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
