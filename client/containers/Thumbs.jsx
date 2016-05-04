import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from '../login/Login'
import StudentThumbs from '../thumbs/StudentThumbs'
import TeacherThumbs from '../thumbs/TeacherThumbs'

class Thumbs extends Component {

 render() {
  var thumbCheck = (this.props.thumbCheck)? <StudentThumbs /> : null;
  return (
    <div>
      <span><h1>In thumbs...</h1></span>
      <TeacherThumbs/>
      {thumbCheck}
    </div>
  );
 };
}


function mapStateToProps(state) {
  return {
    username: state.user.username,
    thumbCheck: state.thumbsReducer.thumbCheck,
  }
}

export default connect(mapStateToProps)(Thumbs);