import React, {Component} from 'react';
import axios from 'axios';
import {ENV_URL} from '../../environment';
import SuperHeader from './SuperHeader';

export default class CreateContestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
  }

  componentDidMount() {

  }

  
    // Set up functions to update the state up input fields
  handleInputTextChange(e){

		let page = Object.assign({}, this.state.page);

    page[e.target.name] = e.target.value;
    
    this.setState({
      page: page
    })

  }
  
  handleSubmit(e) {

		e.preventDefault();

    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };
		
		// Send the data to the server
    const uri = ENV_URL + this.props.location.pathname;
		axios.post(uri, this.state.page, authHeaders).then((response) => {

			alert('Page created');

    });
    
  }

  render() {
    return (
      <div>

        {/* <SuperHeader /> */}
        
        <h1 className="text-center">Create Page</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <input 
              name="slug" 
              value={this.state.page.slug} 
              className="form-control" 
              onChange={this.state.handleInputTextChange} 
              placeholder="slug"
            />
          </div>
          
          <div className="row">
            <input 
              name="title" 
              value={this.state.page.title} 
              className="form-control" 
              onChange={this.state.handleInputTextChange} 
              placeholder="title"
            />
          </div>

          <div className="row">
            <input 
              name="content" 
              value={this.state.page.content} 
              className="form-control" 
              onChange={this.state.handleInputTextChange} 
              placeholder="content"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}