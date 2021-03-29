import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {ENV_URL, STRIPE_PUBLISHABLE} from '../../environment';
import SuperHeader from './SuperHeader';

class SuperMain extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidMount() {

    

  }
  render() {

    return (
      <div>
        {/* <SuperHeader /> */}
        <div><Link className="action-btn" to={'/super/contests'}>Contests</Link></div>
      </div>
    )
  }
}


export default SuperMain;