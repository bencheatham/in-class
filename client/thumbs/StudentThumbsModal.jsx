import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Glyphicon, Table } from 'react-bootstrap';
import * as thumbActions from './actions';
import * as socket from './socket';
require('../stylesheets/sidebar.scss');

class ThumbsModal extends React.Component {

  constructor(props){
    super(props);
    this.submitThumb = this.submitThumb.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.emitThumbEvent = socket.emitThumbEvent.bind(this);
  }

  submitThumb (value){
    this.emitThumbEvent(value);  
    this.props.thumbActions.endThumbCheck();
  }

  hideModal () {
    this.props.thumbActions.hideModal();
  }

  render() {
    var displayModal = this.props.displayModal;
    return (
      <div>
      <Modal show={displayModal}>
        <Modal.Header>
          <Modal.Title>Thumb Check! How do you feel? </Modal.Title>
        </Modal.Header>
        <Modal.Body>   
        <Table condensed>
        <tbody>
        <tr>
        <td>
        <Button onClick={this.submitThumb.bind(null,'up')}>
          <Glyphicon className="thumb-icon" glyph="glyphicon glyphicon-thumbs-up" style={{color:'green'}}/>
        </Button>              
        </td>
        <td>
        <Button onClick={this.submitThumb.bind(null,'neutral')}>
          <Glyphicon className="thumb-icon neutral" glyph="glyphicon glyphicon-hand-right" style={{color:'orange'}}/>
        </Button>      
        </td>
        <td>
        <Button onClick={this.submitThumb.bind(null,'down')}>
          <Glyphicon className="thumb-icon" glyph="glyphicon glyphicon-thumbs-down" style={{color:'red'}}/>
        </Button>
        </td>
        </tr>
        </tbody>     
        </Table>   
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
    thumbActions: bindActionCreators(thumbActions,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThumbsModal);
