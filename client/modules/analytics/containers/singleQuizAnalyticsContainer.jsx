import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AnalyticsActions from '../actions/analytics_actions';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import ListQuizes from '../components/listQuizes';
import SingleQuizSummary from '../components/singleQuizSummary';
import SingleQuestionsSummary from '../components/singleQuestionsSummary';
import Header from '../../../login/Header';
import TeacherDrawer from '../../../containers/TeacherDrawer';


class AnalyticsContainer extends Component {

  constructor(props) {
    super(props);
  };

  componentWillMount() {

    this.props.analyticsActions.getQuizAnalytics();
    this.props.analyticsActions.fetchQuizList();

  };

 
  render() {

    return (
      <div>
        <Header />
        <div>
          <SingleQuizSummary data={this.props}/>
        </div>
        <div>
          <SingleQuestionsSummary data={this.props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);
