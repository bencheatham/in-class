import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button } from 'react-bootstrap';
import * as ModalActions from '../actions/userVideoModal';

class UserVideoModal extends React.Component {

  constructor(props){
    super(props);
    this.hide = this.hide.bind(this);
  };

  hide() {
    this.props.actions.hide();
  };

  render() {
    const { visible } = this.props;

    return (
      <Modal show={visible} onBlur={this.hide} >
        <Modal.Header>
          <Modal.Title>User Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Person A</li>
            <li>Person B</li>
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
    visible: state.userVideoModal.visible
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
)(UserVideoModal);
