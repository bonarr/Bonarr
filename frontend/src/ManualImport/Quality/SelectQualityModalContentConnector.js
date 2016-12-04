import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchQualityProfileSchema } from 'Stores/Actions/settingsActions';
import { updateManualImportItem } from 'Stores/Actions/manualImportActions';
import SelectQualityModalContent from './SelectQualityModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.qualityProfiles,
    (qualityProfiles) => {
      const {
        fetchingSchema: fetching,
        schemaPopulated: populated,
        schemaError: error,
        schema
      } = qualityProfiles;

      return {
        fetching,
        populated,
        error,
        items: schema.items || []
      };
    }
  );
}

const mapDispatchToProps = {
  fetchQualityProfileSchema,
  updateManualImportItem
};

class SelectQualityModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount = () => {
    if (!this.props.populated) {
      this.props.fetchQualityProfileSchema();
    }
  }

  //
  // Listeners

  onQualitySelect = ({ qualityId, proper, real }) => {
    const quality = _.find(this.props.items,
                           (item) => item.quality.id === qualityId).quality;

    const revision = {
      version: proper ? 2 : 1,
      real: real ? 1 : 0
    };

    this.props.updateManualImportItem({
      id: this.props.id,
      quality: {
        quality,
        revision
      }
    });

    this.props.onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <SelectQualityModalContent
        {...this.props}
        onQualitySelect={this.onQualitySelect}
      />
    );
  }
}

SelectQualityModalContentConnector.propTypes = {
  id: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  populated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchQualityProfileSchema: PropTypes.func.isRequired,
  updateManualImportItem: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SelectQualityModalContentConnector);
