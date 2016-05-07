import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import TeacherQuiz from './TeacherQuiz';

class TeacherQuizModal extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
      <Modal show={false}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TeacherQuiz />
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
    displayModal: state.quiz.displayModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherQuizModal);
