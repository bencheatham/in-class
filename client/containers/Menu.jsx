import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MenuActions from '../actions/menu';

import Quiz from '../components/Quiz';

class Menu extends React.Component {
  show() {
    this.props.actions.show();
  }

  hide() {
    this.props.actions.hide();
  }

  toggle() {
    if (this.props.visibility) {
      this.hide();
    } else {
      this.show();
    }
  }

  display(id) {
    const { actions } = this.props;
    console.log('id', {id});
    console.log('this', this);
  }

  render() {
    const { actions, visibility, panel } = this.props;

    const PANEL_QUIZ = 'PANEL_QUIZ';
    const PANEL_THUMB = 'PANEL_THUMB';

    let id = 0;

    return (
      <div>
        <div className="menu">
          <div id="controls" className={visibility ? " visible" : ""}>
            <ul>
              <li className="first" onClick={() => actions.display(PANEL_QUIZ) }> Quiz </li>
              <li className="last" onClick={() => actions.display(PANEL_THUMB) }> Chat </li>
            </ul>
          </div>

          <div id="panels" className={visibility ? " visible" : ""}>
            <div style={{display: panel === PANEL_QUIZ ? '' : 'none'}}><Quiz/></div>
            <div style={{display: panel === PANEL_THUMB ? '' : 'none'}}>Thumbs</div>
          </div>
        </div>

      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    visibility: state.menu.visibility,
    panel: state.menu.panel
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MenuActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
