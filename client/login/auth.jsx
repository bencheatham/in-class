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
      var freeRoutes = ['/','sign-in','sign-out','sign-up','about'];
      var requireAuth = (freeRoutes.indexOf(this.props.location.pathname) === -1);
      if (!this.props.authenticated && requireAuth){
        this.props.actions.checkAuth();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.user.authenticated, username: state.user.username };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({checkAuth}, dispatch)
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}