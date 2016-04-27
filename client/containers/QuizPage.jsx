import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'
import { show } from '../actions/quiz';

import Menu from '../components/Menu';
import MenuPage from '../components/MenuPage';

require('../stylesheets/styles.scss');

class QuizPage extends Component {

  render() {
   return (
     <div>
       <span><h1>Slide Menu</h1></span>
       <Menu>
          <MenuPage></MenuPage>
          <MenuPage></MenuPage>
          <MenuPage></MenuPage>
       </Menu>
    </div>
   );
 };
};

export default QuizPage;
