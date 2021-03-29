// CardItem.js

import React, { Component } from 'react';
//import { Link, browserHistory } from 'react-router';
import { Link } from 'react-router-dom'

import {ENV_URL, API_URL, S3_URL} from '../../environment';
// import { getContest } from '../../actions/contest';
import axios from 'axios';

import { connect } from 'react-redux';
class ItemRow extends Component {
  constructor(props) {
      super(props);
      // this.handleVisibilitySubmit = this.handleVisibilitySubmit.bind(this);
      // this.state = {
      //   is_visible: props.obj.active
      // };
      this.itemFiles = this.itemFiles.bind(this);
      this.metaLoop = this.metaLoop.bind(this);
      this.downloadFile = this.downloadFile.bind(this);
      // this.deleteItem = this.deleteItem.bind(this);
  }

  // handleVisibilitySubmit(event) {
  //   event.preventDefault();
  //   const products = {
  //     is_visible: !this.state.is_visible,
  //     id: this.props.obj.id,
  //   }
    
  //   let uri = ENV_URL + '/items/update_visibility';
  //   axios.patch(uri, products).then((response) => {
  //     this.setState({
  //       is_visible: response.data.active,
  //     });
  //   });
  // }

  itemFiles(item_media) {
    return Object.keys(item_media).map(function(key) {
      if (item_media[key].collection_name == 'files') {
        return <p><a target="_blank" href={S3_URL + '/' + item_media[key].id + '/' + item_media[key].file_name}>{item_media[key].file_name}</a></p>;
      }
    });
  }

  metaLoop(meta) {
    return Object.keys(meta).map(function(key) {
      return <span>{key}: {meta[key].value}, </span>
    });
  }

  downloadFile() {
    const uri = ENV_URL + '/super/items/' + this.props.obj.id + '/createZipFolderWithItemImages';
    axios.get(uri).then((response) => {

      console.log('res', response);

      const urlToSend = API_URL + '/images-to-download/' + this.props.contest.slug + '/' + this.props.obj.item_name + '_' + this.props.obj.user.email + '.zip';
  
      // var event = document.createEvent('MouseEvent');

      // event = new CustomEvent('click');

      // var a = document.createElement('a');

      // a.href = urlToSend;

      // a.target = "_blank";

      // a.dispatchEvent(event);

      window.open(urlToSend, '_blank').focus();

      // Object.assign(document.createElement('a'), { target: '_blank', href: urlToSend}).click();
      // console.log('donwload res', response);
      
      // console.log('urlToSend', urlToSend);
      // var req = new XMLHttpRequest();
      // req.open("GET", urlToSend, true);
      // req.responseType = "blob";
      // req.onload = function (event) {
      //     var blob = req.response;
      //     var fileName = req.getResponseHeader("fileName") //if you have the fileName header available
      //     var link=document.createElement('a');
      //     link.href=window.URL.createObjectURL(blob);
      //     link.download=fileName;
      //     link.click();
      // };
  
      // req.send();
    });

  }


  render() {
    var item_media = this.props.obj.media;

    if (item_media[0] !== undefined) {
      var media_id = item_media[0].id;
    } else {
      var media_id = false;
    }

    let filename = '';
    if (media_id) {
      filename = item_media[0].file_name;
    }

    var image_url = this.props.obj['itemImage'] ? this.props.obj['itemImage'] : S3_URL + '/' + media_id + "/conversions/thumb.jpg";
    
    return (
      <tr id={this.props.obj.id} className={'ui-widget-content slick-row'}>

        <td>{this.props.obj.id}</td>
        
        <td>
          <div style={{width: '130px'}}>
            <a href={S3_URL + '/' + media_id + "/" + filename } target="_blank">
              <img className="card-img-top" src={image_url} alt="Card image cap" />
            </a>
            <div onClick={this.downloadFile}>Download</div>
          </div>
        </td>

        <td>{this.props.obj.item_name}</td>

        <td>
          <p>Description: {this.props.obj.item_description}</p>
          <p>
            item_att1: {this.props.obj.item_att1}<br/>
            item_att2: {this.props.obj.item_att2}<br/>
            item_att3: {this.props.obj.item_att3}
          </p>
          <p>Purchase ID: {this.props.obj.purchase_id}</p>
          <p><h5>Meta</h5> {this.metaLoop(this.props.obj.meta)}</p>
        
        </td>

        <td>{this.itemFiles(item_media)}</td>

        <td>

          <span onClick={(e) => this.props.handleVisibilitySubmit(this.props.arr_key)} className="action-btn">
            {this.props.obj.active ? 'Hide' : 'Approve'}
          </span>

          <span onClick={() => this.props.removeItem(this.props.obj.id)} className="action-btn">Delete</span>

          <Link to={"/admin/my-items/" + this.props.obj.id + '/forms'} className="action-btn">Upload Forms</Link>

          <Link to={'/super/entries/' + this.props.obj.id} className="action-btn">Edit</Link>

        </td>

        {this.props.obj.user !== null ? <td>{this.props.obj.user.id + ': ' + this.props.obj.user.name + ' ' + this.props.obj.user.last_name + ' | ' + this.props.obj.user.email + ' | ' + this.props.obj.user.address_phone} <br/> <h5>Meta</h5> {this.props.obj.user.meta ? this.metaLoop(this.props.obj.user.meta) : ''}</td> : <td>No user</td>}

      </tr>
    );
  }
}

// class IsVisibleButton extends Component {
//   constructor(props) {
//     console.log('sub props: ', props);
//     super(props);
//     this.handleVisibilitySubmit = this.handleVisibilitySubmit.bind(this);
//     this.state = {
//       is_visible: props.subprops.is_visible,
//     }
//   }

//   handleVisibilitySubmit(event) {
//     event.preventDefault();
//     const products = {
//       is_visible: !this.state.is_visible,
//       id: this.props.subprops.id,
//     }
    
//     let uri = ENV_URL + '/items/update_visibility';
//     axios.patch(uri, products).then((response) => {
//       this.setState({
//         is_visible: response.data.active,
//       });
//     });
//   }

//   render() {
//     return (
//       <button onClick={this.handleVisibilitySubmit}>
//         Is Visible: {this.state.is_visible.toString()}
//       </button>
//     )
//   }
// }
// const IsVisibleButton = (props) => (
//   <button onClick={props.handleVisibilitySubmit}>
//     Is Visible: {props.is_visible}
//   </button>
// )



const mapStateToProps = state => (
  {
    contest: state.contest
  }
)
  
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getContest: (uri) => {
//       dispatch(getContest(uri));
//     }
//   }
// }
export default connect(mapStateToProps)(ItemRow);
