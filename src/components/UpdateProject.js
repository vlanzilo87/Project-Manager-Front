import React, { Component } from 'react';

export default class UpdateProject extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      url: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount(){
    if (this.props.project) {
      this.setState({
        name: this.props.user.name,
        description: this.props.project.description,
        url: this.props.project.url,
        _id: this.props.project._id
      })
    }
  }

  render() {
    return(
      <div>
        <h1>Update Project</h1>
          <form onSubmit={(event)=> {this.props.handleUpdateProject(event, this.state); this.props.toggleForm()}}>
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

          <input type="submit"/>
        </form>
      </div>
    )
  }
};
