// CreateEntry.js
import React, {Component} from 'react';
import {ENV_URL, MAIN_URL} from '../../environment';
import { Switch, Route } from 'react-router-dom';
import FormItemEntry from '../contest/FormItemEntry';
import { getEntryEditPageData } from '../../actions/contest';
import axios from 'axios';
import { connect } from 'react-redux';
import SuperHeader from './SuperHeader';

class CreateEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      form: {
        form_template: '',
      },
      isLoaded: false,
      item_id: false,
      isLoading: false
    }
    this.updateDataForForm = this.updateDataForForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  componentWillMount() {

  }

  updateDataForForm(item_id, add_subscription) {
    this.setState({
      item_id: item_id,
      add_subscription: add_subscription
    })
  }

  updateFormData(form) {
		this.setState({
			form: form
		}, function() {
      console.log('CreateEntry.updateFormData:', this.state);
    });
  }


  componentDidMount() {

    console.log('CreateEntry props: ', this.props);

    // /super/contests/:contest/create-contest
    // axios.get(ENV_URL + window.location.pathname)
    // .then(response => {
    //   console.log('CreateEntry res:', response);

    //   this.setState({
    //     form: response.data.form[0],
    //     page: response.data.page,
    //     isLoaded: true,
    //   })
    // })

    this.props.getEntryEditPageData(ENV_URL + window.location.pathname);

  }

  nextStep() {

    const item_data = {
			item: this.state.form.fields,
			subscriptions: [],
		}

    item_data.contest_id = '1';
    item_data.user_id = '1';
    

		let uri = ENV_URL + '/create_entry';
		axios.post(uri, item_data).then((response) => {

      alert('Entry created');

		});

  }
  
  render() {
    console.log('CreateEntry props: ', this.props);
    // Right now, FormTemplate can be FormOne or FormTwo (pulled from forms table, from_template column in database)
    //const FormTemplate = allForms[this.state.form.form_template];
		return (
      
			<div>
			  {this.props.entryForm ? (
          <div>
          
              {/* <SuperHeader /> */}
							<FormItemEntry
                entryForm={this.props.entryForm}
                updateDataForForm={this.updateDataForForm}
                updateFormData={this.updateFormData}
                userSubmitted={this.nextStep}
                submitButtonText={'Next Step'}
							/>
            
          <div style={{clear: 'both'}}></div>
          </div>
        ) : (
          ''
        )}
      </div>
       
     
		)
  }
}


const mapStateToProps = state => (
  {
    contest: state.contest,
    entryForm: state.entryForm,
  }
)
const mapDispatchToProps = (dispatch) => {
  return {
    getEntryEditPageData: (uri) => {
      dispatch(getEntryEditPageData(uri));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);