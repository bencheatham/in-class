import {reduce, each} from 'lodash';
import React, {Component} from 'react';

export default class ListQuizes extends Component {
  constructor(props){
    super(props);
    console.log('in ListQuizes')
    console.log(props.data)
  };



  render() {

    this.props.data.analyticsActions.getQuizAnalytics();

    return (
     <div>
       InsideListQuizes
     </div>

    );
  };

};

