import React from 'react';
import NewUser from './NewUser'
import User from './User'

let baseURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  //Would change to heroku backend
  baseURL = 'http://localhost:3003'
}

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      users: []
    }

    this.handleAddUser = this.handleAddUser.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  async handleAddUser(event, user) {
    event.preventDefault()
    try {
      let response = await fetch(`${baseURL}/users`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      let data = await response.json()
      let copyUsers = [data, ...this.state.users]
      this.setState({
        users: copyUsers,
        username: '',
        password: '',
        projects: ''
      })
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUsers() {
    try {
      let response = await fetch(`${baseURL}/users`)
      let data = await response.json()
      this.setState({
        users: data
      })
    } catch (error) {
      console.log(error);
    }
  }

  async handleUpdateUser(event, user) {
    event.preventDefault()
    try {
      let response = await fetch(`${baseURL}/users/${user._id}`, {
        body: JSON.stringify(user),
        method: 'PUT',
        header: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })

      let updatedUser = await response.json()
      const foundUserIndex = this.state.users.findIndex(foundUser => foundUser._id === user._id)
      const copyUsers = [...this.state.users]
      copyUsers[foundUserIndex] = updatedUser
      this.setState({
        users: copyUsers
      })
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(user){
    try{
      let response = await fetch(`${baseURL}/users/${user._id}`, {
        method: 'DELETE'
      })
      let data = await response.json()
      const foundUser = this.state.users.findIndex(user => user._id === data._id)
      const copyUsers = [...this.state.users]
      copyUsers.splice(foundUser, 1)
      this.setState({users: copyUsers})
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    this.fetchUsers()
  }

  render(){
    return(
      <div>
        <h1>Users</h1>
        <NewUser handleAddUser={this.handleAddUser}/>
        {this.state.users.map(user => (
          <User user={user} key={user._id} handleUpdateUser={this.handleUpdateUser} deleteUser={this.deleteUser}/>
        ))}
      </div>
    )
  }
}

export default Users
