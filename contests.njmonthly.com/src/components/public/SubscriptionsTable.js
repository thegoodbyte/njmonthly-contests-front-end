import React, {Component} from 'react';
import { connect } from "react-redux";
import { getSubscribers } from '../../actions/contest';
import {CSVLink, CSVDownload} from 'react-csv';
import SuperHeader from './SuperHeader';

// const ConnectedSubscriptionsBody = () => (
//   <tbody>
//     {this.props.subscriptions.map(function(subscription, i){
//       return <Subscription key={i} subscription={subscription} />
//     })}
// </tbody>
// )

class ConnectedSubscriptionsBody extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSubscribers();
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.getSubscribers();
    }
  
  }

  render() {

    return (
      <div>
        {/* <SuperHeader /> */}
        <CSVLink data={this.props.subscriptions}>Download CSV</CSVLink>
        <table>
          <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Address</td>
            <td>Sub Name</td>
            <td>Created At</td>
          </tr>
          </thead>
          <tbody>
            {this.props.subscriptions.map(function(subscription, i){
              return <Subscription key={i} subscription={subscription} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const Subscription = (props) => (
  <tr>
    <td>{props.subscription.first_name}</td>
    <td>{props.subscription.last_name}</td>
    <td>{props.subscription.email}</td>
    <td>{props.subscription.address_phone}</td>
    <td>{props.subscription.address_line1}, {props.subscription.address_city}, {props.subscription.address_state} {props.subscription.address_zip}</td>
    <td>{props.subscription.product_name}</td>
    <td>{props.subscription.subscription_created_at}</td>
  </tr>
);

const mapStateToProps = (state) => {
  return {
    subscriptions: state.subscriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubscribers: () => dispatch(getSubscribers())
  }
}



const SubscriptionsBody = connect(mapStateToProps, mapDispatchToProps)(ConnectedSubscriptionsBody);


export default SubscriptionsBody;