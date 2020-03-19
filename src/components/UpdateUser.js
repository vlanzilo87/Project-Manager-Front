import React, { Component } from 'react';

export default class UpdateUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      projects: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount(){
    if (this.props.urse) {
      this.setState({
        username: this.props.user.username,
        password: this.props.user.password,
        projects: this.props.user.projects,
        _id: this.props.user._id
      })
    }
  }

  render() {
    return(
      <div>
        <h1>Update User Form</h1>
          <form onSubmit={(event)=> {this.props.handleUpdateUser(event, this.state); this.props.toggleForm()}}>
            <input type="text"
            placeholder="Enter Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange} />

            <input type="text"
            placeholder="Enter Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange} />

            <input type="text"
            placeholder="Enter Your Project"
            name="projects"
            value={this.state.projects}
            onChange={this.handleChange} />

          <input type="submit"/>
        </form>
      </div>
    )
  }
};
