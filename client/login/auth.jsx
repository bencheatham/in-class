import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'
import { checkAuth } from './actions'
import {bindActionCreators} from 'redux'

export default function(ComposedComponent) {
  
  class Authentication extends Component {
    static contextTypes () {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.actions.checkAuth();
        // hashHistory.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.actions.checkAuth();
        // hashHistory.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.user.authenticated };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({checkAuth}, dispatch)
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}