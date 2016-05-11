import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import TeacherQuiz from './TeacherQuiz';
import * as quizActions from './actions';

class TeacherQuizModal extends React.Component {

  constructor(props){
    super(props);
    this.hideModal = this.hideModal.bind(this);
  }
  
  hideModal (){
    this.props.actions.closeQuizModal();
  }

  render() {
    var displayModal = this.props.displayModal;
    return (
      <div>
      <Modal show={displayModal}>
        <Modal.Header>
          <Modal.Title>Your Saved Quizzes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TeacherQuiz />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideModal}>Add quiz</Button>
          <Button onClick={this.hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    displayModal: state.teacherQuiz.displayModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(quizActions,dispatch)
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherQuizModal);
