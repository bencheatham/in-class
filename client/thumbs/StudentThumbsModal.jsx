import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button,Glyphicon } from 'react-bootstrap';
import * as thumbActions from './actions';
import * as socket from './socket';

class ThumbsModal extends React.Component {

  constructor(props){
    super(props);
    this.submitThumb = this.submitThumb.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.emitThumbEvent = socket.emitThumbEvent.bind(this);
  }

  submitThumb (value){
    this.emitThumbEvent(value);  
  }

  hideModal () {
    this.props.actions.hideModal();
  }

  render() {
    var displayModal = this.props.displayModal;
    return (
      <div>
      <Modal show={displayModal}>
        <Modal.Header>
          <Modal.Title>How are you feeling? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        <Button onClick={() => this.submitThumb('up')}>
          <Glyphicon className="glyphicon glyphicon-thumbs-up" />
        </Button>
        </div>
        <div>
        <Button onClick={() => this.submitThumb('neutral')}>
          <Glyphicon className="glyphicon glyphicon-hand-right" />
        </Button>
        </div>
        <div>
        <Button onClick={() => this.submitThumb('down')} value="down">
          <Glyphicon className="glyphicon glyphicon-thumbs-down" />
        </Button>
        </div>

        </Modal.Body>
        <Modal.Footer>
         <Button onClick={this.hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    displayModal: state.thumbsReducer.displayModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(thumbActions,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThumbsModal);
