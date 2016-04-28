require('../stylesheets/styles.scss');

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class TeacherControlPanel extends React.Component {

  render() {
    return(
      <div className="TeacherControlPanel">
        <Button className="btn-success btn-circle btn-xl">
           <Glyphicon glyph="glyphicon glyphicon-film" />
        </Button>
        <Button className="btn-danger btn-circle btn-xl">
           <Glyphicon glyph="glyphicon glyphicon-question-sign" />
        </Button>
      </div>




    );
  };
}

export default TeacherControlPanel;
