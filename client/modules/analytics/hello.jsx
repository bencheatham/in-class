import React, {Component} from 'react';
import {connect} from 'react-redux';

//import { BarChart } from 'react-d3';



export default class Hello extends Component {
    render() {
        
        var barData = [
          {label: 'A', value: 5},
          {label: 'B', value: 6},
          {label: 'F', value: 7}
        ];

        return ( 
          <div>
            <BarChart
                    data={barData}
                    width={500}
                    height={200}
                    fill={'#3182bd'}
                    title='Bar Chart'
                  />;
          </div>
        );
    }
};
 
