import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {S3_URL, ENV_URL} from '../../environment';
import SuperHeader from './SuperHeader';

class DisplayContests extends Component {
  constructor(props) { 
    console.log(props);
    super(props);
    this.state = {
      items: '',
    };
  }
  componentWillMount() {


  }


  componentDidMount(){

    axios.get(ENV_URL + '/contests')
    .then(response => {

      console.log('DisplayContest res: ', response);

      this.setState({ items: response.data });

    })
    .catch(function (error) {
      console.log(error);
    })
  }

  cardItem() {
    if(this.state.items instanceof Array){
      return this.state.items.map(function(contest, i){
          return <ContestCard 
            contest={contest} 
            key={i}
          />;
      }, this)
    }
  }

  render(){

    return (
      <div>
        {/* <SuperHeader /> */}
        <h1 className="text-center">Contests</h1>

        <div className="card-deck thumbnails">
          {this.cardItem()}
        </div>

    </div>
    
    )
  }
}

const ContestCard = (props) => (

<div className="card one-third">
    <div className="visible-card">
      <div className="card-image">
        <img className="card-img-top" src={S3_URL + '/' + props.contest.media_id + "/conversions/large.jpg" } alt="Card image cap" />
      </div>
      <div className="card-block">
          <h4 className="card-title">{props.contest.title}</h4>
          <Link to={"/super/contests/" + props.contest.slug + "/entries"} className="btn btn-primary">Manage Contest</Link>
          <Link to={"/super/contests/create/" + props.contest.slug} className="btn btn-primary">Create Similar Contest</Link>
      </div>

    </div>
  </div>
  )

export default DisplayContests;