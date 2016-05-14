import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../login/Header';
import TeacherPanel from '../containers/TeacherPanel';
import TeacherQuizModal from '../quiz/TeacherQuizModal';
import * as quizActions from '../quiz/actions';
import Drawer from '../containers/Drawer';
import TeacherDrawer from '../containers/TeacherDrawer';

import * as UserSockets from '../users/socket';
import * as UserActions from '../actions/users';
import VideoContainer from '../modules/video/containers/VideoContainer';
import AnalyticsContainer from '../modules/analytics/containers/analytics_container';

class TeacherClassview extends Component {

  constructor(props) {
    super(props);
    // list of user sockets call
    this.initializeWebSockets = UserSockets.initializeWebSockets.bind(this);
    this.emitGetAllUsersFromClass = UserSockets.emitGetAllUsersFromClass.bind(this);
    this.emitRemoveUserFromClass = UserSockets.emitRemoveUserFromClass.bind(this);
  }

  componentDidMount() {
    this.initializeWebSockets({
      userActions: this.props.userActions
    });

    let username = this.props.loginState.username;
    if (username){
      this.props.userActions.userLogin(username);
      this.emitGetAllUsersFromClass();
    }
    
    window.addEventListener('beforeunload', () => {
      let username = this.props.loginState.username;
      this.emitRemoveUserFromClass(username);
    });
  };

  componentWillUnmount() {
    window.addEventListener('beforeunload', () => {
      let username = this.props.loginState.username;
      this.removeEventListener('beforeunload');
    });
  };

  render () {
    return (
      <div>
        <Header />
        <div>
            <VideoContainer />
        </div>

        <TeacherPanel />
        <TeacherQuizModal />
        <TeacherDrawer />
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    loginState: state.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
   userActions: bindActionCreators(UserActions, dispatch),
   quizActions: bindActionCreators(quizActions,dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassview);
