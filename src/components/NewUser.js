import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: '',
      projects: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={(event)=>this.props.handleAddUser(event,this.state)}>

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

          <input type="submit" />
        </form>
      </div>
    )
  }

}

export default App
