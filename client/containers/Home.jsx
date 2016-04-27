import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


class Home extends Component {


 render() {
   return (
     <div>
       <span><h1> InClass.co - Students Stay Engaged</h1></span>

       <img 
       src={'http://d32ogoqmya1dw8.cloudfront.net/images/NAGTWorkshops/earlycareer/teaching/large_lecture.jpg'} 
       alt="boohoo" 
       className="img-responsive"/>
    </div>

   );
 };



};


export default Home;