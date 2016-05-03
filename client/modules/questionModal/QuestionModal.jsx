import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Glyphicon } from 'react-bootstrap';
import * as ModalActions from './actions';


class QuestionModal extends React.Component {

  constructor(props){
    super(props);
    this.hide = this.hide.bind(this);
    this.getUserList = this.getUserList.bind(this);
  };

  hide() {
    this.props.actions.hide();
  };

  getUserList(){
    let users = this.props.users;
    return users.map((user) => {
      return (
        <li>
          <Glyphicon glyph="glyphicon glyphicon-user" />
          {user}
        </li>
      );
    });
  };

  render() {
    const { visible } = this.props;

    return (
      <Modal id="UserVideoModal" show={visible} onHide={this.hide}>
        <Modal.Header>
          <Modal.Title>Upcoming Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Next:</h4>
          <ol>
            {this.getUserList()}
          </ol>
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
