import React, { Component } from 'react';
import UpdateProject from './UpdateProject'

export default class Project extends Component {
  constructor(props){
    super(props)
    this.state = {
      _id: this.props.project._id,
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
        {this.state.showForm ? <UpdateProject handleUpdatProject={this.props.handleUpdateProject} project={this.props.project} toggleForm={this.toggleForm}/> : <h1><a href={this.props.project.url}>{this.props.project.title}</a></h1>}
        <h4 onClick={this.toggleForm}>Update Project!</h4>
        <button onClick={()=>this.props.deleteProject(this.state)}>Delete Project</button>
      </div>
    );
  }
};
