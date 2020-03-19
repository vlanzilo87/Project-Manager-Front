import React, { Component } from 'react';
import UpdateUser from './UpdateUser'

export default class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      _id: this.props.user._id,
      showForm: false
    }
    this.toggleForm = this.toggleForm.bind(this)
  }

  toggleForm(){
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    return (
      <div>
        {this.state.showForm ? <UpdateUser handleUpdatUser={this.props.handleUpdateUser} user={this.props.user} toggleForm={this.toggleForm}/> : <h1><a href={this.props.user.url}>{this.props.user.title}</a></h1>}
        <h4 onClick={this.toggleForm}>Update User!</h4>
        <button onClick={()=>this.props.deleteUser(this.state)}>Delete User</button>
      </div>
    );
  }
};
