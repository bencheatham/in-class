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
    this.renderTitle = this.renderTitle.bind(this);
  }

  hideModal (){
    this.props.actions.closeStudentQuizModal();
  }
  renderTitle () {
    if (this.props.storedQuizzes.teachername){
     return this.props.storedQuizzes.quiz.title;  
    }
  }

  render() {
    var displayModal = this.props.displayModal;
    
    return (
      <div>
      <Modal show={displayModal}>
        <Modal.Header>
          <Modal.Title>{this.renderTitle()}</Modal.Title>
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
    storedQuizzes: state.studentQuiz.storedQuizzes,
    status: state.studentQuiz.status,

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
