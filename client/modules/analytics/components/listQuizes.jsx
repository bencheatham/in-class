import {reduce, each} from 'lodash';
import React, {Component} from 'react';

export default class ListQuizes extends Component {
  constructor(props){
    super(props);
    console.log('in ListQuizes')
    console.log(props.data)
  };

  componentWillMount() {
       this.props.data.analyticsActions.getQuizAnalytics();

  }



  render() {


    return (
     <div>
       InsideListQuizes
     </div>

    );
  };

};

