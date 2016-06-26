import React, { Component, PropTypes } from 'react';
import HealthConnector from './Health/HealthConnector';
import DiskSpaceConnector from './DiskSpace/DiskSpaceConnector';
import AboutConnector from './About/AboutConnector';
import MoreInfo from './MoreInfo/MoreInfo';

class Status extends Component {

  //
  // Render

  render() {
    return (
      <div>
        <HealthConnector />
        <DiskSpaceConnector />
        <AboutConnector />
        <MoreInfo />
      </div>
    );
  }

}

Status.propTypes = {

};

export default Status
