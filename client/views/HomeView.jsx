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
         <div className="home-logo-splash" >
           <img className="home-logo" src="/images/in-class-large.png" alt="In Class" />
         </div>

       <div className="container-marketing">

         <hr className="feature-divider"></hr>
           <div className="featurette-divider">

             <div className="row featurette">
               <div className="col-md-7">
                 <h2 className="featurette-heading">Thumb Check</h2>
                 <span class="muted">Real-time Comprehension Checks</span>
                 <p className="lead">Addresses difficulty of determining (in real-time) whether 
                 students understand material covered in presentation.</p>
               </div>
               <div className="col-md-5">
                 <img className="feature-image" src="/images/thumbs-up-thumbs-down.gif" alt="Thumb Check" />
               </div>

           </div>
           <div className="featurette-divider">


               <div className="col-md-7">
                 <h2 className="featurette-heading">Give Quizes</h2>
                 <span class="muted">Assess Student Comprehension With Real-time Quiz</span>
                 <p className="lead">Address difficulty of determining (in real-time) 
                  whether students understand material covered in presentation </p>
               </div>
               <div className="col-md-5">
                 <img className="feature-image" src="/images/quiz.png" alt="Quiz" />
               </div>
           </div>


               <div className="row">
                 <div className="col-lg-4">
                   <img className="feature-image" src="/images/analytics.jpg" alt="Analytics" />
                   <h2>See Quiz Results</h2>
                 </div>

               </div>

               <div className="row">
                 <div className="col-lg-4">
                   <img className="feature-image" src="/images/questions.jpg" alt="Questions" />
                   <h2>Peer Question Building</h2>
                 </div>

               </div>

               <div className="row">
                 <div className="col-lg-4">
                   <img className="feature-image" src="/images/class-chat.jpg" alt="Chat" />
                   <h2>Class Chat</h2>
                 </div>

               </div>

         </div>
       </div>

         </div>
       </div>
    </div>

   );
 };



};
//thumb image from http://www.marcresearch.com/blogs/merrill/2015/05/27/thumbs-up-or-thumbs-down-time-to-take-a-fun-quiz-and-let-me-know/

         // <img 
         // src={'http://d32ogoqmya1dw8.cloudfront.net/images/NAGTWorkshops/earlycareer/teaching/large_lecture.jpg'} 
         // alt="boohoo" 
         // className="img-responsive"/>