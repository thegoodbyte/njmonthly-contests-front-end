import React, {Component} from 'react';
import axios from 'axios';
import {ENV_URL} from '../../environment';
import { Link } from 'react-router-dom';
import SuperHeader from './SuperHeader';

class EditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      pages: [],
    };

  }

  componentWillMount() {

  }

  componentDidMount() {

    console.log('SuperContestsContestForms', this.props);

    // let uri = ENV_URL + '/forms/getForm/' + this.props.match.params.contest;

    // /super/contests/{contest}/forms
    let uri = ENV_URL + '/super/contests/' + this.props.match.params.contest + '/pages';

    axios.get(uri).then((response) => {
      const return_data = response.data;

      this.setState({
        pages: response.data
      })
      console.log('return json data: ', return_data);
      
    });


  }

  duplicateForm(page_id) {
    // /super/contests/{contest}/forms
    let uri = ENV_URL + this.props.location.pathname + '/' + page_id + '/duplicate';

    axios.get(uri).then((response) => {
      const return_data = response.data;

      this.setState({
        forms: response.data
      })
      console.log('duplicateForm res: ', return_data);
      
    });
    
  }


  render() {
    return (
    <div>

      {/* <SuperHeader /> */}

      <h1 className="text-center">Edit Pages</h1>

      {this.state.pages.map(function(page) {
        return (
          <div>

            <Link to={'/super/contests/' + this.props.match.params.contest + '/pages/' + page.id}>{page.slug} ({page.title})</Link>&nbsp;
            {/* <span className="action-btn" onClick={(e) => this.duplicateForm(page.id)}>Duplicate</span>&nbsp; */}
          </div>
        );
      }, this)}

    </div>
    )
  }
}
export default EditForm;