import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AnalyticsActions from '../actions/analytics_actions';
import PieChart from '../components/pieChart';
import BarChart from '../components/barChart';
import ListQuizes from '../components/listQuizes';
import SingleQuizSummary from '../components/singleQuizSummary';
import SingleQuestionsSummary from '../components/singleQuestionsSummary';
import Header from '../../../login/Header';
import TeacherDrawer from '../../../containers/TeacherDrawer';
require('../../../stylesheets/analytics.scss');


class SingleQuizAnalyticsContainer extends Component {

  constructor(props) {
    super(props);
  };

  componentWillMount() {

    this.props.analyticsActions.getQuizAnalytics();
    this.props.analyticsActions.fetchQuizList();

  };

 
  render() {

    if(this.props.analyzedQuizes === null || this.props.analyzedQuizes === undefined) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div >
        <Header />
        <div className="container-fluid single-quiz-graph-container" >
          <div className="quiz-graph-group-div">
            <SingleQuizSummary data={this.props}/>
          </div>
          <div className="quiz-graph-group-div">
            <SingleQuestionsSummary data={this.props}/>
          </div>
        </div>
      </div>
    );
  };
};



function mapStateToProps(state) {
  return {
    quizzes: state.teacherQuiz.quizzes,
    questionForms: state.teacherQuiz.questionForms,
    quizToEdit: state.teacherQuiz.quizToEdit,
    displayModal: state.teacherQuiz.displayModal,
    quizResults: state.teacherQuiz.quizResults,
    analyzedQuizes: state.analyticsReducer.analyzedQuizes,
    availableQuizes: state.analyticsReducer.availableQuizes,
    selectedQuiz: state.analyticsReducer.selectedQuiz
  };
};


function mapDispatchToProps(dispatch) {
  return {
   analyticsActions: bindActionCreators(AnalyticsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleQuizAnalyticsContainer);
