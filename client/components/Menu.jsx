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

    return (
      <div className="menu">
        <button type="button" onClick={(this.show).bind(this)}>Show</button>
        <button type="button" onClick={(this.hide).bind(this)}>Hide</button>

        <div className={ visibility ? "visibility" : ""}>
          {this.props.children}
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
