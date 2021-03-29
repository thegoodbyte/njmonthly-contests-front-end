// DisplayItem.js

import React, {Component} from 'react';
import axios from 'axios';
import UserRow from './UserRow';
import {ENV_URL, STRIPE_PUBLISHABLE} from '../../environment';
class DisplayUsers extends Component {
  constructor(props) { 
    console.log('die props', props);
    super(props);
    this.state = {
      value: '', 
      users: '',
      editable_contests: '',
      loaded: false,
    };
    this.userRows = this.userRows.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount(){
    // Example query: /users/get_super_users?active=1&contest_id=14&search=Hold%20your%20tongue&column_name=item_description
    axios.get(ENV_URL + '/users/get_users')
    .then(response => {
      console.log('editable response: ', response);
      if (response.data.logged_in == false) {
        alert(response.data.message);
        this.props.history.push('/admin/r_login');
      }

      this.setState({ 
        users: response.data.users,
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
    // remove the item from the database
    let uri = ENV_URL + '/users/' + id;
    axios.delete(uri).then((response) => {
      console.log('del res: ', response);
    });
    // remove the item from state (removes the item from the view)
    this.setState({
      users: this.state.users.filter(function(item) {
        return item.id !== id
      })
    });
  }

  userRows() {
    if(this.state.users instanceof Array){
        return this.state.users.map(function(object, i){

          return <UserRow 
            obj={object} 
            arr_key={i} 
            key={i} 
            columns={this.state.columns} 
            removeItem={this.removeItem} 
          />;

        }, this)
    }
  }

  render(){
    return (
      <div>
        {this.state.loaded ? (
        <div>
          <h1 className="text-center">My Entries</h1>

          <div className="grid-canvas">
            <table id="grid-canvas">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
              {this.userRows()}
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
export default DisplayUsers;