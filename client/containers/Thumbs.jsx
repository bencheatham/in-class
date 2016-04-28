import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import QuestionBox from '../components/QuestionBox'
import Login from '../components/Login'


class Thumbs extends Component {


 render() {
   return (
     <div>
       <span><h1>In class...</h1></span>
       <Login />
       <QuestionBox />

    </div>

   );
 };



}


export default Thumbs;