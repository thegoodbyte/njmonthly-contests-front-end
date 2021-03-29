import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SuperHeader extends Component {
  constructor(props) {
    super(props);
    console.log('SuperHeader props', props);
  }


  render() {

    let pathname = window.location.pathname;
    let paths = pathname.split('/');

    const showSubMenu = this.props.match && this.props.match.params.contest

    return (
      <div className="super-admin-menu-wrapper">
        <div  className="super-admin-menu">
          <ul>
            <li><Link to={'/super/contests'}>Contests</Link></li>
            {showSubMenu ? 
              <ul>
                <li><Link to={'/super/contests/' + this.props.match.params.contest}>{this.props.contest ? this.props.contest.title : this.props.match.params.contest}</Link></li>
                <ul>
                  <li><Link to={'/super/contests/' + this.props.match.params.contest + '/update'}>Update Contest</Link></li>
                  <li><Link to={'/super/contests/' + this.props.match.params.contest + '/entries'}>Entries</Link></li>
                  <li><Link to={'/super/contests/' + this.props.match.params.contest + '/entries/create'}>Create Entry</Link></li>
                  <li><Link to={'/super/contests/' + this.props.match.params.contest + '/pages'}>Pages</Link></li>
                  <li><Link to={'/super/contests/' + this.props.match.params.contest + '/pages/create'}>Create Page</Link></li>
                  <li><Link to={'/super/contests/' + this.props.match.params.contest + '/forms'}>Forms</Link></li>
                  <li><Link to={'/contests/' + this.props.match.params.contest + '/free-entry'}>Create Free Entry</Link></li>
                  <li><Link to={'/super/contests/' + this.props.match.params.contest + '/subscriptions-table'}>View Subscriptions Table</Link></li>
                  <li><Link to={'/super/contests/' + this.props.match.params.contest + '/purchases-table'}>View Purchases Table</Link></li>
                </ul>
              </ul>
            : ''}
          </ul>
        </div>
      </div>

    )
  }
}
const mapStateToProps = state => (
  {
    contest: state.contest,
  }
)
export default connect(mapStateToProps)(SuperHeader);

// export default SuperHeader;