import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MenuActions from '../actions/menu';

class Menu extends React.Component {

  show() {
    this.props.actions.show();
  }

  hide() {
    this.props.actions.hide();
  }

  render() {
    const { visibility } = this.props;
    let id = 0;

    return (
      <div>
        <div>
          <button type="button" onClick={(this.show).bind(this)}>Show</button>
          <button type="button" onClick={(this.hide).bind(this)}>Hide</button>
        </div>

        <div className="menu">
          <div id="controls" className={visibility ? " visible" : ""}>
            <ul>
              <li className="first">Questions</li>
              <li className="last">Chat</li>
            </ul>
          </div>

          <div id="panels" className={visibility ? " visible" : ""}>
            {this.props.children}
          </div>
        </div>

      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    visibility: state.menu.visibility
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
