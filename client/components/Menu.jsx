import React from 'react';

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="visible">
          {this.props.children}
        </div>
      </div>
    );
  };
};

export default Menu;
