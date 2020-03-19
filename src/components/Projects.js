import React from 'react';
import NewProject from './NewProject'
import Project from './Project'

let baseURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  //Would change to heroku backend
  baseURL = 'http://localhost:3003'
}

class Projects extends React.Component {
  constructor() {
    super()
    this.state = {
      projects: []
    }

    this.handleAddProject = this.handleAddProject.bind(this)
    this.handleUpdateProject = this.handleUpdateProject.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
  }

  async handleAddProject(event, project) {
    event.preventDefault()
    try {
      let response = await fetch(`${baseURL}/projects`, {
        body: JSON.stringify(project),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      let data = await response.json()
      let copyProjects = [data, ...this.state.projects]
      this.setState({
        projects: copyProjects,
        name: '',
        description: '',
        url: ''
      })
    } catch (error) {
      console.log(error);
    }
  }

  async fetchProjects() {
    try {
      let response = await fetch(`${baseURL}/projects`)
      let data = await response.json()
      this.setState({
        projects: data
      })
    } catch (error) {
      console.log(error);
    }
  }

  async handleUpdateProject(event, project) {
    event.preventDefault()
    try {
      let response = await fetch(`${baseURL}/projects/${project._id}`, {
        body: JSON.stringify(project),
        method: 'PUT',
        header: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })

      let updatedProject = await response.json()
      const foundProjectIndex = this.state.projects.findIndex(foundProject => foundProject._id === project._id)
      const copyProjects = [...this.state.projects]
      copyProjects[foundProjectIndex] = updatedProject
      this.setState({
        projects: copyProjects
      })
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProject(project){
    try{
      let response = await fetch(`${baseURL}/projects/${project._id}`, {
        method: 'DELETE'
      })
      let data = await response.json()
      const foundProject = this.state.projects.findIndex(project => project._id === data._id)
      const copyProjects = [...this.state.projects]
      copyProjects.splice(foundProject, 1)
      this.setState({projects: copyProjects})
    } catch(error){
      console.log(error);
    }
  }

  componentDidMount(){
    this.fetchProjects()
  }

  render(){
    return(
      <div>
        <h1>Projects</h1>
        <NewProject handleAddProject={this.handleAddProject}/>
        {this.state.projects.map(project => (
          <Project project={project} key={project._id} handleUpdateProject={this.handleUpdateProject} deleteProject={this.deleteProject}/>
        ))}
      </div>
    )
  }
}

export default Projects
