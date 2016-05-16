import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Header from '../login/Header';

require('../stylesheets/homeview.scss');


export default class HomeView extends Component {


 render() {
   return (
     <div className="site-wrapper-inner">
       <Header />
       <div className="cover-container">
         <div className="inner-cover">
          <span><h1 className="cover-heading"> Students Stay Engaged</h1></span>
          <div className="home-logo-splash" >

          </div>
        </div>

       <div className="container-marketing">

         <hr className="feature-divider top-featurette"></hr>
             <div className="row featurette">
               <div className="col-md-7 feature-summary">
                 <h2 className="featurette-heading">Thumb Checks</h2>
                 <span className="muted">Real-time Comprehension Checks</span>
                 <p className="lead">Addresses difficulty of determining (in real-time) whether 
                 students understand material covered in presentation.</p>
               </div>
               <div className="col-md-5">
                 <img className="feature-image featurette-image img-responsive center-block" src="/images/thumbs-up-thumbs-down.gif" alt="Thumb Check" />
               </div>
             </div>

           <hr className="featurette-divider"></hr>
             <div className="row featurette">
               <div className="col-md-7 col-md-push-5">
                 <h2 className="featurette-heading">Give Quizes</h2>
                 <span className="muted">Assess Student Comprehension With Real-time Quiz</span>
                 <p className="lead">Address difficulty of determining (in real-time) 
                  whether students understand material covered in presentation </p>
               </div>
               <div className="col-md-5 col-md-pull-7">
                 <img className="feature-image featurette-image img-responsive center-block" src="/images/quiz.png" alt="Quiz" />
               </div>
             </div>


           <hr className="featurette-divider"></hr>
             <div className="row featurette">
               <div className="col-md-7">
                 <h2 className="featurette-heading">Quiz Results Analytics</h2>
                 <span className="muted">Get Instant Visualization of Quiz Results</span>
                 <p className="lead">Understand in real-time the class' material comprehension with data Visualization.</p>
               </div>
               <div className="col-md-5">
                 <img className="feature-image featurette-image img-responsive center-block" src="/images/analytics.jpg" alt="Analytics" />
               </div>
             </div>

           <hr className="featurette-divider"></hr>
             <div className="row featurette">
               <div className="col-md-7 col-md-push-5">
                 <h2 className="featurette-heading">Class Question Board</h2>
                 <span className="muted">Let students post and upvote real-time questions</span>
                 <p className="lead">Provides ability to ask questions as they arise and let the class upvote the question if it is relevant.</p>
               </div>
               <div className="col-md-5 col-md-pull-7">
                 <img className="feature-image featurette-image img-responsive center-block" src="/images/questions.jpg" alt="Questions" />
               </div>
             </div>

           <hr className="featurette-divider"></hr>
             <div className="row featurette">
               <div className="col-md-7">
                 <h2 className="featurette-heading">Class Chat</h2>
                 <span className="muted">Students can have a live interactive chat.</span>
                 <p className="lead">Addresses difficulty in sharing material in real-time.Students often have trouble taking notes at the same pace as the instructor. Students disrupting classroom with questions that can be easily answered by classmates.</p>
               </div>
               <div className="col-md-5">
                   <img className="feature-image featurette-image img-responsive center-block" src="/images/class-chat.jpg" alt="Chat" />
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