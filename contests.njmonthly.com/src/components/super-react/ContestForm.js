import React, {Component} from 'react';
import {ENV_URL, S3_URL} from '../../environment';
import ExtraInfo from '../shared/ExtraInfo';



class SuperContestsContestForm extends Component {
  constructor(props){
		super(props);
		console.log('form item contest props: ', props);
		this.state = {
			showMissing: false,
			missingRequired: {},
			requiredError: false,
			next_step: false,
			isLoading: false,
		};

		this.handleInputTextChange = this.handleInputTextChange.bind(this);

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

		this.handleImageUploadChange = this.handleImageUploadChange.bind(this);

    this.formSubmitted = this.formSubmitted.bind(this);
    
    this.handleSelectChange = this.handleSelectChange.bind(this);

	}
	
	componentDidMount() {

    console.log('FormItemEntry componentDidMount', this.props.contest);

		// hydrate the form with the contest's data
    if (this.props.contest) {
      let contestForm = Object.assign({}, this.props.contestForm);

      let contest = this.props.contest;
  
      console.log('contestForm', contestForm, contest);
  
      contestForm.fields.map(function(field, index) {
  
        // console.log('field', index);
  
        if (field.type === 'field') {
          field.value = contest[field.name];
        } else if (field.type === 'meta' && contest.meta[field.name]) {
          field.value = contest.meta[field.name].value;
        } else if (field.type === 'image') {
          field.image_id = contest.media_id;
        }
  
      })
  
      this.props.setContestFormData(contestForm);
    }

	}
  
  handleSelectChange(e, index) {

    let form = Object.assign({}, this.state.contestForm);

		form.fields[index].value = e.target.value;

		let missingRequired = Object.assign({}, this.state.missingRequired);

		if (e.target.value === '') {
				missingRequired[index] = true;
		} else {
				missingRequired[index] = false;
		}

		this.setState({
			missingRequired: missingRequired
		})

		this.props.setContestFormData(form);

  }
  // Set up functions to update the state up input fields
  handleInputTextChange(e, index){

		let form = Object.assign({}, this.props.contestForm);

		e.persist();

    console.log('form data', form.fields[index]);

		form.fields[index].value = e.target.value;

		let missingRequired = Object.assign({}, this.state.missingRequired);

		if (e.target.value === '') {
				missingRequired[index] = true;
		} else {
				missingRequired[index] = false;
		}

		this.setState({
			missingRequired: missingRequired
		})

		this.props.setContestFormData(form);

	}
	
	
	handleCheckboxChange(e, index) {

		e.persist();
		
		let form = Object.assign({}, this.props.contestForm);
		
    form.fields[index].value = e.target.checked;

		let missingRequired = Object.assign({}, this.state.missingRequired);

		if (!e.target.checked) {

			missingRequired[index] = true;

		} else {

			missingRequired[index] = false;

		}
		this.setState({
			missingRequired: missingRequired
		})
		this.props.setContestFormData(form);
  }
  
  handleImageUploadChange(e, index){

    console.log('image index', index);
		
		// add the uploaded image to the input
		const reader = new FileReader();
		const file = e.target.files[0];
    const file_size = file.size;

		console.log(file_size);
		if (file_size > 10000000) {
			alert('Your file is too big (' + file_size/1000000 + 'mb). Please upload an image less than 10mb.');
			return;
		}

		reader.onload = (upload) => {
      var img = new Image();
      img.src = reader.result;
      img.onload = function(e) {

				let form = Object.assign({}, this.props.contestForm);
				form.fields[0].value = upload.target.result;
				form.fields[0].filename = file.name;
				form.fields[0].filetype = file.type;
				this.props.setContestFormData(form);

			}.bind(this);

		};

		
		reader.readAsDataURL(file);

  }




	formSubmitted(e) {
		
		e.preventDefault();
    
    this.props.formSubmitted();

	}

