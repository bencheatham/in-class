import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { show } from '../actions/userVideoModal';
import * as QuestionModalActions from '../modules/questionModal/actions';

import QuestionModal from '../modules/questionModal/QuestionModal';
import UserVideoModal from './UserVideoModal';

require('../stylesheets/styles.scss');

class TeacherPanel extends React.Component {

  constructor(props) {
    super(props);
    this.showStudentVideo = this.showStudentVideo.bind(this);
    this.showQuestionModal = this.showQuestionModal.bind(this);
  };

  showStudentVideo() {
    this.props.dispatch(show());
  };

  showQuestionModal() {
    this.props.dispatch(QuestionModalActions.show());
  };

  // TODO remove question modal for later
  render() {
    return(
      <div className="TeacherControlPanel">
        <Button className="btn-success btn-circle btn-xl"
            onClick={this.showStudentVideo}>
           <Glyphicon glyph="glyphicon glyphicon-film" />
        </Button>

        <UserVideoModal />
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    userVideoState: state.userVideoModal
  };
};

export default connect(
  mapStateToProps
)(TeacherPanel);
