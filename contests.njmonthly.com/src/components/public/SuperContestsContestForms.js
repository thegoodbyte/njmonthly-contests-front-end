import React, {Component} from 'react';
import axios from 'axios';
import {ENV_URL} from '../../environment';
import { Link } from 'react-router-dom';
import SuperHeader from './SuperHeader';

class EditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      forms: [],
    };

  }

  componentWillMount() {

  }

  componentDidMount() {

    console.log('SuperContestsContestForms', this.props);

    // let uri = ENV_URL + '/forms/getForm/' + this.props.match.params.contest;

    // /super/contests/{contest}/forms
    let uri = ENV_URL + this.props.location.pathname;

    axios.get(uri).then((response) => {
      const return_data = response.data;

      this.setState({
        forms: response.data
      })
      console.log('return json data: ', return_data);
      
    });


  }

  duplicateForm(form_id) {

    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };

    // /super/contests/{contest}/forms
    let uri = ENV_URL + this.props.location.pathname + '/' + form_id + '/duplicate';

    axios.get(uri, authHeaders).then((response) => {
      const return_data = response.data;

      this.setState({
        forms: response.data.forms
      })
      console.log('duplicateForm res: ', return_data);
      
    });
    
  }

  toggleAttach(form_id) {

    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };

    // /super/contests/{contest}/forms/{id}/attach
    let uri = ENV_URL + '/super/contests/' + this.props.match.params.contest + '/forms/' + form_id + '/attach';

    axios.get(uri, authHeaders).then((response) => {

      alert(response.data);

      console.log('toggleAttach res: ', response);
      
    });
  }


  render() {
    return (
    <div>

      {/* <SuperHeader /> */}

      <h1 className="text-center">Edit Forms</h1>

      {this.state.forms.map(function(form) {
        return (
          <div>

            <Link to={'/super/forms/' + form.id}>{form.title} ({form.type})</Link>&nbsp;
            <span className="action-btn" onClick={(e) => this.duplicateForm(form.id)}>Duplicate</span>&nbsp;
            <span className="action-btn" onClick={(e) => this.toggleAttach(form.id)}>{form.attached ? 'Detach' : 'Attach'}</span>
          
          </div>
        );
      }, this)}

    </div>
    )
  }
}
export default EditForm;