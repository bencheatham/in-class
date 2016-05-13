import React, { Component } from 'react';

export default class CoreLayout extends Component {

  render() {

    return (

      <div className="site-wrapper">
          {this.props.children}
      </div>

    
    );

  }

};


