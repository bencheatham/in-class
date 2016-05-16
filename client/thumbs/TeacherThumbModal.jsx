import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button,Glyphicon, Table } from 'react-bootstrap';
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
          <Modal.Title>Results from your thumb check!</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Table>
        <tbody>
        <tr>
        <td>
          <Glyphicon className="thumb-icon" glyph="glyphicon glyphicon-thumbs-up" style={{color:'green'}} />            
            {this.props.thumbResults.up}
        </td>
        <td>
          <Glyphicon className="thumb-icon" glyph="glyphicon glyphicon-hand-right" style={{color:'orange'}}/>
            {this.props.thumbResults.neutral} 
        </td>
        <td>
          <Glyphicon className="thumb-icon" glyph="glyphicon glyphicon-thumbs-down" style={{color:'red'}}/>
            {this.props.thumbResults.down} 
        </td>
        </tr>
        </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
         <Button onClick={this.props.thumbActions.resetThumbResults} bsStyle="warning" bsSize="small">Reset</Button>
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
    thumbResults: state.thumbsReducer.thumbResults
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
