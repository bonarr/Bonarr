import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import { fetchDelayProfiles, deleteDelayProfile } from 'Stores/Actions/settingsActions';
import { fetchTags } from 'Stores/Actions/tagActions';
import DelayProfiles from './DelayProfiles';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.delayProfiles,
    (state) => state.tags.items,
    (delayProfiles, tagList) => {
      const defaultProfile = _.find(delayProfiles.items, { id: 1 });
      const items = _.sortBy(_.reject(delayProfiles.items, { id: 1 }), ['order']);

      return {
        defaultProfile,
        ...delayProfiles,
        items,
        tagList
      };
    }
  );
}

const mapDispatchToProps = {
  fetchDelayProfiles,
  deleteDelayProfile,
  fetchTags
};

class DelayProfilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchDelayProfiles();
    this.props.fetchTags();
  }

  //
  // Listeners

  @autobind
  onConfirmDeleteDelayProfile(id) {
    this.props.deleteDelayProfile({ id });
  }

  //
  // Render

  render() {
    return (
      <DelayProfiles
        onConfirmDeleteDelayProfile={this.onConfirmDeleteDelayProfile}
        {...this.props}
      />
    );
  }
}

DelayProfilesConnector.propTypes = {
  fetchDelayProfiles: PropTypes.func.isRequired,
  deleteDelayProfile: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(DelayProfilesConnector);
