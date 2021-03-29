import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import SuperHeader from './SuperHeader';
import { connect } from 'react-redux';
import { getContest } from '../../actions/contest';
import {ENV_URL} from '../../environment';

class SuperContestsContest extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    const uri = ENV_URL + this.props.location.pathname;
    this.props.getContest(uri);
  }
  render() {

    console.log('SuperContestMain props: ', this.props)

    return (
      <div>

          {/* <SuperHeader /> */}
          
          {/* <div><Link className="action-btn" to={'/super/contests/' + this.props.match.params.contest + '/update'}>Update Contest</Link></div>
          <div><Link className="action-btn" to={'/super/contests/' + this.props.match.params.contest + '/entries'}>Entries</Link></div>
          <div><Link className="action-btn" to={'/super/contests/' + this.props.match.params.contest + '/entries/create'}>Create Entry</Link></div>
          <div><Link className="action-btn" to={'/super/contests/' + this.props.match.params.contest + '/pages'}>Pages</Link></div>
          <div><Link className="action-btn" to={'/super/contests/' + this.props.match.params.contest + '/pages/create'}>Create Page</Link></div>
          <div><Link className="action-btn" to={'/super/contests/' + this.props.match.params.contest + '/forms'}>Forms</Link></div>
          <div><Link className="action-btn" to={'/contests/' + this.props.match.params.contest + '/free-entry'}>Create Free Entry</Link></div>
          <div><Link className="action-btn" to={'/super/contests/' + this.props.match.params.contest + '/subscriptions-table'}>View Subscriptions Table</Link></div>
          <div><Link className="action-btn" to={'/super/contests/' + this.props.match.params.contest + '/purchases-table'}>View Purchases Table</Link></div>
           */}
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
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SuperContestsContest);
// export default SuperContestMain;