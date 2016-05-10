

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AnalyticsActions from '../actions/analytics_actions';

import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import ListQuizes from '../components/listQuizes';



class AnalyticsContainer extends Component {

  constructor(props) {
    super(props);

    console.log(this.props)


  }

 
  render() {

    return (
      <div>
        <ListQuizes data={this.props} />
        <PieChart />
        <BarChart />
      </div>
    );
  }
};



function mapStateToProps(state) {
  return {
    quizzes: state.teacherQuiz.quizzes,
    questionForms: state.teacherQuiz.questionForms,
    quizToEdit: state.teacherQuiz.quizToEdit,
    displayModal: state.teacherQuiz.displayModal,
    quizResults: state.teacherQuiz.quizResults,
    analyzedQuizes: state.analyticsReducer.analyzedQuizes
  };
};


function mapDispatchToProps(dispatch) {
  return {
   analyticsActions: bindActionCreators(AnalyticsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);
