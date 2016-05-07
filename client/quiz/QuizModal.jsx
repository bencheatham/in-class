import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import StudentQuiz from './StudentQuiz';

class QuizModal extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    var quiz = this.props.storedQuizzes;
    var status = 1;
    return (
      <div>
      <Modal show={false}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
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
    displayModal: state.studentQuiz.displayModal,
    storedQuizzes: state.studentQuiz.storedQuizzes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizModal);
