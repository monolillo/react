import React, { Component, Fragment } from 'react';
//import algo from '../../../../static'
class LiveMap extends Component {
  render() {
    return (
      <Fragment>
          <iframe src="http://eluxportal.azurewebsites.net/static/dashboard.html" width="100%" height="500" frameBorder="0"/>
      </Fragment>
    );
  }
}

export default LiveMap;
