require('../stylesheets/styles.scss');

import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';


import { show } from '../actions/userVideoModal';
import UserVideoModal from './UserVideoModal';

class TeacherPanel extends React.Component {

  constructor(props) {
    super(props);
    this.showStudentVideo = this.showStudentVideo.bind(this);
  };

  showStudentVideo() {
    this.props.dispatch(show());
  };

  render() {
    return(
      <div className="TeacherControlPanel">
        <Button className="btn-success btn-circle btn-xl"
            onClick={this.showStudentVideo}>
           <Glyphicon glyph="glyphicon glyphicon-film" />
        </Button>
        <Button className="btn-danger btn-circle btn-xl">
           <Glyphicon glyph="glyphicon glyphicon-question-sign" />
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
