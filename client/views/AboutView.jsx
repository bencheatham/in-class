import React, { Component, PropTypes } from 'react';
import { Table, Button } from 'react-bootstrap';
import Header from '../login/Header';
require('../stylesheets/aboutView.scss');


export default class AboutView extends Component {

  render() {
    function getContributeDescription() {
      return (
        <pre>
          // Clone Repository {'\n'}
          git clone https://github.com/In-Class/in-class.git {'\n'}
          cd in-class {'\n\n'}

          // Install Dependencies {'\n'}
          $ npm install {'\n\n'}

          // Start in Development Mode {'\n'}
          $ npm run start-dev {'\n\n'}

          // or Production (Request .envProduction file to simulate environment) {'\n'}
          $ npm start {'\n\n'}

          // Run Tests {'\n'}
          $ npm test {'\n'}
        </pre>
      );
    };

    function getPostgresDescription() {
      return (
        <pre>
          // install postgres to your machine {'\n'}
          brew install postgres {'\n\n'}

          // initialize and start the postgres server {'\n'}
          pg_ctl init {'\n'}
          pg_ctl start --pgdata=database/inclass --log=logfile {'\n\n'}

          // create in-class and test database for your local machine {'\n'}
          createdb in-class {'\n'}
          createdb test {'\n\n'}

          // view database {'\n'}
          psql in-class {'\n\n'}
        </pre>
      );
    }

    return(

      <div id="about-view">
        <Header />

        <div className="sect">
          <div className="title">InClass</div>
          <div className="content">
            A tool for improving in-class student-teacher interactions
          </div>
        </div>

        <div className="sect">
          <div className="title">Introduction</div>
          <div className="content justify">
            Although laptops in classroom are ubiquitous, students are the only ones taking advantage of them.
            Classrooms have been slow to use these technologies to enhance a lecturer's effectiveness in a physical classroom setting.
            The platform In Class aims to enhance the classroom experience by increasing communication channels between students and the
            teacher and introducing feedback loops to assess whether students understand the presented material in real-time.
          </div>
        </div>

        <div id="dev-info" className="sect">
          <div className="title">Team</div>
          <div className="content">
            <div className="dev-card">
              <img src="/images/louie.jpg"></img>
              <div className="dev-content">
                <div className="dev-header">
                  <h4 className="name">Louis Buchbinder</h4>
                </div>
                <div className="dev-body">
                  <p>Scrum Master</p>
                  <Button bsStyle="primary">LinkedIn</Button>
                  <Button className="github">Github</Button>
                </div>
              </div>
            </div>

            <div className="dev-card ">
              <img src="/images/ben.jpeg"></img>
              <div className="dev-content">
                <div className="dev-header">
                  <h4 className="name">Ben Cheatham</h4>
                </div>
                <div className="dev-body">
                  <p>Product Manager</p>
                  <Button bsStyle="primary">LinkedIn</Button>
                  <Button className="github">Github</Button>
                </div>
              </div>
            </div>

            <div className="dev-card ">
              <img src="/images/sterv.jpeg"></img>
              <div className="dev-content">
                <div className="dev-header">
                  <h4 className="name">Stephen Sullivan</h4>
                </div>
                <div className="dev-body">
                  <p>Software Engineer</p>
                  <Button bsStyle="primary">LinkedIn</Button>
                  <Button className="github">Github</Button>
                </div>
              </div>
            </div>

            <div className="dev-card ">
              <img src="/images/jason.jpg"></img>
              <div className="dev-content">
                <div className="dev-header">
                  <h4 className="name">Jason Wu</h4>
                </div>
                <div className="dev-body">
                  <p>Software Engineer</p>
                  <Button bsStyle="primary" href="https://www.linkedin.com/in/chjasonwu">LinkedIn</Button>
                  <Button className="github" href="https://github.com/chjasonwu" >Github</Button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="sect">
          <div className="title">Real-time Feedback Loops</div>
          <div className="content">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Problem</th>
                  <th>Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Thumb check</td>
                  <td>Addresses difficulty of determining (in real-time) whether students understand material covered in presentation.</td>
                  <td>Teacher issues a thumb check during a presentation to assess whether students understand what is being taught. Results direct the teacher on whether he or she should elaborate on a topic or move on to the next one.</td>
                </tr>
                <tr>
                  <td>Quiz</td>
                  <td>Address difficulty of determining (in real-time) whether students understand material covered in presentation.</td>
                  <td>Teachers can upload and edit quizzes in the platform, and broadcast them in real-time to dial in on students’ understanding of the important details of the presentation. The results are visualized in the teacher’s dashboard.</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <div className="sect">
          <div className="title">Communication Channels</div>
          <div className="content">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Problem</th>
                  <th>Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Question</td>
                  <td>Too many questions but not enough time to address each. Students too shy to ask questions. Students disrupting the classroom with questions that aren’t relevant for the entire class.	</td>
                  <td>Students can share and upvote questions about the lecture. Teacher can select the questions in order of priority.</td>
                </tr>
                <tr>
                  <td>Chat</td>
                  <td>Addresses difficulty in sharing material in real-time. Students often have trouble taking notes at the same pace as the instructor. Students disrupting classroom with questions that can be easily answered by classmates.	</td>
                  <td>Allows students to interact with each other without disrupting the classroom. For instance,students can message classroom to share notes or ask for clarification. Allow teacher and students to share resources (such as links to related material) in real-time.</td>
                </tr>
                <tr>
                  <td>Video</td>
                  <td>Large lectures introduce a challenge for both students and lecturers. For teachers, who want to foster equal opportunity, it can be hard to notice and determine in which order students raised their hand. More importantly, it can be very difficult for members of the classroom to hear the student asking the question, if he or she does not have a microphone.	</td>
                  <td>Students can enter a queue to ask a question which will be broadcasted from the front of the classrooms. Teacher can call an individual student and broadcast his or her video on the lecture screen.</td>
                </tr>

              </tbody>
            </Table>
          </div>
        </div>

        <div className="sect">
          <div className="title">Technology Stack</div>
          <div className="content">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Type</th><th>Implementation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Language</td><td>JavaScript</td>
                </tr>
                <tr>
                  <td>Build</td><td>Webpack</td>
                </tr>
                <tr>
                  <td>Server-side</td><td>NodeJS, Express</td>
                </tr>
                <tr>
                  <td>Database</td><td>Postgres, LouDB (deprecated)</td>
                </tr>
                <tr>
                  <td>Client-side</td><td>React-Redux</td>
                </tr>
                <tr>
                  <td>Additional dependencies</td><td>Chart.js, WebRTC</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <div className="sect">
          <div className="title">Contributing</div>
          <div className="content">
            <span>See (Contributing) [<a href="https://github.com/In-Class/in-class/blob/master/_CONTRIBUTING.md">/_CONTRIBUTING.md</a>]</span>
            {getContributeDescription()}
            <span>make sure postgres is installed</span>
            {getPostgresDescription()}
          </div>
        </div>

        <div className="sect">
          <div className="title">Project Doc Links</div>
          <div className="content">
            <span>Look at the project <a href="https://github.com/In-Class/in-class/blob/master/_STYLE_GUIDE.md">Style Guide </a>
              for more information.
            </span>
          </div>
        </div>

      </div>
    );
  }
}
