import React, {Component} from 'react';
import axios from 'axios';
import {ENV_URL} from '../../environment';
import { Link } from 'react-router-dom';
import { getContestEntryForm } from '../../actions/contest';
import { connect } from 'react-redux';
import FormItemEntryV2 from '../contest/FormItemEntry';
import SuperHeader from './SuperHeader';
import { setContestEntryFormData } from '../../actions/contest';

class EditEntry extends Component {
  constructor(props){
    super(props);
    this.formSubmitted = this.formSubmitted.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    console.log('EditEntry componentWillReceiveProps', this.props.entry, nextProps.entry);

    if (this.props.location.pathname !== nextProps.location.pathname) {
      const path = this.props.match.url + '/form';
      const uri = ENV_URL + path;
      this.props.getContestEntryForm(uri);

    }

  }

  componentDidMount() {

    const path = this.props.match.url + '/form';

    const uri = ENV_URL + path;

    console.log('EditEntry props', this.props, uri);
    
    this.props.getContestEntryForm(uri);

  }

  componentWillUnmount() {
    this.props.setContestEntryFormData(null);
  }


  formSubmitted(e) {
    console.log('entryForm', this.props.entryForm)
    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };

    const item_data = {
			entry_form_fields: this.props.entryForm.fields,
		}

    // /super/contests/{contest}/entries/{id}/update
    let uri = ENV_URL + this.props.location.pathname + '/update';
    axios.patch(uri, item_data, authHeaders).then((response) => {
			console.log('EditItemForm.updateItem', response);
      alert('Your item was updated!');
    });
  }

  render() {
    return (
    <div>
      {this.props.entryForm ? (

        <div>
          {/* <SuperHeader /> */}
          <FormItemEntryV2
            entry={this.props.entry}
            formSubmitted={this.formSubmitted}
            submitButtonText={'Update'}
          />
        </div>

      ) : ('')}


    </div>
    )
  }
}




const mapStateToProps = state => (
  {
    entryForm: state.entryForm,
    entry: state.entry
  }
)
  
const mapDispatchToProps = (dispatch) => {
  return {
    getContestEntryForm: (uri) => {
      dispatch(getContestEntryForm(uri));
    },
    setContestEntryFormData: (entryForm) => {
      dispatch(setContestEntryFormData(entryForm));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
