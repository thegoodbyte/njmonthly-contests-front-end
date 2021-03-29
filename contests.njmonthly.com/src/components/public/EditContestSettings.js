import React, {Component} from 'react';
import {ENV_URL} from '../../environment';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import ContestHeader from './ContestHeader';
import queryString from 'query-string';
import {getContest} from '../../actions/contest';

class EditContestSettings extends Component {
  constructor(props) { 
    super(props);
  }

  componentDidMount(){

    // GET /super/contests/{contest}/settings
    const uri = ENV_URL + this.props.location.pathname;

    this.props.getContest(uri);

  }

  render(){

    if (this.props.contest) {

      return (

      <div>
        <h1 className="text-center">Edit Contest Settings</h1>
        <form onSubmit={this.handleSubmit}>
          
          <div className="row">
            <input 
              name="finalists" 
              value={this.props.contest.settings.finalists} 
              className="form-control" 
              onChange={this.props.updateContestSettings} 
            />
          </div>
          
          <div className="row">
            <input 
              name="title" 
              value={this.props.contest.settings.status} 
              className="form-control" 
              onChange={this.props.updateContestSettings} 
              placeholder="title"
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      
      )
    } else {
      return (<LoadingCrescent />)
    }
  }
}

const LoadingCrescent = (props) => (
<div className="lds-css ng-scope">
  <div style={{width:'100%', height:'100%'}} className="lds-eclipse">
    <div></div>
  </div>
</div>
)


const mapStateToProps = state => (
  {
    contest: state.contest
  }
)

const mapDispatchToProps = (dispatch) => {
  return {
    getContest: (uri, search) => {
      dispatch(getContest(uri, search));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContestSettings);