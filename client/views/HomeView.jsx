import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
require('../stylesheets/homeview.scss');


export default class HomeView extends Component {


 render() {
   return (
     <div className="site-wrapper-inner">
       <div className="cover-container">
         <div className="inner-cover">
         <span><h1 className="conver-heading"> InClass.co - Students Stay Engaged</h1></span>

         <img 
         src={'http://d32ogoqmya1dw8.cloudfront.net/images/NAGTWorkshops/earlycareer/teaching/large_lecture.jpg'} 
         alt="boohoo" 
         className="img-responsive"/>
         </div>
       </div>
    </div>

   );
 };



};


