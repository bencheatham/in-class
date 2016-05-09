import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentPanel from '../containers/StudentPanel';
import Header from '../login/Header'; 
import QuizModal from '../quiz/QuizModal';
import { initializeWebSockets as initThumbWebSockets } from '../thumbs/socket';
import { initializeWebSockets as initQuizWebSockets } from '../quiz/socket';
import * as quizActions from '../quiz/actions';
import * as thumbActions from '../thumbs/actions';
import StudentThumbsModal from '../thumbs/StudentThumbsModal';
import Drawer from '../containers/Drawer';

class StudentClassview extends Component {

  constructor(props) {
    super(props);
    this.initThumbWebSockets = initThumbWebSockets.bind(this);
    this.initQuizWebSockets = initQuizWebSockets.bind(this);
  }

  componentWillMount () {
    this.initThumbWebSockets();
    this.initQuizWebSockets();
  }

  render() {

    return (
      <div>
        <Header />
        <StudentPanel />
        <QuizModal />
        <StudentThumbsModal />
        <Drawer />
      </div>
    );

  };
}

function mapStateToProps(state) {

  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    quizActions: bindActionCreators(quizActions,dispatch),
    thumbActions: bindActionCreators(thumbActions,dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentClassview);



