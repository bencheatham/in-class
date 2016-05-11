import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DrawerActions from '../actions/drawer';
import Quiz from '../components/Quiz';
require('../stylesheets/drawer.scss');
import QuestionContainer from '../question/container';
import ChatBox from '../chat/ChatBox';
import AnalyticsContainer from '../modules/analytics/containers/analytics_container';
import AnalyticsDrawerContainer from '../modules/analytics/containers/AnalyticsDrawerContainer';


class TeacherDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
  }

  hide() {
    this.props.actions.hide();
  }

  render() {
    const { actions, visibility, panel } = this.props;

    const PANEL_QUIZ = 'PANEL_QUIZ';
    const PANEL_CHAT = 'PANEL_CHAT';
    const PANEL_THUMB = 'PANEL_THUMB';
    const PANEL_QUESTIONS = 'PANEL_QUESTIONS';
    const PANEL_ANALYTICS = 'PANEL_ANALYTICS';

    let id = 0;

    return (
      <div>
        <div className="drawer">
          <div id="controls" className={visibility ? " visible" : ""}>
            <ul>
              <li onClick={() => actions.display(PANEL_CHAT) }> Chat </li>
              <li onClick={() => actions.display(PANEL_QUESTIONS) }> Questions </li>
              <li onClick={() => actions.display(PANEL_ANALYTICS) }> Analytics </li>
            </ul>
          </div>

          <div id="panels" className={visibility ? " visible" : ""}>
            <div style={{display: panel === PANEL_CHAT ? '' : 'none'}}><ChatBox/></div>
            <div style={{display: panel === PANEL_QUESTIONS ? '' : 'none'}}><QuestionContainer/></div>
            <div style={{display: panel === PANEL_ANALYTICS ? '' : 'none'}}><AnalyticsDrawerContainer/></div>
          </div>
        </div>

      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    visibility: state.drawer.visibility,
    panel: state.drawer.panel
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DrawerActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDrawer);
