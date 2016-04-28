import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Quiz from '../components/Quiz';



class QuizPage extends Component {

 render() {
   return (
     <div>
       <span><h1> Me Please </h1></span>
       <Quiz />
    </div>

   );
 };
};

export default QuizPage;
