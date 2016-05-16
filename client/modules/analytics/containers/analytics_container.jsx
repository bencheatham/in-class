import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AnalyticsActions from '../actions/analytics_actions';
import PieChart from '../components/pieChart';
import BarChart from '../components/barChart';
import ListQuizes from '../components/listQuizes';
import ClassQuizSummary from '../components/ClassQuizSummary';
import QuestionsSummary from '../components/QuestionsSummary';
import Header from '../../../login/Header';
import TeacherDrawer from '../../../containers/TeacherDrawer';


class AnalyticsContainer extends Component {

  constructor(props) {
    super(props);
  };

  componentWillMount() {

    this.props.analyticsActions.getQuizAnalytics();
 //   this.props.analyticsActions.fetchQuizList();
 this.props.analyticsActions.getQuizAndAnalyze();

  };

 
  render() {

    return (
      <div>
        <Header />
        <div className="container-fluid">
          <ul className="list-group" >
            <ClassQuizSummary data={this.props}/>
          </ul>
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
