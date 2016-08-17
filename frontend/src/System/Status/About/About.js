import React, { Component, PropTypes } from 'react';
import FieldSet from 'Components/FieldSet';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';

class About extends Component {

  //
  // Render

  render() {
    const {
      version,
      isMonoRuntime,
      runtimeVersion,
      appData,
      startupPath
    } = this.props;

    return (
      <FieldSet
        legend="About"
      >
        <DescriptionList>
          <DescriptionListItem
            title="Version"
            data={version}
          />

          {
            isMonoRuntime &&
              <DescriptionListItem
                title="Mono Version"
                data={runtimeVersion}
              />
          }

          <DescriptionListItem
            title="AppData directory"
            data={appData}
          />

          <DescriptionListItem
            title="Startup directory"
            data={startupPath}
          />
        </DescriptionList>
      </FieldSet>
    );
  }

}

About.propTypes = {
  version: PropTypes.string.isRequired,
  isMonoRuntime: PropTypes.bool.isRequired,
  runtimeVersion: PropTypes.string.isRequired,
  appData: PropTypes.string.isRequired,
  startupPath: PropTypes.string.isRequired,
  fetchStatus: PropTypes.func.isRequired
};

export default About;
