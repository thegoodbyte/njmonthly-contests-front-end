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
    

    this.formSubmitted = this.formSubmitted.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
  }

  componentDidMount() {
    // /super/contests/{contest}/pages/{id}
    let uri = ENV_URL + this.props.location.pathname;

    axios.get(uri).then((response) => {
      const return_data = response.data;

      this.setState({
        page: response.data
      })
      console.log('return json data: ', return_data);
      
    });
  }

    // Set up functions to update the state up input fields
  handleInputTextChange(e){

		let page = Object.assign({}, this.state.page);

    page[e.target.name] = e.target.value;

    console.log('handleInputTextChange', e.target.value);
    
    this.setState({
      page: page
    })

  }
  
  formSubmitted(e) {
    e.preventDefault();
    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };

    // /super/contests/{contest}/pages/{id}/update
    let uri = ENV_URL + this.props.location.pathname + '/update';

    let data = {
      page: this.state.page,
    }

    axios.patch(uri, data, authHeaders)
    .then((response) => {

      if (response.data.error === false) {
        alert('Page updated.');
      }
      
    })
    .catch((err) => {
      alert(err.response.data.message);
    })
  }

  render() {
    return (
      <div>

        {/* <SuperHeader /> */}
        
        <h1 className="text-center">Create Page</h1>
        <form onSubmit={this.formSubmitted}>
          <div className="row">
            <input 
              name="slug" 
              value={this.state.page.slug} 
              className="form-control" 
              onChange={this.handleInputTextChange} 
              placeholder="slug"
            />
          </div>
          
          <div className="row">
            <input 
              name="title" 
              value={this.state.page.title} 
              className="form-control" 
              onChange={this.handleInputTextChange} 
              placeholder="title"
            />
          </div>

          <div className="row">
            <textarea 
              name="content" 
              value={this.state.page.content} 
              className="form-control" 
              onChange={this.handleInputTextChange} 
              placeholder="content"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}