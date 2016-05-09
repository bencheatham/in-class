import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import StudentQuiz from './StudentQuiz';
import * as quizActions from './actions';

class QuizModal extends React.Component {

  constructor(props){
    super(props);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal (){
    this.props.actions.closeStudentQuizModal();
  }

  render() {
    var displayModal = this.props.displayModal;
    // var quiz = this.props.storedQuizzes;
    var status = 1;
    return (
      <div>
      <Modal show={displayModal}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <StudentQuiz />
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
    displayModal: state.studentQuiz.displayModal,
    storedQuizzes: state.studentQuiz.storedQuizzes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(quizActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizModal);
