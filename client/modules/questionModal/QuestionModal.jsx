import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Glyphicon } from 'react-bootstrap';
import * as ModalActions from './actions';
import * as ModalSockets from './socket';

require('../../stylesheets/questionModal.scss');

class QuestionModal extends React.Component {
  constructor(props){
    super(props);
    this.hide = this.hide.bind(this);
    this.getUserList = this.getUserList.bind(this);
    this.getNextUser = this.getNextUser.bind(this);
  };

  hide() {
    this.props.actions.hide();
  };

  getNextUser() {
    ModalSockets.dequeueUser();
  };

  getUserList(){
    let users = this.props.users;
    
    if (!users) return;
    return users.map((user) => {
      return (
        <div className="user">
          <span className="userIcon"><Glyphicon glyph="glyphicon glyphicon-user" /></span>
          <span className="userName">{user}</span>
        </div>
      );
    });
  };

  getNextButton(){
    // TODO if teacher view -> return 'next'; else, return nothing;
    return (
      <Button bsStyle="primary" onClick={this.getNextUser}>Next</Button>
    );
  }

  render() {
    const { visible } = this.props;

    return (
      <Modal className="question_modal" show={visible} onHide={this.hide}>
        <Modal.Header>
          <Modal.Title>Upcoming Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Next:</h4>
          <div>
            {this.getUserList()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hide}>Close</Button>
          {this.getNextButton()}
        </Modal.Footer>
      </Modal>
    );
  };
};

function mapStateToProps(state) {
  return {
    visible: state.questionModal.visible,
    users: state.questionModal.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionModal);
