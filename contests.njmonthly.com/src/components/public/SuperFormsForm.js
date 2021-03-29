import React, {Component} from 'react';
import axios from 'axios';
import {ENV_URL} from '../../environment';
import { Link } from 'react-router-dom';
import SuperHeader from './SuperHeader';

class EditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      form: null,
      fields: [
        'info', 'name', 'type', 'title', 'value', 'required', 'field_type', 'classes', 'price', 'product_id', 'stripe_sku',
      ],
    };
    this.handleFieldInputTextChange = this.handleFieldInputTextChange.bind(this);
    this.addField = this.addField.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

    // let uri = ENV_URL + '/forms/getForm/' + this.props.match.params.contest;

    // /super/contests/{contest}/forms/{id}
    let uri = ENV_URL + this.props.location.pathname;

    axios.get(uri).then((response) => {
      const return_data = response.data;

      this.setState({
        form: response.data
      })
      console.log('return json data: ', return_data);
      
    });


  }

  // Set up functions to update the state up input fields
  handleFieldInputTextChange(e, index, field){

		let form = Object.assign({}, this.state.form);

		e.persist();

    console.log('form data', index, field);

		form.fields[index][field] = e.target.value;

		this.setState({
			form: form
		})

  }
  // Set up functions to update the state up input fields
  handleInputTextChange(e){

		let form = Object.assign({}, this.state.form);

		form.type = e.target.value;

		this.setState({
			form: form
		})

  }
  addField() {
    let form = Object.assign({}, this.state.form);
    
    const lastItemIndex = form.fields.length -1;
    
    const lastItem = form.fields[lastItemIndex];
    console.log('lastItemIndex', parseInt(lastItemIndex), typeof parseInt(lastItemIndex), typeof 9, lastItem, form.fields, form.fields[lastItemIndex]);
    form.fields.push(lastItem);
    console.log('form after add', form);
		this.setState({
			form: form
		})
  }

  formSubmitted(e) {
    e.preventDefault();
    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };

    // /super/forms/{id}/update
    let uri = ENV_URL + this.props.location.pathname + '/update';

    let data = {
      form: this.state.form,
    }

    axios.patch(uri, data, authHeaders).then((response) => {

      // alert(response.data);

      console.log('formSubmitted res: ', response);
      
    });
  }
  render() {
    return (
    <div>

      {/* <SuperHeader /> */}

      <h1 className="text-center">Edit Forms</h1>

        {this.state.form ? 
					<form onSubmit={this.formSubmitted} id="payment-form" className={ this.props.isLoading ? 'is_loading' : '' }>
            <div className='field'>
              <label htmlFor='type' className="form-check-label">Type&nbsp;</label>
              <input 
                id='type' 
                name='type'
                type="text" 
                className="input text empty" 
                onChange={(e) => this.handleInputTextChange(e)} 
                placeholder='type'
                value={this.state.form.type}
              />
            </div>
            
            {this.state.form.fields.map(function(field, index) {

                return (
                  <div className="row" key={index}>
                    <h2>{field.title}</h2>

                    {this.state.fields.map(function(field2) {
                      if (field2 === 'info') {
                        return (
                          <div className='field'>
                            <label htmlFor={field2} className="form-check-label">{field2}</label>
                            <textarea 
                              id={field2} 
                              name={field2}
                              type="text" 
                              className="input text empty" 
                              onChange={(e) => this.handleFieldInputTextChange(e, index)} 
                              placeholder={field2}
                              value={field[field2]}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div className='field'>
                            <label htmlFor={field2} className="form-check-label">{field2}&nbsp;</label>
                            <input 
                              id={field2} 
                              name={field2}
                              type="text" 
                              className="input text empty" 
                              onChange={(e) => this.handleFieldInputTextChange(e, index, field2)} 
                              placeholder={field2}
                              value={field[field2]}
                            />
                          </div>
                        );
                      }
 
                    }, this)}

                    


                  </div>
                );

        }, this)
      }

      <input type="submit" className="action-btn" value="Update" />

      </form>


      : '' }
<div onClick={this.addField}>Add Field</div>
    </div>
    )
  }
}
export default EditForm;