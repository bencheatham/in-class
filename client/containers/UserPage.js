import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../actions/users';
import { selectUser } from '../actions/users';
import * as UserActions from '../actions/users';
import VideoContainer from '../modules/video/containers/VideoContainer';



class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = { term: '' };


    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });

  }

  onFormSubmit(event) {
    const actions = this.props.actions;

    event.preventDefault();
    actions.userLogin(this.state.term);
    //actions.userLogin(username);
  }


  renderUserList(users) {
    return users.map((user) => {
      return (
        <li
          key={user}
          //onClick={() => this.props.selectUser(user)}
          className="list-group-item">
          {user} Joined the Class.</li>
      );
  });
  }


  render() {


  console.log('did username get in', this.props.actions )

    return (
      <div>

        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Username"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange} />

          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>

        <ul>
        {this.renderUserList(this.props.users)}

        </ul>
      <div>
        <VideoContainer username={this.props.username} />

      </div>


      </div>


    );

  };
}

function mapStateToProps(state) {

   console.log('LETS LOOK AT STATE: ', state)

  return {
    users: state.Users.users,
    username: state.Users.username
  };
}

function mapDispatchToProps(dispatch) {

  return {

   actions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
