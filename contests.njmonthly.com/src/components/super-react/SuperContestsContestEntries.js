// DisplayItem.js

import React, {Component} from 'react';
import axios from 'axios';
import ItemRow from './ItemRow';
import {ENV_URL, STRIPE_PUBLISHABLE} from '../../environment';
import { connect } from 'react-redux';
import { getContest } from '../../actions/contest';
import SuperHeader from './SuperHeader';

class DisplayItemEditable extends Component {
  constructor(props) { 
    console.log('die props', props);
    super(props);
    this.state = {
      value: '', 
      items: '',
      editable_contests: '',
      loaded: false,
    };
    this.itemRows = this.itemRows.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.emitChange = this.emitChange.bind(this);
    this.handleImageUploadChange = this.handleImageUploadChange.bind(this);
    this.handleVisibilitySubmit = this.handleVisibilitySubmit.bind(this);
  }

  componentWillMount() {

  }

  // tesstesasdfasdf
  componentDidMount(){

    // saveAs('https://s3.us-east-2.amazonaws.com/contest-content/2630/conversions/thumb.jpg', 'thumb.jpg');


    const uri = ENV_URL + '/contests/' + this.props.match.params.contest;
    
    this.props.getContest(uri);

    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };

    let query_params = window.location.search;
    // Example query: /items/get_super_items?active=1&contest_id=14&search=Hold%20your%20tongue&column_name=item_description
    axios.get(ENV_URL + '/super/contests/' + this.props.match.params.contest + '/entries' + query_params, authHeaders)
    .then(response => {
      console.log('editable response: ', response);
      if (response.data.logged_in == false) {
        alert(response.data.message);
        this.props.history.push('/admin/r_login');
      }

      this.setState({ 
        items: response.data.items,
        contests: response.data.contests,
        is_admin: response.data.is_admin,
        columns: response.data.columns,
        loaded: true
      });

    })
    .catch(function (error) {
      console.log(error);
    })
  }

  // Remove the entry from the database and the view
  removeItem(id) {
    const user_confirm = window.confirm('Are you sure you want to delete this item?');
    if (user_confirm == false) {
      return;
    }
    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };
    // remove the item from the database
    let uri = ENV_URL + '/items/' + id;
    axios.delete(uri, authHeaders).then((response) => {
      console.log('del res: ', response);
    });
    // remove the item from state (removes the item from the view)
    this.setState({
      items: this.state.items.filter(function(item) {
        return item.id !== id
      })
    });
  }

  handleVisibilitySubmit(arr_key) {
    
    // let items = this.state.items;
    let items = JSON.parse(JSON.stringify(this.state.items));

    let isActive = items[arr_key]['active'];
    items[arr_key]['active'] = !isActive;
    this.setState({
      items: items,
    })

    const products = {
      is_visible: !isActive,
      id: items[arr_key]['id'],
    }
    
    let uri = ENV_URL + '/items/update_visibility';
    axios.patch(uri, products).then((response) => {

    });
  }

  updateItem(arr_key, item_att, e) {
    let items = this.state.items;
    items[arr_key][item_att] = e.target.value;
    this.setState({
      items: items,
    })
  }

  handleImageUploadChange(arr_key, e){

    let items = this.state.items;
    
    // add the uploaded image to the input
    const reader = new FileReader();
    const file = e.target.files[0];
    const file_size = file.size;

    reader.onload = (upload) => {
      items[arr_key]['data_uri'] = upload.target.result;
      items[arr_key]['filename'] = file.name;
      items[arr_key]['filetype'] = file.type;
      items[arr_key]['itemImage'] = upload.target.result;

      this.setState({
        items: items,
      }, function() {
        axios.post(ENV_URL + '/items/update_item_image', this.state.items[arr_key])
        .then(response => {
          console.log('emitChange res: ', response);
        })
      });

    };

    reader.readAsDataURL(file);

  }

  emitChange(arr_key, item_column, item_id) {
    const new_value = this.state.items[arr_key][item_column];
    const item_data = {
      id: item_id,
      item_column: item_column,
      value: new_value
    }
    axios.post(ENV_URL + '/items/update_item_column', item_data)
    .then(response => {
      console.log('emitChange res: ', response);
    })
      console.log('changed: ', arr_key, item_column, item_id, new_value);
  }
  itemRows() {
    if(this.state.items instanceof Array){
        return this.state.items.map(function(object, i){

          return <ItemRow 
            obj={object} 
            arr_key={i} 
            key={i} 
            columns={this.state.columns} 
            removeItem={this.removeItem} 
            updateItem={this.updateItem} 
            emitChange={this.emitChange} 
            handleImageUploadChange={this.handleImageUploadChange}
            handleVisibilitySubmit={this.handleVisibilitySubmit}
          />;

        }, this)
    }
  }

  render(){
    return (
      <div>
        {this.state.loaded ? (
        <div>

          {/* <SuperHeader /> */}
          
          <h1 className="text-center">{this.props.contest ? this.props.contest.title : ''} Entries</h1>

          <div className="grid-canvas">
            <table id="grid-canvas">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Files</th>
                  <th>Actions</th>
                  <th>User Info</th>
                </tr>
              </thead>
              <tbody>
              {this.props.contest ? (
                this.itemRows()
              ) : ('')}
              
              </tbody>
            </table>
          </div>
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
    contest: state.contest
  }
)
  
const mapDispatchToProps = (dispatch) => {
  return {
    getContest: (uri) => {
      dispatch(getContest(uri));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayItemEditable);