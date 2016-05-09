import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../login/Header';
import TeacherPanel from '../containers/TeacherPanel';
import TeacherQuizModal from '../quiz/TeacherQuizModal';
import { initializeWebSockets as initThumbWebSockets } from '../thumbs/socket';
import { initializeWebSockets as initQuizWebSockets } from '../quiz/socket';
import Drawer from '../containers/Drawer';

class TeacherClassview extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
  }

  render () {
    return (
      <div>
        <Header />
        <TeacherPanel />
        <TeacherQuizModal />
        <Drawer />
      </div>
    );
  };
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassview);



