import React from 'react'
class NewForm extends React.Component {
  constructor (props) {
  super(props)
  this.state = {
    title: '',
    inProgress: true,
    description: ''

  }
this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
}

handleChange (event) {
 this.setState({ [event.currentTarget.id]: event.currentTarget.value})
}

async handleSubmit (event) {
    event.preventDefault()
    try{
      let response = await
      //this.props.baseURL = http://localhost:3003
      fetch(this.props.baseURL + 'blogs', {
          method: 'POST', // Put, Delete
          body: JSON.stringify({title: this.state.title}, {description: this.state.description}),
          headers: {
              'Content-Type': 'application/json'
            }
          })
          let data =  await response.json()
          this.props.handleAddBlog(data)
          this.setState({
              title: '',
              inProgress: true,
              description: ''
          })
        }catch(e){
          console.error({'Error': e})
        }
      }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="title">Project Title: </label>
          <input className="form-control" type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Title"/>
        </div>

        <div className="form-group">
          <label htmlFor="description">Project Description: </label>
          <textarea className="form-control" id="description" name="description" onChange={this.handleChange} value={this.state.description} placeholder="ex: Unit 3 React Project" rows="8"></textarea>
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Track Your Project"/>
        </div>
      </form>
    )
  }
}

export default NewForm
