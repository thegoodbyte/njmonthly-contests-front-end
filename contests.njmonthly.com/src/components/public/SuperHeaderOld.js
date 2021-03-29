import React, {Component} from 'react'
import { Link } from 'react-router-dom';


class SuperHeader extends Component {
  constructor(props) {
    super(props);
  }

  breadCrumbs(paths) {
    return paths.map(function(link, currentUrlIndex) {

      let url = '';

      // If we are on the 5th item, timesToLoop is 5
      let timesToLoop = currentUrlIndex + 1;

      // If we are the 5th item, stitch together the first 5 paths in the array
      for (var i = 0; i < timesToLoop; i++) {
        url += paths[i] + '/';
      }

      // If this is the root path, set the link text to home
      let linkText = paths[currentUrlIndex];
      if (currentUrlIndex === 0) {
        linkText = 'Home';
      }

      // If this is the last path, do not append a separator to the end
      let separator = ' > ';
      if (currentUrlIndex === paths.length -1) {
        separator = '';
      }

      return (
        <span><Link to={url}>{linkText}</Link>{separator}</span>
      );
    })
  }

  render() {

    let pathname = window.location.pathname;
    let paths = pathname.split('/');

    return (
      <div>
        {/* {this.breadCrumbs(paths)} */}
      </div>
    )
  }
}

export default SuperHeader;