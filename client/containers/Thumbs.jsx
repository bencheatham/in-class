import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'


class Thumbs extends Component {


 render() {
   return (
     <div>
       <span><h1> Thumbs Up!</h1></span>

    </div>

   );
 };



}


export default Thumbs;