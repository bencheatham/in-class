import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import * as ModalActions from '../actions/userVideoModal';


class Modal extends React.Component {

  constructor(props){
    super(props);
    this.hide = this.hide.bind(this);
  };

  hide() {
    console.log('hiding')
    //this.props.actions.hide();
  };

  render() {
    const { visible } = this.props;

    return (<div>
      <Modal>
        <Modal.Header>
          <Modal.Title>Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      </div>
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
