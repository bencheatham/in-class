import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../actions/users';
import { selectUser } from '../actions/users';
import * as UserActions from '../actions/users';
import VideoContainer from '../containers/VideoContainer';
//brought in for auth:
import * as loginActionCreators from '../modules/auth/actions';

class TeacherClassview extends Component {

  constructor(props) {
    super(props);
    this.state = { term: '' };


    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

//brought in for auth:
  componentWillMount () {
    this.fetchData();
  }

//brought in for auth:
  fetchData () {
    let token = this.props.token;
    this.props.actions.fetchProtectedData(token);
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
   console.log('HEREERERE', users)
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



  render () {
    return (
      <div>
        {this.props.isFetching === true
          ? <h1>Loading data...</h1>
            : <div>
                <h1>Welcome back,
                    {this.props.userName}!</h1>
                <h3>{this.props.data}</h3>

                <ul>
                  {this.renderUserList(this.props.users)}

                </ul>

                <div>
                  <VideoContainer />
                </div>
              </div>
        }
      </div>

    );
  };
}

const mapStateToProps = (state) => ({

//  console.log('LETS LOOK AT STATE: ', state)
 
    data: state.data.data,
    users: state.Users.users,
    username: state.Users.username,
    isFetching: state.data.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(loginActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassview);