  render() {

		console.log('FormItemEntry props', this.props);

		return (

			<div className="cell example example2 pet-info-form enter">

				<div className={this.state.showMissing ? 'show-missing' : ''}>

					<form onSubmit={this.props.formSubmitted} id="payment-form">

            <div className="row">
              <h3 className="form-title">{this.props.contestForm.title}</h3>
            </div>

            {this.props.contestForm.fields.map(function(field, index) {

              if (field.field_type === 'text') {
                return (
                  <div className="row" key={index}>

                    <div className={this.state.missingRequired[index] && field.required === "true" ? 'field has-error' : 'field'}>
                      <label htmlFor={field.name} className="form-check-label">{field.title} {field.required === "true" ? <span className="red">*</span> : ''}</label>
                      <input 
                        id={field.name} 
                        name={field.name}
                        type="text" 
                        className="input text empty" 
                        onChange={(e) => this.handleInputTextChange(e, index)} 
                        required={field.required === "true" ? true : false}
                        placeholder={field.placeholder}
                        value={field.value}
                      />
                      <div className="baseline"></div>
                    </div>

                  </div>
                );
              }

              if (field.field_type === 'image') {
                let src = '';
                if (field.value) {
                  src = field.value;
                } else {
                  src = S3_URL + '/' + field.image_id + "/conversions/large.jpg";
                }
                return (
                  <div className="row" key={index}>
                    <div className={this.state.missingRequired[field.name] && field.required == "true" ? 'image-field field has-error' : 'image-field field'}>
                      <label data-tip data-for='global' className="file-label">{field.title} <span className="red">*</span> - Photo Tips</label> <ExtraInfo text="For the a cover image, vertical photos work best. Submit photos in high-resolution." />
                      <div className="d-block">
                        <input id="upload" ref="upload" type="file" accept="image/*"
                          onChange={(e) => this.handleImageUploadChange(e, index)}
                          onClick={(event)=> { 
                            event.target.value = null
                          }}
                        />
                      </div>
                      

                      <div id="image-overlay">
                        <img src={src} />

                      </div>

                    </div>

                  </div>
                  
                );
              }

              if (field.field_type === 'textarea') {
                return (
                  <div key={index}>
                    <div className="row">
                      <div className={this.state.missingRequired[index] && field.required === "true" ? 'field textarea has-error' : 'field textarea'}>
                        <label htmlFor="item-description" className="form-check-label textarea">{field.title} <span className="red">*</span></label>
                        <textarea value={field.value} required id="item-description" name="item_description" type="text" className="" onChange={(e) => this.handleInputTextChange(e, index)} placeholder="limit of 600 characters" />
                        <div className="baseline"></div>
                      </div>
                    </div>
                    <p className={this.state.missingRequired[index] && field.required === "true" ? 'error-message' : 'display-none'}>This field cannot be blank. It must be between 1 and 600 characters.</p>
                  </div>
                );
              }

              // if (field.field_type === 'select' && this.props.contests) {
              //   const options = this.props.contests.map(function(contest) {
              //     return {
              //       value: contest.id,
              //       lable: contest.title,
              //     }
              //   });
              //   const selectOptions = [options];
              //   return (
              //     <div className="row" key={index}>
              //       <div className="field">
              //       <label className="form-check-label">{field.title} <span className="red">*</span></label>
                      
              //           <Select
              //             field={field}
              //             index={index}
              //             id="state-select"
              //             name="item_att1"
              //             ref="stateSelect"
              //             options={selectOptions}
              //             placeholder={'Select a ' + field.title}
              //             disabled={false}
              //             value={field.value}
              //             handleSelectChange={this.handleSelectChange}
              //             required={true}
              //             className={this.state.missingRequired[index] && field.required === "true" ? 'has-error ' : ''}
              //           />

              //       </div>
              //     </div>
              //   );
              // }

            }, this)}

            <p className={this.state.requiredError ? 'error-message' : 'display-none'}>Please fill out any fields highlighted or boxed in red.</p>

            <div className="row">
              <div className="text-center full-width">
                <span className="scroll btn btn-primary" onClick={(e) => this.props.formSubmitted(e)}>Next Step</span>
              </div>
            </div>
					</form>
				</div>
			</div>
		)
  }
}

export default SuperContestsContestForm;

