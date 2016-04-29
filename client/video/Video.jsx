import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../question/actions';

class Video extends Component {

  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
    console.log('video mounted');
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      event.target.value = '';
    }
  };

  render(){
  
    return (
      <div>
        Video Component... {this.props.username} is logged in...
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Video);
