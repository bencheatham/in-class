import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from '../login/Login'



class Thumbs extends Component {

 render() {
   return (
     <div>
       <span><h1>In class...</h1></span>
       <Login />
    </div>

   );
 };



}


export default Thumbs;