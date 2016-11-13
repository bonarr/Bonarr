import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchDelayProfiles, deleteDelayProfile, reorderDelayProfile } from 'Stores/Actions/settingsActions';
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
  reorderDelayProfile,
  fetchTags
};

class DelayProfilesConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      dragIndex: null,
      dropIndex: null
    };
  }

  componentWillMount() {
    this.props.fetchDelayProfiles();
    this.props.fetchTags();
  }

  //
  // Listeners

  onConfirmDeleteDelayProfile = (id) => {
    this.props.deleteDelayProfile({ id });
  }

  onDelayProfileDragMove = (dragIndex, dropIndex) => {
    if (this.state.dragIndex !== dragIndex || this.state.dropIndex !== dropIndex) {
      console.log(dropIndex);
      this.setState({
        dragIndex,
        dropIndex
      });
    }
  }

  onDelayProfileDragEnd = ({ id }, didDrop) => {
    const {
      dropIndex
    } = this.state;

    if (didDrop && dropIndex !== null) {
      this.props.reorderDelayProfile({ id, moveIndex: dropIndex - 1 });
    }

    this.setState({
      dragIndex: null,
      dropIndex: null
    });
  }

  //
  // Render

  render() {
    return (
      <DelayProfiles
        {...this.state}
        {...this.props}
        onConfirmDeleteDelayProfile={this.onConfirmDeleteDelayProfile}
        onDelayProfileDragMove={this.onDelayProfileDragMove}
        onDelayProfileDragEnd={this.onDelayProfileDragEnd}
      />
    );
  }
}

DelayProfilesConnector.propTypes = {
  fetchDelayProfiles: PropTypes.func.isRequired,
  deleteDelayProfile: PropTypes.func.isRequired,
  reorderDelayProfile: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(DelayProfilesConnector);
