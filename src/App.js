import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import NewForm from './components/NewForm.js'
import Show from './components/Show.js'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://project-finder-team-backend.herokuapp.com/'
}
console.log('current base URL:', baseURL)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      blog: null
    }
    this.getBlogs = this.getBlogs.bind(this)
    this.handleAddBlog = this.handleAddBlog.bind(this)
    this.deleteBlog = this.deleteBlog.bind(this)
    this.toggleHasTP = this.toggleHasTP.bind(this)
    this.getBlog = this.getBlog.bind(this)
    this.stopShow = this.stopShow.bind(this)
  }

  componentDidMount(){
    this.getBlogs()
}

  async getBlogs (){
    try {
      // the async request code you want to try
      let response = await fetch(`${baseURL}/blogs`)
      let data = await response.json()
      this.setState({blogs: data})
    }catch(e){
      // what happens when you get an error
      console.error(e)
    }
  }

  handleAddBlog(blog) {
    const copyBlogs = [blog, ...this.state.blogs]
    this.setState({
      blogs: copyBlogs
    })
  }

  async deleteBlog (id){
  console.log(`I made a delete request to here: ${baseURL}/blogs/${id}`)
  try {
  let response = await fetch(baseURL + '/blogs/' +  id, {
     method: 'DELETE'
     })
     let data = await response.json()
     const foundBlog = this.state.blogs.findIndex(blog => blog._id === id)
     const copyBlogs = [...this.state.blogs]
     copyBlogs.splice(foundBlog, 1)
     this.setState({blogs: copyBlogs})
  } catch(e){
    console.error(e)
  }
}

  async toggleHasTP (blog){
   console.log(blog)
   try{
   let response = await fetch(baseURL + '/blogs/' + blog._id, {
     method: 'PUT',
     body: JSON.stringify({inProgress: !blog.inProgress}),
     headers: {
       'Content-Type': 'application/json'
     }
   })
   let updatedBlog = await response.json()
   const foundBlog = this.state.blogs.findIndex(foundItem => foundItem._id === blog._id)
   const copyBlogs = [...this.state.blogs]
   copyBlogs[foundBlog].inProgress = updatedBlog.inProgress
   console.log(updatedBlog)
   this.setState({blogs: copyBlogs})
   }catch(e){
     console.error(e)
   }
  }

  getBlog(blog) {
   this.setState({blog: blog})

  }
  stopShow(blog) {
   this.setState({blog: null})

  }

  render () {
    return (
      <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-md-10">
      <h1 className="text-center mbh-5 pb-3">Projects Manager</h1>
        <NewForm
          handleAddBlog={this.handleAddBlog} baseURL={baseURL}
        />
        <br />
        {this.state.blogs.map(blog => {
          return (
        <div
          key={blog._id}
           onMouseOver={() => this.getBlog(blog)} onMouseOut={() => this.stopShow(blog)}
          className="column"
          onDoubleClick={() => this.toggleHasTP(blog)}
                className={blog.inProgress
                  ? 'inProgress'
                  : 'bg-danger' }
        >
          <div className="row ">
            <div className="card col mb-3 bg-warning" >
              <div className="card-body">
                <h5 className="card-title title-bg">{blog.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{blog.inProgress}</h6>
                <p className="card-text">{blog.description}</p>
                <div className="show">
                  { this.state.blog
                    ? <Show blog={this.state.blog}/>
                    : null
                  }
                </div>
                <a onClick={()=>{ this.deleteBlog(blog._id)}} href="#" className="card-link delete-button text-white">Delete <i className="far fa-trash-alt"></i></a>
              </div>
            </div>


          </div>
        </div>
      )
    })}
      </div>
      </div>

      </div>

    )
  }

}

export default App
