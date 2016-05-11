import {reduce, each} from 'lodash';
import React, {Component} from 'react';
//import SearchItem from './searchitem';
import Chart from 'chart.js';
var PieChart = require('../../../../node_modules/react-chartjs/lib/pie');

export default class SimplePie extends Component {
  constructor(props){
    super(props);


    this.state = {
      data: [
        {
         value: 5,
         color: "#F7464A",
         highlight: "#FF5A5E",
         label: "Q1"
        },
        {
         value: 3,
         color: "#46BFBD", 
         highlight: "#5AD3D1",
         label: "Q2"
        },
        {
         value: 2,
         color: "#FDB45C", 
         highlight: "#FFC870",
         label: "Q3"
        }
      ]
    };
  };

  drawChart() {

    var pieOptions = {
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

    var pieData = [];
    var count = 0;
    var colors = [
      {color: "#F7464A", highlight: "#FF5A5E"},
      {color: "#46BFBD", highlight: "#5AD3D1"},
      {color: "#FDB45C", highlight: "#FFC870"},
      {color: "#949FB1", highlight: "#A8B3C5"},
      {color: "#4D5360", highlight: "#616774"}
    ];

    _.each(this.props.data.data, (item) => {
      if(count < 5){
        pieData.push({
          value: item,
          color: colors[count].color, //"#F7464A", //
          highlight: colors[count].highlight, //"#FF5A5E", //
          label: 'Q' + count
        });
        count++;
      }
    });

    //return (<PieChart data={pieData} options={pieOptions} width="600" height="250"/>);
    return (<PieChart data={pieData} options={pieOptions} width="300" height="125"/>);

  };

  render() {
    return (
      <div>
        <ul className='collection' className="col s4" style={{display: 'inline-block',float:'left', margin: "10px 10px 10px 10px"}}>
          <p style={{fontWeight:'bold', textAlign: 'center'}}>{this.props.data.title}</p>
          {this.drawChart()}
        </ul>
      </div>
    )
  };
};