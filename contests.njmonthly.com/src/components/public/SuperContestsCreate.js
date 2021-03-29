import React, {Component} from 'react';
import axios from 'axios';
import {ENV_URL} from '../../environment';
import SuperHeader from './SuperHeader';
import ContestForm from './ContestForm';

export default class SuperContestsContestUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {}
    }

    this.formSubmitted = this.formSubmitted.bind(this);
    this.setContestFormData = this.setContestFormData.bind(this);
  }
  componentDidMount() {
    // super/contests/{contest}/update
    axios.get(ENV_URL + window.location.pathname)
    .then(response => {

      console.log('res', response);

      let contestForm = response.data.contestForm;

      this.setState({ 
        contestForm: contestForm,
      });

    })
    .catch(function (error) {
      console.log(error);
    })

  }
  formSubmitted(e) {
    e.preventDefault();
    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };

    // /super/contests/create
    let uri = ENV_URL + this.props.location.pathname;

    let data = {
      form_fields: this.state.contestForm.fields,
    }

    axios.post(uri, data, authHeaders).then((response) => {

      console.log('super contest res', response);

      if (response.data.error === false) {
        alert('Contest created.');
        this.props.history.push('/super/contests/' + response.data.contest.slug + '/update');
      }
      
    });
  }

  setContestFormData(contestFormData) {
    this.setState({
      contestForm: contestFormData
    })
  }

  render() {
    return (
      <div>
        {/* <SuperHeader /> */}
        
        {this.state.contestForm ? <ContestForm
          formSubmitted={this.formSubmitted}
          contestForm={this.state.contestForm}
          contest={this.state.contest}
          setContestFormData={this.setContestFormData}
        /> : '' }
      </div>
    )
  }
}