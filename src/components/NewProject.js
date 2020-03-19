import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: '',
      description: '',
      url: ''
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
        <form onSubmit={(event)=>this.props.handleAddProject(event,this.state)}>

          <input type="text"
          placeholder="Enter Project Name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange} />

          <input type="text"
          placeholder="Enter Project Description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange} />

          <input type="text"
          placeholder="Enter Project URL"
          name="url"
          value={this.state.url}
          onChange={this.handleChange} />

          <input type="submit" />
        </form>
      </div>
    )
  }

}

export default App
