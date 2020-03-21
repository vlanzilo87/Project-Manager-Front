import React from 'react'

class Show extends React.Component {
  render () {
    return (
      <>
        <div className="details col">
         <h3>Project:</h3>
         <hr/>
         <h4> Title: { this.props.blog.title }</h4>
         <h5> Description: { this.props.blog.description } </h5>
         <h6><span>Project Status:</span>   { this.props.blog.inProgress ? 'In Progress' : 'On Standby'} </h6>
       </div>
      </>
    )
  }
 }
 
export default Show
