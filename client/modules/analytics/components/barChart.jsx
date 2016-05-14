import {reduce, each} from 'lodash';
import React, {Component} from 'react';
//import SearchItem from './searchitem';
import Chart from 'chart.js';
var BarChart = require('../../../../node_modules/react-chartjs/lib/bar');

export default class SimpleBar extends Component {
  constructor(props){
    super(props);

    let labels;
    let title;
    let data;

    let obj = this.props.data;

    for(var key in obj){
      if(key === "labels"){
        labels = obj[key];
      }
      if(key === "title"){
        title = obj[key];
      }
      if(key === "data"){
        data = obj[key];
      }
    }

    let data3 =  {
        labels: labels,
        datasets: [
          {
            label: title,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: data
          }
        ]
      };



    this.state = {
      data2: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      },
      data3: data3
    };
  };

  drawChart() {
    const barData = this.state.data3;

    var barOptions = {
      animatable: true,
      segmentShowStroke : true,
      segmentStrokeColor : "#fff",
      segmentStrokeWidth : 2,
      percentageInnerCutout : 0,
      animationSteps : 100,
      animationEasing : "easeOutBounce",
      animateRotate : true,
      legendTemplate : "<ul className=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };

   // return (<BarChart data={barData} options={barOptions} width="600" height="250"/>);
    return (<BarChart data={barData} options={barOptions} width="300" height="125"/>);
  };

  render() {
    return (
      <div>
        <ul className='collection' className="col s4" style={{display: 'inline-block',float:'left', margin: "10px 10px 10px 10px"}}>
          <p style={{fontWeight:'bold', textAlign: 'center'}}>{/*this.props.data.title*/}</p>
          {this.drawChart()}
        </ul>
      </div>
    )
  };
};
