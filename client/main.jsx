import React from 'react';
import ReactDOM from 'react-dom';

class MyApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

ReactDOM.render(<MyApp />, document.getElementById('app'));
