import React, { Component } from 'react';

export default class CoreLayout extends Component {

  render() {

    return (

      <div >
          {this.props.children}
      </div>

    
    );

  }

};


